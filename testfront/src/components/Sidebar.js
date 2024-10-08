import React, { useEffect, useState } from "react";
import config from "../config";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + '/user/info', config.headers())

      if (res.data.result !== undefined) {
        setUser(res.data.result)
      }
    } catch (e) {
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  }
  //Sign Out
  const handleSignOut = async () => {
    try {
      const button = await Swal.fire({
        title: 'ออกจากระบบ',
        text: 'ยืนยันการออกจากระบบ',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true
      })
      if (button.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (e) {
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: "error"
      })
    }
  }

  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="index3.html" className="brand-link">
          <img
            src="dist/img/boxed-bg.png"
            alt="images"
            className="brand-image img-circle elevation-3"
            style={{ opacity: '.8' }}
          />
          <span className="brand-text font-weight-light">LOGO</span>
        </Link>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/ice.jpg" className="img-circle elevation-2" alt="Example" />
            </div>
            <div className="info">
              <Link to="#" className="d-block">
                {user.name}
              </Link>
              <button onClick={handleSignOut} className="btn btn-danger">
                <i className="fa fa-times mr-2"></i>Sign Out
              </button>
            </div>
          </div>

          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-header">Menu</li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-columns"></i>
                  <p>
                    DashBoard
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-link">
                  <i className="nav-icon fas fa-box"></i>
                  <p>
                    สินค้า
                  </p>
                </Link>
              </li>


              <li className="nav-item">
                <Link to="/billSale" className="nav-link">
                  <i className="nav-icon fa fa-list"></i>
                  <p>รายงานยอดขาย</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
