import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li>Noida</li>
              <li>Gurugram</li>
              <li>Bareilly</li>
              <li>Saharanpur</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <ul>
              <li>About ByeBazar Group</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>People</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ByeBazar</p>
          </div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Made In Bharat 2023 @AtishayJain @NikhilGupta @RachitJain</p>
        <p>Jai Hind Jai Bharat ❤️</p>
      </div>
    </div>
  );
}

export default Footer;
