import { fetchData } from "app/utils/fetch/request";
import { AddButton } from "entities/AddButton";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Modal } from "shared/Modal";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { INote } from "app/types/note";

export const Notes = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [form, setForm] = useState<INote>({ name: "", content: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(async () => {
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
    });
  }, []);

  const handleDelete = (id: string) => {
    alert(`Delete note with id: ${id}`);
  };

  const handleBlockClick = (id: string) => {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {
    // Logic to handle form submission
    console.log("Form submitted:", form);
    // Close the modal after submission
    setIsModalOpen(false);
  };

  const onClose = () => {
    // Logic to handle closing the modal
    setIsModalOpen(false);
  };

  const handleAddButtonClick = () => {
    // Open the modal when the AddButton is clicked
    setIsModalOpen(true);
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
                handleBlockClick(note._id);
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
          isOpen={isModalOpen}
          onClose={onClose}
        >
          <div className="bg-gray-900 p-4 text-white">
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
                className="w-full rounded border border-gray-700 bg-black p-2"
              />
            </div>
            <div>
              <label htmlFor="content" className="mb-2 block">
                {`${form.content.length}/250`}
              </label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                className="h-32 w-full rounded border border-gray-700 bg-black p-2"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
