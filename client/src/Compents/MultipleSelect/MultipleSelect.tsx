import { useEffect, useState } from "react";

interface MultipleSelectPropType {
  defaultValue: string[];
  onValueChange: React.Dispatch<React.SetStateAction<any>>;
  background?: string;
}

const MultipleSelect = ({
  onValueChange,
  defaultValue,
  background = "black",
}: MultipleSelectPropType) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    // console.log(defaultValue)
    setSelectedItems(defaultValue);
  }, [defaultValue]);

  const handleItemDelete = (name: string) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem !== name
    );
    setSelectedItems(updatedItems);
    onValueChange(updatedItems);
  };

  const handleKeyBoard = (e: React.KeyboardEvent) => {
    let temp = JSON.parse(JSON.stringify(selectedItems));
    if (e.key === "Enter") {
      temp = [...selectedItems, inputValue];
      setInputValue("");
      setSelectedItems(temp);
      onValueChange(temp);
    }
    if (e.key === "Backspace" && !inputValue) {
      temp = temp.slice(0, -1);
      setInputValue("");
      setSelectedItems(temp);
      onValueChange(temp);
    }
  };

  return (
    <div className="w-full mx-auto mt-1 ">
      <div
        className={`relative border-2 border-gray-300 px-1 pr-2 py-2 rounded hover:border-primary-btn`}
      >
        <div className="flex gap-2 w-full flex-wrap">
          {selectedItems.length > 0 &&
            selectedItems.map((name) => (
              <button
                key={name}
                onClick={() => handleItemDelete(name)}
                className={`px-2 py-1 flex items-center text-md text-white bg-${background} rounded`}
              >
                {name} <span className="ml-1">×</span>
              </button>
            ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => handleKeyBoard(e)}
            className={`flex-1 min-w-[30px] p-2 py-1`}
            placeholder="Add your tag. (Press Enter to add)"
          />
        </div>
      </div>
      {selectedItems.length > 0 && (
        <button
          className="text-xs float-right mt-1 underline text-red-600"
          onClick={() => {
            setSelectedItems([]);
            onValueChange([]);
          }}
        >
          Delete All
        </button>
      )}
    </div>
  );
};

export default MultipleSelect;
