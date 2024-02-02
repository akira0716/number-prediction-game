import React, { useState } from "react";
import eventList from "../utils/eventList";
import { sendEvent } from "../utils/eventsComm";
import { useNavigate } from "react-router-dom";

export const modal_data = {
  modalType: "",
  params: { room_id: "" },
};

const ModalBase = ({ modalData }) => {
  const [form, setForm] = useState("");
  const navigate = useNavigate(null);
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
              <button
                className="btn"
                onClick={() => sendEvent(eventList.CANCEL.EventName)}
              >
                キャンセル
              </button>
            </form>
          </div>
        </>
      );
      break;

    case "Join":
      contents = (
        <>
          <h3 className="text-4xl py-7 px-3">
            参加するルームのIDを入力してください。
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

    case "Decide":
      contents = (
        <>
          <h3 className="text-4xl py-7 px-3">
            相手が、数字を設定中です。少々お待ちください。
          </h3>
        </>
      );
      break;

    case "Predict":
      contents = (
        <>
          <h3 className="text-4xl py-7 px-3">
            相手が、数字を予想しています。少々お待ちください。
          </h3>
        </>
      );
      break;

    case "Result":
      contents = (
        <>
          <h3 className="font-bold text-lg">ゲーム終了!!!</h3>
          <p className="py-4">{modalData.params.result}</p>
          <div className="modal-action">
            <button
              className="btn btn-active btn-secondary"
              onClick={() => {
                navigate("/");
                modalData.params.setGameState();
              }}
            >
              タイトル画面に戻る
            </button>
            <form method="dialog">
              <button className="btn">閉じる</button>
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
