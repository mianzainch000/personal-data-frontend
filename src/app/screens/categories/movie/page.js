import LinkList from "@/components/LinkList";

const links = [
  { label: "onlinemovies", href: "https://www.watchonlinemovies.com.pk/" },
  { label: "movieflix", href: "https://themoviesflix.gg/" },
  { label: "kickasstorrents", href: "https://kickasstorrents.to/" },
  { label: "NetMirror", href: "https://netfree2.cc/home/" },
  { label: "MovieBox", href: "https://moviebox.ph/" },
  { label: "1337x.to", href: "https://1337x.to/" },
];

const Movie = () => {
  return <LinkList links={links} />;
};

export default Movie;

export function generateMetadata() {
  return { title: "movies links" };
}
