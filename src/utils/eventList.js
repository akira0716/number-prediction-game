const eventList = {
  //#region 受信用
  ROOM_ID: {
    EventName: "ROOM_ID",
    Params: {
      room_id: "",
    },
  },
  START: {
    EventName: "START",
    Params: {
      room_id: "",
    },
  },
  READY: {
    EventName: "READY",
    Params: {},
  },
  RESULT: {
    EventName: "RESULT",
    Params: {},
  },
  END: {
    EventName: "END",
    Params: {},
  },
  ERROR: {
    EventName: "ERROR",
    Params: {
      err_msg: "",
    },
  },
  //#endregion

  //#region 送信用
  SET_NUM: {
    EventName: "SET_NUM",
    Params: {
      room_id: "",
      number: "",
    },
  },
  PREDICT: {
    EventName: "PREDICT",
    Params: {
      room_id: "",
      number: "",
    },
  },
  INVITE: {
    EventName: "INVITE",
    Params: {},
  },
  JOIN: {
    EventName: "JOIN",
    Params: {
      room_id: "",
    },
  },
  //#endregion
};

export default eventList;
