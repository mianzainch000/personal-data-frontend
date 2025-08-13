import Link from "next/link";

const IslamicLinks = () => {
    return (
        <div className="container">
            <Link href="https://islamic-research-next-js.netlify.app/" className="link">
                Islamic Research Old Design
            </Link>

            <Link href="https://islamic-research-old.netlify.app/" className="link">
                Old Islamic Research
            </Link>

            <Link href="https://islamicurdubooks.com" className="link">
                Search Hadess
            </Link>

            <Link
                href="https://islamicurdubooks.com/hadith/ad.php?bsc_id=14644&bookid=9"
                className="link"
            >
                The narration of seeing the Messenger of Allah in a dream
            </Link>

            <Link
                href="https://youtu.be/65h4pdw6B_c?si=fFguy-IALOyp373j"
                className="link"
            >
                Ayatul kursi
            </Link>

            <Link href="https://www.youtube.com/watch?v=WT54-syfquk" className="link">
                Surah Mulk
            </Link>
        </div>
    );
};

export default IslamicLinks;

export function generateMetadata() {
    return { title: "islamic-inks" };
}
