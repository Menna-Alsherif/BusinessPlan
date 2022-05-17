import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import LoadingOverlay from 'react-loading-overlay-ts';
const Loader = (props) => {
  return (
    <LoadingOverlay
      active={props.loading}
      styles={{
        overlay: (base) => ({
          ...base,
          position: "fixed",
        }),

        content: (base) => ({
          ...base,
        }),
      }}
      spinner={<PropagateLoader color={"#ee2830"} size={35} />}
    >
      {props.children}
    </LoadingOverlay>
  );
};

export default Loader;
