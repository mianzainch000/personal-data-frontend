import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className={"container"}>
      <Link
        href="/Zain Ishfaq.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Download CV
      </Link>
    </div>
  );
};

export default page;
