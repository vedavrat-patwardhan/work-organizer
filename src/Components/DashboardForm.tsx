import React, { BaseSyntheticEvent, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Controls } from "./Controls/Controls";
import { authService } from "../Service/Service";
import { Typeahead } from "react-bootstrap-typeahead";
import { useForm } from "./Popups/UseForm";
import { Option } from "react-bootstrap-typeahead/types/types";

export const DashboardForm: React.FC = () => {
  const initialValue = {
    customerName: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonMobile: "",
    streetAddress: "",
    assignedEmployeeId: "",
    startDate: "",
    expClosure: "",
    problemType: "",
    callDescription: "",
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    // authService.userRegistration(values);
    console.log(values);
  };

  const { values, handleInput } = useForm(initialValue);
  const [selectedItem, setSelectedItem] = useState<[]>([]);
  const company = [
    {
      _id: "6213bb77216f2ea08e11d018",
      name: "Logic Systems",
    },
    {
      _id: "6224592775a4db82c64257e0",
      name: "Microsoft",
    },
  ];
  return (
    <div className="dashboard-form">
      <div className="dashboard-form__col-1">
        <div className="df-ac wd-100p">
          {/* <Controls.NormalInput
            placeholder="Customer Name"
            handleInput={handleInput}
            name="customerName"
            value={values.customerName}
            className="wd-70p m-r-16"
          /> */}
          <Typeahead
            id="dashboardFormId"
            labelKey="name"
            className="wd-70p m-r-16 form-input search-input"
            placeholder="Customer Name"
            //@ts-ignore-nextLine
            onChange={setSelectedItem}
            options={company}
            selected={selectedItem}
          />
          <AddCircleOutlineIcon className="ft-sz-40" />
        </div>
        <strong>Contact Person</strong>
        <Controls.NormalInput
          placeholder="Name"
          handleInput={handleInput}
          name="contactPersonName"
          value={values.contactPersonName}
          className="wd-70p m-r-16"
        />
        <Controls.NormalInput
          placeholder="Email"
          handleInput={handleInput}
          name="contactPersonEmail"
          value={values.contactPersonEmail}
          className="wd-70p m-r-16"
        />
        <Controls.NormalInput
          placeholder="Mobile Number"
          handleInput={
            handleInput /*update it in future to maintain [Number] */
          }
          name="contactPersonMobile"
          value={values.contactPersonMobile}
          className="wd-70p m-r-16"
        />
        <strong>Address :</strong>
        <div className="df-ac">
          <Controls.NormalInput
            placeholder="Street Address"
            handleInput={handleInput}
            name="streetAddress"
            value={values.streetAddress}
            className="wd-70p m-r-8"
          />
          <Controls.NormalInput
            placeholder="Pincode"
            handleInput={handleInput}
            name="pincode"
            value={values.pincode}
            className="wd-30p m-r-16"
          />
        </div>
        <div className="df-ac">
          <Controls.NormalInput
            placeholder="City"
            handleInput={handleInput}
            name="city"
            value={values.city}
            className="wd-50p m-r-8"
          />
          <Controls.NormalInput
            placeholder="State"
            handleInput={handleInput}
            name="state"
            value={values.state}
            className="wd-50p m-r-16"
          />
        </div>
      </div>

      <div className="dashboard-form__col-2">
        <strong>Call assign to :</strong>
        <Controls.NormalInput
          placeholder="Employee"
          handleInput={
            handleInput /*update it in future to maintain [Number] */
          }
          name="assignedEmployeeId"
          value={values.assignedEmployeeId}
          className="wd-70p m-r-16"
        />
        <strong>Call Status : </strong>
        <div className="df-ac">
          <Controls.NormalInput
            placeholder="Start-Date"
            handleInput={
              handleInput /*update it in future to maintain [Number] */
            }
            name="startDate"
            value={values.startDate}
            className="wd-40p m-r-8"
          />
          <Controls.NormalInput
            placeholder="Closure-Date"
            handleInput={handleInput}
            name="expClosure"
            value={values.expClosure}
            className="wd-40p m-r-16"
          />
        </div>

        <Controls.NormalInput
          placeholder="Problem Type"
          handleInput={handleInput}
          name="problemType"
          value={values.problemType}
          className="wd-70p m-r-16"
        />

        <Controls.NormalInput
          placeholder="Call Description"
          handleInput={handleInput}
          name="callDescription"
          value={values.callDescription}
          className="wd-70p  m-r-16"
        />
        <div className="df-ac ">
          <button className="form-btn btn--disabled wd-30p m-r-16">
            Submit
          </button>
          <button className="form-btn cursor-pointer wd-30p">Reset</button>
        </div>
      </div>
    </div>
  );
};
