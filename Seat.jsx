import React, { useState } from 'react';
import { MdOutlineChair } from 'react-icons/md';
import { GiSteeringWheel } from 'react-icons/gi';

const Seat = ({ seatNumber, isSelected, onClick }) => {
  return (
    <MdOutlineChair
      className={`text-3xl -rotate-90 cursor-pointer ${
        isSelected ? 'text-violet-600' : 'text-neutral-600'
      }`}
      onClick={onClick}
    />
  );
};

const BusSeatLayout = () => {
  const totalSeats = 41;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length < 10) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        alert('You can only select a maximum of 10 seats.');
      }
    }
  };

  const renderSeats = () => {
    let seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <Seat
          key={i}
          seatNumber={i}
          isSelected={selectedSeats.includes(i)}
          onClick={() => handleSeatClick(i)}
        />
      );
    }
    return seats;
  };

  const seatElements = renderSeats(); // একবার লুপ করে সিট তৈরি

  return (
    <div className="space-y-5">
      <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
        Choose a seat
      </h2>
      <div className="w-full flex justify-between">
        <div className="flex-1 w-full flex">
          <div className="w-full flex-1 flex gap-x-5 items-stretch">
            <div className="w-10 h-full border-r-2 border-dashed border-neutral-300 dark:border-neutral-800">
              <GiSteeringWheel className="text-3xl mt-6 text-violet-600 -rotate-90" />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex-1 space-y-4">
                <div className="w-full grid grid-cols-10 gap-x-3">
                  {seatElements.slice(0, 10)}
                </div>
                <div className="w-full grid grid-cols-10 gap-x-3">
                  {seatElements.slice(10, 20)}
                </div>
                <div className="w-full grid grid-cols-10 gap-x-3">
                  <div className="col-span-9"></div>
                  {seatElements.slice(20, 21)}
                </div>
                <div className="w-full grid grid-cols-10 gap-x-3">
                  {seatElements.slice(21, 31)}
                </div>
                <div className="w-full grid grid-cols-10 gap-x-3">
                  {seatElements.slice(31, 41)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Selected Seats */}
      {selectedSeats.length > 0 && (
        <div className="!mt-10">
          <h3 className="text-lg font-bold">Selected Seats</h3>
          <div className="flex flex-wrap">
            {selectedSeats.map((seat) => (
              <div
                key={seat}
                className="w-10 h-10 rounded-md m-1.5 text-lg font-medium flex items-center justify-center bg-violet-600/30"
              >
                {seat}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total Fare */}
      {selectedSeats.length > 0 && (
        <div className="!mt-5 flex items-center gap-x-4">
          <h3 className="text-lg font-bold">Total Fare Price:</h3>
          <p className="text-lg font-medium">${selectedSeats.length * 10}</p>
          <span className="text-sm text-violet-400 dark:text-neutral-600 font-normal">
            (Tax included)
          </span>
        </div>
      )}
    </div>
  );
};

export default BusSeatLayout;
