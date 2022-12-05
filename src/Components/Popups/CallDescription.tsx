import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export const CallDescription: React.FC<{ callDesc: string }> = ({
  callDesc,
}) => {
  const matches = useMediaQuery("(max-width:768px)");
  return (
    <div
      className={`${
        matches ? "wd-95vw p-lr-12 ft-sz-14" : "p-lr-24 min-wd-40r ft-sz-20"
      } p-tb-12 dfc-as`}
    >
      <span className="ft-wt-500">{callDesc}</span>
    </div>
  );
};
