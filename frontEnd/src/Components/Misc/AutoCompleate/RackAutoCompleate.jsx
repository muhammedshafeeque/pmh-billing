import { AutoComplete, Input } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../../Axios/axios";
function RackAutoCompleate({ changeValue, rack, section }) {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const handleSearch = async (value) => {
    console.log(section)
    setValue(value);
    let res = await axios.get(
      `/stock/rack?query=${value}&section=${section ? section : ""}`
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
    if (rack) {
      setValue(rack.code + "-" + rack.name);
      changeValue(rack);
    }
  }, [rack, changeValue]);

  return (
    <AutoComplete
      span={24}
      style={{
        width: 200,
      }}
      onSearch={handleSearch}
      onSelect={handleSelect}
      placeholder="Rack"
      value={value}
      options={options}
    >
      <Input />
    </AutoComplete>
  );
}

export default RackAutoCompleate;
