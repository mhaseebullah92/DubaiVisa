import React from 'react';
import './switch.css';

const Switch = ({changecruncy}) => {
  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onClick={()=>changecruncy()}
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;