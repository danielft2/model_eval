import Image from "next/image";

export function FinishStep() {
  return (
    <div className="flex flex-col items-center h-full justify-center">
      <div className="max-w-[600px] flex flex-col items-center gap-6">
        <Image src="/evaluate-finish.svg" alt="avaliação enviada" width={120} height={120} />
        <div className="text-center space-y-2">
          <h1 className="text-slate-950 font-heading -tracking-wider font-medium text-4xl">
            Você completou a avaliação!
          </h1>
          <p className="text-slate-600 font-body font-medium">
            Agradeçemos sua participação e empenho em responder as perguntas.
          </p>
        </div>
      </div>
    </div>
  )
}