import React, { useState } from "react";
import eventList from "../utils/eventList";
import { sendEvent } from "../utils/eventsComm";

export const modal_data = {
  modalType: "",
  params: { room_id: "" },
};

const ModalBase = ({ modalData }) => {
  const [form, setForm] = useState("");
  let contents = null;

  switch (modalData.modalType) {
    case "Invite":
      contents = (
        <>
          <h3 className="text-4xl py-7 px-3">
            ルームID: <span>{modalData.params.room_id}</span>
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

    case "Join":
      contents = (
        <>
          <h3 className="text-4xl py-7 px-3">
            ルームID: <span>{modalData.params.room_id}</span>
          </h3>
          <p className="text-center my-4">
            <input
              type="text"
              className="input input-bordered w-full max-w-xs text-center text-4xl h-20"
              onChange={(e) => setForm(e.target.value)}
              value={form}
            />
          </p>
          <div className="modal-action">
            <button
              className="btn btn-active btn-secondary"
              onClick={() => {
                eventList.JOIN.Params.room_id = form;
                sendEvent(eventList.JOIN.EventName, eventList.JOIN.Params);
              }}
            >
              参加する
            </button>
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
