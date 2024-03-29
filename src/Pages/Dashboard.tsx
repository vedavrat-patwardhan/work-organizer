import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Table } from "../Components/Table";
import { DashboardModel } from "../Models/PagesModel";
import { dashboardService } from "../Service/Service";
import { Popup } from "../Components/Popups/Popup";
import DashboardForm from "../Components/Popups/DashboardForm";
import { TableSorting } from "../Components/TableSorting";
import {
  Apartment,
  Description,
  Edit,
  AssignmentTurnedIn,
} from "@mui/icons-material";
import { CompanyData } from "../Components/Popups/CompanyData";
import { CallDescription } from "../Components/Popups/CallDescription";
import { RemarkForm } from "../Components/Popups/RemarkForm";
import { ActionForm } from "../Components/Popups/ActionForm";
import { ActionTable } from "../Components/Popups/ActionTable";
import { PageHeading } from "../Components/PageHeading";
import { StoreModel } from "../Models/StoreModel";
import { connect } from "react-redux";
import SalesForm from "../Components/Popups/SalesForm";

const Dashboard: React.FC<StoreModel> = ({ auth }) => {
  const [closeFuncAction, setCloseFuncAction] = useState<() => () => void>(
    () => () => {}
  );
  const [closeFuncDashboard, setCloseFuncDashboard] = useState<
    () => () => void
  >(() => () => {});
  const [update, setUpdate] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openCompany, setOpenCompany] = useState<boolean>(false);
  const [openDescription, setOpenDescription] = useState<boolean>(false);
  const [openRemark, setOpenRemark] = useState<boolean>(false);
  const [openAction, setOpenAction] = useState<boolean>(false);
  const [openActionTable, setOpenActionTable] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<string>("");
  const [totalCalls, setTotalCalls] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [filteredTableData, setFilteredTableData] = useState<DashboardModel[]>(
    []
  );

  const [companyId, setCompanyId] = useState<string>("");
  const [callDesc, setCallDesc] = useState<string>("");
  const [editData, setEditData] = useState({});
  const [actionData, setActionData] = useState({});
  const [actionTableData, setActionTableData] = useState<{
    actionData: {
      actionTaken: string;
      actionStarted: string;
      employee: {
        _id: string;
        name: string;
      };
      _id: string;
    }[];
    companyName: string;
    callId: number;
    problemType: string;
  }>({
    actionData: [
      {
        actionTaken: "",
        actionStarted: "",
        employee: { _id: "", name: "" },
        _id: "",
      },
    ],
    companyName: "",
    callId: 0,
    problemType: "",
  });
  const handleSearch = (e: BaseSyntheticEvent) =>
    setSearch(e.target.value.toLowerCase());
  const handleFilter = (option: string) => setFilters(option);
  const handleItems = (option: string) => setItemsPerPage(+option);
  const setData = (data: { calls: DashboardModel[]; totalCalls: number }) => {
    setFilteredTableData(data.calls);
    setTotalCalls(data.totalCalls);
  };
  const setReset = () => {
    setFilters("");
    setSearch("");
    dashboardService.getFilteredTableData(page, itemsPerPage, "", 0, setData);
  };
  const getTableHeaders = () => {
    return auth.includes("user")
      ? ["Details", "Problem", "Status"]
      : ["Call ID", "Company", "Call Details", "Problem", "Action", "Status"];
  };
  const getTableStructure = () => {
    return auth.includes("user")
      ? filteredTableData.map((cell) => [
          <div className="dfc-as" key={cell.id}>
            <span className="dfc-as">{cell.id}</span>
            <span className="wd-max-cont">{cell.companyName.name}</span>
            <Apartment
              className="m-l-4 color-primary cursor-pointer"
              onClick={() => {
                setOpenCompany(true);
                setCompanyId(cell.companyName._id);
              }}
            />
          </div>,
          <div className="dfc-as">
            <div className="df-ac-jfs wd-min-cont">
              <span>{cell.problemType}</span>
              <Description
                className="m-l-4 color-primary cursor-pointer"
                onClick={() => {
                  setOpenDescription(true);
                  setCallDesc(cell.callDescription);
                }}
              />
            </div>
            <div className="df-ac-jfs">
              <span className="wd-max-cont">Add remark</span>
              <AssignmentTurnedIn
                className="m-l-4 color-primary cursor-pointer"
                onClick={() => {
                  setOpenAction(true);
                  setActionData({
                    _id: cell._id,
                    id: cell.id,
                    companyName: cell.companyName.name,
                    problemType: cell.problemType,
                    description: cell.callDescription,
                  });
                }}
              />
            </div>
          </div>,
          <div className="df-ac-jfs">
            <span>{cell.callStatus}</span>
            <button
              className="ft-sz-20 m-l-4 ft-wt-600"
              onClick={() => {
                setOpenActionTable(true);
                setActionTableData({
                  actionData: cell.actions,
                  companyName: cell.companyName.name,
                  callId: cell.id,
                  problemType: cell.problemType,
                });
              }}
            >
              [{cell.actions.length}]
            </button>
          </div>,
        ])
      : filteredTableData.map((cell) => [
          <div className="dfc-as">
            <div className="df-ac-jfs">
              <span className="dfc-as">{cell.id}</span>
              <Edit
                className="m-l-4 color-primary cursor-pointer"
                onClick={() => {
                  setEditData(cell);
                  setOpenForm(true);
                }}
              />
            </div>
            <span>{"Registered By : " + cell.registeredBy.name}</span>
          </div>,
          <div className="df-ac-jfs">
            <span className="wd-max-cont">{cell.companyName.name}</span>
            <Apartment
              className="m-l-4 color-primary cursor-pointer"
              onClick={() => {
                setOpenCompany(true);
                setCompanyId(cell.companyName._id);
              }}
            />
          </div>,
          <div className="dfc-as">
            <span>
              {"Started : " + new Date(+cell.startDate).toLocaleString("en-gb")}
            </span>
            <span>
              {"Closure : " +
                new Date(+cell.expClosure).toLocaleString("en-gb")}
            </span>
          </div>,
          <div className="dfc-as">
            <div className="df-ac-jfs wd-min-cont">
              <span>{cell.problemType}</span>
              <Description
                className="m-l-4 color-primary cursor-pointer"
                onClick={() => {
                  setOpenDescription(true);
                  setCallDesc(cell.callDescription);
                }}
              />
            </div>
            <div className="df-ac-jfs">
              <span className="wd-max-cont">Add remark</span>
              <AssignmentTurnedIn
                className="m-l-4 color-primary cursor-pointer"
                onClick={() => {
                  setOpenAction(true);
                  setActionData({
                    _id: cell._id,
                    id: cell.id,
                    companyName: cell.companyName.name,
                    problemType: cell.problemType,
                    description: cell.callDescription,
                  });
                }}
              />
            </div>
          </div>,
          <div className="dfc-as">
            <span>{"Started On: " + cell.startAction.split(",")[0]}</span>
            <span>{"Assigned to: " + cell.assignedEmployeeId.name}</span>
          </div>,
          <div className="df-ac-jfs">
            <span>{cell.callStatus}</span>
            <button
              className="ft-sz-20 m-l-4 ft-wt-600"
              onClick={() => {
                setOpenActionTable(true);
                setActionTableData({
                  actionData: cell.actions,
                  companyName: cell.companyName.name,
                  callId: cell.id,
                  problemType: cell.problemType,
                });
              }}
            >
              [{cell.actions.length}]
            </button>
          </div>,
        ]);
  };

  useEffect(() => {
    let today = new Date();
    let filterDate = 0;
    if (filters) {
      filterDate = today.setDate(
        //@ts-ignore-nextLine
        today.getDate() - filters.match(/(\d+)/)[0]
      );
    }
    dashboardService.getFilteredTableData(
      page,
      itemsPerPage,
      search,
      filterDate,
      setData
    );
  }, [filters, itemsPerPage, page, search, update]);

  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <PageHeading
          element={
            <button
              className="form-btn"
              onClick={() => {
                setOpenForm(true);
                setEditData({});
              }}
            >
              New Call
            </button>
          }
          pageName="Dashboard"
        />
        <div className="content__box">
          <TableSorting
            search={search}
            searchPlaceHolder={
              "Search by Call ID/ Company Name/ Employee/ Status"
            }
            handleSearch={handleSearch}
            filterPlaceholder={filters ? filters : "Filter"}
            handleFilter={handleFilter}
            setReset={setReset}
            itemsPlaceholder={itemsPerPage.toString()}
            handleItems={handleItems}
          />
          <Table
            pagination={true}
            currentPage={page}
            setPage={setPage}
            totalData={totalCalls}
            itemsPerPage={itemsPerPage}
            headers={getTableHeaders()}
            data={getTableStructure()}
          />
        </div>
      </div>
      <Popup
        open={openForm}
        handleClose={() => {
          setOpenForm(false);
          closeFuncDashboard();
        }}
        data={
          auth.includes("sales") ? (
            <SalesForm
              setUpdate={setUpdate}
              handleClose={() => {
                setOpenForm(false);
                closeFuncDashboard();
              }}
              setCloseFunc={setCloseFuncDashboard}
              editData={editData}
            />
          ) : (
            <DashboardForm
              setUpdate={setUpdate}
              handleClose={() => {
                setOpenForm(false);
                closeFuncDashboard();
              }}
              setCloseFunc={setCloseFuncDashboard}
              editData={editData}
            />
          )
        }
        heading="Add Call"
      />
      <Popup
        open={openCompany}
        handleClose={() => {
          setOpenCompany(false);
        }}
        data={<CompanyData companyId={companyId} />}
        heading="Company Details"
      />
      <Popup
        open={openDescription}
        handleClose={() => {
          setOpenDescription(false);
        }}
        data={<CallDescription callDesc={callDesc} />}
        heading="Description"
      />
      <Popup
        open={openRemark}
        handleClose={() => {
          setOpenRemark(false);
        }}
        data={<RemarkForm />}
        heading="Add Remark"
      />
      <Popup
        open={openAction}
        handleClose={() => {
          setOpenAction(false);
          closeFuncAction();
        }}
        data={
          <ActionForm
            setUpdate={setUpdate}
            setCloseFunc={setCloseFuncAction}
            handleClose={() => {
              setOpenAction(false);
            }}
            data={actionData}
          />
        }
        heading="Action Form"
      />
      <Popup
        open={openActionTable}
        handleClose={() => {
          setOpenActionTable(false);
        }}
        data={<ActionTable data={actionTableData} />}
        heading="Action Table"
      />
    </div>
  );
};

const mapStateToProps = (state: StoreModel) => {
  return {
    token: state.token,
    update: state.update,
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Dashboard);
