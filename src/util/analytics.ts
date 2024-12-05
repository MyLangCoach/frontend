import ReactGA from "react-ga4";

// Initialize Google Analytics with your Measurement ID
export const initializeAnalytics = () => {
  ReactGA.initialize("G-PMCKZ8XFL7"); // Replace with your Measurement ID
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

