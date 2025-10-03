import Link from "next/link";

const Notes = () => {
  const notes = [
    { href: "notes/github", label: "Github" },
    { href: "notes/plugins", label: "Plugins" },
  ];

  return (
    <div className="categorie-container">
      <h2 className="categorie-heading">Mix Notes</h2>
      <div className="categorie-grid">
        {notes.map((item, index) => (
          <Link key={index} href={item.href} className="categorie-card">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Notes;

export function generateMetadata() {
  return { title: "Notes" };
}
