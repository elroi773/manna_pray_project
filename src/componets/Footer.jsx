import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3 className="footer-logo">🙏 Pray With Us</h3>
          <p className="footer-desc">기도로 하나 되는 공간</p>
          <p className="footer-maker">제작 : 김이레</p>
        </div>

        <div className="footer-links">
          <a
            href="https://github.com/elroi773/manna_pray_project"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.instagram.com/e1_r0i73/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Pray With Us. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
