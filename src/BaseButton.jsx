import React from "react";

const BaseButton = ({ text, onClick }) => {
  return (
    <button className="px-3 py-2 border rounded-md" onClick={onClick}>
      {text}
    </button>
  );
};

export default BaseButton;
