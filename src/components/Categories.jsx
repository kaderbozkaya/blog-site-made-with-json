// import { MDBCard, MDBCol, MDBListGroup, MDBRow } from "mdb-react-ui-kit";
import React from "react";

export default function Categories({ handleCategory, options }) {
  return (
    <>
      <div className="flex w-full">
        <div className="flex pb-3 text-lg m-3 ">
          <button
            className="w-44 bg-[#FF4F1F] flex items-center justify-center text-white rounded p-1"
            onClick={() => handleCategory("All")}
          >
            All
          </button>
          {options.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer w-[80%] hover:bg-[#FF4F1F] hover:text-white ml-3 hover:rounded p-1"
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
