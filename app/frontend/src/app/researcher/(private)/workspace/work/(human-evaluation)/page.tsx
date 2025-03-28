import { fetchWrapperServerComponent } from "@/infra/http/fetch-wrapper-server-component";
import { WorkTabsContainer } from "@/profiles/researcher/shared/components/containers";
import { FirstEvaluation } from "@/profiles/researcher/shared/components/first-evaluation";
import { UpdateUsernameModal } from "@/profiles/researcher/shared/components/update-username-modal";
import { checkHasEvaluationsUseCase } from "@/profiles/researcher/shared/core/usecases/check-has-evaluations-use-case";
import { getCurrentUser } from "@/shared/actions/utils/auth/get-current-user-action";
import { Divider } from "@/shared/components/ui/divider";
import { ShowConditional } from "@/shared/components/ui/show-conditional";

export default async function WorkPage() {
  const { data } = await fetchWrapperServerComponent({
    asyncFunction: checkHasEvaluationsUseCase,
  });
  const user = await getCurrentUser();
  const userName = user?.name;
  const hasEvaluations = Boolean(data?.has_evaluations);

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

      <ShowConditional
        condition={hasEvaluations}
        then={
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
              <WorkTabsContainer />
            </section>
          </>
        }
        otherwise={<FirstEvaluation />}
      />

      <UpdateUsernameModal isOpen={!!userName} />
    </div>
  );
}
