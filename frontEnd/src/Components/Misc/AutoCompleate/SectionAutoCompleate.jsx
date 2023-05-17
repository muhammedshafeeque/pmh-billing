import { AutoComplete, Input } from "antd";
import React, { useState } from "react";
import axios from "../../../Axios/axios";
function SectionAutoCompleate() {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const handleSearch = async (value) => {
    setValue(value);
    let res = await axios.get(`/stock/section?query=${value}`);
    setOptions(res.data);
  };
  const handleSelect=(item)=>{
    console.log(item)

  }
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
      dataSource={options.map((option) => ({
        value: option.code + " - " + option.name,
        label:option
      }))}
    >
      <Input />
    </AutoComplete>
  );
}

export default SectionAutoCompleate;
