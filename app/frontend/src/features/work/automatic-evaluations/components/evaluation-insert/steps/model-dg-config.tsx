import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EvaluationInsertData } from "@/features/work/automatic-evaluations/schemes/evalution-insert";
import { ErrorField } from "@/components/ui/error-field";
import { DialogSection } from "@/components/dialog/dialog-section";

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
  } = useFormContext<EvaluationInsertData>();

  async function handleNextStep() {
    const isValid = await trigger(["model_dg"]);
    if (!isValid) return;

    const data = getValues();
    setValue("model_dg", data.model_dg);
    onFinish();
  }

  const modelIdErrorMessage = errors.model_dg?.model_title_id?.message;
  const inputTextErrorMessage = errors.model_dg?.model_title_id?.message;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="space-y-7">
        <DialogSection.Content>
          <DialogSection.Title>Tarefa de Geração de Distratores</DialogSection.Title>
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
        <Button className="min-w-[100px]" disabled={isLoading} onClick={handleNextStep}>
          Finalizar
        </Button>
      </div>
    </div>
  );
}
