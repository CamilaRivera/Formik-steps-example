import React, { useState, useRef } from 'react';
import StepTracker from '@tds/core-step-tracker';
import Button from 'react-bootstrap/Button';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStepDynamic from './FormStepDynamic';
import DisplayProps  from './DisplayProps';

const checkIfFormIsValid = async formRef => {
  await formRef.current.submitForm();
  return Object.keys(formRef.current.errors).length === 0;
};

const dynamicFieldNames = [
  ['field31', 'field32', 'field33'],
  ['field41', 'field42'],
];

const steps = ['Plans & Addons', 'Account Creation', 'Phone Information', 'Payment Setup', 'Submit'];

const StepsForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [allFormValues, setAllFormValues] = useState({});
  const formRef = useRef();

  const next = async () => {
    // Check if form is ready
    const isValid = await checkIfFormIsValid(formRef);
    if (isValid) {
      setAllFormValues(prev => {
        return { ...prev, [currentStep]: formRef.current.values };
      });
      setCurrentStep(currentStep + 1);
    } else {
      // Can't continue
      console.log("Can't continue, errors in the form");
      // Save anyway what ever values there are
    }
  };
  const previous = () => {
    if (currentStep > 0) {
      if (currentStep < steps.length - 1) {
        // Is not last step (last step is not a form, formRef.current is not defined)
        setAllFormValues(prev => {
          return { ...prev, [currentStep]: formRef.current.values };
        });
      }
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div>
      <StepTracker copy="en" current={currentStep} steps={steps} />
      {currentStep === 0 && <FormStep1 formRef={formRef} initialValues={allFormValues['0']} />}
      {currentStep === 1 && <FormStep2 formRef={formRef} initialValues={allFormValues['1']} />}
      {currentStep === 2 && <FormStepDynamic formRef={formRef} fieldNames={dynamicFieldNames[0]} initialValues={allFormValues['2']} />}
      {currentStep === 3 && <FormStepDynamic formRef={formRef} fieldNames={dynamicFieldNames[1]} initialValues={allFormValues['3']} />}
      {currentStep === 4 && <DisplayProps allFormValues={allFormValues} />}
      <Button variant="secondary" onClick={previous} disabled={currentStep === 0}>
        Previous Step
      </Button>
      <Button variant="secondary" onClick={next} disabled={currentStep === steps.length - 1}>
        Next Step
      </Button>
    </div>
  );
};

export default StepsForm;
