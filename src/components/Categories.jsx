import { MDBCard, MDBCol, MDBListGroup, MDBRow } from "mdb-react-ui-kit";
import React from "react";

export default function Categories({ handleCategory, options }) {
  return (
    <>
      <div>
        <div className="flex mt-3 pb-3 text-lg">
          <button className="w-40 bg-red-200">All</button>
          {options.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer w-full"
              onClick={() => handleCategory(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
