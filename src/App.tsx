import React from "react";
import { Link } from "react-router-dom";
import "./Styles/App.css";

const App: React.FC = () => {
  return (
    <div className="dfc-ac-jse ht-100vh bgc-primary">
      <img src="https://logiccrm.blob.core.windows.net/logic-data/logic logo.png" alt="logo" width="225" />
      <div className="app-card">
        <Link to="/login" className="form-btn m-b-16">
          Login
        </Link>
        <Link to="/register" className="form-btn">
          Register New User
        </Link>
      </div>
    </div>
  );
};

export default App;
