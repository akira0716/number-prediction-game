import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import PlayDisp01 from "./routes/PlayDisp01";
import { socket } from "./utils/socket";
import { recieveEvents } from "./utils/eventsComm";

import { useNavigate } from "react-router-dom";
import eventList from "./utils/eventList";

const App = () => {
  const [eventParams, setEventParams] = useState({
    EventName: "",
    Params: null,
  });
  const [roomId, setRoomId] = useState("");

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
    } else if (eventParams.EventName === eventList.ROOM_ID.EventName) {
      eventList.ROOM_ID.Params = JSON.parse(eventParams.Params);
      const roomId = eventList.ROOM_ID.Params.room_id;
      setRoomId(roomId);
    }
  }, [eventParams]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home roomId={roomId} />} />
        <Route path="/game" element={<PlayDisp01 roomId={roomId} />} />
      </Routes>
    </>
  );
};

export default App;
