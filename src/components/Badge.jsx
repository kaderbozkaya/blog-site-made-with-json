import { MDBBadge } from "mdb-react-ui-kit";
import React from "react";

export default function Badge({ children, styleInfo }) {
  const colorKey = {
    Fashion: "warning",
    Travel: "success",
    Sports: "danger",
    Food: "primary",
    Technology: "info",
  };
  return (
    <>
      <h5 style={styleInfo}>
        <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
      </h5>
    </>
  );
}
