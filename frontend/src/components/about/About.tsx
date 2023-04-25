import React from "react";
import "./About.css";
import { SiHiveBlockchain, SiStrapi, SiFsecure } from "react-icons/si";
import { VscServerProcess } from "react-icons/vsc";
import AboutCard from "../aboutCard/AboutCard";

const About = () => {
  return (
    <div className="about">
      <h2>A Growing Protocol Ecosystem</h2>
      <p>
        The Defi protocol system empowers users, developers, and participants in
        the defi market to access an open and powerful marketplace.
      </p>
      <div className="card-container">
        <div className="card">
          <AboutCard
            icon={<SiHiveBlockchain color="#f8f8f8" />}
            heading={"Using the power of the Ethereum Network"}
            text={
              "Utilize lending powered by the trusted and proven Ethereum network."
            }
          />
        </div>
        <div className="card">
          <AboutCard
            icon={<SiStrapi color="#f8f8f8" />}
            heading={"Seamless connection to APIs"}
            text={
              "Functionality is powered by connections to trustworthy data sources, and can connect with existing systems and be expanded to integrate with any current or future blockchain"
            }
          />
        </div>
        <div className="card">
          <AboutCard
            icon={<SiFsecure color="#f8f8f8" />}
            heading={"Proven, ready-made solutions"}
            text={
              "Lending and borrowing is achieved through a robust smart contract that is running on the node backend."
            }
          />
        </div>
        <div className="card">
          <AboutCard
            icon={<VscServerProcess color="#f8f8f8" />}
            heading={"Secure off-chain computation"}
            text={
              "Use a decentralized network of DeFi Keeper nodes to automate contracts, mitigating risks of manual interventions and centralized servers."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default About;
