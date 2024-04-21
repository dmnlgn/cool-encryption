import React, { type FC, type ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

interface ILayout {
  children: ReactNode;
  title?: string;
}

const Layout: FC<ILayout> = ({ children, title }) => {
  return (
    <div className="cool-layout">
      <Sidebar />
      <main>
        {title && (
          <div className="cool-layout-heading">
            <div className="content-wrapper">
              <h2>{title}</h2>
            </div>
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default Layout;
