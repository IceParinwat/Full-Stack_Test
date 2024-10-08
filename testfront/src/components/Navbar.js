import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" data-widget="pushmenu" to="#" role="button"><i className="fas fa-bars"></i></Link>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="#" className="nav-link">Contact</Link>
                    </li>
                </ul>


                <ul className="navbar-nav ml-auto">

                    <li className="nav-item">
                        <Link className="nav-link" data-widget="navbar-search" to="#" role="button">
                            <i className="fas fa-search"></i>
                        </Link>
                        <div className="navbar-search-block">
                            <form className="form-inline">
                                <div className="input-group input-group-sm">
                                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-navbar" type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                        <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" data-widget="fullscreen" to="#" role="button">
                            <i className="fas fa-expand-arrows-alt"></i>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" to="#" role="button">
                            <i className="fas fa-th-large"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar