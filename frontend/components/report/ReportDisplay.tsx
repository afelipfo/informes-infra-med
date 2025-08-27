import { GeneratedReport } from "@/lib/api";
import { ReportSectionCard } from "./ReportSectionCard";

interface ReportDisplayProps {
  report: GeneratedReport;
}

export function ReportDisplay({ report }: ReportDisplayProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Informe Generado</h2>
        <p className="text-slate-600">{report.context}</p>
        <div className="text-sm text-slate-500">
          <span>Contrato: {report.contract_type}</span> | <span>Año: {report.year}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {report.sections.map((section, index) => (
          <ReportSectionCard key={index} section={section} />
        ))}
      </div>
    </div>
  );
}