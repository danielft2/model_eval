type ShowProps = {
  when: boolean;
  children: React.ReactNode;
}

export function Show({ when, children }: ShowProps) {
  if (!when) return null;
  return children;
}