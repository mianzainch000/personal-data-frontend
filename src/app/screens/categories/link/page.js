import LinkList from "@/components/LinkList";

const links = [
  {
    label: "My Home Address",
    href: "https://maps.app.goo.gl/5kyAxTERAuFsx8Nw8",
  },
  {
    label: "Youtube video download",
    href: "https://ytdown.to/en2/",
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
    label: "All video download",
    href: "https://mediadl.app/in?gad_source=1&gad_campaignid=22923552959&gbraid=0AAAAA_JALYhMVOVN95HOtc-R9im6bcDa5&gclid=CjwKCAjw2vTFBhAuEiwAFaScwjSTaA37uBWxwmlj3P06Um4Z6MrY3wQz5qWOHLJjHWI82mro6oFD8BoCm9gQAvD_BwE",
  },
  {
    label: "Another All video download",
    href: "https://share.google/OcbGk9dIaAXzFtpSP",
  },
  {
    label: "Text to PDF",
    href: "https://www.freeconvert.com/txt-to-pdf",
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
