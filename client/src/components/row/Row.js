const Row = ({ cols, heading }) => {
  const row = cols.map((col) => {
    return heading ? (
      <div
        style={{
          width: "100%",
          border: "1px solid black",
          padding: "0px 10px",
          boxSizing: "border-box",
        }}
      >
        <b>{col}</b>
      </div>
    ) : (
      <div
        style={{
          width: "100%",
          border: "1px solid black",
          padding: "0px 10px",
          boxSizing: "border-box",
        }}
      >
        {col}
      </div>
    );
  });
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr ".repeat(cols.length),
        }}
      >
        {row}
      </div>
    </>
  );
};

export default Row;
