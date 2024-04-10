import React from "react";

const BaseDropdown = ({ title, subtitle, onChange }) => {
  return (
    <div className="flex flex-col w-[280px] md:w-[500px] lg:w-[700px]">
      <label htmlFor="risk">{title}</label>
      {subtitle && <label className="text-xs">{subtitle}</label>}
      <select
        className="py-2 px-3"
        id="risk"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="1">None</option>
        <option value="2">Low</option>
        <option value="3">Average</option>
        <option value="4">Considerable</option>
        <option value="5">High</option>
      </select>
    </div>
  );
};

export default BaseDropdown;
