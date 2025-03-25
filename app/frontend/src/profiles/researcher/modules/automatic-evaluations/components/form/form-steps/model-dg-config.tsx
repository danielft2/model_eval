import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";

import { tEvaluationFormSchema } from "@/automatic-evaluations/schemas/evalution-form-schema";
import { DialogSection } from "@/profiles/researcher/shared/components/dialog/dialog-section";
import { Button } from "@/shared/components/ui/button";
import { ErrorField } from "@/shared/components/ui/error-field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { ShowConditional } from "@/shared/components/ui/show-conditional";
import { LoaderCircle } from "lucide-react";

type ModelDGConfigProps = {
  onFinish: () => void;
  isLoading: boolean;
};

export function ModelDGConfig({ onFinish, isLoading }: ModelDGConfigProps) {
  const { previousStep } = useWizard();

  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<tEvaluationFormSchema>();

  async function handleNextStep() {
    const isValid = await trigger(["model_dg"]);
    if (!isValid) return;

    const data = getValues();
    setValue("model_dg", data.model_dg);
    onFinish();
  }

  const modelIdErrorMessage = errors.model_dg?.input_text?.message;
  const inputTextErrorMessage = errors.model_dg?.input_text?.message;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="space-y-7">
        <DialogSection.Content>
          <DialogSection.Title>
            Tarefa de Geração de Distratores
          </DialogSection.Title>
          <DialogSection.Description>
            Escolha a métrica de avaliação automática no qual o modelo vai ser
            avaliado.
          </DialogSection.Description>
        </DialogSection.Content>

        <form className="space-y-4">
          <div className="space-y-1 flex-grow">
            <label
              htmlFor="model_id"
              className="text-sm font-heading font-medium -tracking-wider text-slate-800"
            >
              Modelo (HugginfaceID)
            </label>
            <Input
              id="model_id"
              type="text"
              className={modelIdErrorMessage && "invalid-field"}
              {...register("model_dg.model_title_id")}
            />

            <ErrorField message={modelIdErrorMessage} />
          </div>

          <div className="space-y-1 flex-grow">
            <label
              htmlFor="input_text"
              className="text-sm font-heading font-medium -tracking-wider text-slate-800"
            >
              Input text
            </label>
            <Textarea
              id="input_text"
              placeholder="Exemplo: “What would be incorrect answers to the question?\n\n{texto}\n\nQuestion: {question}\n\nResponse: {answer}”"
              rows={2}
              className={inputTextErrorMessage && "invalid-field"}
              {...register("model_dg.input_text")}
            />

            <ErrorField message={inputTextErrorMessage} />
          </div>
        </form>
      </div>

      <div className="mt-[25px] flex gap-2 justify-end">
        <Button
          variant="secondary"
          className="min-w-[100px]"
          onClick={() => previousStep()}
        >
          Voltar
        </Button>
        <Button
          className="min-w-[100px]"
          disabled={isLoading}
          onClick={handleNextStep}
        >
          <ShowConditional
            condition={isLoading}
            then={
              <>
                <LoaderCircle className="animate-spin" />
                Criando
              </>
            }
            otherwise={"Finalizar"}
          />
        </Button>
      </div>
    </div>
  );
}
