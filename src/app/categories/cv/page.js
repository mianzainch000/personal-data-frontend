import LinkList from "@/components/LinkList";

const links = [
  { label: "Resumerpro", href: "https://www.resumerpro.com" },
  { label: "Flow CV", href: "https://app.flowcv.com/resumes" },
  { label: "Resumemate.io", href: "https://www.resumemate.io/resume-builder" },
  {
    label: "Canva CV Template",
    href: "https://www.canva.com/design/DAGL-TcpqLI/cyY2lDN08lfZFdqMzjmSbg/view?utm_content=DAGL-TcpqLI&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview",
  },
];

const CV = () => {
  return (
    <>
      {/* Cv download link in LinkList component */}
      <LinkList links={links} />
    </>
  );
};

export default CV;

export function generateMetadata() {
  return { title: "cv template" };
}
