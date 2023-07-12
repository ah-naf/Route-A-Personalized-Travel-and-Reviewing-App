import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ReactQuillEditor({ placeholder = "", onValueChange, defaultValue }) {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  useEffect(() => {
    if(defaultValue) setValue(defaultValue)
  }, [])

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
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        ref={quillRef}
        placeholder={placeholder}
        // style={{ height }}
      />
    </div>
  );
}

export default ReactQuillEditor;

// Keyboard Command

// useEffect(() => {
//   if (quillRef.current) {
//     const quill = quillRef.current.getEditor();
//     const tempQuill = quill.getModule("toolbar");
//     quill.keyboard.addBinding(
//       {
//         key: "M",
//         shortKey: true,
//       },
//       () => {
//         const imageButton = tempQuill.container.querySelector(".ql-image");
//         imageButton.click();
//       }
//     );
//   }
// }, []);
