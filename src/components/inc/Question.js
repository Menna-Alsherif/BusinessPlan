import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaInfo } from "react-icons/fa";
const Question = (props) => {
  return (
    <div className="col-md-9 pt-5">
      <div className="row">
        <div className="col-11 m-0 p-0">
          <h4 className="bg-red text-white p-1 m-0 py-4">
            {props.question.Question}
          </h4>
        </div>
        <div className="col-1 p-0 m-0 d-flex align-items-center justify-content-center">
          <OverlayTrigger
            placement="auto"
            overlay={<Tooltip>{props.question.Tooltip}</Tooltip>}
          >
            <div>
              <FaInfo size={35} className="fa-info" />
            </div>
          </OverlayTrigger>
        </div>
        <div className="row-col-1 mt-2 p-0">{props.children}</div>
      </div>
    </div>
  );
};

export default Question;
