import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function SingleDropDown({
  columnNames,
  onValueChange=undefined,
  initValue='',
  disabled = false,
}) {
  const [value, setValue] = useState(initValue || "");

  useEffect(() => {
    setValue(initValue || "");
  }, [initValue]);

  return (
    <div >
      <Autocomplete
        disablePortal
        size="small"
        value={value}
        disabled={disabled}
        onChange={(e, newValue) => {
          setValue(newValue);
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
