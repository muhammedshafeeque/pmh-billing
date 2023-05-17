import { AutoComplete, Input } from "antd";
import React, { useState } from "react";
import axios from "../../../Axios/axios";
function SectionAutoCompleate({ changeValue }) {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const handleSearch = async (value) => {
    setValue(value);
    let res = await axios.get(`/stock/section?query=${value}`);
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

  return (
    <AutoComplete
      span={24}
      style={{
        width: 200,
      }}
      onSearch={handleSearch}
      onSelect={handleSelect}
      placeholder="Section"
      value={value}
      options={options}
    >
      <Input />
    </AutoComplete>
  );
}

export default SectionAutoCompleate;
