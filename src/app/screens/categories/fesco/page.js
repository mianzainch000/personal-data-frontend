import LinkList from "@/components/LinkList";

const FESCO = () => {
  const links = [
    { label: "FESCO Web Bill", href: "https://bill.pitc.com.pk/fescobill" },
  ];
  return (
    <>
      <LinkList links={links} />
      <div className="container">
        <h3>Meter 1 Customer ID</h3>
        <h2>1134671247</h2>
        <h3>Meter 1 Reference Number</h3>
        <h2>19132371972221</h2>
        <h3>Meter 2 Customer ID</h3>
        <h2>1135533816</h2>
        <h3>Meter 2 Reference Number</h3>
        <h2>19132371972226</h2>
        <h3>Umer Riaz Customer ID</h3>
        <h2>1134698207</h2>
        <h3>Umer Riaz Reference Number</h3>
        <h2>19132371972191</h2>
      </div>
    </>
  );
};

export default FESCO;

export function generateMetadata() {
  return { title: "fesco" };
}
