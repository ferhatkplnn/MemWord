import PropTypes from "prop-types";
import { forwardRef } from "react";

const Input = forwardRef(({ className, ...props }, ref) => (
  <>
    <input
      ref={ref}
      className={`border border-slate-500 rounded-md outline-none px-4 py-2 bg-transparent focus:border-sky-300 focus:ring-1 focus:ring-sky-300 duration-300 ${className}`}
      {...props}
    />
  </>
));

Input.displayName = "Input";

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
