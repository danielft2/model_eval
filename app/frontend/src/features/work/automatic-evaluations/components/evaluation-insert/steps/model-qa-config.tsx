import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EvaluationInsertData } from "@/features/work/automatic-evaluations/schemes/evalution-insert";
import { ErrorField } from "@/components/ui/error-field";
import { DialogSection } from "@/components/dialog/dialog-section";

export function ModelQAConfig() {
  const { previousStep, nextStep } = useWizard();

  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<EvaluationInsertData>();

  async function handleNextStep() {
    const isValid = await trigger(["model_qa"]);
    if (!isValid) return;

    const data = getValues();
    setValue("model_qa", data.model_qa);
    nextStep();
  }

  const modelIdErrorMessage = errors.model_qa?.model_title_id?.message;
  const inputTextErrorMessage = errors.model_qa?.model_title_id?.message;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="space-y-7">
        <DialogSection.Content>
          <DialogSection.Title>
            Tarefa de Resposta a Pergunta
          </DialogSection.Title>
          <DialogSection.Description>
            Defina o modelo que será avaliado nessa tarefa.
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
              {...register("model_qa.model_title_id")}
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
              placeholder="Exemplo: “{texto}\n\nAnswer this question based on the article: {comando}”"
              rows={2}
              className={modelIdErrorMessage && "invalid-field"}
              {...register("model_qa.input_text")}
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
        <Button className="min-w-[100px]" onClick={handleNextStep}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
