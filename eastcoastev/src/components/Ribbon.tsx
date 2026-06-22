export default function Ribbon() {
  const items = (
    <span>
      E-Bikes &nbsp;<span className="ribbon-sep">◆</span>&nbsp; E-Scooters &nbsp;<span className="ribbon-sep">◆</span>&nbsp; E-Trikes &nbsp;<span className="ribbon-sep">◆</span>&nbsp; Mobility Aids &nbsp;<span className="ribbon-sep">◆</span>&nbsp; Expert Service &nbsp;<span className="ribbon-sep">◆</span>&nbsp; Fredericton, NB &nbsp;<span className="ribbon-sep">◆</span>&nbsp; Future Expansion Planned &nbsp;<span className="ribbon-sep">◆</span>&nbsp;
    </span>
  );

  return (
    <div className="ribbon">
      <div className="ribbon-track">
        {items}
        {items}
      </div>
    </div>
  );
}
