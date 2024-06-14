// import React from "react";

// export default function Search({ handleSearch, searchValue, onInputChange }) {
//   return (
//     <div className="m-auto p-4 max-w-[600px] content-center">
//       <form className="" onSubmit={handleSearch}>
//         <input
//           type="search"
//           placeholder="Search Blog..."
//           value={searchValue}
//           onChange={onInputChange}
//         />
//         <button className="bg-[#FF4F1F] w-[80px] h-[40px] text-white rounded p-1">
//           Search
//         </button>
//       </form>
//     </div>
//   );
// }
import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
const Search = ({ handleSearch, searchValue, onInputChange }) => {
  return (
    <div className="m-auto p-4 max-w-[600px] content-center">
      <form action="" className="d-flex" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control"
          placeholder="Search Blog..."
          value={searchValue}
          onChange={onInputChange}
        />
        <MDBBtn type="submit">Search</MDBBtn>
      </form>
    </div>
  );
};
export default Search;
