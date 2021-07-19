import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "./DataLayer";
import "./SideBarOption.css";

function SideBarOption({
  option = "test",
  Icon,
  playlist,
  parentCallBack,
  sidebarOption__selected
}) {

  const [item, setItem] = useState(null);


  function selectItem(item) {
    console.log("selected item name", item?.name);
    // setItem(item);
  }

  // useEffect(() => {

  // }, []);

  return (
    <div
      className={sidebarOption__selected ? "sidebarOption__selected" : "sidebarOption" }
      onClick={() => (selectItem(playlist), parentCallBack(playlist))}
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{option}</h4> : <p>{option}</p>}
    </div>
  );
}

export default SideBarOption;
