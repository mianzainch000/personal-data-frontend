import React from "react";
import Link from "next/link";

const Github = () => {
  return (
    <div className={"container"}>
      <Link
        href="/commands.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Github commands + Alias
      </Link>

      <Link
        href="/localBranchDelete.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Delete local branch
      </Link>

      <Link
        href="/allCommitdDelete.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        All commits delete
      </Link>

      <Link
        href="/specificBranchCommitDelete.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Delete specific branch
      </Link>
    </div>
  );
};

export default Github;
