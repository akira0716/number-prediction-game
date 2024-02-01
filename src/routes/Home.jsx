import React, { useEffect, useState } from "react";
import ModalBase, { modal_data } from "../components/ModalBase";
import { sendEvent } from "../utils/eventsComm";
import eventList from "../utils/eventList";

const Home = ({ roomId }) => {
  const [render, setRender] = useState(true);

  // ボタン[募集する]押下時
  const onClickBtnInvite = () => {
    modal_data.modalType = "Invite";
    sendEvent(eventList.INVITE.EventName);
  };

  // ボタン[参加する]押下時
  const onClickBtnJoin = () => {
    modal_data.modalType = "Join";
    setRender(!render);
    document.getElementById("my_modal_1").showModal();
  };

  useEffect(() => {
    if (roomId !== "") {
      modal_data.params = { ...modal_data.params, ["room_id"]: roomId };
      setRender(!render);
    }
  }, [roomId]);

  return (
    <>
      <div>
        <h1 className="text-6xl text-center py-28">Number Prediction Game</h1>
        <div className="text-center py-2">
          <button
            className="btn btn-active btn-primary w-3/4 h-20 text-4xl rounded-3xl"
            onClick={onClickBtnInvite}
          >
            募集する
          </button>
        </div>
        <div className="text-center py-2">
          <button
            className="btn btn-secondary  w-3/4 h-20 text-4xl rounded-3xl"
            onClick={onClickBtnJoin}
          >
            参加する
          </button>
        </div>
      </div>
      <ModalBase modalData={modal_data} />
    </>
  );
};

export default Home;
