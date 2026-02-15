import LinkList from "@/components/LinkList";

const links = [
  {
    label: "Islamic Research",
    href: "https://islamic-research.vercel.app",
  },
];

const IslamicResearch = () => {
  return <LinkList links={links} />;
};

export default IslamicResearch;

export function generateMetadata() {
  return { title: "Islamic Research " };
}
