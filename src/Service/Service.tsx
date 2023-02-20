import {
  CompanyDataModel,
  CustomersModel,
  UserRegisterModel,
  UsersModel,
} from "../Models/PagesModel";
import { bearerInstance, contentInstance } from "./Interceptors";

export const authService = {
  userRegistration(data: UserRegisterModel, resetForm: () => void) {
    contentInstance
      .post(
        `${process.env.REACT_APP_API_KEY}/register/user?adminMail=${data.adminMail}&adminPassword=${data.adminPassword}`,
        data
      )
      .then(() => resetForm())
      .catch((err) => console.error(err.response.data));
  },
  changePass(
    data: { currentPass: string; newPass: string },
    setErrors: React.Dispatch<
      React.SetStateAction<{
        currentPass: string;
        confirmNewPass: string;
      }>
    >,
    resetValues: () => void
  ) {
    bearerInstance
      .patch(`${process.env.REACT_APP_API_KEY}/change-pass`, data)
      .then(() => resetValues())
      .catch((err) => {
        setErrors(err.response.data);
      });
  },
  getUsers(
    setUsers: React.Dispatch<
      React.SetStateAction<
        {
          name: string;
          _id: string;
        }[]
      >
    >
  ) {
    bearerInstance
      .get(`${process.env.REACT_APP_API_KEY}/users-list`)
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error(err.response.status === 401);
      });
  },
};

export const dashboardService = {
  addAmcCall(navigate: any) {
    bearerInstance
      .post(`${process.env.REACT_APP_API_KEY}/add-amc`, {})
      .then(() => navigate("/dashboard"))
      .catch((err: any) => {
        console.error(err);
      });
  },
  getFilteredTableData(
    page: number,
    itemsPerPage: number,
    search: string,
    filters: number,
    setData: any
  ) {
    bearerInstance
      .get(
        `${process.env.REACT_APP_API_KEY}/calls/${itemsPerPage}/${page}?search=${search}&filters=${filters}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err: any) => console.error(err));
  },
  createCall(data: any, closeForm: () => void) {
    bearerInstance
      .post(`${process.env.REACT_APP_API_KEY}/create-call`, data)
      .then(() => closeForm())
      .catch((err) => console.error(err));
  },
  updateCall(data: any, closeForm: () => void) {
    bearerInstance
      .patch(`${process.env.REACT_APP_API_KEY}/update-call`, data)
      .then(() => closeForm())
      .catch((err) => console.error(err));
  },
  addAction(
    data: {
      _id: string;
      actionTaken: string;
      actionStarted: string;
      employee: string;
      complete: boolean;
    },
    closeForm: () => void
  ) {
    bearerInstance
      .patch(`${process.env.REACT_APP_API_KEY}/add-action`, data)
      .then(() => closeForm())
      .catch((err) => console.error(err));
  },
};

export const customerService = {
  getCompanies(
    itemsPerPage: number,
    page: number,
    search: string,
    updateTable: (data: CustomersModel[], totalCount: number) => void
  ) {
    bearerInstance
      .get(
        `${process.env.REACT_APP_API_KEY}/companies/${itemsPerPage}/${page}?search=${search}`
      )
      .then((res) => updateTable(res.data.companies, res.data.totalCompanies))
      .catch((err: any) => {
        console.error(err);
      });
  },
  getCompnyList(
    setCompanies: React.Dispatch<
      React.SetStateAction<
        {
          name: string;
          _id: string;
        }[]
      >
    >
  ) {
    bearerInstance
      .get(`${process.env.REACT_APP_API_KEY}/company-list`)
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  },
  getCompany(id: string, autoFillCompany: (data: CompanyDataModel) => void) {
    bearerInstance
      .get(`${process.env.REACT_APP_API_KEY}/company-data/${id}`)
      .then((res: { data: CompanyDataModel }) => autoFillCompany(res.data))
      .catch((err: any) => {
        console.error(err);
      });
  },
  addCompany(data: any, closeForm: () => void) {
    bearerInstance
      .post(`${process.env.REACT_APP_API_KEY}/create-company`, data)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
  updateCompany(id: string, data: any, closeForm: () => void) {
    bearerInstance
      .patch(`${process.env.REACT_APP_API_KEY}/update-company/${id}`, data)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
  deleteCompany(id: string, closeForm: () => void) {
    bearerInstance
      .delete(`${process.env.REACT_APP_API_KEY}/delete-company/${id}`)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
};

export const userService = {
  getUsers(
    itemsPerPage: number,
    page: number,
    updateTable: (data: UsersModel[], totalCount: number) => void
  ) {
    bearerInstance
      .get(`${process.env.REACT_APP_API_KEY}/users/${itemsPerPage}/${page}`)
      .then((res) => updateTable(res.data.users, res.data.totalUsers))
      .catch((err: any) => {
        console.error(err);
      });
  },
  addUser(data: any, closeForm: () => void) {
    bearerInstance
      .post(`${process.env.REACT_APP_API_KEY}/create-user`, data)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
  updateUser(id: string, data: any, closeForm: () => void) {
    bearerInstance
      .patch(`${process.env.REACT_APP_API_KEY}/update-user/${id}`, data)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
  deleteUser(id: string, closeForm: () => void) {
    bearerInstance
      .delete(`${process.env.REACT_APP_API_KEY}/delete-user/${id}`)
      .then(() => closeForm())
      .catch((err: any) => console.error(err));
  },
};

export const reportService = {
  companyReport(
    data: { name: string; startDate: number; endDate: number },
    genCompanyReport: (data: any) => void
  ) {
    bearerInstance
      .get(
        `${process.env.REACT_APP_API_KEY}/company-report/${data.name}/${data.startDate}/${data.endDate}`
      )
      .then((res) => {
        genCompanyReport(res.data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  },
  employeeReport(
    data: { employeeId: string; startDate: number; endDate: number },
    genEmployeeReport: (data: any) => void
  ) {
    bearerInstance
      .get(
        `${process.env.REACT_APP_API_KEY}/employee-report/${data.employeeId}/${data.startDate}/${data.endDate}`
      )
      .then((res) => genEmployeeReport(res.data))
      .catch((err: any) => console.error(err));
  },
};
