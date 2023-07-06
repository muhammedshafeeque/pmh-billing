import React, { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import axios from "../../Api/Axios";
import { mainEndPoint } from "../../Constants/ApiConstants/mainRoutes";
import { confiEndPoints } from "../../Constants/ApiConstants/config";
import { commonFilters } from "../../Constants/ApiConstants/apiFilters";
import { ApiDefaltValues } from "../../Constants/ApiConstants/ApiDefaultFilterValues";
function SectionAutoCompleate() {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState();
  const handleSearch = async (e) => {
    try {
      let { data } = await axios.get(
        mainEndPoint.STOCK +
          confiEndPoints.SECTION +
          "?" +
          commonFilters.LIMIT +
          ApiDefaltValues.TYPEAHEAD_LIMIT
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
          console.log(e)
        }}
        onSearch={handleSearch}
        options={options}
        placeholder="Search Sections..."
        selected={selected}
      />
    </div>
  );
}

export default SectionAutoCompleate;
