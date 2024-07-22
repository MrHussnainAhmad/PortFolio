import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mainstyles from "./Main.module.css";
import "./Main.css";

function Main({ setName }) {
  const [inputName, setInputName] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputName(e.target.value);
    if (e.target.value !== "") {
      setIsInputEmpty(false);
    }
  };

  const handleSubmit = () => {
    if (inputName.trim() === "") {
      setIsInputEmpty(true);
    } else {
      setName(inputName);
      navigate("/home");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className={Mainstyles.mainContainer}>
        <div className={Mainstyles.questionBox}>
          <p>What is your name?</p>
          <div className={Mainstyles.inputWrapper}>
            <input
              type="text"
              value={inputName}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name"
              className={isInputEmpty ? Mainstyles.inputError : ""}
            />
            <button onClick={handleSubmit}>Enter</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
