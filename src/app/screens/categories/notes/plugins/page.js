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
        href="/allCommitdDelete.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Module css all files
      </Link>

      <Link
        href="/specificBranchCommitDelete.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Module css in single file
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
        href="/specificBranchCommitDelete.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Es Lint
      </Link>

      <Link
        href="/impotModulecssSort.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Import sort + module css all files
      </Link>

      <Link
        href="/importModuleFormatting.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Import sort + module css + code formatting all files
      </Link>
    </div>
  );
};

export default Plugins;

export function generateMetadata() {
  return { title: "Plugins" };
}
