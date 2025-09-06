import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "../../Api/Api";
import "../AutoComplete/AutoComplete.scss";

interface AutoCompleteProps {
  register: any;
  errors: any;
  isRequired?: boolean;
  formSubmitted?: boolean;
  name: string;
  label: string;
  setValue: (name: string, value: any) => void;
  disabled?: boolean;
  url: string;
  readField: string;
  clear: boolean;
  value?: Option[];
}

interface Option {
  [key: string]: any;
}

const MultiSelectAutoComplete: React.FC<AutoCompleteProps> = ({
  errors,
  isRequired,
  formSubmitted,
  name,
  label,
  setValue,
  disabled,
  url,
  readField,
  clear,
  value,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}=${inputValue}`);
        const data = response.data.results ? response.data.results : response.data;

        if (Array.isArray(data)) {
          setOptions(data);
          setError(null);
        } else {
          setError("Invalid data format: options must be an array.");
        }

        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    if (inputValue) {
      fetchOptions();
    }
  }, [inputValue, url]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    setDropdownOpen(true); 
  };

  const handleOptionSelect = (option: Option) => {
    if (!selectedOptions.some(selected => selected[readField] === option[readField])) {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      setValue(name, newSelectedOptions);
      setInputValue("");
      setOptions([]);
      setDropdownOpen(false); 
    }
  };

  const handleRemoveOption = (optionToRemove: Option) => {
    const newSelectedOptions = selectedOptions.filter(option => option[readField] !== optionToRemove[readField]);
    setSelectedOptions(newSelectedOptions);
    setValue(name, newSelectedOptions);
  };

  useEffect(() => {
    if (value && Array.isArray(value) && value.length > 0) {
      setSelectedOptions(value);
      setValue(name, value);
    }
  }, [value, name, setValue]);

  useEffect(() => {
    if (clear && (!value || value.length === 0)) {
      setInputValue("");
      setSelectedOptions([]);
      setValue(name, []);
    }
  }, [clear, value, name, setValue]);

  useEffect(() => {
    if (formSubmitted) {
      setTouched(true);
    }
  }, [formSubmitted]);

  const handleBlur = () => {
    setTouched(true);
    setDropdownOpen(false); 
  };

  return (
    <div className="auto-complete-wrapper" onBlur={handleBlur}>
      <Form.Group controlId={`autoComplete-${name}`}>
        <Form.Label>{label}</Form.Label>
      
        <Form.Control
          type="text"
          placeholder={`Search and select ${label.toLowerCase()} (multiple selection allowed)`}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setDropdownOpen(true)}
          disabled={disabled}
          isInvalid={isRequired && touched && !selectedOptions.length}
        />
        {loading && <Form.Text className="text-muted">Loading...</Form.Text>}
        {error && <Form.Text className="text-danger">{error}</Form.Text>}
        {!loading && !error && selectedOptions.length === 0 && (
          <Form.Text className="text-muted">Type to search and select multiple {label.toLowerCase()}</Form.Text>
        )}
        {dropdownOpen && options.length > 0 && (
          <div className="auto-complete-dropdown border rounded mt-1" style={{maxHeight:"200px", overflowY:"auto", position:"absolute", zIndex:1000, backgroundColor:"white", width:"100%"}}>
            {options.map((option, index) => (
              <div
                key={index}
                className="p-2 border-bottom"
                style={{cursor:"pointer", transition:"background-color 0.2s"}}
                onMouseDown={() => handleOptionSelect(option)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
              >
                {option[readField]}
              </div>
            ))}
          </div>
        )}
        <div className="selected-options mt-2" style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
          {selectedOptions.map((option, index) => (
            <span 
              key={index} 
              className="badge bg-primary d-flex align-items-center" 
              style={{fontSize:"0.875rem", padding:"0.375rem 0.75rem"}}
            >
              {option[readField]}
              <button
                type="button"
                className="btn-close btn-close-white ms-2"
                style={{fontSize:"0.7rem", padding:"0", margin:"0"}}
                onClick={() => handleRemoveOption(option)}
                aria-label="Remove"
              ></button>
            </span>
          ))}
        </div>
        <Form.Control.Feedback type="invalid">
          {errors?.[name] && errors[name].message}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default MultiSelectAutoComplete;
