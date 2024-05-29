import React from "react";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const LinksTop = [{ id: 1, icon: <LogoutIcon />, name: "Logout" }];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="sidebar w-[17.5%] h-screen border-r border-black p-[1rem] flex flex-col justify-center items-start gap-[1rem]">
        <div className="overflow-auto w-full flex flex-col justify-center items-start gap-[.5rem]">
          {LinksTop.map((item) => (
            <NavLink
              key={item.id}
              onClick={handleLogout}
              className={`w-full p-[.5rem] rounded-lg flex items-center gap-[.5rem] duration-300 ease`}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
