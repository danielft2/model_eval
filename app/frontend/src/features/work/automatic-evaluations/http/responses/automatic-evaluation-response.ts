export type AutomaticEvaluationResponse = { 
  id: number;
  evaluation_type_id: number;
  title: string;
  filename_test_count: number;
  models_configured: number;
  models_evaluated: number;
};