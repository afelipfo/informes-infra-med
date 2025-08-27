import { ReportSection } from "@/lib/api";
import { TechnicalMessage } from "./TechnicalMessage";

interface ReportSectionCardProps {
  section: ReportSection;
}

export function ReportSectionCard({ section }: ReportSectionCardProps) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold mb-3 border-b pb-2">{section.title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {Object.entries(section.data).map(([key, value]) => (
          <div key={key} className="text-sm">
            <p className="font-semibold text-slate-700">{key}:</p>
            <p className="text-slate-600">{value !== null ? String(value) : 'N/A'}</p>
          </div>
        ))}
      </div>
      
      <TechnicalMessage message={section.message} />
    </div>
  );
}