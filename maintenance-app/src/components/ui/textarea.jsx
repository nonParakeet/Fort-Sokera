export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`border p-2 rounded-xl w-full ${className}`}
      {...props}
    />
  );
}