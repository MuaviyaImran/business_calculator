import React from "react";

const BaseTextField = ({ title, initialValue, onChange, subtitle }) => {
  return (
    <div className="flex flex-col w-[280px] md:w-[500px] lg:w-[700px]">
      <label className="">{title}</label>
      {subtitle && <label className="text-xs">{subtitle}</label>}
      <input
        className="border-2 rounded-lg px-3 py-1"
        value={initialValue}
        type="number"
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 0.5"
      />
    </div>
  );
};

export default BaseTextField;
