import React from 'react';
import useFastField from '../hooks/useFastField';

const TextInput = ({ name }) => {
  // const [field] = useField(name);
  const [field] = useFastField(name);

  return (
    <div>
      <input {...field} className="field-container" type="text" />
    </div>
  );
};

export default TextInput;
