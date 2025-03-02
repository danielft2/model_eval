import { Form } from "@/features/auth/components/form";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="h-14 flex flex-col justify-center border-b border-b-slate-200">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 font-heading text-xl font-medium">
            <Image src={"/logo.svg"} width={28} height={28} alt="logo"></Image>
            <span className="-tracking-wider">model.eval</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto h-full flex flex-col justify-center items-center pb-[56px]">
          <div className="space-y-[72px]">
            <div className="flex flex-col items-center space-y-7">
              <Image
                src={"/logo.svg"}
                width={48}
                height={48}
                alt="logo"
              ></Image>

              <div className="space-y-2 flex flex-col items-center">
                <h1 className="font-heading text-4xl font-medium -tracking-wider">
                  É bom ter você aqui.
                </h1>
                <p className="font-body font-medium text-slate-600 max-w-[50ch] text-center">
                  Descubra como o seu modelo T5 performa na criação de questões
                  educacionais de forma fácil e rápida.
                </p>
              </div>
            </div>
            <Form />
          </div>
        </div>
      </main>
    </div>
  );
}
