import React, { useState } from "react";
import { sendEvent } from "../utils/eventsComm";
import eventList from "../utils/eventList";
import { modal_data } from "../components/ModalBase";
import ModalBase from "../components/ModalBase";
import { useNavigate } from "react-router-dom";

const initValue = {
  value1: "",
  value2: "",
  value3: "",
};

const PlayDisp01 = ({
  gameState,
  roomId,
  result,
  log,
  setLog,
  setGameState,
}) => {
  const [inputValue, setInputValue] = useState(initValue);

  const navigate = useNavigate(null);

  // ボタン[決定する]押下時
  const onClickBtnDecide = () => {
    eventList.SET_NUM.Params.room_id = roomId;
    eventList.SET_NUM.Params.number = Object.values(inputValue).join("");
    sendEvent(eventList.SET_NUM.EventName, eventList.SET_NUM.Params);

    modal_data.modalType = "Decide";
    document.getElementById("my_modal_1").showModal();

    setInputValue(initValue);

    const newLog = {
      logType: "INFO",
      Message: `自分の数字: ${eventList.SET_NUM.Params.number}`,
    };
    setLog([...log, newLog]);
  };

  // ボタン[予想する]押下時
  const onClickBtnPrediction = () => {
    eventList.PREDICT.Params.room_id = roomId;
    eventList.PREDICT.Params.number = Object.values(inputValue).join("");
    sendEvent(eventList.PREDICT.EventName, eventList.PREDICT.Params);

    modal_data.modalType = "Predict";
    document.getElementById("my_modal_1").showModal();

    setInputValue(initValue);

    const newLog = {
      logType: "INFO",
      Message: `自分の予想: ${eventList.PREDICT.Params.number}`,
    };
    setLog([...log, newLog]);
  };

  // 数字入力時
  const onChangeInputValue = (e) => {
    const { name, value } = e.target;
    const newValue = value.slice(0, 1);
    if (isNaN(newValue)) {
      return;
    }
    setInputValue({ ...inputValue, [name]: newValue });
  };

  // ゲーム状態に応じたボタン取得
  const buttonSelect = (gameState) => {
    switch (gameState) {
      case 0:
        return (
          <button
            className="btn btn-primary w-60 h-16 text-4xl"
            onClick={onClickBtnDecide}
          >
            決定する
          </button>
        );

      case 1:
        return (
          <button
            className="btn btn-primary w-60 h-16 text-4xl"
            onClick={onClickBtnPrediction}
          >
            予想する
          </button>
        );

      case 2:
        return (
          <button
            className="btn btn-primary w-60 h-16 text-4xl"
            onClick={() => {
              navigate("/");
              setGameState(-1);
            }}
          >
            退出する
          </button>
        );

      default:
        break;
    }
  };

  return (
    <>
      <div className="">
        <h3 className="text-center text-2xl py-9">
          {gameState == 0
            ? "異なる3桁の数字を設定してください。"
            : "相手の3桁の数字を予想してください。"}
        </h3>
        <div className="flex justify-center gap-6">
          <div>
            <input
              type="text"
              name="value1"
              value={inputValue.value1}
              onChange={onChangeInputValue}
              className="input input-bordered w-20 h-20 text-5xl text-center"
              disabled={gameState === 2 ? true : false}
            />
          </div>
          <div>
            <input
              type="text"
              name="value2"
              value={inputValue.value2}
              onChange={onChangeInputValue}
              className="input input-bordered w-20 h-20 text-5xl text-center"
              disabled={gameState === 2 ? true : false}
            />
          </div>
          <div>
            <input
              type="text"
              name="value3"
              value={inputValue.value3}
              onChange={onChangeInputValue}
              className="input input-bordered w-20 h-20 text-5xl text-center"
              disabled={gameState === 2 ? true : false}
            />
          </div>
        </div>
        <div className="py-16 text-center">{buttonSelect(gameState)}</div>
        <div className="mx-auto w-3/4 max-w-lg h-80 border-2 p-2 border-black overflow-y-scroll">
          {log.map((item, index) => {
            let badge;
            if (item.logType === "INFO") {
              badge = (
                <div className="badge badge-info gap-2 mr-2">
                  {item.logType}
                </div>
              );
            } else if (item.logType === "ERROR") {
              badge = (
                <div className="badge badge-error gap-2 mr-2">
                  {item.logType}
                </div>
              );
            } else if (item.logType === "RESULT") {
              badge = (
                <div className="badge badge-success gap-2 mr-2">
                  {item.logType}
                </div>
              );
            } else if (item.logType === "END") {
              badge = (
                <div className="badge badge-warning gap-2 mr-2">
                  {item.logType}
                </div>
              );
            }

            return (
              <div key={index}>
                {badge}
                {item.Message}
              </div>
            );
          })}
        </div>
      </div>
      <ModalBase modalData={modal_data} />
    </>
  );
};

export default PlayDisp01;
