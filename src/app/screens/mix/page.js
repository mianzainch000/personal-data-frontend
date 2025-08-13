import Link from "next/link";

const Mix = () => {
    return (
        <>
            {/* Articles */}

            <div className="container">
                <h3>Articles</h3>
                <Link
                    href="https://www.freecodecamp.org/news/the-javascript-array-handbook"
                    className="link"
                >
                    Array Article
                </Link>
                <Link
                    href="https://www.freecodecamp.org/news/synchronous-vs-asynchronous-in-javascript"
                    className="link"
                >
                    Article Synchronous vs Asynchronous{" "}
                </Link>
                <Link
                    href="https://editor.swagger.io/?_gl=1*1o03qna*_gcl_au*MTM1NzUyNDIzNS4xNzM2MzIyMjY1"
                    className="link"
                >
                    Swagger Article{" "}
                </Link>
                <Link href="https://javascript.info/" className="link">
                    Modern JavaScript{" "}
                </Link>
                <Link
                    href="https://platform.openai.com/docs/guides/text-generation"
                    className="link"
                >
                    Chatgpt Documentation{" "}
                </Link>
                <Link href="https://nodecron.com/getting-started.html" className="link">
                    NodeCron Documentation{" "}
                </Link>
            </div>

            {/* Videos */}

            <div className="container">
                <h3>Videos</h3>
                <Link
                    href="https://youtu.be/dzPFDI5KKfc?si=VpabvJX6J6EyZjqX"
                    className="link"
                >
                    Learn Reducx Toolkit
                </Link>{" "}
                <Link href="https://youtu.be/0EnjJpHuNGE" className="link">
                    Redux Toolkit Shopping Cart
                </Link>
                <Link
                    href="https://www.youtube.com/watch?v=ap56ivm0dhw&ab_channel=TruthSeekers"
                    className="link"
                >
                    Github ssh key generate
                </Link>
                <Link
                    href="https://www.youtube.com/watch?v=BZcnhU0Mn4M&ab_channel=WebXLearner"
                    className="link"
                >
                    Mongodb Atlas
                </Link>
                <Link
                    href="https://www.youtube.com/watch?v=6wltxhVN0tM&t=207s&ab_channel=WebXLearner"
                    className="link"
                >
                    Mongodb Atlas And Ip Adrees
                </Link>
                <Link
                    href="https://www.youtube.com/watch?v=RlCPmQu2P9E&ab_channel=TheFullstackProject"
                    className="link"
                >
                    Mongodb Atlas Delete Project
                </Link>
                <Link
                    href="https://www.youtube.com/watch?v=jH9NR0Ua24o&ab_channel=RamNJava"
                    className="link"
                >
                    Mongodb Atlas Delete Users
                </Link>
                {/* Links */}
                <h3>Links</h3>
                <Link href="https://www.imagetotext.io/" className="link">
                    Copy text from the image
                </Link>
                <Link href="https://echallan.psca.gop.pk/" className="link">
                    e-challan check{" "}
                </Link>
                <Link
                    href="https://youtu.be/b4_kWaeVSmw?si=EBo3z1Wn0EE1JM_0"
                    className="link"
                >
                    Asif bahi
                </Link>
                <Link href="https://maps.app.goo.gl/5kyAxTERAuFsx8Nw8" className="link">
                    My Home Address
                </Link>
                <Link href="https://maps.app.goo.gl/RncvZRk5i4i3ynPB9" className="link">
                    Apps4U Office
                </Link>
                <Link
                    href="https://1drv.ms/u/s!Ahi3Uu0Ue307g4JC4c5fhMb92Z1niw?e=kzqXZ7"
                    className="link"
                >
                    Asif bahi link
                </Link>
                <div>Password2000</div>
                <Link
                    href="https://ytmods.com/download/youtube-premium-722"
                    className="link"
                >
                    Vanced YouTube Download
                </Link>
                {/* Motor Bike */}
                <div className="container">
                    <h3>MotorBike Tuning</h3>
                    <h2>18 June 2023, Totol Bill 2750</h2>{" "}
                    <h2>29 January 2025, Totol Bill 2900 with 4 new indicators</h2>
                    <h2>29 January 2025 Bike Meter Number 442283</h2>
                </div>
                {/* msg hr */}
                <h3>Message for HR</h3>
                <h2>
                    Dear Hiring Manager, I hope this email finds you well. I am writing to
                    express my interest in the Front End Developer position within your
                    esteemed organization. With [1 year] of hands-on experience in HTML,
                    CSS, JavaScript,React Js,Material Ui,Bootstrap,Github and proficiency
                    in frameworks like Next js, I am enthusiastic about the opportunity to
                    contribute my technical skills and expertise to your team. Please find
                    attached my resume for your review. I am available at your earliest
                    convenience for a discussion about how my background and skills align
                    with the requirements of the Front End Developer role at your
                    organization. Thank you for considering my application. I look forward
                    to the possibility of contributing to your team and further discussing
                    how I can add value to your company. Warm regards, Zain Ishfaq
                    0341-7872458
                </h2>
            </div>
        </>
    );
};

export default Mix;

export function generateMetadata() {
    return { title: "mix" };
}
