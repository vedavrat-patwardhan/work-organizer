import React, { BaseSyntheticEvent, useState } from "react";
import { Controls } from "../Components/Controls/Controls";
import { useForm } from "../Components/UseForm";

export const CustomerForm: React.FC = () => {
  const initialVal = {
    companyName: "",
    city: "",
    pincode: "",
    streetAddress: "",
    state: "",
    contactName: "",
    contactEmail: "",
    mobileNo: "",
  };
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    contactEmail: string;
    mobileNo: string;
  }>({ contactEmail: "", mobileNo: "" });
  const { values, handleInput, validateEmail, validateMobile } =
    useForm(initialVal);
  const validate = () => {
    const temp = { ...initialVal };
    temp.contactEmail = validateEmail(values.contactEmail)
      ? ""
      : "Please enter valid mail id";
    temp.mobileNo = validateMobile(values.mobileNo)
      ? ""
      : "Please enter valid mobile no";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (validate()) {
      // authService.companyRegistration(values);
      console.log(values);
    }
  };
  return (
    //  className="wd-100p m-t-12"

    <div className="p-a-14">
      <form className=" wd-100p" onSubmit={handleSubmit}>
        <div className="df-as-jse">
          <div className="register-input wd-50p">
            <>Company Name:</>
            <Controls.NormalInput
              className="wd-75p m-b-12"
              placeholder="Company Name"
              type="text"
              name="companyName"
              value={values.companyName}
              handleInput={handleInput}
            />
            <>City:</>

            <Controls.NormalInput
              className="wd-75p m-b-12"
              placeholder="City"
              type="text"
              name="city"
              value={values.city}
              handleInput={handleInput}
            />
            <>Street Address:</>
            <Controls.NormalInput
              className="wd-75p m-b-12"
              placeholder="Street Address"
              type="text"
              name="streetAddress"
              value={values.streetAddress}
              handleInput={handleInput}
            />
            <>State:</>

            <Controls.NormalInput
              className="wd-75p m-b-12"
              placeholder="State"
              type="text"
              name="state"
              value={values.state}
              handleInput={handleInput}
            />
            <>Pincode:</>

            <Controls.NormalInput
              className="wd-75p m-b-12"
              placeholder="Pincode"
              type="number"
              name="pincode"
              value={values.pincode}
              handleInput={handleInput}
            />
          </div>{" "}
          <div className="register-input wd-50p">
            <>Companies Employee:</>
            <Controls.NormalInput
              className="wd-75p m-b-12"
              placeholder="Contact Name"
              type="text"
              name="contactName"
              value={values.contactName}
              handleInput={handleInput}
            />
            <>Employee's Email:</>

            <Controls.NormalInput
              className="wd-75p m-b-12"
              placeholder="Contact Email"
              type="email"
              name="contactEmail"
              value={values.contactEmail}
              handleInput={handleInput}
              error={errors.contactEmail}
            />
            <>Employee's No.:</>
            <Controls.NormalInput
              className="wd-75p m-b-12"
              placeholder="Mobile No."
              type="text"
              name="mobileNo"
              value={values.mobileNo}
              handleInput={handleInput}
              error={errors.mobileNo}
            />
            <div>
              <div className="df-ac">
                AMC
                <input
                  className="m-l-12"
                  placeholder="AMC"
                  type="checkbox"
                  name="checkBox"
                  onClick={() => setCheckBox(!checkBox)}
                />
              </div>
              {checkBox && (
                <div className="df-as-jse wd-75p">
                  <Controls.NormalInput
                    className="m-t-12 wd-95p"
                    placeholder="Week"
                    type="text"
                    name="mobileNo"
                    value={values.mobileN0}
                    handleInput={handleInput}
                  />
                  <Controls.NormalInput
                    className="m-t-12 wd-95p"
                    placeholder="Day"
                    type="text"
                    name="mobileNo"
                    value={values.mobileN0}
                    handleInput={handleInput}
                  />
                  <Controls.NormalInput
                    className="m-t-12 wd-95p"
                    placeholder="Employee"
                    type="text"
                    name="mobileNo"
                    value={values.mobileN0}
                    handleInput={handleInput}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="df-jc wd-100p">
          <button
            className={`form-btn m-t-16 wd-35p ${
              Object.values(values).every((x) => x !== "")
                ? ""
                : "btn--disabled"
            }`}
            type="submit"
          >
            Add Company
          </button>
        </div>
      </form>
    </div>
  );
};
