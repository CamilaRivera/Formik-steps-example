import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import ErrorMessageTds from '../feedbackIndicators/ErrorMessageTDS';

const toObject = (fieldNames, value) => {
  const obj = {};
  fieldNames.forEach(name => {
    obj[name] = value;
  });
  return obj;
};

const FormStepDynamic = ({ formRef, fieldNames, initialValues }) => {
  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues || toObject(fieldNames, '')}
      onSubmit={async values => {
        console.log('hello, step dynamic', values);
      }}
    >
      <Form>
        <div className="form-container">
          <div className="flex-1 margin-right-20 padding-top-10">
            {fieldNames.map(name => (
              <div key={name}>
                <div className="margin-top-20">
                  <label htmlFor={name}>{name}</label>
                  <Field name={name} className="field-container" type="text" />
                </div>
                <div className="margin-top-10">
                  <ErrorMessage render={msg => <ErrorMessageTds errorMessage={msg} />} name={name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default FormStepDynamic;
