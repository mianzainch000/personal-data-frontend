"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const LinkList = ({ links }) => {
  const pathname = usePathname();
  return (
    <div
      className={pathname === "/screens/categories/fesco" ? "" : "container"}
    >
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          // target="_blank"
          className="link"
        >
          {link.label}
        </Link>
      ))}
      {pathname === "/screens/categories/cv" && (
        <Link
          href="/Zain Ishfaq.pdf"
          download
          rel="noopener noreferrer"
          className="link"
        >
          Download CV
        </Link>
      )}
    </div>
  );
};

export default LinkList;
