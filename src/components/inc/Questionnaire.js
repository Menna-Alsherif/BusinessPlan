import Review from "./Review";
import ScrollToTop from "../scrollToTop.js";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import { useContext } from "react";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";


const Questionnaire = () => {
  const { step, nextStep, prevStep } = useContext(GlobalContext);

  switch (step) {
    case 1:
      return (
        <div>
          <Section1 nextStep={nextStep} />
        </div>
      );
    case 2:
      return (
        <div>
          <Section2 nextStep={nextStep} prevStep={prevStep} />
        </div>
      );
    case 3:
      return (
        <div>
          <Section3 nextStep={nextStep} prevStep={prevStep} />
        </div>
      );
    case 4:
      return (
        <div>
          <ScrollToTop />
          <Review prevStep={prevStep} />
        </div>
      );
    default:
      return <h3>Default</h3>;
  }
};

export default Questionnaire;
