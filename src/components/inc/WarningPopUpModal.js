import Swal from "sweetalert2";

export const WarningPopUpModal = (text) => {
  Swal.fire({
    icon: "error",
    title: "Sorry...",
    html: text,
    confirmButtonColor: "#d33",
  });
};
