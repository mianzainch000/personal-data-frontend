import Link from "next/link";
const LinkList = ({ links }) => {
    return (
        <div className="container">
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
        </div>
    );
};

export default LinkList;
