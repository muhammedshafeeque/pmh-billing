import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "../../../Axios/axios";
function UnitDropDown({selectValue}) {
  const Option = Select.Option;
  const [units, setUnits] = useState([]);
  function handleChange(value) {
    selectValue(value)
  }
  useEffect(() => {
    axios.get("/core/units").then((res) => {
      setUnits(res.data);
    });
  }, []);
  return (
    <Select span={12} placeholder={'select Unit'} onChange={handleChange}>
      {units.length &&
        units.map((unit) => {
          return (
            <Option key={unit.code} value={unit.code}>
              {unit.name}
            </Option>
          );
        })}
    </Select>
  );
}

export default UnitDropDown;
