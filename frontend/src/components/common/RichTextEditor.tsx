import { FormLabel, Stack } from "@mui/material";
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
  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      noUpload ? [] : ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <Stack>
      <FormLabel>{label}</FormLabel>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={quillModules}
      />
    </Stack>
  );
};

export default RichTextEditor;
