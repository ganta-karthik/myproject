import React from 'react';

const RangeSlider = ({ value, onChange }) => {
  const handleRangeChange = (event) => {
    onChange(Number(event.target.value));
  };

  return (
    <div>
      <label htmlFor="rangeSlider"><h3>Distance: {value} km</h3></label>
      <input
        type="range"
        id="rangeSlider"
        min="0"
        max="5"
        value={value}
        onChange={handleRangeChange}
      />
    </div>
  );
};

export default RangeSlider;
