import { AutoComplete, Input } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../../Axios/axios";
function ItemAutoCompleate({ changeValue, section }) {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const handleSearch = async (value) => {
    setValue(value);
    let res = await axios.get(`/stock/item?query=${value}`);
    const formattedOptions = res.data.map((option) => ({
      value: option.code + " -  " + option.name,
      object: option,
    }));
    setOptions(formattedOptions);
  };
  const handleSelect = (item, option) => {
    console.log(option)
    setValue(item);
    changeValue(option.object._id);
  };
  useEffect(() => {
    if (section) {
      setValue(section.code + "-" + section.name);
      changeValue(section._id);
    }
  }, [section, changeValue]);

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
