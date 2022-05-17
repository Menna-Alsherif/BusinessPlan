import { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import ModalComponent from "./Modal.js";

const CustomizedDropdown = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [open_dropdown, setOpenDropdown] = useState(false);
  const [selected_option_name, setSelectedOptionName] = useState("N/A");

  useEffect(() => {
    if (props.list.length === 0) {
      setSelectedOptionName("N/A");
    }
  }, [props.list, modalShow]);

  return (
    <div className="p-0 m-0" style={{ position: "relative", width: "100%" }}>
      <ModalComponent
        show={modalShow}
        onHide={() => setModalShow(false)}
        member={selected_option_name}
        submit_function={() => {
          props.submit_function();
          setModalShow(false);
        }}
      />

      <Button
        onClick={() => {
          setOpenDropdown((open_dropdown) => !open_dropdown);
        }}
        className="customized_dropdown_toggle d-flex justify-content-start"
      >
        {selected_option_name}
      </Button>
      <div className="customized_dropdown_menu">
        {props.list !== [] &&
          open_dropdown &&
          props.list.map((member, index) => {
            return (
              <Dropdown.Item
                eventKey={index}
                className="customized_dropdown_item d-flex align-items-center justify-content-between"
                onClick={() => {
                  setSelectedOptionName(member.name);
                  props.setSelectFunction(member.id);
                  setOpenDropdown(false);
                }}
                as="button"
              >
                <div className="text-truncate">{member.name}</div>
                <div>
                  {props.functionality === "DELETE" && (
                    <Button
                      style={{
                        backgroundColor: "white",
                        border: "0px",
                        outline: "none",
                      }}
                      onClick={() => {
                        props.setSelectFunction(member.id);
                        setModalShow(true);
                      }}
                    >
                      <BsTrashFill style={{ color: "#ee2830" }} />
                    </Button>
                  )}
                  {props.functionality === "STATUS" && (
                    <div>
                      {member.is_sent ? (
                        <h5 className="pt-2" style={{ color: "#ee2830" }}>Delivered!</h5>
                      ) : (
                        <h5 className="pt-2" style={{ color: "#ee2830" }}>(Pending...)</h5>
                      )}
                    </div>
                  )}
                </div>
              </Dropdown.Item>
            );
          })}
      </div>
    </div>
  );
};

export default CustomizedDropdown;
