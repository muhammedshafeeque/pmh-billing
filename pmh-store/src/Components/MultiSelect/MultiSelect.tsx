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
    if (clear) {
      setInputValue("");
      setSelectedOptions([]);
    }
  }, [clear]);

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
          placeholder={`Enter ${label}`}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setDropdownOpen(true)}
          disabled={disabled}
          isInvalid={isRequired && touched && !selectedOptions.length}
        />
        {loading && <Form.Text className="text-muted">Loading...</Form.Text>}
        {error && <Form.Text className="text-danger">{error}</Form.Text>}
        {dropdownOpen && (
          <ul className="auto-complete-dropdown list-group">
            {options.map((option, index) => (
              <li
                key={index}
                className="list-group-item"
                onMouseDown={() => handleOptionSelect(option)}
              >
                {option[readField]}
              </li>
            ))}
          </ul>
        )}
          <div className="selected-options" style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
          {selectedOptions.map((option, index) => (
            <span key={index} className="selected-option" style={{display:"flex", width: "max-content", marginLeft:"10px" }}>
              {option[readField]}
              <p  onClick={() => handleRemoveOption(option)}>×</p>
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
