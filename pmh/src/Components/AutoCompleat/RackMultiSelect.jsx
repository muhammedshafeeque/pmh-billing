import React, { useEffect, useState } from "react";
import axios from "../../Api/Axios";
import { Stor } from "../../Context/BillerContext";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useAlert } from "react-alert";
function RackMultiSelect({ control, rules, name, sections, racks }) {
  const { setBlockUi } = Stor();
  const [options, setOptions] = useState([]);
  const alert = useAlert();
  useEffect(() => {
    if (!racks) {
      let sectionKeys = [];
      if (sections) {
        sections.forEach((item) => {
          sectionKeys.push(item.value);
        });
      }

      axios
        .get(`stock/rack?section=${sectionKeys}&limit=100`)
        .then(({ data }) => {
          let arr = [];
          data.forEach((item) => {
            arr.push({ value: item._id, label: item.code });
          });
          setOptions(arr);
        })
        .catch((err) => {
          alert.error(err.response.data.message);
        });
    } else {
      let arr = [];
      racks.forEach((item) => {
        arr.push({ value: item._id, label: item.code });
      });
      setOptions(arr);
    }
  }, [setBlockUi, alert, sections, racks]);

  return (
    <div>
      <Controller
        name={name ? name : "rack"}
        control={control}
        rules={rules}
        defaultValue={null}
        render={({ field }) => <Select {...field} options={options} isMulti />}
      />
    </div>
  );
}

export default RackMultiSelect;
