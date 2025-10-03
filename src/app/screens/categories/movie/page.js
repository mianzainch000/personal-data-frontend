import LinkList from "@/components/LinkList";

const links = [
  { label: "onlinemovies", href: "https://www.watchonlinemovies.com.pk/" },
  { label: "hdHub4U", href: "https://hdhub4u.gs/" },
  { label: "kickasstorrents", href: "https://kickasstorrents.to/" },
  { label: "NetMirror", href: "https://netfree2.cc/home/" },
  { label: "MovieBox", href: "https://moviebox.ph/" },
  { label: "1337x.to", href: "https://1337x.to/" },
  { label: "movieflix", href: "https://themoviesflix.gg/" },
];

const Movie = () => {
  return <LinkList links={links} />;
};

export default Movie;

export function generateMetadata() {
  return { title: "movies links" };
}
