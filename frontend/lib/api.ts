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

// Configuración de la API para diferentes entornos
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tu-app.railway.app/api/v1'  // Cambia esto por tu URL de Railway
  : 'http://localhost:8000/api/v1';

export const api = {
  baseURL: API_BASE_URL,
  
  // Función para hacer requests
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  },

  // Endpoints específicos
  health: () => api.request('/health'),
  generateReport: (data: FormData) => {
    return fetch(`${api.baseURL}/reports/generate`, {
      method: 'POST',
      body: data,
    });
  },
  
  getReports: () => api.request('/reports'),
};