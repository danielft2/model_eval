type ShowConditionalProps = {
  condition: boolean;
  then?: React.ReactNode; 
  otherwise?: React.ReactNode; 
}

export function ShowConditional({ condition, then, otherwise }: ShowConditionalProps) {
  return condition ? then : otherwise;
}