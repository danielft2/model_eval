import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="max-w-[700px] flex flex-col items-center gap-6">
        <Image
          src="/helps.svg"
          alt="avaliação enviada"
          width={100}
          height={105}
        />
        <div className="text-center space-y-2">
          <h1 className="text-slate-950 font-heading -tracking-wider font-medium text-4xl">
            Ops! Avaliação não encontrada
          </h1>
          <p className="text-slate-600 font-body font-medium">
            O link que você acessou pode estar incorreto, expirado ou o
            formulário foi removido.
          </p>
        </div>
      </div>
    </div>
  );
}
