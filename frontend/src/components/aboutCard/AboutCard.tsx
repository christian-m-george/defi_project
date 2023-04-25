import React from "react";

type AboutCardProps = {
  icon: JSX.Element;
  heading: string;
  text: string;
};

const AboutCard = (props: AboutCardProps) => {
  return (
    <>
      <div className="icon-container">{props.icon}</div>
      <h3>{props.heading}</h3>
      <p>{props.text}</p>
    </>
  );
};

export default AboutCard;
