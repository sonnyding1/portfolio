import React, { useEffect } from "react";

const PlausibleAnalytics = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-domain", "sonnyding.com");
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <React.Fragment />;
};

export default PlausibleAnalytics;
