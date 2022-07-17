import React from "react";

function NumberInput({ name, value, setValue }) {
  return (
    <div className="flex items-center rounded-md  my-5">
      <label htmlFor={name} className="text-sm mr-3">
        {name}
      </label>
      <span className="bg-gray-50 shadow-sm p-2 rounded-full flex w-fit sm:p-1">
        <button
          disabled={value <= 0}
          onClick={() => !(value <= 0) && setValue((val) => val - 1)}
          className="datepicker__inputbutton datepicker__button"
        >
          -
        </button>
        <input
          min={0}
          max={20}
          value={value}
          id={name}
          onChange={(e) => setValue(e.target.value)}
          type="number"
          placeholder="Add dates"
          className="inputbutton p-1 w-16 text-sm outline-none items-center text-gray-500 bg-gray-50"
        />
        <button
          onClick={() => !(value >= 20) && setValue((val) => val + 1)}
          className="datepicker__inputbutton datepicker__button"
        >
          +
        </button>
      </span>
    </div>
  );
}

export default NumberInput;
