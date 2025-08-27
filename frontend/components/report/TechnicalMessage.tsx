import { TechnicalMessage as TechnicalMessageType } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, ShieldAlert } from "lucide-react";

interface TechnicalMessageProps {
  message: TechnicalMessageType;
}

const severityStyles = {
  INFO: "bg-blue-100 border-blue-500 text-blue-800",
  WARNING: "bg-yellow-100 border-yellow-500 text-yellow-800",
  CRITICAL: "bg-red-100 border-red-500 text-red-800",
};

const icons = {
  INFO: <Info />,
  WARNING: <AlertTriangle />,
  CRITICAL: <ShieldAlert />,
}

export function TechnicalMessage({ message }: TechnicalMessageProps) {
  const baseClasses = "p-4 rounded-md border-l-4 flex items-start gap-4";
  const severityClass = severityStyles[message.severity];
  
  return (
    <div className={cn(baseClasses, severityClass)}>
      <div className="flex-shrink-0 mt-0.5">{icons[message.severity]}</div>
      <div>
        <p className="font-bold">Mensaje Técnico del Supervisor:</p>
        <p className="text-sm">{message.message}</p>
      </div>
    </div>
  );
}