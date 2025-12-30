import LinkList from "@/components/LinkList";

const links = [
  {
    label: "Learn Redux Toolkit",
    href: "https://youtu.be/dzPFDI5KKfc?si=VpabvJX6J6EyZjqX",
  },
  {
    label: "Redux Toolkit Shopping Cart",
    href: "https://youtu.be/0EnjJpHuNGE",
  },
  {
    label: "Github ssh key generate",
    href: "https://www.youtube.com/watch?v=ap56ivm0dhw&ab_channel=TruthSeekers",
  },
  {
    label: "Mongodb Atlas",
    href: "https://www.youtube.com/watch?v=BZcnhU0Mn4M&ab_channel=WebXLearner",
  },
  {
    label: "Mongodb Atlas And IP Address",
    href: "https://www.youtube.com/watch?v=6wltxhVN0tM&t=207s&ab_channel=WebXLearner",
  },
  {
    label: "Mongodb Atlas Delete Project",
    href: "https://www.youtube.com/watch?v=RlCPmQu2P9E&ab_channel=TheFullstackProject",
  },
  {
    label: "Mongodb Atlas Delete User",
    href: "https://www.youtube.com/watch?v=jH9NR0Ua24o&ab_channel=RamNJava",
  },
  {
    label: "Google Credentials console.cloud.google",
    href: "https://www.youtube.com/watch?v=MrzCV0och5k&ab_channel=CodingWithAbbas",
  },
];

const Video = () => {
  return <LinkList links={links} />;
};

export default Video;

export function generateMetadata() {
  return { title: "videos" };
}
