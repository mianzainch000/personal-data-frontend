import Link from "next/link";
import React from "react";

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
