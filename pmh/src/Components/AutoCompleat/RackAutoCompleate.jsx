import React, { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import axios from "../../Api/Axios";
import { mainEndPoint } from "../../Constants/ApiConstants/mainRoutes";
import { configEndPoints } from "../../Constants/ApiConstants/config";
import { commonFilters } from "../../Constants/ApiConstants/apiFilters";
import { ApiDefaultValues } from "../../Constants/ApiConstants/ApiDefaultFilterValues";

function RackAutoCompleat() {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState();
    const handleSearch = async (e) => {
     
      try {
        let { data } = await axios.get(
          mainEndPoint.STOCK +
            configEndPoints.R +
            "?" +
            commonFilters.LIMIT +
            ApiDefaultValues.TYPEAHEAD_LIMIT
        );
        setOptions(data)
      } catch (error) {}
    };
    return (
      <div>
        <AsyncTypeahead
          id="basic-example"
          labelKey={option => `${option.name}`}
          onChange={(e) => {
            setSelected(e);
            setSection(e)
          }}
          onSearch={handleSearch}
          options={options}
          placeholder="Search Sections..."
          selected={selected}
        />
      </div>
    );
}

export default RackAutoCompleat