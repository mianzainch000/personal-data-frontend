import Link from "next/link";

const Home = () => {
    return (
        <div className="container">
            <Link href="https://islamic-research.netlify.app" className="link">
                Islamic Research
            </Link>

            <Link href="/screens/islamic-links" className="link">
                Islamic Links
            </Link>

            <Link href="/screens/fesco" className="link">
                FESCO
            </Link>

            <Link href="/screens/cv-movie-links" className="link">
                CV + Movie Links
            </Link>

            <Link href="/screens/mix" className="link">
                Mix
            </Link>

            <Link href="/screens/interview" className="link">
                Interviews
            </Link>
        </div>
    );
};
export default Home;

export function generateMetadata() {
    return { title: "Home" };
}
