import React from "react";
import { NavLink } from "react-router-dom";
import { route } from "../../../routes/routes";

const Sidebar = () => {
  return (
    <div className="cool-sidebar">
      <div className="content-wrapper">
        <div className="cool-sidebar-container">
          <div className="cool-sidebar-list">
            <div className="cool-sidebar-list-element">
              <NavLink to={route.home}>
                <span className="cool-sidebar-list-text">STRONA GŁÓWNA</span>
              </NavLink>
            </div>
          </div>
          <div className="cool-sidebar-head">
            <h3>SZYFRY:</h3>
          </div>
          <div className="cool-sidebar-list">
            <div className="cool-sidebar-list-element">
              <NavLink to={route.caesarCipher}>
                <span className="cool-sidebar-list-text">SZYFR CEZARA</span>
              </NavLink>
            </div>
          </div>
          <div className="cool-sidebar-list">
            <div className="cool-sidebar-list-element">
              <NavLink to={route.affineCipher}>
                <span className="cool-sidebar-list-text">SZYFR AFINICZNY</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
