export interface TechnicalMessage {
  block_name: string;
  message: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface ReportSection {
  title: string;
  data: Record<string, any>;
  message: TechnicalMessage;
}

export interface GeneratedReport {
  contract_type: string;
  year: number;
  context: string;
  sections: ReportSection[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateReport(excelApiUrl: string): Promise<GeneratedReport> {
  const response = await fetch(`${API_BASE_URL}/api/v1/reports/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ excel_api_url: excelApiUrl }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Ocurrió un error desconocido en el servidor.');
  }

  return response.json();
}

export async function generateDemoReport(): Promise<GeneratedReport> {
  const response = await fetch(`${API_BASE_URL}/api/v1/reports/generate-demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Ocurrió un error desconocido en el servidor.');
  }

  return response.json();
}