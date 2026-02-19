import Link from "next/link";

const IslamicContent = () => {
  const notes = [
    { href: "islamicContent/searchHadith", label: "Search Hadith" },
    { href: "islamicContent/surahCollection", label: "Surah Collection" },
    { href: "islamicContent/islamicResearch", label: "Islamic Research" },
    { href: "islamicContent/islamicVideo", label: "Islamic Video" },
  ];

  return (
    <div className="categorie-container">
      <h2 className="categorie-heading">Islamic Content</h2>
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

export default IslamicContent;

export function generateMetadata() {
  return { title: "IslamicContent" };
}
