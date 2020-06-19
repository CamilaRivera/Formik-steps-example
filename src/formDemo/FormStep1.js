import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import ErrorMessageTds from '../feedbackIndicators/ErrorMessageTDS';
import * as Yup from 'yup';

const FormStep1 = ({ formRef, initialValues }) => {
  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues || { firstName: '', lastName: '', email: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(10, 'Must be 10 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(10, 'Must be 10 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      })}
      onSubmit={async values => {
        console.log('hello, step 1', values);
      }}
    >
      <Form>
        <div className="form-container">
          <div className="flex-1 margin-right-20 padding-top-10">
            <div className="margin-top-20">
              <label htmlFor="firstName">
                First Name <span className="red">*</span>
              </label>
              <Field name="firstName" className="field-container" type="text" />
            </div>
            <div className="margin-top-10">
              <ErrorMessage render={msg => <ErrorMessageTds errorMessage={msg} />} name="firstName" />
            </div>
            <div className="margin-top-20">
              <label htmlFor="lastName">
                Last Name <span className="red">*</span>
              </label>
              <Field name="lastName" className="field-container" type="text" />
            </div>
            <div className="margin-top-10">
              <ErrorMessage render={msg => <ErrorMessageTds errorMessage={msg} />} name="lastName" />
            </div>
            <div className="margin-top-20">
              <label htmlFor="email">
                Email Address <span className="red">*</span>
              </label>
              <Field name="email" className="field-container" type="email" />
            </div>
            <div className="margin-top-10">
              <ErrorMessage render={msg => <ErrorMessageTds errorMessage={msg} />} name="email" />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default FormStep1;
