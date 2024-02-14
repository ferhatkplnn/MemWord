import PropTypes from "prop-types";

function ScoreBoard({ randomWord }) {
  return (
    <>
      <div className="absolute hidden group-hover:block drop-shadow-lg rounded-lg right-0 top-0  -translate-y-full px-4 py-2 bg-slate-700 w-32">
        <div className="flex justify-between">
          Score: <span>{randomWord.count.score}</span>
        </div>
        <div className="flex justify-between">
          Current: <span>{randomWord.count.current}</span>
        </div>
        <div className="flex justify-between">
          Wrong: <span>{randomWord.count.wrong}</span>
        </div>
        <div className="flex justify-between">
          Combo: <span>{randomWord.count.combo}</span>
        </div>
      </div>
    </>
  );
}

ScoreBoard.propTypes = {
  randomWord: PropTypes.shape({
    count: PropTypes.shape({
      score: PropTypes.number.isRequired,
      current: PropTypes.number.isRequired,
      wrong: PropTypes.number.isRequired,
      combo: PropTypes.number.isRequired,
    }),
  }),
};

export default ScoreBoard;
