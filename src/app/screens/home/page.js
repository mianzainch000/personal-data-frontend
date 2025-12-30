import Link from "next/link";

const Home = () => {
  return (
    <div className="container">
      <Link
        href="https://islamic-research.netlify.app"
        style={{ textDecoration: "none" }}
      >
        <h2 className="categorie-heading"> Islamic Research</h2>
      </Link>
      <Link href="/screens/categories" style={{ textDecoration: "none" }}>
        <h2 className="categorie-heading">Mix Categories</h2>
      </Link>
    </div>
  );
};
export default Home;

export function generateMetadata() {
  return { title: "Home" };
}
