type Player = "X" | "O" | "BOTH" | null;

export const Square = ({
  value,
  onClick,
  winner,
}: {
  value: Player;
  onClick: () => void;
  winner: Player;
}) => {
  if (!value) {
    return (
      <button className="square" onClick={onClick} disabled={Boolean(winner)} />
    );
  }
  return (
    <button className={`square square_${value.toLowerCase()}`} disabled>
      {value}
    </button>
  );
};
