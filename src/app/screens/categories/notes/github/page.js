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
        Delete commits specific branch
      </Link>

      <Link
        href="/github-recovery-codes.pdf"
        download
        rel="noopener noreferrer"
        className="link"
      >
        Github Recovery Codes
      </Link>
    </div>
  );
};

export default Github;

export function generateMetadata() {
  return { title: "Github" };
}
