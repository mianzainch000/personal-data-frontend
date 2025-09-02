import LinkList from "@/components/LinkList";

const links = [
  {
    label: "My Home Address",
    href: "https://maps.app.goo.gl/5kyAxTERAuFsx8Nw8",
  },
  { label: "Copy text from the image", href: "https://www.imagetotext.io/" },
  { label: "e-challan check", href: "https://echallan.psca.gop.pk/" },
  {
    label: "Asif bahi link and Link password is (Password2000)",
    href: "https://1drv.ms/u/s!Ahi3Uu0Ue307g4JC4c5fhMb92Z1niw?e=kzqXZ7",
  },
  {
    label: "Vanced YouTube Download",
    href: "https://ytmods.com/download/youtube-premium-722",
  },
  {
    label: "Expense Tracker",
    href: "https://my-expense-tracker-frontend.vercel.app",
  },
];

const Links = () => {
  return <LinkList links={links} />;
};

export default Links;

export function generateMetadata() {
  return { title: "links" };
}
