import React, { useEffect, useState } from "react";
import axios from "../../Api/Axios";
import { Stor } from "../../Context/BillerContext";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useAlert } from "react-alert";

function SectionMultiSelect({ control, rules, name }) {
  const { setBlockUi } = Stor();
  const [options, setOptions] = useState([]);
  const alert = useAlert();
  useEffect(() => {
    ;
    axios
      .get("stock/section?limit=100")
      .then(({ data }) => {
        ;
        let arr = [];
        data.forEach((item) => {
          arr.push({ value: item._id, label: item.name });
        });
        setOptions(arr);
      })
      .catch((err) => {
        ;
        alert.error(err.response.data.message);
      });
  }, [setBlockUi, alert]);

  return (
    <div>
      <Controller
        name={name?name:'sections'}
        control={control}
        rules={rules}
        defaultValue={null}
        render={({ field }) => <Select {...field} options={options} isMulti />}
      />
    </div>
  );
}

export default SectionMultiSelect;
