import React from 'react';

const Layout = props => (
  <div className="main-container">
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="javascript:void(0);">
                Chat App <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <div className="navbar-nav mt-2 mt-md-0">
            <a
              className="nav-link"
              href="javascript:void(0);"
              onClick={props.signOut}
            >
              Выйти
            </a>
          </div>
        </div>
      </nav>
    </header>

    <main className="content">{props.children}</main>
  </div>
);

export default Layout;
