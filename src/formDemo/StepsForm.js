import React, { useState, useRef } from 'react';
// import StepTracker from '@tds/core-step-tracker';
import Button from 'react-bootstrap/Button';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
// import FormStepDynamic from './FormStepDynamic';
import DisplayProps  from './DisplayProps';
import StepTracker from './StepTracker';

const checkIfFormIsValid = async formRef => {
  await formRef.current.submitForm(); //  to trigger the validations
  return Object.keys(formRef.current.errors).length === 0;
};

// const dynamicFieldNames = [
//   ['field31', 'field32', 'field33'],
//   ['field41', 'field42'],
// ];

// const steps = ['Plans & Addons', 'Account Creation', 'Phone Information', 'Payment Setup', 'Submit'];
const steps = ['Plans & Addons', 'Account Creation', 'Submit'];

const StepsForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [allFormValues, setAllFormValues] = useState({});
  const formRef = useRef();

  const saveCurrentStepFormData = () => {
    if (currentStep < steps.length - 1) {
      // Is not last step (last step is not a form, formRef.current is not defined)
      setAllFormValues(prev => {
        return { ...prev, [currentStep]: { values: formRef.current.values, errors: formRef.current.errors } };
      });
    }
  }

  const next = async () => {
    // Check if form is ready
    const isValid = await checkIfFormIsValid(formRef);
    if (isValid) {
      saveCurrentStepFormData();
      setCurrentStep(currentStep + 1);
    } else {
      // Can't continue
      console.log("Can't continue, errors in the form");
      // Save anyway what ever values there are
    }
  };
  const previous = async () => {
    if (currentStep > 0) {
      if (currentStep < steps.length - 1) {
        // this is not submit step, validate before saving to trigger validations and save errors
        await checkIfFormIsValid(formRef);
      }
      saveCurrentStepFormData();
      setCurrentStep(currentStep - 1);
    }
  };
  const onStepClick = async stepIndex => {
    if (currentStep === stepIndex) {
      // Nothing to do
      return;
    }
    if (stepIndex < currentStep) {
      // only submit form when im not insubmit step
      if (currentStep < steps.length - 1) {
        // this is not submit step, validate before saving to trigger validations and save errors
        await checkIfFormIsValid(formRef);
      }
      saveCurrentStepFormData();
      setCurrentStep(stepIndex);
    }
    else if (stepIndex === steps.length - 1) { 
      // Allow jumping to last form only if all forms between are valid
      for (let index = currentStep + 1; index < steps.length - 1; index++ ) {
        if (!allFormValues[index] || Object.keys(allFormValues[index].errors).length > 0) {
          // There is a form with errors
          return; // abort
        }
      }
      // All forms stored in allFromValues are valid, check current step looking at ref.current because that contains the current state of the form we are looking at
      const isValid = await checkIfFormIsValid(formRef);
      if (isValid) {
        saveCurrentStepFormData();
        setCurrentStep(stepIndex);
      }
    }
  }

  return (
    <div>
      <StepTracker copy="en" currentStep={currentStep} steps={steps} onStepClick={onStepClick} />
      {currentStep === 0 && <FormStep1 formRef={formRef} initialValues={allFormValues[0] ? allFormValues[0].values : undefined} />}
      {currentStep === 1 && <FormStep2 formRef={formRef} initialValues={allFormValues[1] ? allFormValues[1].values : undefined} />}
      {/* {currentStep === 2 && <FormStepDynamic formRef={formRef} fieldNames={dynamicFieldNames[0]} initialValues={allFormValues[2]} />} */}
      {/* {currentStep === 3 && <FormStepDynamic formRef={formRef} fieldNames={dynamicFieldNames[1]} initialValues={allFormValues[3]} />} */}
      {currentStep === 2 && <DisplayProps allFormValues={allFormValues} />}
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
