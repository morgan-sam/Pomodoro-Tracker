import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Confirm from "screens/Confirm";
import PasswordInput from "screens/PasswordInput";
import Input from "screens/Input";
import Alert from "screens/Alert";
import AccountSettingsOptions from "screens/AccountSettingsOptions";

const AccountSettings = () => {
  const [currentDisplay, setCurrentDisplay] = useState("default");
  const navigate = useNavigate();

  const [sequence, setSequence] = useState({
    fnObj: null,
    confirmed: null,
    authorised: null,
    input: null,
  });

  const resetSequence = (message) => {
    setSequence({
      fnObj: null,
      confirmed: null,
      authorised: null,
      input: null,
    });
    if (message) setCurrentDisplay(message);
    else return setCurrentDisplay("default");
  };

  const accountFunction = async (obj) => {
    const { confirmMsg, passwordMsg, inputMsg, action } = obj;
    const { confirmed, authorised, input } = sequence;
    if (confirmMsg && confirmed === null) return setCurrentDisplay("confirm");
    if (confirmed === false) return resetSequence();
    if (passwordMsg && authorised === null)
      return setCurrentDisplay("password");
    if (authorised === false) return resetSequence("Incorrect Password");
    if (inputMsg && input === null) return setCurrentDisplay("input");
    const exitMsg = await action(input);
    if (exitMsg) return setCurrentDisplay(exitMsg);
    else return navigate("/");
  };

  useEffect(() => {
    const runThroughSequence = async () => {
      const { fnObj } = sequence;
      if (fnObj) return accountFunction(fnObj);
    };
    runThroughSequence();
  }, [sequence]);

  if (currentDisplay === "default")
    return <AccountSettingsOptions {...{ sequence, setSequence }} />;
  else if (currentDisplay === "confirm")
    return (
      <Confirm
        message={sequence.fnObj.confirmMsg}
        onConfirm={(val) => setSequence({ ...sequence, confirmed: val })}
      />
    );
  else if (currentDisplay === "password")
    return (
      <PasswordInput
        message={sequence.fnObj.passwordMsg}
        onConfirm={(val) => setSequence({ ...sequence, authorised: val })}
      />
    );
  else if (currentDisplay === "input")
    return (
      <Input
        message={sequence.fnObj.inputMsg}
        onSubmit={(val) => setSequence({ ...sequence, input: val })}
      />
    );
  else return <Alert message={currentDisplay} />;
};

export default AccountSettings;
