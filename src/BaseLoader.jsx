import React from "react";
import RingLoader from "react-spinners/RingLoader";

const BaseLoader = () => {
  return (
    <div className="flex fixed flex-col gap-5 w-full justify-center items-center h-screen ">
      <RingLoader color="#5d04aa" size={100} />
      <span className="blink_me text-xl text-white">Analyzing...</span>
    </div>
  );
};

export default BaseLoader;
