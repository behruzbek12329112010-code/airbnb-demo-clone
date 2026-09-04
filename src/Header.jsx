import React from "react";
import { Avatar, Button } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import "./Pages.css";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const { user, setAccessToken, setUser, accessToken } = useAuth();

  const planetUser = () => {
    (setUser(null), setAccessToken(""));
    localStorage.clear();
  };

  return (
    <>
      <div style={{ backgroundColor: "rgba(240, 239, 239, 0.81)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            justifyContent: "space-between",
            padding: "30px 100px",
          }}
        >
          <img
            onClick={() => navigate("/")}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/960px-Airbnb_Logo_B%C3%A9lo.svg.png?utm_source=ru.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
            alt="Airbnb Logo"
            style={{ width: "150px", cursor: "pointer" }}
          />

          <input
            type="text"
            placeholder="Qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              outline: "none",
              width: "250px",
            }}
          />

          {accessToken?.length > 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {/* <Button onClick={() => navigate("/Sign")}>
          Werde Gastgeber:In
        </Button> */}

              <Button>Become a host</Button>
              <Avatar
                onClick={() => navigate("/profile")}
                sx={{ bgcolor: deepPurple[500], cursor: "pointer" }}
              >
                {user?.name?.slice(0, 1)?.toUpperCase() || "U"}
              </Avatar>

              <LogoutIcon onClick={() => planetUser()} />
            </div>
          ) : (
            <Button onClick={() => navigate("/Sign")}>
              Werde Gastgeber:In
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
