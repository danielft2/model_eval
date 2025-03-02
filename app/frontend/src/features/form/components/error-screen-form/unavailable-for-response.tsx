import Image from "next/image";

export function UnavailableForResponse() {
  return (
    <div className="flex flex-col items-center h-full justify-center">
      <div className="max-w-[600px] flex flex-col items-center gap-6">
        <Image src="/tasks-check.svg" alt="avaliação enviada" width={80} height={105} />
        <div className="text-center space-y-2">
          <h1 className="text-slate-950 font-heading -tracking-wider font-medium text-4xl">
            Sentimos muito, mas a avaliação não está aceitando respostas.
          </h1>
          <p className="text-slate-600 font-body font-medium">
            Entre em contato com quem compartilhou o link e verifique a disponibilidade.
          </p>
        </div>
      </div>
    </div>
  )
}