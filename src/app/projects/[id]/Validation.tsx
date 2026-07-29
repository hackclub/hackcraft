export default function Validation({
  validation,
}: {
  validation: { errors: string[]; warnings: string[] };
}) {
  return (
    <>
      {validation.errors.map(message => (
        <p
          key={message}
          style={{
            margin: "0.35rem 0 0",
            fontSize: "0.85rem",
            color: "#ff8080",
          }}>
          {message}
        </p>
      ))}
      {validation.warnings.map(message => (
        <p
          key={message}
          style={{
            margin: "0.35rem 0 0",
            fontSize: "0.85rem",
            color: "#ffe066",
          }}>
          {message}
        </p>
      ))}
    </>
  );
}
