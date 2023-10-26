import React, { useState } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Controller } from 'react-hook-form';
import axios from '../../Api/Axios';

function ItemTypeAhead({ control, rules, name }) {
    const [options, setOptions] = useState([]);

    const handleSearch = async (e) => {
      try {
        axios.get(`/stock/item?query=${e}`).then(({ data }) => {
          setOptions(data);
        });
      } catch (error) {
        setOptions([]);
      }
    };
  
    return (
      <div>
        <Controller
          name={`${name ? name : "item"}`}
          control={control}
          rules={rules}
          defaultValue={null}
          render={({ field }) => (
            <AsyncTypeahead
              {...field}
              id="basic-example"
              labelKey={(option) => `${option.code}::${option.name}`}
              onSearch={handleSearch}
              options={options}
              placeholder="Select item"
              onChange={(selected) => {
                field.onChange(selected[0]);
              }}
            />
          )}
        />
      </div>
    );
}

export default ItemTypeAhead