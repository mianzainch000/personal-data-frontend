import Link from "next/link";

const CvAndMovieLinks = () => {
    return (
        <>
            <div className="container">
                <Link href="https://www.resumerpro.com" className="link">
                    Resumerpro
                </Link>
                <Link href="https://app.flowcv.com/resumes" className="link">
                    Flow CV
                </Link>
                <Link href="https://www.resumemate.io/resume-builder" className="link">
                    Resumemate.io
                </Link>
                <Link
                    href="https://www.canva.com/design/DAGL-TcpqLI/cyY2lDN08lfZFdqMzjmSbg/view?utm_content=DAGL-TcpqLI&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview"
                    className="link"
                >
                    Canva CV Template
                </Link>
            </div>
            <div className="container">
                <Link href="https://www.watchonlinemovies.com.pk/" className="link">
                    onlinemovies
                </Link>
                <Link href="https://themoviezflix.ae.org/about-us/" className="link">
                    movieflix
                </Link>
                <Link href="https://kickasstorrents.to/" className="link">
                    kickasstorrents
                </Link>
                <Link href="https://netfree2.cc/home/" className="link">
                    NetMirror
                </Link>
                <Link href="https://moviebox.ph/" className="link">
                    MovieBox
                </Link>
            </div>
        </>
    );
};

export default CvAndMovieLinks;

export function generateMetadata() {
    return { title: "cv-movies-links" };
}
