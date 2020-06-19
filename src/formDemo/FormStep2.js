import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MultiSelectInput from '../formInputs/MultiSelectInput';
import ErrorMessageTds from '../feedbackIndicators/ErrorMessageTDS';
import DateInput from '../formInputs/DateInput';
import TextInput from '../formInputs/TextInput';

// Helper styles for demo
import "./helper.css";

const FormStep2 = ({formRef, initialValues}) => {
  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues || { multiselect: [], dateInput: undefined, formikTextInput: '', fastTextInput: '' }}
      validationSchema={Yup.object({
        multiselect: Yup.array().required('Required'),
        dateInput: Yup.date().required('Required'),
        formikTextInput: Yup.string().required('Required'),
        fastTextInput: Yup.string().required('Required'),
      })}
      onSubmit={async values => {
        console.log('hello, step 2', values);
      }}
    >
      <Form>
        <div className="form-container">
          <div className="flex-1 margin-right-20 padding-top-10">
            <div className="margin-top-20">
              <label htmlFor="multiselect">
                MultiSelect <span className="red">*</span>
              </label>
              <MultiSelectInput
                id="multiselect"
                label="multiselect"
                name="multiselect"
                htmlFor="multiselect"
                options={[{ id: 'option 1' }, { id: 'option 2' }, { id: 'option 3' }]}
              />
            </div>
            <div className="margin-top-10">
              <ErrorMessage component="div" render={msg => <ErrorMessageTds errorMessage={msg} />} name="multiselect" />
            </div>
            <div className="margin-top-20">
              <label htmlFor="dateInput">
                Date <span className="red">*</span>
              </label>
              <DateInput id="date" label="date" name="dateInput" htmlFor="dateInput" copy="en" />
            </div>
            <div className="margin-top-10">
              <ErrorMessage component="div" render={msg => <ErrorMessageTds errorMessage={msg} />} name="dateInput" />
            </div>
            <div className="margin-top-20">
              <label htmlFor="firstName">
                Formik Text Input <span className="red">*</span>
              </label>
              <Field name="formikTextInput" type="text" className="field-container" />
            </div>
            <div className="margin-top-10">
              <ErrorMessage component="div" render={msg => <ErrorMessageTds errorMessage={msg} />} name="formikTextInput" />
            </div>
            <div className="margin-top-20">
              <label htmlFor="textInput">
                Custom Fast Field Text Input <span className="red">*</span>
              </label>
              <TextInput className="field-container" name="fastTextInput" />
            </div>
            <div className="margin-top-10">
              <ErrorMessage component="div" render={msg => <ErrorMessageTds errorMessage={msg} />} name="fastTextInput" />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default FormStep2;
