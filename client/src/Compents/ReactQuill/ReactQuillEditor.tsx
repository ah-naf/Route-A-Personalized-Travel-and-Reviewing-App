import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

interface ReactQuillEditorPropType {
  theme?: string;
  onValueChange: React.Dispatch<React.SetStateAction<any>>;
  placeholder?: string;
  defaultValue: string;
  height?: string;
}

function ReactQuillEditor({
  placeholder = "",
  onValueChange,
  defaultValue,
  theme = "snow",
  height = "100px",
}: ReactQuillEditorPropType) {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image"],
    ],
  };

  return (
    <div className="min-w-full mb-16">
      <ReactQuill
        theme={theme}
        value={value}
        onChange={setValue}
        modules={modules}
        ref={quillRef}
        placeholder={placeholder}
        className={`min-h-[${height}] h-full`}
      />
    </div>
  );
}

export default ReactQuillEditor;
