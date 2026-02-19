import LinkList from "@/components/LinkList";

const links = [
  {
    label: "Ayatul kursi",
    href: "https://youtu.be/65h4pdw6B_c?si=fFguy-IALOyp373j",
  },
  { label: "Surah Mulk", href: "https://www.youtube.com/watch?v=WT54-syfquk" },
  {
    label: "Surah Yaseen",
    href: "https://www.youtube.com/watch?v=yMg4DXHQooc",
  },
  { label: "Surah Ar-Rahman", href: "https://youtu.be/tQHAwV9B8hQ" },
  { label: "Surah As-Sajdah", href: "https://youtu.be/PbyNTZd4iuM" },
  { label: "Surah Al-Muzzammil", href: "https://youtu.be/fvjQDxgVOIY" },
  {
    label: "Surah Waqiah",
    href: "https://youtu.be/JLR-A1CRrk8",
  },
  { label: "Surah Kahf", href: "https://youtu.be/nRuai8aXeHQ" },
];

const SurahCollection = () => {
  return <LinkList links={links} />;
};

export default SurahCollection;

export function generateMetadata() {
  return { title: "Surah Collection" };
}
