

// to log all the positions of the squares selected by the players
export default function Log({ turns }) {
  return (
    <ol id="log">
        {/* mapping the turns list and outputting which player selected the sqaure */}
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} seleccted {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
