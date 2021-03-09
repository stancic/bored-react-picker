import React, { FunctionComponent, useEffect, useState } from "react";

// Styles
import "./MenuData.scss";

const MenuData: FunctionComponent<{ changeLoginFormState: any }> = ({
  changeLoginFormState,
}) => {
  const [changeState, setChangeState] = useState<boolean>(false);

  const changeLoginShow = () => {
    setChangeState((prev) => !prev);
  };
  useEffect(() => {
    changeLoginFormState(changeState);
  }, [changeState, changeLoginFormState]);
  return (
    <div className="menu-data-container">
      <h1 className="menu-title">Bored?</h1>
      <p className="login-open" onClick={changeLoginShow}>
        Login?
      </p>
      <p className="signup-open">Sign up?</p>
    </div>
  );
};

export default MenuData;
