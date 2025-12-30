import React from "react";
const Message = () => {
  return (
    <div className="container">
      <h3 className="h3">
        Dear Hiring Manager, I hope this email finds you well. I am writing to
        express my interest in the Front End Developer position within your
        esteemed organization. With [1 year] of hands-on experience in HTML,
        CSS, JavaScript,React Js,Material Ui,Bootstrap,Github and proficiency in
        frameworks like Next js, I am enthusiastic about the opportunity to
        contribute my technical skills and expertise to your team. Please find
        attached my resume for your review. I am available at your earliest
        convenience for a discussion about how my background and skills align
        with the requirements of the Front End Developer role at your
        organization. Thank you for considering my application. I look forward
        to the possibility of contributing to your team and further discussing
        how I can add value to your company. Warm regards, Zain Ishfaq
        0341-7872458
      </h3>
    </div>
  );
};

export default Message;

export function generateMetadata() {
  return { title: "message" };
}
