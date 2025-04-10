import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
