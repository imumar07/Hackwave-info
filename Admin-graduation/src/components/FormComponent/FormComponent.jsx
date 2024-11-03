// eslint-disable-next-line no-unused-vars
import React from "react";
import "./FormComponent.css";
import BoxSystemProps from "../BoxSystemProps";
import logo from "../../assets/college_logo.svg";
import { ToastContainer } from 'material-react-toastify';
const FormComponent = () => {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div className="college-logo-div" style={{alignSelf:"center"}}>
          <img src={logo} alt="logo" className="college-logo" />
        </div>
        <ToastContainer
        position="top-center"
        theme="light"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        <div className="custom-form-container">
          <BoxSystemProps />
        </div>
      </div>
    </>
  );
};

export default FormComponent;
