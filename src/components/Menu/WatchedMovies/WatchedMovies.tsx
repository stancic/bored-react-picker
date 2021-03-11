import React, { FunctionComponent } from "react";

// Components
import MenuData from "../MenuData/MenuData";
import Table from "rc-table";

// Styles
import "./WatchedMovies.scss";

const WatchedMovies: FunctionComponent = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
  ];
  const data = [
    { name: "Jack", age: 28, address: "some where", key: "1" },
    { name: "Rose", age: 36, address: "some where", key: "2" },
  ];
  return (
    <div className="menu-container">
      <div className="watched-movies user-movies-table-container">
        <Table columns={columns} data={data} />
      </div>
      <MenuData />
    </div>
  );
};

export default WatchedMovies;
