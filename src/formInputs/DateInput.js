import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from '@tds/community-date-picker';
import moment from 'moment';

const DATE_INPUT_FORMAT = 'YYYY-MM-DD';

const getStringDateAsMoment = dateString => {
  return dateString ? moment(dateString, DATE_INPUT_FORMAT) : dateString;
};

const DateInput = ({ id, name }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  // field = {
  //   name: "dateInput"
  //   onBlur: ƒ ()
  //   onChange: ƒ ()
  //   value: undefined
  // }

  const handleChangeDate = date => {
    // date is a moment, but we want to store it as a string in our formik state
    const dateAsString = date ? date.format(DATE_INPUT_FORMAT) : undefined;
    setFieldValue(field.name, dateAsString);
  };

  // field.onBlur will return a function that is prepared to handle the blur event for this specific field.
  const onBlurHandler = field.onBlur(field.name);

  // DatePicker needs date as a moment
  const valueAsMoment = getStringDateAsMoment(field.value);
  return (
    <DatePicker
      onBlur={event => onBlurHandler(event)}
      id={id}
      label=""
      date={valueAsMoment}
      onDateChange={date => handleChangeDate(date)}
      copy="en"
    />
  );
};

export default DateInput;
