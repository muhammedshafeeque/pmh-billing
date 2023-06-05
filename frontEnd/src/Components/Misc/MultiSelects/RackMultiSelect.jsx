import React, { useEffect, useState } from "react";
import axios from "../../../Axios/axios";
import { Select } from "antd";
function RackMultiSelect({ section, selectValue }) {
  const { Option } = Select;
  const [racks, setRacks] = useState([]);
  const [value, setValue] = useState([]);
  function handleChange(value) {
    setValue(value)
    let data = [];
    value.forEach((item) => {
      let rack = racks.find((obj) => {
        return obj.code === item;
      });
      data.push(rack);
    });
    selectValue(data);
  }
  useEffect(() => {
    axios.get(`/stock/rack?section=${section ? section._id : ""}`).then((res) => {
      setValue([]);
      setRacks(res.data);
    });
  }, [section]);
  return (
    <Select
      span={24}
      mode="multiple"
      placeholder="select  Racks"
      value={value}
      allowClear
      onChange={handleChange}
      optionLabelProp="label"

    >
      {racks.length &&
        racks.map((rack) => {
          return (
            <Option key={rack._id} value={rack.code}>
              {rack.code}
            </Option>
          );
        })}
    </Select>
  );
}

export default RackMultiSelect;
