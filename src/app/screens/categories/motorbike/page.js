const Motorbike = () => {
  return (
    <div className="container">
      <h2 className="h2">18 June 2023, Totol Bill 2750</h2>{" "}
      <h2 className="h2">
        29 January 2025, Totol Bill 2900 with 4 new indicators
      </h2>
      <h2 className="h2">29 January 2025 Bike Meter Number 442283</h2>
    </div>
  );
};

export default Motorbike;

export function generateMetadata() {
  return { title: "motorbike" };
}
