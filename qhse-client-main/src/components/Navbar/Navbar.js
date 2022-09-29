import React, { useContext } from "react";
import { AuthContext } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Navbar.css";

export default function Navbar(props) {
  const { user, org, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogout() {
    dispatch({ type: "LOGIN_SUCCESS", payload: [undefined, undefined] });
    localStorage.removeItem("user");
    localStorage.removeItem("org");
    navigate("/login");
  }
  function handleFinish() {
    dispatch({ type: "SELECT_SUCCESS", payload: [user, undefined] });
    localStorage.removeItem("org");
    navigate("/main");
  }
  return (
    <div style={{ backgroundColor: "#F5F0BB" }}>
      <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
        <div className="navbar-brand">
          {props.in === true && (
            <span className="container1 nav-item">
              <span className="checkbox-container">
                <input className="checkbox-trigger" type="checkbox" />
                <span className="menu-content">
                  <ul>
                    <li onClick={() => navigate("/")}>Tableau de bord</li>
                    <li onClick={() => navigate("/products")}>Produits</li>
                    <li onClick={() => navigate("/raw-recap")}>
                      Matieres Premieres
                    </li>
                    <li onClick={() => navigate("/fournisseurs")}>
                      Fournisseurs
                    </li>
                    <li onClick={() => navigate("/personnel")}>Personnels</li>
                    <li onClick={() => navigate("/zones")}>
                      Batiments / Zones
                    </li>
                    <li onClick={() => navigate("/equipements")}>
                      Equipements
                    </li>
                  </ul>
                  <span className="hamburger-menu"></span>
                </span>
              </span>
            </span>
          )}
          <a href="/main">
            <img
              alt="logo"
              src="http://localhost:5000/images/logo1.jpeg"
              style={{
                maxHeight: "70px",
                marginTop: "20px",
                marginLeft: "20px",
                paddingBottom: "20px",
              }}
            />
          </a>
        </div>

        {user !== null && user !== undefined && (
          <ul className="navbar-nav">
            {org !== null && org !== undefined && (
              <li className="nav-item">
                <div
                  className="nav-link sortable"
                  style={{ cursor: "pointer" }}
                  onClick={handleFinish}
                >
                  Terminer
                </div>
              </li>
            )}
            <li className="nav-item">
              <div
                className="nav-link sortable"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Déconnecter
              </div>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
