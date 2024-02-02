import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import PlayDisp01 from "./routes/PlayDisp01";
import { socket } from "./utils/socket";
import { recieveEvents } from "./utils/eventsComm";
import { modal_data } from "./components/ModalBase";

import { useNavigate } from "react-router-dom";
import eventList from "./utils/eventList";

const App = () => {
  const [eventParams, setEventParams] = useState({
    EventName: "",
    Params: null,
  });
  const [roomId, setRoomId] = useState("");
  // ゲーム状態(-1: タイトル画面, 0: 準備, 1: 開始, 2: 終了)
  const [gameState, setGameState] = useState(-1);
  const [result, setResult] = useState({});
  const [log, setLog] = useState([]);

  const navigate = useNavigate(null);

  useEffect(() => {
    // 起動時、サーバに接続
    socket.connect();
    // 受信
    recieveEvents(setEventParams);
  }, []);

  useEffect(() => {
    if (eventParams.EventName === eventList.START.EventName) {
      eventList.START.Params = JSON.parse(eventParams.Params);
      const roomId = eventList.START.Params.room_id;
      setRoomId(roomId);
      navigate("./game");
      setGameState(0);

      const newLog = {
        logType: "INFO",
        Message: `ルームID:${roomId}でゲームが開始されました。`,
      };
      setLog([...log, newLog]);
    } else if (eventParams.EventName === eventList.ROOM_ID.EventName) {
      eventList.ROOM_ID.Params = JSON.parse(eventParams.Params);
      const roomId = eventList.ROOM_ID.Params.room_id;
      setRoomId(roomId);
    } else if (eventParams.EventName === eventList.READY.EventName) {
      setGameState(1);
    } else if (eventParams.EventName === eventList.RESULT.EventName) {
      eventList.RESULT.Params = JSON.parse(eventParams.Params);
      setResult(eventList.RESULT.Params); // 現状、使用していない。

      const predictNum = eventList.RESULT.Params.predict_num;
      const result = `${eventList.RESULT.Params.EAT}EAT-${eventList.RESULT.Params.BITE}BITE`;
      const newLog = {
        logType: "RESULT",
        Message: `自分の予想: ${predictNum} >> 結果:${result}`,
      };
      setLog([...log, newLog]);
    } else if (eventParams.EventName === eventList.END.EventName) {
      eventList.END.Params = JSON.parse(eventParams.Params);
      const predictNum = eventList.END.Params.predict_num;
      const result = eventList.END.Params.status;
      const newLog = {
        logType: "END",
        Message: `自分の予想: ${predictNum} >> ${result}`,
      };
      setLog([...log, newLog]);

      modal_data.modalType = "Result";
      modal_data.params = { ...modal_data.params, ["result"]: result };
      modal_data.params = {
        ...modal_data.params,
        ["setGameState"]: () => setGameState(-1),
      };
      document.getElementById("my_modal_1").showModal();

      setGameState(2);
    } else if (eventParams.EventName === eventList.ERROR.EventName) {
      eventList.ERROR.Params = JSON.parse(eventParams.Params);
      const newLog = {
        logType: "ERROR",
        Message: eventList.ERROR.Params.err_msg,
      };

      if (gameState === -1) {
        alert(newLog.Message);
      } else {
        setLog((prevLog) => {
          const currentLog = [...prevLog];
          currentLog[currentLog.length - 1] = newLog;
          return currentLog;
        });
      }
    } else if (eventParams.EventName === eventList.FORCE_END.EventName) {
      navigate("/");
      setGameState(-1);
      alert("対戦相手の通信が切断されました。");
    }
  }, [eventParams]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home roomId={roomId} />} />
        <Route
          path="/game"
          element={
            <PlayDisp01
              gameState={gameState}
              roomId={roomId}
              result={result}
              log={log}
              setLog={setLog}
              setGameState={setGameState}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
