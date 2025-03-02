import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useWizard } from "react-use-wizard";

type WelcomeStepProps = {
  instructions: string;
};

export function WelcomeStep({ instructions }: WelcomeStepProps) {
  const { nextStep } = useWizard();

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <div className="max-w-[800px] flex flex-col items-center gap-8">
        <Image src={"/welcome-form.svg"} alt="ilustração bem vindo" width={200} height={200} />
        <div className="text-center space-y-2">
          <h1 className="text-slate-950 font-heading -tracking-wider font-medium text-4xl">
            Olá, Avaliador! É bom tê-lo aqui
          </h1>
          <p className="text-slate-600 font-body font-medium">
            {instructions}
          </p>
        </div>
        <Button onClick={nextStep}>Começar Avaliação</Button>
      </div>
    </div>
  );
}
