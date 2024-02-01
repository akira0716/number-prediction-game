import React, { useState } from "react";

const initValue = {
  value1: "",
  value2: "",
  value3: "",
};

const PlayDisp01 = () => {
  const [gameState, setGameState] = useState(0);
  const [inputValue, setInputValue] = useState(initValue);

  const onClickBtnDecide = () => {
    setGameState(1);
    setInputValue(initValue);
  };

  const onClickBtnPrediction = () => {
    setGameState((value) => value + 1);
  };

  const onChangeInputValue = (e) => {
    const { name, value } = e.target;
    const newValue = value.slice(0, 1);
    if (isNaN(newValue)) {
      return;
    }
    setInputValue({ ...inputValue, [name]: newValue });
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
            />
          </div>
          <div>
            <input
              type="text"
              name="value2"
              value={inputValue.value2}
              onChange={onChangeInputValue}
              className="input input-bordered w-20 h-20 text-5xl text-center"
            />
          </div>
          <div>
            <input
              type="text"
              name="value3"
              value={inputValue.value3}
              onChange={onChangeInputValue}
              className="input input-bordered w-20 h-20 text-5xl text-center"
            />
          </div>
        </div>
        <div className="py-16 text-center">
          {gameState === 0 ? (
            <button
              className="btn btn-primary w-60 h-16 text-4xl"
              onClick={onClickBtnDecide}
            >
              決定する
            </button>
          ) : (
            <button
              className="btn btn-primary w-60 h-16 text-4xl"
              onClick={onClickBtnPrediction}
            >
              予想する
            </button>
          )}
        </div>
        <div className="mx-auto w-3/4 max-w-lg h-80 border-2 border-black"></div>
      </div>
    </>
  );
};

export default PlayDisp01;
