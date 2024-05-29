import React from "react";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import BoyIcon from "@mui/icons-material/Boy";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const LinksTop = [
  {
    id: 1,
    linkto: "/ManageStudents",
    icon: <BoyIcon />,
    name: "Manage Students",
  },
  { id: 2, linkto: "/ManageUsers", icon: <PersonIcon />, name: "Manage Admin" },
];

const LinksBottom = [
  { id: 1, icon: <LogoutIcon />, name: "Logout" },
];

const SidebarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="sidebar w-[17.5%] h-screen border-r border-black p-[1rem] flex flex-col justify-between items-start gap-[1rem]">
        <div className="overflow-auto w-full flex flex-col justify-center items-start gap-[.5rem]">
          {LinksTop.map((item) => (
            <NavLink
              key={item.id}
              to={item.linkto}
              className={`w-full p-[.5rem] rounded-lg flex items-center gap-[.5rem] duration-300 ease`}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-[.5rem]">
          {LinksBottom.map((item) => (
            <div className="flex w-full" onClick={handleLogout}>
              <NavLink
                key={item.id}
                className={`w-full p-[.5rem] rounded-lg flex items-center gap-[.5rem] hover:bg-[#EFEFEF] duration-300 ease`}
              >
                {item.icon}
                {item.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
