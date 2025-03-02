import { retrieveCurrentUser } from "@/actions/retrieve-current-user";
import { Navigation } from "@/features/work/components/navigation";
import Image from "next/image";

export default async function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await retrieveCurrentUser();

  return (
    <div className="flex flex-col h-screen" style={{ scrollbarGutter: 'stable' }}>
      <header className="min-h-14 flex flex-col justify-center border-b bg-white border-b-slate-200">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-heading text-xl font-medium">
            <Image src={"/logo.svg"} width={28} height={28} alt="logo"></Image>
            <span className="-tracking-wider">model.eval</span>
          </div>

          <Navigation />

          <div className="size-8 bg-brand-700 text-white font-heading text-sm font-medium rounded-full flex items-center justify-center">
            {user?.name?.charAt(0) || 'VI'} 
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto pt-8">{children}</main>
    </div>
  );
}
