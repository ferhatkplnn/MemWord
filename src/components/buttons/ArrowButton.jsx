import PropTypes from "prop-types";
function ArrowButton({ handleClick, imgURL, isDisable }) {
  return (
    <button
      disabled={isDisable}
      onClick={handleClick}
      className="border-2 border-slate-400 rounded-full p-3 hover:bg-slate-100/20 duration-150 disabled:hover:bg-transparent disabled:brightness-50"
    >
      <img src={imgURL} alt="" className="h-6 w-6" />
    </button>
  );
}

ArrowButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  imgURL: PropTypes.string.isRequired,
  isDisable: PropTypes.bool,
};

export default ArrowButton;
