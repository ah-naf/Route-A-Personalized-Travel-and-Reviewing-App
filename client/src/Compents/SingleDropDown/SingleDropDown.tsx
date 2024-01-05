import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface SingleDropDownPropType {
  columnNames: string[];
  initValue?: string;
  disabled?: boolean;
  onValueChange: React.Dispatch<React.SetStateAction<any>>;
}

function SingleDropDown({
  columnNames,
  onValueChange,
  initValue = "",
  disabled = false,
}: SingleDropDownPropType) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initValue || "");
  }, [initValue]);

  return (
    <div>
      <Autocomplete
        disablePortal
        size="small"
        value={value || ""}
        disabled={disabled}
        onChange={(e, newValue) => {
          setValue(newValue as string);
          onValueChange(newValue);
        }}
        options={columnNames || []}
        renderInput={(params) => (
          <TextField
            {...params}
            className="rounded-2xl border-2 border-red-600"
          />
        )}
      />
    </div>
  );
}

export default SingleDropDown;
