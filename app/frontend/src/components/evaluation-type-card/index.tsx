import { ChildrenProps } from "@/@types/children-props";
import Image, { ImageProps } from "next/image";

type EvaluationTypeCardRootProps = ChildrenProps &
  React.HTMLAttributes<HTMLButtonElement>;

function EvaluationTypeCardRoot({
  children,
  ...rest
}: EvaluationTypeCardRootProps) {
  return (
    <button
      className="hover:border-brand-700 hover:bg-brand-50/40 transition-colors h-60 flex flex-col 
      space-y-5 cursor-pointer justify-center items-center flex-1 bg-slate-50 border border-slate-300 rounded-xl px-5 py-6"
      {...rest}
    >
      <div className="text-center flex flex-col items-center">{children}</div>
    </button>
  );
}

const EvaluationTypeCardImage = ({ alt, ...rest }: ImageProps) => {
  return (
    <Image {...rest} alt={alt} />
  );
};

const EvaluationTypeCardTitle = ({ children }: ChildrenProps) => {
  return (
    <h1 className="font-medium font-heading -tracking-wider text-slate-900">
      {children}
    </h1>
  );
};

const EvaluationTypeCardDescription = ({ children }: ChildrenProps) => {
  return (
    <p className="font-medium font-body text-slate-600 text-sm max-w-[40ch]">
      {children}
    </p>
  );
};

export const EvaluationTypeCard = {
  Root: EvaluationTypeCardRoot,
  Image: EvaluationTypeCardImage,
  Title: EvaluationTypeCardTitle,
  Description: EvaluationTypeCardDescription,
}