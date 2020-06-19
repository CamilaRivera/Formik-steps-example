import React from 'react';
import './helper.css';

const DisplayProps = props => {
  return (
    <div className="display-props-container">
      <pre className="display-formik-state">
        <strong>props</strong> = {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
};

export default DisplayProps;
