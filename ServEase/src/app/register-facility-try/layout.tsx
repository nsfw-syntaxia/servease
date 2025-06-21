"use client";
import FacilitySignup from "./registerfacilitycollapsedform";
import StepTransitionWrapper from "./transitionwrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <FacilitySignup />

      <StepTransitionWrapper>{children}</StepTransitionWrapper>
    </div>
  );
}
