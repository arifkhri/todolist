import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./style.scss";

export declare interface ModalProps {
  children: any;
  title?: string;
  ref?: any;
  open: boolean;
  content?: any;
  "data-cy"?: string;
  button?: any
  // {
    // cancel: {
    //   "data-cy": string;
    //   title?: string;
    //   onClick: () => void
    // };
    // submit: {
    //   "data-cy": string;
    //   title?: string;
    //   onClick: () => void
    // };
  // }
}

const Modal = (props: ModalProps) => {
  const closeOnEscapeKeyDown = (e: any) => {
    // console.log("🚀 ~ file: index.tsx ~ line 36 ~ closeOnEscapeKeyDown ~ e", e)
    if ((e.charCode || e.keyCode) === 27) {
      props.button?.cancel?.onClick();
    }
    if(e.target.className.includes("modal")) {
      // console.log("yuhuu")
      props.button?.cancel?.onClick();
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("click", closeOnEscapeKeyDown);
    };
  }, []);

  useEffect(() => {
    // console.log("🚀 ~ file: index.tsx ~ line 48 ~ useEffect ~ props.open", props.open)
    if(props.open) {
      document.body.className = "modal-open"
    }

  }, [props.open])

  return (
    <CSSTransition
      in={props.open}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button onClick={props.button?.cancel?.onClick} className="button">
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
