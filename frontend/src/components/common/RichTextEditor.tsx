import { FormLabel, Stack } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

type RichTextEditorProps = {
  label: string;
  value: string;
  onChange: () => void;
  noUpload?: boolean;
};

const RichTextEditor = ({
  label,
  value,
  onChange,
  noUpload,
}: RichTextEditorProps) => {
  const [editorHtml, setEditorHtml] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  const handleChange = (html: string) => {
    setEditorHtml(html);
  };

  const insertLink = () => {
    const selectedText = quillRef.current?.getEditor().getSelection();
    if (selectedText && selectedText.length > 0) {
      const url = window.prompt("Enter the URL of the link:");
      if (url && quillRef.current) {
        quillRef.current.getEditor().format("link", url);
      }
    } else {
      window.alert("Please select some text before adding a link.");
    }
  };

  const insertImage = () => {
    const url = window.prompt("Enter the URL of the image:");
    if (url && quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);
      editor.insertEmbed(range?.index, "image", url);
    }
  };

  const insertVideo = () => {
    const url = window.prompt("Enter the URL of the video:");
    if (url && quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);
      editor.insertEmbed(range?.index, "video", url);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }, { align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          noUpload ? [] : ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          link: insertLink,
          image: insertImage,
          video: insertVideo,
        },
      },
    }),
    []
  );

  return (
    <Stack>
      <FormLabel>{label}</FormLabel>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        value={editorHtml}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default RichTextEditor;
