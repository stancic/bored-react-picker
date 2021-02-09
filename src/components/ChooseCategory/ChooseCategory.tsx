import React, { FunctionComponent, useEffect, useState } from "react";

// Components
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { TitleStateContext } from "../Context/TitleStateContext";

// Styles
import "./ChooseCategory.scss";

const ChooseCategory: FunctionComponent = () => {
  const [titleState, setTitleState] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setTitleState(false);
    }, 1000);
    return () => {
      setTitleState(true);
    };
  }, []);
  return (
    <div className="category-choice-container">
      <TitleStateContext.Provider value={titleState}>
        <LoadingScreen />
      </TitleStateContext.Provider>
      <div className="form-container" style={!titleState ? { opacity: 1 } : {}}>
        <form action="#">
          <select name="category" id="category">
            <option value="action">Action</option>
            <option value="action2">Action2</option>
            <option value="action3">Action3</option>
            <option value="action4">Action4</option>
          </select>
          <input type="text" name="year" placeholder="Year" />
          <input type="submit" value="Find a movie!" />
        </form>
      </div>
    </div>
  );
};

export default ChooseCategory;
