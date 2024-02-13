import { colorByPercentage, scoreToPercentage } from "../utils/utils";

function ProgressBar({ score }) {
  const scorePercentage = scoreToPercentage(score);
  const color = colorByPercentage(scorePercentage);

  return (
    <div className="w-48 h-4 border border-slate-500 rounded-lg overflow-hidden">
      <div
        style={{ width: `${scorePercentage}%` }}
        className={`${color} h-full  duration-700 ease-in`}
      ></div>
    </div>
  );
}

export default ProgressBar;
