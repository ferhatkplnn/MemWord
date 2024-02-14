import PropTypes from "prop-types";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { LiaRandomSolid } from "react-icons/lia";

function StatusButton({ status, cardFilterStatus, handleFilterStatus }) {
  return (
    <button
      key={status}
      className={`${
        cardFilterStatus === status ? " ring-2" : ""
      } border-slate-500 px-2 py-1 text-sm rounded bg-slate-700`}
      onClick={() => handleFilterStatus(status)}
    >
      {status === "random" ? (
        <LiaRandomSolid />
      ) : status === "sorted" ? (
        <FaSortAmountUpAlt />
      ) : (
        "Normal"
      )}
    </button>
  );
}

StatusButton.propTypes = {
  status: PropTypes.string.isRequired,
  cardFilterStatus: PropTypes.string.isRequired,
  handleFilterStatus: PropTypes.func.isRequired,
};

export default StatusButton;
