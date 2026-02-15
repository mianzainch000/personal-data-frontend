import LinkList from "@/components/LinkList";

const links = [
  {
    label: "Types-Of-Hadith-Books",
    href: "https://www.youtube.com/watch?v=Ui31B8AWFnU",
  },
  {
    label: "Hadees-Ki-Categories",
    href: "    https://www.youtube.com/watch?v=mpA68Sceecs&feature=youtu.be",
  },
  {
    label: "Ahadees-ki-Terminology",
    href: "https://www.youtube.com/watch?v=G3vlnT4rmAw",
  },
  {
    label: "Ilm-Hadees-ko-Samjnay-ka-Asan-Tarika",
    href: "https://www.youtube.com/watch?v=TNWmoPfDD_c",
  },
  {
    label: "Qarz-Say-Nijat-Halal-Rizq-Or-Nafa-Baksh-ilm-Ki Dua",
    href: "https://www.youtube.com/watch?v=6FdgX9Q78N8",
  },
  {
    label: "Jarabon-par-Masah-Tayamum",
    href: "https://www.youtube.com/watch?v=jwwq_ccBFtY",
  },
  {
    label: "Muaviya-Bin-Yazeed-Marwan-Bin-Hakam",
    href: "https://www.youtube.com/watch?v=PTKX8A653iA",
  },
  {
    label: "Raf‘-ul-Yadain Reference",
    href: "https://www.youtube.com/shorts/wXUIsfX7HTU",
  },
  {
    label: "Witr aur Nafl namaz mein parhi janay wali afzal suratein",
    href: "https://youtu.be/GfWGC9PQOB4?si=4phM9gHrXyce53vb",
  },
];

const IslamicVideo = () => {
  return <LinkList links={links} />;
};

export default IslamicVideo;

export function generateMetadata() {
  return { title: "Islamic Video" };
}
