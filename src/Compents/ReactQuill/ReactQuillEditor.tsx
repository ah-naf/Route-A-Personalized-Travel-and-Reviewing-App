import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ReactQuillEditor({ height = "500px" }) {
  const [value, setValue] = useState(
    '<h1><span class="ql-size-large">Name</span></h1><p>ahnaf Hasan Shifat</p><ol><li>lol</li></ol>'
  );
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const tempQuill = quill.getModule("toolbar");
      quill.keyboard.addBinding(
        {
          key: "M",
          shortKey: true,
        },
        () => {
          const imageButton = tempQuill.container.querySelector(".ql-image");
          imageButton.click();
        }
      );
    }
  }, []);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image"],
      [{ font: [] }],
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
        // style={{ height }}
      />
    </div>
  );
}

export default ReactQuillEditor;
