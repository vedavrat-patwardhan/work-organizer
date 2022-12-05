import React from "react";
import { RestartAlt } from "@mui/icons-material";
import { Controls } from "./Controls/Controls";
import { TableSortingModel } from "../Models/ComponentsModel";
import { useMediaQuery } from "@material-ui/core";

export const TableSorting: React.FC<TableSortingModel> = (props) => {
  const {
    search,
    searchPlaceHolder,
    handleSearch,
    filterPlaceholder,
    handleFilter,
    setReset,
    itemsPlaceholder,
    handleItems,
  } = props;

  const media = useMediaQuery("(max-width:768px)");
  return (
    <div className="table__filter">
      <Controls.SearchableInput
        placeholder={searchPlaceHolder}
        handleInput={handleSearch}
        value={search}
        className={media ? "wd-100p m-b-8" : "wd-50p"}
      />
      <div className={`df-ac-jsb ${media ? "wd-100p" : ""}`}>
        {filterPlaceholder && (
          <Controls.DropDown
            placeholder={filterPlaceholder}
            options={["Last 7 Days", "Last 30 Days"]}
            handleInput={handleFilter!}
          />
        )}
        <RestartAlt
          className="m-l-8 m-r-8 ft-sz-32 color-primary cursor-pointer "
          onClick={setReset}
        />
      </div>
      <div className={`df-ac-jsb ${media ? "wd-100p" : ""}`}>
        <strong className="m-r-8">Rows per page : </strong>
        <Controls.DropDown
          placeholder={itemsPlaceholder}
          options={["5", "10", "25", "50"]}
          handleInput={handleItems}
          btnClass="wd-3-75r"
          dropClsss="wd-3-5r"
        />
      </div>
    </div>
  );
};
