import React from "react";
import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
import FetchData from "../Components/FetchData";

const Homes = (props) => {
  return (
    <>
      <Navbar />
      <FetchData cat={props.cat} />
      <Footer />
    </>
  );
};
export default Homes;
