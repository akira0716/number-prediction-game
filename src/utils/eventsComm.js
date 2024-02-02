import { socket } from "./socket";
import eventList from "./eventList";

// イベント送信処理
export const sendEvent = (eventName, data) => {
  const msg = JSON.stringify(data);
  socket.emit(eventName, msg);
};

// イベント受信処理
export const recieveEvents = (setEventParams) => {
  socket.on(eventList.READY.EventName, (msg) => {
    const eventParams = {
      EventName: eventList.READY.EventName,
      Params: msg,
    };
    setEventParams(eventParams);
    console.log(`イベント[${eventList.READY.EventName}]を受信しました。`);
    document.getElementById("my_modal_1").close();
  });

  socket.on(eventList.START.EventName, (msg) => {
    const eventParams = {
      EventName: eventList.START.EventName,
      Params: msg,
    };
    setEventParams(eventParams);
    console.log(`イベント[${eventList.START.EventName}]を受信しました。`);
  });

  socket.on(eventList.END.EventName, (msg) => {
    const eventParams = {
      EventName: eventList.END.EventName,
      Params: msg,
    };
    setEventParams(eventParams);
    console.log(`イベント[${eventList.END.EventName}]を受信しました。`);
    document.getElementById("my_modal_1").close();
  });

  socket.on(eventList.ROOM_ID.EventName, (msg) => {
    const eventParams = {
      EventName: eventList.ROOM_ID.EventName,
      Params: msg,
    };
    setEventParams(eventParams);
    console.log(`イベント[${eventList.ROOM_ID.EventName}]を受信しました。`);
    document.getElementById("my_modal_1").showModal();
  });

  socket.on(eventList.RESULT.EventName, (msg) => {
    const eventParams = {
      EventName: eventList.RESULT.EventName,
      Params: msg,
    };
    setEventParams(eventParams);
    console.log(`イベント[${eventList.RESULT.EventName}]を受信しました。`);
    document.getElementById("my_modal_1").close();
  });

  socket.on(eventList.ERROR.EventName, (msg) => {
    const eventParams = {
      EventName: eventList.ERROR.EventName,
      Params: msg,
    };
    setEventParams(eventParams);
    console.log(`イベント[${eventList.ERROR.EventName}]を受信しました。`);
    document.getElementById("my_modal_1").close();
  });

  socket.on(eventList.FORCE_END.EventName, (msg) => {
    const eventParams = {
      EventName: eventList.FORCE_END.EventName,
      Params: msg,
    };
    setEventParams(eventParams);
    console.log(`イベント[${eventList.FORCE_END.EventName}]を受信しました。`);
  });
};
