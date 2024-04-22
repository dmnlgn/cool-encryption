import React from "react";
import { NavLink } from "react-router-dom";
import { route } from "@/routes/routes";
import { dictionary } from "@/dictionary/dictionary";

const Sidebar = () => {
  return (
    <div className="cool-sidebar">
      <div className="content-wrapper">
        <div className="cool-sidebar-container">
          <div className="cool-sidebar-list">
            <div className="cool-sidebar-list-element">
              <NavLink to={route.home}>
                <span className="cool-sidebar-list-text">
                  {dictionary.sidebarMenu.home}
                </span>
              </NavLink>
            </div>
          </div>
          <div className="cool-sidebar-head">
            <h3>{dictionary.sidebarMenu.ciphers}</h3>
          </div>
          <div className="cool-sidebar-list">
            <div className="cool-sidebar-list-element">
              <NavLink to={route.caesarCipher}>
                <span className="cool-sidebar-list-text">
                  {dictionary.sidebarMenu.caesarCipher}
                </span>
              </NavLink>
            </div>
          </div>
          <div className="cool-sidebar-list">
            <div className="cool-sidebar-list-element">
              <NavLink to={route.affineCipher}>
                <span className="cool-sidebar-list-text">
                  {dictionary.sidebarMenu.affineCipher}
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
