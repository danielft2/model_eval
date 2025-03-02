import { retrieveCurrentUser } from "@/actions/retrieve-current-user";
import { Divider } from "@/components/ui/divider";
import { checkHasEvaluations } from "@/features/work/services/check-has-evaluations";
import { EvaluationsTabs } from "@/features/work/components/evaluations-tabs";
import { FirstEvaluation } from "@/features/work/components/first-evaluation";
import { UpdateUsernameModal } from "@/features/work/components/update-username-modal";

export default async function WorkPage() {
  const hasEvaluations = await checkHasEvaluations();
  const user = await retrieveCurrentUser();
  const userName = user?.name;

  return (
    <div className="space-y-8">
      <section className="px-6 py-4 border border-slate-300 rounded-xl">
        <h1 className="text-xl font-medium font-heading -tracking-wide text-slate-900">
          👋 Olá, {userName || "Visitante"}
        </h1>
        <p className="font-body text-sm font-medium text-slate-600">
          Bem vindo ao seu espaço de trabalho.
        </p>
      </section>

      {hasEvaluations?.data ? (
        <>
          <Divider />
          <section className="space-y-4">
            <div>
              <h1 className="text-lg font-medium font-heading -tracking-wide text-slate-900">
                Suas Avaliações
              </h1>
              <p className="font-body text-sm font-medium text-slate-600">
                Coleções de avaliações criadas.
              </p>
            </div>
            <EvaluationsTabs />
          </section>
        </>
      ) : (
        <FirstEvaluation />
      )}
      
      <UpdateUsernameModal isOpen={!!userName} />
    </div>
  );
}
