import React, { useRef, useEffect } from "react";

const HandleUserExit = () => {
  //Function that prompts User Exit and return dialogue box
  const prompt = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  //Creating a reference to the unload for react to keep track
  const promptRef = useRef(prompt); // init with fn, so that type checkers won't assume that current might be undefined

  useEffect(() => {
    promptRef.current = prompt;
  }, [prompt]);

  useEffect(() => {
    //Callback function to the event listener with the promptRef
    const onUnload = (...args) => promptRef.current?.(...args);

    window.addEventListener("beforeunload", onUnload);

    //Clean up is essential in beforeunload to avoid the dialogue persistance in other pages
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);

  return <></>;
};

export default HandleUserExit;
