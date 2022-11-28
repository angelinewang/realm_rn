import React, { useState } from "react";
import "./styles.css";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

// NOTICE
// Modal is brought in with it's own trigger, so import the component where you want the trigger to be.

const PostParty = (props) => {
  const {
    buttonText,
    title,
    actionButtonText,
    cancelButtonText,
    children,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const alertshow = () => {
    alert("button clicked");
  };

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  return (
    <div>
      <div onClick={toggle}>{buttonText}</div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit={alertshow}>
          <ModalHeader className=" border-0" toggle={toggle} close={closeBtn}>
            {title}
          </ModalHeader>
          <ModalBody className="text-left border-0">
            <p className="modal-label">Please enter your email address</p>
            {children}
          </ModalBody>
          <ModalFooter className="modal-footer border-0">
            <Button className="btn_secondary modal-btn" onClick={toggle}>
              {cancelButtonText}
            </Button>{" "}
            &nbsp;&nbsp;
            <input
              className="btn btn_primary modal-btn"
              type="submit"
              value={actionButtonText}
            />
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default PostParty;