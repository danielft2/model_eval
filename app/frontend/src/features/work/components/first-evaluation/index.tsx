import Image from "next/image";
import { ChoiceEvaluationCards } from "@/features/work/components/choice-evaluation-cards";

export function FirstEvaluation() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <Image src={"/logo.svg"} width={48} height={48} alt="logo" />
        <div className="text-center">
          <h1 className="text-xl text-slate-900 font-heading font-medium -tracking-wider">
            Crie a sua primeira avaliação
          </h1>
          <p className="font-body font-medium text-slate-600 text-[15px]">
            Escolha abaixo que tipo de avaliação você deseja realizar
          </p>
        </div>
      </div>

      <ChoiceEvaluationCards />
    </div>
  );
}
