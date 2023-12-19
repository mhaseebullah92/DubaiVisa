import { useNavigate } from "react-router-dom";
// import { useAuth } from "../provider/authProvider";
import { useState } from "react";
import { useAuth } from "../../Auth/AuthProvider";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [deactive, setDeactive]=useState(false);

  const handleLogout = () => {
    setDeactive(true);
    setToken('');
    navigate("/login", { replace: true });
  };

  return (
     // eslint-disable-next-line
  <a onClick={handleLogout} className="download" disabled={deactive}>
    Logout
  </a>
  );
};

export default Logout;