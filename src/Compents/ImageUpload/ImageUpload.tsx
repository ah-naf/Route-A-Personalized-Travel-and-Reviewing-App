import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import type { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { useEffect, useState } from "react";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface ImageUploadPropType {
  defaultValue: UploadFile[];
  setImages: React.Dispatch<React.SetStateAction<any>>;
}

const ImageUpload = ({ setImages, defaultValue }: ImageUploadPropType) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(defaultValue);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [render, setRender] = useState(true);

  // console.log(defaultValue)
  useEffect(() => {
    setImages(fileList && fileList.filter((val) => val.status === "done"));
  }, [fileList]);

  useEffect(() => {
    if (defaultValue && render && defaultValue.length) {
      // console.log(defaultValue);
      setFileList(defaultValue);
      setRender(false);
    }
  }, [defaultValue, render]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.response && !file.preview) {
      // console.log(file)
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    // console.log(file.response);
    setPreviewImage(file.response || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleFileUpload = async (e: RcCustomRequestOptions) => {
    const fmData = new FormData();
    fmData.append("image", e.file);
    try {
      const res = await axios.post("http://localhost:5000/upload", fmData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (!event.total || !e.onProgress) return;
          const percent = Math.floor((event.loaded / event.total) * 100);
          setProgress(percent);
          if (percent === 100) {
            setTimeout(() => setProgress(0), 1000);
          }
          e.onProgress({ percent: (event.loaded / event.total) * 100 });
        },
      });
      // console.log(res.data.fileName);
      setImage(`http://localhost:5000/upload/${res.data.filename}`);
      if (e.onSuccess) e.onSuccess(res.data);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error((err as Error).message);
      if (e.onError) e.onError(error);
    }
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={handleFileUpload}
        className="w-full"
      >
        {fileList && fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        className="!z-[10000000]"
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUpload;
