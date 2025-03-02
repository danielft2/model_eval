export type ModelConfig = {
  model_title_id?: string;
  input_text?: string;
};

export type AutomaticEvaluationInsertDto = {
  metric_id: string;
  title: string;
  model_qg?: ModelConfig;
  model_qa?: ModelConfig;
  model_dg?: ModelConfig;
};