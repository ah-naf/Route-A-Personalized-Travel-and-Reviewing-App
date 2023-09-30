import { AutoComplete, Switch } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlaceNamesThunk,
  setActivePlace,
  setSearchByPlace,
} from "../../slices/ReviewSlice";
import { RootState } from "../../store";

function SearchInput() {
  const dispatch = useDispatch();
  const { place_names, active_place, search_by_place } = useSelector(
    (state: RootState) => state.review
  );

  useEffect(() => {
    dispatch(getPlaceNamesThunk() as any);
  }, []);

  return (
    <div className="space-x-4">
      <Switch
        className="bg-orange-400"
        checked={search_by_place}
        onChange={(e) => {
          dispatch(setActivePlace(""));
          dispatch(setSearchByPlace(e));
        }}
        checkedChildren="Search by place"
        unCheckedChildren="Search by tag"
        
      />
      {search_by_place ? (
        <AutoComplete
          style={{ width: 200 }}
          options={place_names}
          placeholder="Select a place"
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          allowClear={true}
          size="large"
          className="!w-96"
          onChange={(e) => dispatch(setActivePlace(e))}
        />
      ) : (
        <input
          type="text"
          value={active_place}
          onChange={(e) => dispatch(setActivePlace(e.target.value))}
          className="w-[385px] border border-gray-300 focus:border-gray-500 rounded shadow p-2 py-1.5"
          placeholder="Search by tag"
        />
      )}
    </div>
  );
}

export default SearchInput;
