type RadioAlternativeProps = React.HtmlHTMLAttributes<HTMLButtonElement> & {
  letter: string;
};

export function RadioAlternative({
  children,
  letter,
  ...rest
}: RadioAlternativeProps) {
  return (
    <button
      className="group text-left px-2 py-1 border border-slate-300 text-slate-700 rounded-lg text-sm font-heading
      -tracking-wider font-medium data-[state=checked]:bg-brand-100 data-[state=checked]:text-brand-800 
      data-[state=checked]:border-brand-600 cursor-pointer transition-colors"
      {...rest}
    >
      <span className="size-5 inline-block text-center rounded bg-slate-200 mr-2 text-slate-700 group-data-[state=checked]:bg-white">
        {letter}
      </span>
      {children}
    </button>
  );
}
