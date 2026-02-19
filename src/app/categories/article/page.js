import LinkList from "@/components/LinkList";

const links = [
  {
    label: "Array Article",
    href: "https://www.freecodecamp.org/news/the-javascript-array-handbook",
  },
  {
    label: "Article Synchronous vs Asynchronous",
    href: "https://www.freecodecamp.org/news/synchronous-vs-asynchronous-in-javascript",
  },
  {
    label: "Swagger Article",
    href: "https://editor.swagger.io/?_gl=1*1o03qna*_gcl_au*MTM1NzUyNDIzNS4xNzM2MzIyMjY1",
  },
  { label: "Modern JavaScript", href: "https://javascript.info/" },
  {
    label: "Chatgpt Documentation",
    href: "https://platform.openai.com/docs/guides/text-generation",
  },
  {
    label: "NodeCron Documentation",
    href: "https://nodecron.com/getting-started.html",
  },
];

const Article = () => {
  return <LinkList links={links} />;
};

export default Article;

export function generateMetadata() {
  return { title: "articles" };
}
