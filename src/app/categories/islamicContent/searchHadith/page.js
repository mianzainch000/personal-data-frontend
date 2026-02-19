import LinkList from "@/components/LinkList";

const links = [
  { label: "Search Hadess", href: "https://islamicurdubooks.com" },
  { label: "Another Search Hadees", href: "https://al-hadees.com" },
  {
    label: "The narration of seeing the Messenger of Allah in a dream",
    href: "https://islamicurdubooks.com/hadith/ad.php?bsc_id=14644&bookid=9",
  },
];

const SearchHadith = () => {
  return <LinkList links={links} />;
};

export default SearchHadith;

export function generateMetadata() {
  return { title: "Search Hadith" };
}
