interface SpecsTableProps {
  specs: Record<string, string>;
}

export default function SpecsTable({ specs }: SpecsTableProps) {
  const entries = Object.entries(specs);
  if (entries.length === 0) return null;

  return (
    <div className="specs-block reveal">
      <div className="section-label">Specifications</div>
      <div className="specs-table">
        {entries.map(([key, value]) => (
          <div className="spec-row" key={key}>
            <span className="spec-key">{key}</span>
            <span className="spec-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
