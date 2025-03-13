import { getCurrentUser } from "@/shared/actions/utils/auth/get-current-user-action";
import { Divider } from "@/shared/components/ui/divider";
import { checkHasEvaluations } from "@/profiles/researcher/shared/external/http/check-has-evaluations-action";
import { EvaluationsTabs } from "@/profiles/researcher/shared/components/evaluations-tabs";
import { FirstEvaluation } from "@/profiles/researcher/shared/components/first-evaluation";
import { UpdateUsernameModal } from "@/profiles/researcher/shared/components/update-username-modal";

export default async function WorkPage() {
  const hasEvaluations = await checkHasEvaluations();
  const user = await getCurrentUser();
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
