import React from "react";
import { createPortal } from "react-dom";
import "./LoginModal.css";

const Modal = ({children}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default function LoginModal({ children }) {
  return createPortal(
    <Modal>{children}</Modal>,
    document.getElementById("root")
  );
}
