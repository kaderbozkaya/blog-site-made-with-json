import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from "mdb-react-ui-kit";

export default function Header() {
  const [show, setShow] = useState(false);

  return (
    <>
      <MDBNavbar
        expand="lg"
        light
        style={{ backgroundColor: "#FF4F1F", borderRadius: "3px" }}
      >
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">
            <img src="/images/blog.png" alt="logo" className="h-10" />
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShow(!show)}
          >
            <MDBIcon icon="bars" fas className="text-white" />
          </MDBNavbarToggler>
          <MDBCollapse open={show} navbar>
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem className="active">
                <MDBNavbarLink
                  aria-current="page"
                  href="/"
                  className="text-white"
                >
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/addBlog" className="text-white">
                  Add Blog
                </MDBNavbarLink>
              </MDBNavbarItem>
              {/* <MDBNavbarItem>
                <MDBNavbarLink href="">Pricing</MDBNavbarLink>
              </MDBNavbarItem> */}
              {/* <MDBNavbarItem>
                <MDBNavbarLink href="#">About</MDBNavbarLink>
              </MDBNavbarItem> */}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
