import React, { useEffect, useRef, useState } from "react";
import { PageHeading } from "../Components/PageHeading";
import { Controls } from "../Components/Controls/Controls";
import { useForm } from "../Components/UseForm";
import {
  authService,
  customerService,
  reportService,
} from "../Service/Service";
import { CSVLink } from "react-csv";

const Reports: React.FC = () => {
  const initialVal = {
    user: "",
    userStart: "",
    userEnd: "",
    company: "",
    companyStart: "",
    companyEnd: "",
  };
  const userEl = useRef(null);
  const companyEl = useRef(null);

  const [users, setUsers] = useState<{ name: string; _id: string }[]>([]);
  const [companies, setCompanies] = useState<{ name: string; _id: string }[]>(
    []
  );
  const [csvUserData, setCsvUserData] = useState<any[]>([]);
  const [csvCompanyData, setCsvCompanyData] = useState<any[]>([]);

  const [companyName, setCompanyName] = useState("");
  const [userName, setUserName] = useState("");

  const genUserReport = (data: any) => {
    const csvData = [
      [
        "ID",
        "Company Name",
        "Problem Type",
        "Description",
        "Start Date",
        "End Date",
        "Expected Closure",
        "Registered By",
      ],
    ];
    data.forEach((element: any) => {
      csvData.push([
        element.id,
        element.companyName.name,
        element.problemType,
        element.callDescription,
        new Date(element.startDate).toLocaleString("en-gb"),
        new Date(element.endDate).toLocaleString("en-gb"),
        new Date(element.expClosure).toLocaleString("en-gb"),
        element.registeredBy.name,
      ]);
    });
    setCsvUserData([...csvData]);
    //@ts-ignore
    userEl.current.link.click();
  };
  const genCompanyReport = (data: any) => {
    const csvData = [
      [
        "ID",
        "Problem Type",
        "Description",
        "Start Date",
        "End Date",
        "Expected Closure",
        "Assigned Employee",
        "Registered By",
      ],
    ];
    data.forEach((element: any) => {
      csvData.push([
        element.id,
        element.problemType,
        element.callDescription,
        new Date(element.startDate).toLocaleString("en-gb"),
        new Date(element.endDate).toLocaleString("en-gb"),
        new Date(element.expClosure).toLocaleString("en-gb"),
        element.assignedEmployeeId.name,
        element.registeredBy.name,
      ]);
    });
    setCsvCompanyData([...csvData]);
    //@ts-ignore
    companyEl.current.link.click();
  };

  const handleUserReport = () => {
    reportService.employeeReport(
      {
        employeeId: values.user,
        startDate: new Date(values.userStart).getTime(),
        endDate: new Date(values.userEnd).getTime(),
      },
      genUserReport
    );
  };
  const handleCompanyReport = () => {
    reportService.companyReport(
      {
        name: values.company,
        startDate: new Date(values.companyStart).getTime(),
        endDate: new Date(values.companyEnd).getTime(),
      },
      genCompanyReport
    );
  };
  useEffect(() => {
    customerService.getCompnyList(setCompanies);
    authService.getUsers(setUsers);
  }, []);
  const { values, setValues } = useForm(initialVal);

  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <PageHeading element={<div />} pageName="Reports" />
        <div className="content__box">
          <table className="table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Entity</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody className="m-t-16">
              <tr>
                <td className="va-mid">User</td>
                <td>
                  <Controls.SearchBox
                    iniVal=""
                    placeholder="Employee"
                    options={users}
                    className="search-box"
                    onChange={(selected: { name: string; _id: string }[]) => {
                      if (selected.length > 0) {
                        setValues({
                          ...values,
                          user: selected[0]._id,
                        });
                        setUserName(selected[0].name);
                      } else {
                        setValues({ ...values, user: "" });
                        setUserName("");
                      }
                    }}
                  />
                </td>
                <td>
                  <Controls.DateInput
                    handleChange={(date: Date) =>
                      setValues({ ...values, userStart: date })
                    }
                    value={values.userStart}
                  />
                </td>
                <td>
                  <Controls.DateInput
                    handleChange={(date: Date) =>
                      setValues({ ...values, userEnd: date })
                    }
                    value={values.userEnd}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={handleUserReport}
                  >
                    Generate
                  </button>
                  <CSVLink
                    ref={userEl}
                    data={csvUserData}
                    filename={
                      userName ? userName.replace(/[^a-zA-Z ]/g, "") : userName
                    }
                    className="display-none"
                    target="_blank"
                  />
                </td>
              </tr>
              <tr>
                <td className="va-mid">Company</td>
                <td>
                  <Controls.SearchBox
                    iniVal=""
                    placeholder="Company"
                    options={companies}
                    className="search-box"
                    onChange={(selected: { name: string; _id: string }[]) => {
                      if (selected.length > 0) {
                        setValues({
                          ...values,
                          company: selected[0]._id,
                        });
                        setCompanyName(selected[0].name);
                      } else {
                        setValues({ ...values, company: "" });
                        setCompanyName("");
                      }
                    }}
                  />
                </td>
                <td>
                  <Controls.DateInput
                    handleChange={(date: Date) =>
                      setValues({ ...values, companyStart: date })
                    }
                    value={values.companyStart}
                  />
                </td>
                <td>
                  <Controls.DateInput
                    handleChange={(date: Date) =>
                      setValues({ ...values, companyEnd: date })
                    }
                    value={values.companyEnd}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={handleCompanyReport}
                  >
                    Generate
                  </button>
                  <CSVLink
                    ref={companyEl}
                    data={csvCompanyData}
                    filename={
                      companyName
                        ? companyName.replace(/[^a-zA-Z ]/g, "")
                        : companyName
                    }
                    className="display-none"
                    target="_blank"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
