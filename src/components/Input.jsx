function Input({ className, ...props }) {
  return (
    <>
      <input
        className={`border border-slate-500 rounded-md outline-none px-4 py-2 bg-transparent focus:border-sky-300 focus:ring-1 focus:ring-sky-300 duration-300 ${className}`}
        {...props}
      />
    </>
  );
}

export default Input;
