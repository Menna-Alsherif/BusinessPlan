import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export const useReroutingModal = () => {
  const [text, setText] = useState("");
  const [path, setPath] = useState("");
  const [fire, setFire] = useState(false);

  const history = useHistory();

  const OpenRoutingModal = () => {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      html: text,
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonColor: "#d33",
      backdrop: `
             rgba(0,0,0,0.9)
             `,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push(path);
      }
    });
  };

  useEffect(() => {
    if (fire) {
      OpenRoutingModal();
    }
  }, [fire]);

  const reRoutePopUpModal = (text, path) => {
    setText(text);
    setPath(path);
    setFire(true);
  };

  return { reRoutePopUpModal };
};
