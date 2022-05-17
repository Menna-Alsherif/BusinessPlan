import { Button, Modal } from "react-bootstrap";
import { RiErrorWarningLine } from "react-icons/ri";

const ModalComponent = (props) => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{
        width: "80%",
        minWidth: "80%",
        minHeight: "80%",
        height: "80%",
        border: "none",
      }}
    >
      <Modal.Header
        closeButton
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80%",
          height: "80%",
          border: "0px",
        }}
        className="text-center"
      >
        <Modal.Title
          className="w-100"
          id="contained-modal-title-vcenter"
        ></Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          border: "0px",
          textAlign: "center",
          fontSize: "1.125em",
          border: "none",
          fontWeight: "400",
        }}
      >
        <div className="row-col-1 pb-5">
          <RiErrorWarningLine size={100} style={{ color: "#ee2830" }} />
        </div>
        <h4 className="pb-1">
          Are you sure you want to delete Business Plan <br />{" "}
          <b style={{ color: "black" }}> &ldquo; {props.member} &rdquo; </b>
        </h4>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "center",
          border: "0px",
        }}
      >
        <Button
          className="btn btn-danger bg-red btn-lg w-50 pb-3 rounded-pill"
          onClick={() => {
            props.submit_function();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
