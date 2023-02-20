import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Controls } from "../Controls/Controls";
import { useForm } from "../UseForm";
import {
  authService,
  customerService,
  dashboardService,
} from "../../Service/Service";
import { CompanyDataModel } from "../../Models/PagesModel";
import { getTypesOfSales } from "../../Service/Collection";
import useMediaQuery from "@mui/material/useMediaQuery";
import { connect } from "react-redux";
import { StoreModel } from "../../Models/StoreModel";

const SalesForm: React.FC<{
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  editData: any;
  auth: string;
  setCloseFunc: React.Dispatch<React.SetStateAction<() => () => void>>;
}> = ({ setUpdate, handleClose, editData, auth, setCloseFunc }) => {
  const matches = useMediaQuery("(max-width:768px)");
  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);
  const initialValue = {
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    callDescription: "",
    companyName: "",
    contactPerson: "",
    email: "",
    mobile: [],
    isSales: true,
    assignedEmployeeId: "6275707cf1b4028faf6cd004",
    callStatus: "Unallocated",
    startDate: new Date(),
    startAction: "",
    problemType: "",
    expClosure: new Date().getHours() > 12 ? tommorow : new Date(),
    actions: [],
  };
  const { values, setValues, handleInput, validateEmail } =
    useForm(initialValue);
  const [editing, setEditing] = useState<boolean>(false);
  const [users, setUsers] = useState<{ name: string; _id: string }[]>([]);
  const [companies, setCompanies] = useState<{ name: string; _id: string }[]>(
    []
  );
  const [iniVal, setIniVal] = useState({
    companyName: "",
    contactPerson: "",
    assignedEmployeeId: "Swapnil Jagtap",
    problemType: "",
  });
  const [customers, setCustomers] = useState<
    { name: string; email: string; mobile: number[] }[]
  >([]);
  const validate = () => {
    const temp: {
      [key: string]: any;
    } = {};
    temp.companyName = values.companyName ? "" : "Company field is required!";
    temp.contactPerson = values.contactPerson
      ? ""
      : "Contact Person name is required!";
    temp.assignedEmployeeId = values.assignedEmployeeId
      ? ""
      : "Assigned user is required!";
    temp.problemType = values.problemType ? "" : "Problem Type is required!";
    if (values.email) {
      temp.email = validateEmail(values.email)
        ? ""
        : "Please enter valid mail id";
    }
    // values.mobile.every((number: string) => {
    //   if (!validateMobile(number)) {
    //     temp.mobile = "Please Enter valid mobile number";
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
    if (!Object.values(temp).every((x) => x === "")) {
      toast.error(Object.values(temp).join(" "));
    }
    return Object.values(temp).every((x) => x === "");
  };
  const handleReset = () => {
    setValues(initialValue);
    setIniVal({
      companyName: "clear",
      contactPerson: "clear",
      assignedEmployeeId: "Swapnil Jagtap",
      problemType: "clear",
    });
  };
  const closeForm = () => {
    setUpdate((prevValue: boolean) => !prevValue);
    handleClose();
    handleReset();
    setEditing(false);
  };
  const autoFillCompany = (data: CompanyDataModel) => {
    if (data.name) {
      setIniVal({ ...iniVal, companyName: data.name });
    }
    if (auth.includes("user")) {
      setValues({
        ...values,
        companyName: data.company,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        contactPerson: data.contactPerson[0].name,
        email: data.contactPerson[0].email,
        mobile: data.contactPerson[0].mobile,
      });
    } else {
      setCustomers(data.contactPerson);
      setValues({
        ...values,
        companyName: data.company,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      });
    }
  };
  const autoFillCustomer = (data: {
    name: string;
    email: string;
    mobile: number[];
  }) => {
    if (data) {
      setIniVal({ ...iniVal, contactPerson: data.name });
      setValues({
        ...values,
        contactPerson: data.name,
        email: data.email,
        mobile: data.mobile,
      });
    } else {
      setValues({
        ...values,
        contactPerson: "",
        email: "",
        mobile: [],
      });
    }
  };
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    if (editing) {
      dashboardService.updateCall(
        {
          ...values,
          startDate: values.startDate.getTime(),
          expClosure: values.expClosure.getTime(),
        },
        closeForm
      );
    } else {
      dashboardService.createCall(
        {
          ...values,
          startDate: values.startDate.getTime(),
          expClosure: values.expClosure.getTime(),
        },
        closeForm
      );
    }
  };
  useEffect(() => {
    setCloseFunc(() => handleReset);
    if (editData._id) {
      setEditing(true);
      setIniVal({
        companyName: editData.companyName,
        contactPerson: editData.contactPerson,
        assignedEmployeeId: editData.assignedEmployeeId,
        problemType: editData.problemType,
      });
      setValues({
        ...editData,
        startDate: new Date(editData.startDate),
        expClosure: new Date(editData.expClosure),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  useEffect(() => {
    customerService.getCompnyList(setCompanies);
    authService.getUsers(setUsers);
  }, []);

  return (
    <form
      className={`dashboard-form p-a-24 ${matches ? "wd-95vw" : "min-wd-75r"}`}
      onSubmit={handleSubmit}
    >
      {auth.includes("user") ? (
        <div className="dfc wd-100p">
          <strong>Company Name:</strong>
          <Controls.SearchBox
            className="m-b-16 search-box"
            placeholder="Company Name"
            options={companies}
            iniVal={iniVal.companyName}
            onChange={(selected: { name: string; _id: string }[] | string) => {
              if (!Array.isArray(selected)) {
                setValues({ ...values, companyName: selected });
                setIniVal({ ...iniVal, companyName: selected });
                return;
              }
              if (selected.length > 0) {
                customerService.getCompany(selected[0]._id, autoFillCompany);
                return;
              }
              setCustomers([]);
              setValues({
                ...values,
                companyName: "",
                streetAddress: "",
                city: "",
                state: "",
                pincode: "",
              });
            }}
          />
          <strong>Lead:</strong>
          <Controls.SearchBox
            iniVal={iniVal.problemType}
            placeholder="Problem Type"
            options={getTypesOfSales}
            className="m-b-16 search-box"
            onChange={(selected: { name: string }[]) => {
              if (selected.length > 0) {
                setValues({ ...values, problemType: selected[0].name });
                setIniVal({ ...iniVal, problemType: selected[0].name });
              } else {
                setValues({ ...values, problemType: "" });
                setIniVal({ ...iniVal, problemType: "" });
              }
            }}
          />
          <strong>Call Description :</strong>
          <textarea
            name="callDescription"
            value={values.callDescription}
            onChange={handleInput}
            placeholder="Call Description"
            cols={30}
            rows={6}
            className="m-b-16 form-control"
          />
          <div className="df-ac ">
            <button className="btn btn-primary wd-30p m-r-16" type="submit">
              Submit
            </button>
            <button
              className="btn btn-secondary wd-30p"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="dashboard-form__col-1">
            <div className="df-ac wd-100p">
              <Controls.SearchBox
                className="m-r-16 search-box"
                placeholder="Company Name"
                options={companies}
                iniVal={iniVal.companyName}
                onChange={(
                  selected: { name: string; _id: string }[] | string
                ) => {
                  if (!Array.isArray(selected)) {
                    setValues({ ...values, companyName: selected });
                    setIniVal({ ...iniVal, companyName: selected });
                    return;
                  }
                  if (selected.length > 0) {
                    customerService.getCompany(
                      selected[0]._id,
                      autoFillCompany
                    );
                    return;
                  }
                  setCustomers([]);
                  setValues({
                    ...values,
                    companyName: "",
                    streetAddress: "",
                    city: "",
                    state: "",
                    pincode: "",
                  });
                }}
              />
              <AddCircleOutlineIcon className="ft-sz-32 cursor-pointer on-hover-black" />
            </div>
            <strong>Contact Person</strong>
            <div className="wd-100p df-ac">
              <div className="df-ac wd-50p">
                <Controls.SearchBox
                  iniVal={iniVal.contactPerson}
                  className="m-r-8 search-box"
                  placeholder="Customer Name"
                  options={customers}
                  onChange={(
                    selected: {
                      name: string;
                      email: string;
                      mobile: number[];
                    }[]
                  ) => {
                    autoFillCustomer(selected[0]);
                  }}
                />
              </div>
              <Controls.NormalInput
                placeholder="Email"
                handleInput={handleInput}
                name="email"
                value={values.email}
                className="wd-50p m-r-8"
              />
              <AddCircleOutlineIcon className="ft-sz-32 cursor-pointer on-hover-black" />
            </div>
            <Controls.NormalInput
              placeholder="Mobile Number"
              handleInput={
                handleInput /*update it in future to maintain [Number] */
              }
              name="mobile"
              value={values.mobile}
              className="m-b-16"
            />
            <strong>Address :</strong>
            <Controls.NormalInput
              placeholder="Street Address"
              handleInput={handleInput}
              name="streetAddress"
              value={values.streetAddress}
              className="m-b-16"
            />
            <div className="df-ac">
              <Controls.NormalInput
                placeholder="City"
                handleInput={handleInput}
                name="city"
                value={values.city}
                className="m-r-8"
              />
              <Controls.NormalInput
                placeholder="State"
                handleInput={handleInput}
                name="state"
                value={values.state}
                className="m-r-8"
              />
              <Controls.NormalInput
                placeholder="Pincode"
                handleInput={handleInput}
                name="pincode"
                value={values.pincode}
              />
            </div>
            <strong>Call assign to :</strong>
            <Controls.SearchBox
              iniVal={iniVal.assignedEmployeeId}
              placeholder="Employee"
              options={users}
              className="m-r-8 search-box"
              onChange={(selected: { name: string; _id: string }[]) => {
                if (selected.length > 0) {
                  setValues({ ...values, assignedEmployeeId: selected[0]._id });
                } else {
                  setValues({ ...values, assignedEmployeeId: "" });
                }
              }}
            />
          </div>
          <div className="dashboard-form__col-2">
            <div className="df-ac">
              <div className="dfc wd-50p m-r-16">
                <em>Start Date: </em>
                <Controls.DateInput
                  handleChange={(date: Date) =>
                    setValues({ ...values, startDate: date })
                  }
                  value={values.startDate}
                />
              </div>
              <div className="dfc wd-50p">
                <em>End Date: </em>
                <Controls.DateInput
                  handleChange={(date: Date) =>
                    setValues({ ...values, expClosure: date })
                  }
                  value={values.expClosure}
                />
              </div>
            </div>
            <strong>Lead:</strong>
            <Controls.SearchBox
              iniVal={iniVal.problemType}
              placeholder="Problem Type"
              options={getTypesOfSales}
              className="m-b-16 search-box"
              onChange={(selected: { name: string }[]) => {
                if (selected.length > 0) {
                  setValues({ ...values, problemType: selected[0].name });
                  setIniVal({ ...iniVal, problemType: selected[0].name });
                } else {
                  setValues({ ...values, problemType: "" });
                  setIniVal({ ...iniVal, problemType: "" });
                }
              }}
            />
            <strong>Description :</strong>
            <textarea
              name="callDescription"
              value={values.callDescription}
              onChange={handleInput}
              placeholder="Description"
              cols={30}
              rows={6}
              className="m-b-16 form-control"
            />
            <div className="df-ac ">
              <button className="btn btn-primary wd-30p m-r-16" type="submit">
                Submit
              </button>
              <button
                className="btn btn-secondary wd-30p"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </form>
  );
};

const mapStateToProps = (state: StoreModel) => {
  return {
    token: state.token,
    update: state.update,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(SalesForm);
