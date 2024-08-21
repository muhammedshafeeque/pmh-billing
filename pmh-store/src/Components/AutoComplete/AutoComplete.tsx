import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "../../Api/Api";
import "./AutoComplete.scss";

interface AutoCompleteProps {
  register: any;
  errors: any;
  isRequired?: boolean;
  formSubmitted?: boolean;
  name: string;
  label: string;
  setValue: any;
  disabled?: boolean;
  url: string;
  readField: string;
  clear?: boolean;
  value?: any;
  size?: any;
  editable?: boolean;
  onChange?: (value: string) => void; // Optional onChange function
  onSelect?: (option: any) => void;   // Optional onSelect function
}

interface Option {
  [key: string]: any;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  register,
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
  onChange,
  onSelect,
  value,
  size,
  editable,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
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

    if (inputValue && !selectedOption) {
      fetchOptions();
    }
  }, [inputValue, selectedOption, isRequired, url]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    setSelectedOption(null);
    setIsValid(false);
    setDropdownOpen(true); // Open dropdown when typing

    if (onChange) {
      onChange(value);
    }
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setInputValue(option[readField]);
    register(name, { value: option[readField], shouldValidate: true });
    setValue(name, option);
    setOptions([]);
    setIsValid(true);
    setDropdownOpen(false);

    if (onSelect) {
      onSelect(option);
    }
  };

  useEffect(() => {
    setInputValue("");
    setSelectedOption(null);
    setIsValid(false);
  }, [clear]);

  useEffect(() => {
    if (formSubmitted) {
      setIsValid(Boolean(inputValue));
    }
  }, [formSubmitted, inputValue]);

  const handleBlur = () => {
    if (editable && !selectedOption) {
      setValue(name, inputValue);
    }
    setTouched(true);
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (value && value._id) {
      if (inputValue !== value[readField]) {
        setInputValue(value[readField]);
        setValue(name, value);
      }
    }
  }, [value]);

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
          size={size ? size : ""}
          isInvalid={
            isRequired &&
            !isValid &&
            touched &&
            !selectedOption &&
            !inputValue.trim()
          }
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
        <Form.Control.Feedback type="invalid">
          {errors?.[name] && errors[name].message}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default AutoComplete;
