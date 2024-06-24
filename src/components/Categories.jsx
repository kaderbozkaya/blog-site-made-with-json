// import { MDBCard, MDBCol, MDBListGroup, MDBRow } from "mdb-react-ui-kit";
import React from "react";

export default function Categories({ handleCategory, options }) {
  return (
    <>
      <div className="flex w-full">
        <div className="flex pb-3 text-sm md:text-lg w-full items-center md:justify-around">
          <button
            className="md:w-24 bg-[#FF4F1F] flex items-center justify-center text-white rounded p-2"
            onClick={() => handleCategory("All")}
          >
            All
          </button>
          {options.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer hover:bg-[#FF4F1F] hover:text-white hover:rounded p-2"
              onClick={() => handleCategory(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
}
