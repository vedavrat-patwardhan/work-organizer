import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { PopupModel } from "../../Models/ComponentsModel";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Popup: React.FC<PopupModel> = (props) => {
  const matches = useMediaQuery("(max-width:768px)");
  const { open, handleClose, data, heading } = props;
  return (
    <div className={open ? "popup" : "display-none"}>
      <div className="popup__window">
        <div
          className={`df-ac-jsb ${
            matches ? "p-a-14" : "p-t-24 p-b-12 p-lr-24"
          }`}
        >
          <span
            className={`${matches ? "ft-sz-20" : "ft-sz-24"} ft-wt-500 lt-sp-2`}
          >
            {heading}
          </span>
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
