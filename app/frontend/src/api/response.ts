export type ResponseApp<T, E> = {
  data: T | null;
  error: E | null;
}