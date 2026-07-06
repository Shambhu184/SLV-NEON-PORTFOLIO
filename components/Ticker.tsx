const ITEMS = [
  "MIND-TO-SPEECH",
  "EEG \u00B7 256 CH",
  "NEURO-AI",
  "SPEECH DECODING",
  "DEEP LEARNING",
  "BRAIN-COMPUTER INTERFACES",
  "SILENT COMMUNICATION",
  "HUMAN-CENTERED",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <>
      {ITEMS.map((item) => (
        <span key={`${item}${hidden ? "-b" : ""}`} aria-hidden={hidden || undefined}>
          {item}
          <span className="hexsep" style={{ marginLeft: 44 }}>
            &#x2B21;
          </span>
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  return (
    <div className="ticker" aria-label="SLVNEON technology areas">
      <div className="ticker-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
