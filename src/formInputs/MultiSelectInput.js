import React from 'react';
import { useField, useFormikContext } from 'formik';
import Select from 'react-select';
import './MultiSelectInput.css';

export const getOptionLabel = option => {
  return option.id;
};
const getOptionValue = option => {
  return option.id;
};

const MultiSelectInput = ({ options, name }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const onChange = option => {
    // option is null when no option is selected
    setFieldValue(field.name, option || undefined); // null value triggers Yup.array, undefined doesn't
  };

  const getValue = () => {
    return field.value;
  };

  return (
    <Select
      classNamePrefix="multiselect"
      value={getValue()}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      isClearable
      onChange={option => onChange(option)}
      onBlur={field.onBlur(field.name)}
      closeMenuOnSelect={false}
      isMulti
      options={options}
      className="tds-react-select"
    />
  );
};

export default MultiSelectInput;
