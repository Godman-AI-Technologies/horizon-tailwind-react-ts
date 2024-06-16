import { fetchData } from "app/utils/fetch/request";
import { AddButton } from "entities/AddButton";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Modal } from "shared/Modal";
import { FaTrash } from "react-icons/fa";
import { INote } from "app/types/note";

export const Notes = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [form, setForm] = useState<INote>({ name: "", data: "" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<INote>({ name: "", data: "" });

  const fetchNotes = async () => {
    const token = Cookies.get("accessToken");
    const profileId = Cookies.get("profileId");

    try {
      const notes: INote[] = await fetchData(
        `${process.env.REACT_APP_USER_API}/profiles/${profileId}/knowledge-base`,
        "GET",
        token
      );
      setNotes(notes);
    } catch (error) {
      console.error("Error on getting notes:", error);
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      fetchNotes();
    });
  }, []);

  const handleDelete = async (id: string) => {
    const token = Cookies.get("accessToken");

    try {
      await fetchData(
        `${process.env.REACT_APP_USER_API}/knowledge-base/${id}`,
        "DELETE",
        token
      );
      setNotes(notes);
    } catch (error) {
      console.error("Error on deleting note:", error);
    }
    fetchNotes();
  };

  const handleBlockClick = (note: INote) => {
    setEditForm(note);
    setIsEditModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const isFormValid = () => {
    return form.name.trim() !== "" && form.data.trim() !== "";
  };

  const isEditFormValid = () => {
    return editForm.name.trim() !== "" && editForm.data.trim() !== "";
  };

  const handleSubmit = async () => {
    const token = Cookies.get("accessToken");
    const profileId = Cookies.get("profileId");

    try {
      await fetchData(
        `${process.env.REACT_APP_USER_API}/knowledge-base/${profileId}`,
        "POST",
        token,
        { name: form.name, data: form.data, type: "text" }
      );
      setNotes(notes);
    } catch (error) {
      console.error("Error on creating note:", error);
    }

    setIsAddModalOpen(false);
    fetchNotes();
  };

  const handleEditSubmit = async () => {
    const token = Cookies.get("accessToken");

    try {
      await fetchData(
        `${process.env.REACT_APP_USER_API}/knowledge-base/${editForm._id}`,
        "PUT",
        token,
        { name: editForm.name, data: editForm.data, type: "text" }
      );
      setNotes(notes);
    } catch (error) {
      console.error("Error on editing note:", error);
    }

    setIsEditModalOpen(false);
    fetchNotes();
  };

  const onClose = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleAddButtonClick = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className="container mx-auto">
      <AddButton onClick={handleAddButtonClick} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes &&
          notes.map((note: INote) => (
            <div
              key={note._id}
              onClick={() => {
                handleBlockClick(note);
              }}
              className="rounded bg-white p-4 shadow dark:bg-navy-700"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{note.name}</h2>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(note._id);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        <Modal
          title="Add Note"
          submitHandler={handleSubmit}
          isOpen={isAddModalOpen}
          onClose={onClose}
          //isSubmitDisabled={!isFormValid()}
        >
          <div className="bg-white p-4 text-black">
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div>
              <label htmlFor="data" className="mb-2 block">
                {`${form.data.length}/250`}
              </label>
              <textarea
                id="data"
                name="data"
                value={form.data}
                onChange={handleChange}
                className="h-32 w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>
        </Modal>
        <Modal
          title="Edit Note"
          submitHandler={handleEditSubmit}
          isOpen={isEditModalOpen}
          onClose={onClose}
          //isSubmitDisabled={!isEditFormValid()}
        >
          <div className="bg-white p-4 text-black">
            <div className="mb-4">
              <label htmlFor="edit-name" className="mb-2 block">
                Name
              </label>
              <input
                type="text"
                id="edit-name"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div>
              <label htmlFor="edit-data" className="mb-2 block">
                {`${editForm.data.length}/250`}
              </label>
              <textarea
                id="edit-data"
                name="data"
                value={editForm.data}
                onChange={handleEditChange}
                className="h-32 w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
