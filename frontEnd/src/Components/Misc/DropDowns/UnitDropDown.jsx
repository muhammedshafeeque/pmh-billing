import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "../../../Axios/axios";
function UnitDropDown({unit,selectValue}) {
  const Option = Select.Option;
  const [units, setUnits] = useState([]);
  const [Value,setValue]=useState(null)
  function handleChange(value) {
    setValue(value)
    selectValue(value)
  }
  useEffect(() => {
    axios.get("/core/units").then((res) => {
      setUnits(res.data);
    });
    if(unit){
      setValue(unit.unit)
    }

  }, []);
  return (
    <Select span={12} placeholder={'select Unit' }value={Value} onChange={handleChange}>
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
