import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { PopupModel } from "../Models/ComponentsModel";

export const Popup: React.FC<PopupModel> = (props) => {
  const { open, handleClose, data, heading } = props;

  return (
    <div className={open ? "popup" : "display-none"}>
      <div className="popup__window">
        <div className="df-ac-jsb p-a-14">
          <h2>{heading}</h2>
          <CloseRoundedIcon
            className="cursor-pointer on-hover-black"
            onClick={handleClose}
          />
        </div>
        <hr className="hr" />
        <div>{data}</div>
      </div>
    </div>
  );
};
