const interviewData = [
  "17 Sep 2021 interview B.T Squad | 20 Sep 2021 first day B.T Squad | 3 or 4 or 5 Nov 2021 last day B.T Squad",
  "7 Nov 2021 Sir Siyyam recommended office first day | 10 Nov 2021 last day Sir Siyyam recommended office",
  "Sep 2022 to 13 Oct 2022 Apps4U",
  "7 Dec 2022 Township office interview | 13 Dec first day Township office | 3 Jan 2023 last day Township office",
  "5 Jan 2023 EMI Fusion interview | 10 Jan 2023 first day EMI Fusion | 31 May 2023 last day EMI Fusion",
  "17 July 2023 Gsoft interview | 18 July 2023 first day Gsoft | 28 June 2024 last day",
  "Virikson Travel: Timing for Interview: 5 PM [29 January 2024]",
  "Matrix Solutions: 6 March 2024 Interview",
  "Developers Den: 8 May 2024 online interview",
  "Agile District: 8 May 2024 interview",
  "4 June interview online but didn't happen due to webcam issue",
  "7 June 2024: Sigi Technology",
  "1 July 2024: Stewart hand written test | 16 July 2024: Stewart Interview",
  "8 Sep 2024: Apps4U Joining | 13 Sep 2024: First day Apps4U | 5 December 2024 last day",
  "11 July 2025: ArhamSoft interview",
  "30 July 2025: Orbix Technologies (online)",
];

const Interview = () => {
  return (
    <div className="container">
      {interviewData.map((item, index) => (
        <h2 key={index} className="h2">
          {item}
        </h2>
      ))}
    </div>
  );
};

export default Interview;

export function generateMetadata() {
  return { title: "Interview" };
}
