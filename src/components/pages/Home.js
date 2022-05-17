import HomeNavbar from "../inc/HomeNavbar";
import GetStarted from "../inc/GetStarted";
import Services from "../inc/Services";
import Vmc from "../inc/Vmc";
import About from "../inc/About";
import Pricing from "../inc/Pricing";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import { useContext } from "react";
import { useEffect } from "react";
import useGaTracker from "../useGaTracker";

function Home({ serverError }) {
  useGaTracker();
  const { clearBusinessPlan } = useContext(GlobalContext);

  // clear business plan answers and name and id on the first render of HomePage

  useEffect(() => {
    clearBusinessPlan();
  }, []);

  return (
    <div>
      <div>
        <HomeNavbar />
      </div>
      <div>
        <GetStarted serverError={serverError} />
      </div>
      <div>
        <Services />
      </div>
      <div>
        <Pricing />
      </div>
      <div>
        <About />
      </div>
      <div>
        <Vmc />
      </div>
    </div>
  );
}

export default Home;
