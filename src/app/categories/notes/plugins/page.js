import Link from "next/link";

const Plugins = () => {
  return (
    <div className={"container"}>
      <Link
        href="/importSortAllFiles.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Import sort all files
      </Link>

      <Link
        href="/importSortSingleFiles.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Import sort single file
      </Link>

      <Link
        href="/importSortScript.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Import sort script
      </Link>

      <Link
        href="/cssAllFiles.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Module css all files sort
      </Link>

      <Link
        href="/cssSingleFile.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Module css in single file sort
      </Link>

      <Link
        href="/cssScript.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Module css script
      </Link>

      <Link
        href="/esLint.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Es Lint unuseless thing delete import automatic
      </Link>

      <Link
        href="/impotModulecssSort.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Import sort + module css all files sort
      </Link>

      <Link
        href="/importModuleFormatting.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Import sort + module css + code formatting all files sort
      </Link>

      <Link
        href="/mkvTomp4.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        mkv to mp4
      </Link>
    </div>
  );
};

export default Plugins;

export function generateMetadata() {
  return { title: "Plugins" };
}
