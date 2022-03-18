import React from "react";
import { Step, StepButton, Stepper } from "@mui/material";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function SchedulerStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };
  return (
    <Stepper nonLinear activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepButton color="inherit" onClick={handleStep(index)}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
}
