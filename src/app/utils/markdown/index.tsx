import React, { useState, useEffect } from "react";
import { Remark } from "react-remark";

interface MarkdownRendererProps {
  markdown?: string;
  file?: File;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdown,
  file,
}) => {
  const [content, setContent] = useState<string | undefined>(markdown);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  }, [file]);

  return <Remark>{content}</Remark>;
};

export default MarkdownRenderer;
