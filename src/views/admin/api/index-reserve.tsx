import MarkdownRenderer from "app/utils/markdown";
import { useEffect, useState } from "react";
import ContentLayout from "shared/ContentLayout/ContentLayout";

const Api = () => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch("/html-to-markdown.md");
        const blob = await response.blob();
        const file = new File([blob], "file.md", { type: "text/markdown" });
        console.log(blob);
        setFile(file);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFile();
  }, []);
  return (
    <ContentLayout>
      <MarkdownRenderer file={file} />
    </ContentLayout>
  );
};

export default Api;
