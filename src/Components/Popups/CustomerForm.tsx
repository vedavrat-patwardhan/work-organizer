import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { authService, customerService } from "../../Service/Service";
import { Edit, Close } from "@mui/icons-material";
import { Controls } from "../Controls/Controls";
import { useForm } from "../UseForm";
import { ContactForm } from "./ContactForm";
import { Popup } from "./Popup";

export const CustomerForm: React.FC<{
  editData: any;
  update: () => void;
  addCloseFunc: React.Dispatch<React.SetStateAction<() => () => void>>;
}> = ({ editData, update, addCloseFunc }) => {
  const initialVal = {
    name: "",
    contactPerson: [],
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    amc: [],
    hasAmc: false,
  };
  const [open, setOpen] = useState<boolean>(false);
  const [editContact, setEditContact] = useState({});
  const [cpIndex, setCpIndex] = useState<number>(-1);
  const [amcWeek, setAmcWeek] = useState<string[]>(["Week"]);
  const [amcDay, setAmcDay] = useState<string[]>(["Day"]);
  const [users, setUsers] = useState<{ name: string; _id: string }[]>([]);
  const [closeFunc, setCloseFunc] = useState<() => () => void>(() => () => {});
  const [editing, setEditing] = useState<boolean>(false);
  // const [errors, setErrors] = useState<{
  //   contactEmail: string;
  //   mobileNo: string;
  // }>({ contactEmail: "", mobileNo: "" });
  const { values, setValues, handleInput } = useForm(initialVal);
  const handleAmcWeekChange = (
    week: number,
    position: number,
    weekName: string
  ) => {
    const oldAmc = [...values.amc];
    oldAmc[position] = { ...values.amc[position], week };
    const oldAmcWeek = [...amcWeek];
    oldAmcWeek[position] = weekName;
    setAmcWeek([...oldAmcWeek]);
    setValues({
      ...values,
      amc: [...oldAmc],
    });
  };
  const handleAmcDayChange = (
    day: number,
    position: number,
    weekName: string
  ) => {
    const oldAmc = [...values.amc];
    oldAmc[position] = { ...values.amc[position], day };
    const oldAmcDay = [...amcDay];
    oldAmcDay[position] = weekName;
    setAmcDay([...oldAmcDay]);
    setValues({
      ...values,
      amc: [...oldAmc],
    });
  };
  const addContact = (contact: {
    name: string;
    email: string;
    mobile: string[];
  }) => {
    if (cpIndex === -1) {
      setValues({
        ...values,
        contactPerson: [...values.contactPerson, contact],
      });
    } else {
      const cp = [...values.contactPerson];
      cp[cpIndex] = { ...contact };
      setValues({
        ...values,
        contactPerson: [...cp],
      });
      setCpIndex(-1);
    }

    setOpen(false);
  };
  const closeForm = () => {
    update();
    setEditing(false);
    setValues(initialVal);
  };
  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (editing) {
      customerService.updateCompany(editData._id, values, closeForm);
    } else {
      customerService.addCompany(values, closeForm);
    }
  };
  const dayNames: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekNames: string[] = ["Weekly", "1st", "2nd", "3rd", "4th"];
  useEffect(() => {
    authService.getUsers(setUsers);
  }, []);
  useEffect(() => {
    addCloseFunc(() => closeForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCloseFunc]);
  useEffect(() => {
    if (editData._id) {
      setEditing(true);
      setValues(editData);
      if (editData.hasAmc) {
        const newAmcWeek: string[] = [];
        const newAmcDay: string[] = [];
        editData.amc.forEach(
          (
            amcData: { week: number; day: number; employee: string },
            i: number
          ) => {
            if (amcData.week === 0 && amcData.day === -1) {
              newAmcWeek[i] = "Daily";
            } else {
              newAmcWeek[i] = weekNames[amcData.week];
              newAmcDay[i] = dayNames[amcData.day];
            }
          }
        );
        setAmcWeek(newAmcWeek);
        setAmcDay(newAmcDay);
      }
    } else {
      setEditing(false);
      setValues(initialVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);
  return (
    <div className="dashboard-form min-wd-75r p-a-24 ">
      <div className="dashboard-form__col-1">
        <strong>Company Name :</strong>
        <Controls.NormalInput
          placeholder="Company Name"
          handleInput={handleInput}
          name="name"
          value={values.name}
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
            type="number"
            handleInput={handleInput}
            name="pincode"
            value={values.pincode}
          />
        </div>
      </div>
      <div className="dashboard-form__col-2">
        <strong>Contact Person :</strong>
        <div className="df-ac">
          {values.contactPerson.map(
            (
              contact: { name: string; email: string; mobile: string },
              index: number
            ) => (
              <div key={contact.email} className="p-lr-12 m-r-8 name-box">
                {contact.name}
                <Edit
                  className="m-l-4 m-r-4 cursor-pointer on-hover-black"
                  fontSize="small"
                  onClick={() => {
                    setEditContact(contact);
                    setCpIndex(index);
                    setOpen(true);
                  }}
                />
                <Close
                  className="cursor-pointer on-hover-black"
                  fontSize="small"
                  onClick={() => {
                    const cp = [...values.contactPerson];
                    cp.splice(index, 1);
                    setValues({ ...values, contactPerson: [...cp] });
                  }}
                />
              </div>
            )
          )}
        </div>
        <button
          className="btn btn-success"
          type="button"
          onClick={() => setOpen(true)}
        >
          Add contact +
        </button>
        <div className="df-ac m-t-16">
          <input
            type="checkbox"
            name="amc"
            onChange={() =>
              setValues({
                ...values,
                hasAmc: !values.hasAmc,
              })
            }
            checked={values.hasAmc}
          />
          <span className="m-l-16">AMC</span>
        </div>
        {values.hasAmc && (
          <>
            {values.amc.map(
              (
                amcData: { week: number; day: number; employee: string },
                i: number
              ) => {
                return (
                  <div
                    className="df-ac-jsb wd-100p"
                    key={amcData.employee + amcData.day}
                  >
                    <Controls.DropDown
                      placeholder={amcWeek[i]}
                      options={["1st", "2nd", "3rd", "4th", "Daily", "Weekly"]}
                      handleInput={(option: string) => {
                        switch (option) {
                          case "1st":
                            handleAmcWeekChange(1, i, option);
                            break;
                          case "2nd":
                            handleAmcWeekChange(2, i, option);
                            break;
                          case "3rd":
                            handleAmcWeekChange(3, i, option);
                            break;
                          case "4th":
                            handleAmcWeekChange(4, i, option);
                            break;
                          case "Daily":
                          case "Weekly":
                            handleAmcWeekChange(0, i, option);
                            break;
                          default:
                            return;
                        }
                      }}
                      dropClsss="amc-week"
                    />
                    {amcWeek[i] !== "Daily" && (
                      <Controls.DropDown
                        placeholder={amcDay[i]}
                        options={[
                          "Sunday",
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ]}
                        handleInput={(option: string) => {
                          switch (option) {
                            case "Sunday":
                              handleAmcDayChange(0, i, option);
                              break;
                            case "Monday":
                              handleAmcDayChange(1, i, option);
                              break;
                            case "Tuesday":
                              handleAmcDayChange(2, i, option);
                              break;
                            case "Wednesday":
                              handleAmcDayChange(3, i, option);
                              break;
                            case "Thursday":
                              handleAmcDayChange(4, i, option);
                              break;
                            case "Friday":
                              handleAmcDayChange(5, i, option);
                              break;
                            case "Saturday":
                              handleAmcDayChange(6, i, option);
                              break;
                            default:
                              return;
                          }
                        }}
                        dropClsss="amc-week"
                        btnClass="m-l-8"
                      />
                    )}
                    <Controls.SearchBox
                      //@ts-ignore:next-line
                      iniVal={
                        editData.amc
                          ? users.find(
                              (user: { name: string; _id: string }) =>
                                user._id === amcData.employee
                            )
                          : ""
                      }
                      placeholder="Employee"
                      options={users}
                      className="m-l-8 search-box"
                      onChange={(selected: { name: string; _id: string }[]) => {
                        if (selected.length > 0) {
                          const oldAmc = [...values.amc];
                          oldAmc[i] = {
                            ...values.amc[i],
                            employee: selected[0]._id,
                          };
                          setValues({
                            ...values,
                            amc: oldAmc,
                          });
                        } else {
                          const oldAmc = [...values.amc];
                          oldAmc[i] = {
                            ...values.amc[i],
                            employee: "",
                          };
                          setValues({
                            ...values,
                            amc: oldAmc,
                          });
                        }
                      }}
                    />
                    <button
                      className="remove-amc m-l-4"
                      onClick={() => {
                        const updatedAmc = [...values.amc];
                        updatedAmc.splice(i, 1);
                        setValues((prevVal: any) => ({
                          ...prevVal,
                          amc: updatedAmc,
                        }));
                      }}
                    >
                      X
                    </button>
                  </div>
                );
              }
            )}
            <button
              className="btn btn-info"
              onClick={() => {
                setValues((prevVal: any) => ({
                  ...prevVal,
                  amc: [
                    ...prevVal.amc,
                    {
                      week: 1,
                      day: 0,
                      employee: "",
                    },
                  ],
                }));
                setAmcWeek((prevVal: string[]) => [...prevVal, "Week"]);
                setAmcDay((prevVal: string[]) => [...prevVal, "Sunday"]);
              }}
            >
              Add Amc
            </button>
          </>
        )}
        <button className="btn btn-primary m-t-16" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <Popup
        open={open}
        handleClose={() => {
          setOpen(false);
          closeFunc();
        }}
        data={
          <ContactForm
            addContact={addContact}
            setCloseFunc={setCloseFunc}
            editContact={editContact}
          />
        }
        heading="Add Contact"
      />
    </div>
  );
};
