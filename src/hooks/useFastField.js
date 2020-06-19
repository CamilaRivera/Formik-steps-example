import { useState, useCallback } from 'react';
import { useField, useFormikContext } from 'formik';
import { debounce } from 'lodash';

// Props would be the same props that we normally pass to "useField". Normally only the "name" is required (props = {name: ...}).
export default function useFastField(name) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [value, setValue] = useState(field.value);

  const debouncedSetFieldValue = useCallback(debounce(setFieldValue, 500), []);

  const fastField = {
    ...field,
    value,
    onChange(e) {
      if (e && e.currentTarget) {
        const newValue = e.currentTarget.value;
        setValue(newValue); // update immediatelly local state
        debouncedSetFieldValue(field.name, newValue); // debounce update of value in formik state
      }
    },
  };

  return [fastField, meta];
}
