import React from "react";
import BannerVideo from "../../assets/bannerVid.mp4";
import { Link } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <video autoPlay loop muted id="video">
        <source src={BannerVideo} type="video/mp4" />
      </video>
      <div className="banner-text">
        <h1>Decentralized</h1>
        <h1>
          <span className="blue">Lending</span> Protocol
        </h1>
        <p>Lending and borrowing for defi users</p>
        <div className="btn-group">
          <Link to="/defi" className="btn">
            Use Defi
          </Link>
          <button className="btn btn-outline">FAQ</button>
        </div>
      </div>
      <div className="bottom-text">
        <h2>Total Volume Secured: $0</h2>
      </div>
    </div>
  );
};

export default Banner;
