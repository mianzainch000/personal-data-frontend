import LinkList from "@/components/LinkList";

const links = [
  {
    label: "Islamic Research Old Design",
    href: "https://islamic-research-next-js.netlify.app/",
  },
  {
    label: "Old Islamic Research",
    href: "https://islamic-research-old.netlify.app/",
  },
  { label: "Search Hadess", href: "https://islamicurdubooks.com" },
  { label: "Another Search Hadees", href: "https://al-hadees.com" },
  {
    label: "The narration of seeing the Messenger of Allah in a dream",
    href: "https://islamicurdubooks.com/hadith/ad.php?bsc_id=14644&bookid=9",
  },
  {
    label: "Ayatul kursi",
    href: "https://youtu.be/65h4pdw6B_c?si=fFguy-IALOyp373j",
  },
  { label: "Surah Mulk", href: "https://www.youtube.com/watch?v=WT54-syfquk" },
];

const IslamicLinks = () => {
  return <LinkList links={links} />;
};

export default IslamicLinks;

export function generateMetadata() {
  return { title: "islamic-links" };
}
