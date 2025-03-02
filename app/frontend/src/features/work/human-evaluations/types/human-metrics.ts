export type BinaryMetric = {
  total_considered: number;
  total_not_considered: number;
};

export type UtilityMetric = {
  total_not_useful: number;
  total_useful_with_importants_edits: number;
  total_userful_with_minor_edits: number;
  total_useful_without_edits: number;
};
