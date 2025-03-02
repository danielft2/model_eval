type ErrorFieldProps = {
  message?: string
}

export function ErrorField({ message }: ErrorFieldProps) {
  return (
    <>
      {message && (
        <div className="text-red-700 text-[13px] font-heading -tracking-wider">
          <span>{message}</span>
        </div>
      )}
    </>
  );
}
