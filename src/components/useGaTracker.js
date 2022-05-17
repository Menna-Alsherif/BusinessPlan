import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const useGaTracker = () => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!window.location.href.includes("localhost")) {
        ReactGA.initialize("G-6CCEPS6F3L");
        setInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (initialized) {
        ReactGA.send(location.pathname + location.search);
        }
    }, [initialized, location]);
};

export default useGaTracker;