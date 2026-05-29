import { FormStep } from "./FormStep";
import { StepProgress } from "./Progress";
import { simulationFormSteps } from "../../../data/simulation";
import type { SimulationFormData } from "../../../data/simulation";
import { useState } from "react";
import { useSimulationStorage } from "../../../hooks/useSimulationStorage";
import { useNavigate } from "react-router-dom";

export function SimulationForm() {
  const { saveFormData } = useSimulationStorage();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<SimulationFormData>(
    {} as SimulationFormData,
  );
  const totalSteps = simulationFormSteps.length;
  const currentStep = simulationFormSteps[currentStepIndex];

  const handleNextStep = (value: string) => {
    const updateFormData = { ...formData, [currentStep.id]: value };
    setFormData(updateFormData);

    if (currentStepIndex + 1 > totalSteps - 1) {
      const id = saveFormData(updateFormData);

      void navigate(`/resultado/${id}`);
      return;
    }

    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleBackStep = () => {
    if (currentStepIndex === 0) {
      return;
    }

    setCurrentStepIndex((prev) => prev - 1);
  };

  return (
    <>
      <StepProgress
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
      />
      <FormStep
        key={currentStep.id}
        icon={currentStep.icon}
        title={currentStep.title}
        question={currentStep.question}
        inputProps={currentStep.inputProps}
        id={currentStep.id}
        hideBackButton={currentStepIndex === 0}
        onBack={handleBackStep}
        onNext={handleNextStep}
      />
    </>
  );
}
