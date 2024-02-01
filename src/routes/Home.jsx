import React from "react";
import ModalBase from "../components/ModalBase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // ボタン[募集する]押下時
  const onClickBtnInvite = () => {
    // Todo : サーバーにイベント送信しルームIDを要求する。
    // Todo : サーバーからルームID受信後に表示。
    document.getElementById("my_modal_1").showModal();
  };

  const onClickBtnJoin = () => {
    navigate("/game");
  };

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
      <ModalBase windowType={"Home"} />
    </>
  );
};

export default Home;
