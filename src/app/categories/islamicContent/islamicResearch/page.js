import LinkList from "@/components/LinkList";

const links = [
    {
        label: "Islamic Research",
        href: "https://islamic-research.netlify.app"
    },
    {
        label: "Islamic Research Old Design",
        href: "https://islamic-research-next-js.netlify.app/",
    },
    {
        label: "Old Islamic Research",
        href: "https://islamic-research-old.netlify.app/",
    },
];

const IslamicResearch = () => {
    return <LinkList links={links} />;
};

export default IslamicResearch;

export function generateMetadata() {
    return { title: "Islamic Research " };
}
