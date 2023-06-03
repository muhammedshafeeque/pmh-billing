import { AutoComplete, Input } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../../Axios/axios";
function ItemAutoCompleate({ changeValue, item, section, rack }) {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const handleSearch = async (value) => {
    setValue(value);
    let res = await axios.get(
      `/stock/item?query=${value}&section=${section ? section : ""}&rack=${
        rack ? rack: ""
      }`
    );
    const formattedOptions = res.data.map((option) => ({
      value: option.code + " -  " + option.name,
      object: option,
    }));
    setOptions(formattedOptions);
  };
  const handleSelect = (item, option) => {
    setValue(item);
    changeValue(option.object);
  };
  useEffect(() => {
    if (item) {
      setValue(item.code + "-" + item.name);
      changeValue(item);
    }
  }, [item, changeValue]);

  return (
    <AutoComplete
      span={24}
      style={{
        width: 200,
      }}
      onSearch={handleSearch}
      onSelect={handleSelect}
      placeholder="Item"
      value={value}
      options={options}
    >
      <Input />
    </AutoComplete>
  );
}

export default ItemAutoCompleate;
