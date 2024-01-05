import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import axios from "axios";
import type { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import React, { useEffect, useState } from "react";

interface SingleImageUploadPropType {
  onValueChange: React.Dispatch<React.SetStateAction<any>>;
  initValue?: string;
}

const SingleImageUpload = ({
  onValueChange,
  initValue = "",
}: SingleImageUploadPropType) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (initValue) {
      setImage(initValue);
    }
  }, [initValue]);

  const handleUpload = async (e: RcCustomRequestOptions) => {
    const fmData = new FormData();
    fmData.append("image", e.file);
    try {
      const res = await axios.post("http://localhost:5000/upload", fmData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res.data.fileName);
      setImage(res.data);
      onValueChange(res.data);
      if (e.onSuccess) e.onSuccess(res.data);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error((err as Error).message);
      if (e.onError) e.onError(error);
    }
  };
  return (
    <div className="mt-2">
      <Upload
        name="image"
        multiple={false}
        customRequest={handleUpload}
        onRemove={() => setImage("")}
      >
        <Button icon={<UploadOutlined />}>
          Click to Upload a cover picture
        </Button>
      </Upload>
      {image && (
        <img
          src={image}
          className="w-full max-h-[400px] object-contain object-center"
        />
      )}
    </div>
  );
};

export default SingleImageUpload;
