// Definimos las interfaces de TypeScript que corresponden
// a los esquemas Pydantic del backend. Esto nos da autocompletado y seguridad de tipos.

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

// Obtenemos la URL de la API desde las variables de entorno
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Llama al endpoint del backend para generar un informe.
 * @param excelApiUrl La URL del archivo Excel a procesar.
 * @returns Una promesa que se resuelve con el informe generado.
 * @throws Un error si la petición falla.
 */
export async function generateReport(excelApiUrl: string): Promise<GeneratedReport> {
  const response = await fetch(`${API_BASE_URL}/api/v1/reports/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ excel_api_url: excelApiUrl }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // Lanzamos un error con el mensaje que nos envía el backend
    throw new Error(errorData.detail || 'Ocurrió un error desconocido en el servidor.');
  }

  return response.json();
}