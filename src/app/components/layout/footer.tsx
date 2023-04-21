import React from "react";
import styles from "@/app/styles/Footer.module.scss";
import Image from "next/dist/client/image";
import {  BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-4">
              <a href="/" className="navbar-brand">
                <Image
                  src={"/images/logo.png"}
                  alt="logo"
                  width={45}
                  height={45}
                  className="img-fluid m-3 ms-0 icon nav-img"
                />
                ResooTime
              </a>
              <p>Restoran rezervasiya sistemi</p>
            </div>
            <div className="col-md-4 mt-md-4 mt-2">
              <a className="navbar-brand text-muted">Restoranlar üçün</a>
              <ul className={styles.list}>
                <li>
                  <a href="/discovery" className="link">Biznes</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 mt-md-4 mt-2">
              <a className="navbar-brand text-muted">Bizimlə əlaqə</a>
              <ul className={styles.list}>
                <li>
                  <a href="tel:+994508507009" className="link">+994 50 850 70 09</a>
                </li>
                <li>
                  <a href="mailto:info@resootime.com" className="link">resootime@gmail.com</a>
                </li>
                <li>
                  <a className="me-3 link" href="https://instagram.com/resootime?igshid=YmMyMTA2M2Y=" target="_blank" rel="noreferrer">
                    <BsInstagram size={"1.5em"} />
                  </a>
                  <a className="mx-3 link" href="https://www.linkedin.com/company/resootime/" target="_blank" rel="noreferrer">
                    <BsLinkedin size={"1.5em"} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <p className="text-center pt-3">© 2023 Bütün hüquqları qorunur</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
