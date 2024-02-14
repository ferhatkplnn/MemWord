import PropTypes from "prop-types";
function AddButton({ className, ...props }) {
  return (
    <>
      <button
        className={`p-2 bg-slate-600 rounded-md hover:bg-slate-500 outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-300 duration-150 ${className}`}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </>
  );
}

AddButton.propTypes = {
  className: PropTypes.string,
};

export default AddButton;
