import React, { useState } from "react";
import axios from "../../Api/Axios";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Controller } from "react-hook-form";

function UnitTypeAhead({ control, rules, name }) {
  const [options, setOptions] = useState([]);

  const handleSearch = async (e) => {
    try {
      axios.get(`core/units?query=${e}`).then(({ data }) => {
        setOptions(data);
      });
    } catch (error) {
      setOptions([]);
    }
  };

  return (
    <div>
      <Controller
        name={`${name ? name : "unit"}`}
        control={control}
        rules={rules}
        defaultValue={null}
        render={({ field }) => (
          <AsyncTypeahead
            {...field}
            id="basic-example"
            labelKey={(option) => `${option.Symbol}-${option.Name}`}
            onSearch={handleSearch}
            options={options}
            placeholder="Select Uint"
            onChange={(selected) => {
              field.onChange(selected[0]);
            }}
          />
        )}
      />
    </div>
  );
}

export default UnitTypeAhead;
