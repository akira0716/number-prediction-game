import React from "react";

const ModalBase = ({ windowType }) => {
  let contents = null;

  switch (windowType) {
    case "Home":
      contents = (
        <>
          <h3 className="text-4xl py-7 px-3">
            ルームID: <span>12345</span>
          </h3>
          <p className="text-3xl text-center">参加者を待っています</p>
          <p className="text-center my-4">
            <span className="loading loading-spinner loading-lg"></span>
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">キャンセル</button>
            </form>
          </div>
        </>
      );
      break;

    default:
      contents = (
        <>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </>
      );
      break;
  }

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">{contents}</div>
    </dialog>
  );
};

export default ModalBase;
