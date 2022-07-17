import { useState, useEffect, useRef } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styled from "styled-components";
import NumberInput from "./NumberInput";
import { useMediaQuery } from "@react-hook/media-query";

export default function DatePicker({
  close,
  search,
  checkIn,
  checkOut,
  numOfGuests,
}) {
  const [visible, setVisible] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 36rem)");

  const selectionRange = {
    startDate: checkIn.value,
    endDate: checkOut.value,
    key: "selection",
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    return () => setVisible(false);
  }, []);

  function handleSelect(ranges) {
    checkIn.setValue(ranges.selection.startDate);
    checkOut.setValue(ranges.selection.endDate);
  }

  const options = {
    rangeColors: ["#e0565b"],
    ranges: [selectionRange],
    minDate: new Date(),
    onChange: handleSelect,
  };

  return (
    <div className={visible ? "visible flex flex-col h-fit w-full " : null}>
      <h4 className="text-xl text-gray-800 mb-2 ">
        Pick Check-in & Check-out dates
      </h4>
      {isSmallScreen ? (
        <DateRange {...options} />
      ) : (
        <DateRangePicker className="" {...options} />
      )}
      {/* <DateRangePicker className="hidden md:flex" {...options} /> */}

      <div className="guests">
        <h4>Add guests</h4>
        <div className="inputs">
          <NumberInput
            name="Guests"
            value={numOfGuests.value}
            setValue={numOfGuests.setValue}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={close}
          className="flex-grow text-white bg-gray-500 py-2 px-4 rounded-lg opacity-90 hover:opacity-100 shadow-sm hover:shadow-md"
        >
          Cancel
        </button>

        <button
          onClick={search}
          className="flex-grow text-white py-2 px-4 bg-red-400 rounded-lg opacity-90 hover:opacity-100 shadow-sm hover:shadow-md"
        >
          Search
        </button>
      </div>
    </div>
  );
}
