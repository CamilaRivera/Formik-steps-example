import React from 'react';

const getStepClass = (currentStep, stepIndex) => {
  if (currentStep < stepIndex ) {
    return 'step flex-1';
  }
  return 'step active flex-1';
}

const StepTracker = ({steps, currentStep, onStepClick}) => {


  return <div className="flex-row-vertically-centered-center">
    {steps.map((step, index) => (
      <button key={step} className={getStepClass(currentStep, index)} onClick={() => onStepClick(index)}>
        <span>{index + 1}</span> {step}
      </button>
    ))}
  </div>
}


export default StepTracker;