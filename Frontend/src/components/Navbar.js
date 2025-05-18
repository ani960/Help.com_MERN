import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import icon from '../Assests/logo.jpg';

export default function Navbar() {
  useEffect(() => {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    dropdownElementList.forEach((dropdownToggleEl) => {
      new window.bootstrap.Dropdown(dropdownToggleEl);
    });
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-white">
        <div className="container-fluid">

          {/* Brand / Logo */}
          <Link className="navbar-brand text-black mx-5 fw-bold" to="/">
            <img
              src={icon}
              alt="Give Hope Icon"
              style={{ width: '40px', height: '40px' }}
            />
            Give Hope
          </Link>

          {/* Collapsible Navigation */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mx-3 fw-bold">

              {/* Donate Us Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle btn btn-dark text-black fw-bold"
                  href="/"
                  id="donateDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Donate Us
                </a>
                <ul className="dropdown-menu" aria-labelledby="donateDropdown">
                  <li>
                    <Link className="dropdown-item fw-bold" to="/pages/DonateUs/DonateMoney">Donate Money</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item fw-bold" to="/pages/DonateUs/DonateItem">Donate Item</Link>
                  </li>
                </ul>
              </li>

              {/* Volunteer Form Link */}
              <li className="nav-item">
                <Link className="nav-link text-black fw-bold" to="/pages/Volunteer">Volunteer</Link>
              </li>

              {/* Help Center Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-black fw-bold"
                  href="/"
                  id="helpCenterDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Help Center
                </a>
                <ul className="dropdown-menu" aria-labelledby="helpCenterDropdown">
                  <li>
                    <Link className="dropdown-item fw-bold" to="/pages/HelpCenter/Need">Need</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item fw-bold" to="/pages/HelpCenter/Drop">Drop</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item fw-bold" to="/pages/HelpCenter/PickUp">Pick Up</Link>
                  </li>
                </ul>
              </li>

              {/* Static Links */}
              <li className="nav-item">
                <Link className="nav-link text-black fw-bold" to="/pages/AboutUs">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black fw-bold" to="/pages/SuccessStories">Success Stories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black fw-bold" to="/pages/ContactUs">Contact Us</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
