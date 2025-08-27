# Fichero: backend/app/services/excel_parser.py

import pandas as pd
from typing import Dict, Any, List

class ExcelParserService:
    """Servicio para descargar, leer y validar los datos de un archivo Excel."""

    REQUIRED_COLUMNS: List[str] = [
        'presupuesto_aprobado',
        'valor_ejecutado',
        'fecha_fin_planificada',
        'porcentaje_avance_fisico'
    ]

    def __init__(self, excel_url: str):
        if not excel_url:
            raise ValueError("La URL del archivo Excel no puede estar vacía.")
        self.excel_url = excel_url

    def _validate_dataframe(self, df: pd.DataFrame):
        """Valida que el DataFrame tenga la estructura esperada."""
        if df.empty:
            raise ValueError("El archivo Excel está vacío o no contiene datos en la primera hoja.")

        missing_cols = [col for col in self.REQUIRED_COLUMNS if col not in df.columns]
        if missing_cols:
            raise ValueError(f"Faltan columnas obligatorias en el Excel: {', '.join(missing_cols)}")

    def get_data_as_dict(self) -> Dict[str, Any]:
        """
        Método principal que orquesta la lectura y validación del archivo.
        Devuelve la primera fila de datos como un diccionario de Python.
        """
        try:
            # Usamos engine='openpyxl' para compatibilidad con .xlsx
            df = pd.read_excel(self.excel_url, engine='openpyxl')
            self._validate_dataframe(df)

            # Convertimos la primera fila a un diccionario y limpiamos valores nulos
            data_dict = df.iloc[0].where(pd.notna(df.iloc[0]), None).to_dict()
            return data_dict

        except FileNotFoundError:
            raise ConnectionError("No se encontró el archivo en la URL proporcionada. Verifique el enlace.")
        except Exception as e:
            # Captura otros errores de red o de formato del archivo
            raise RuntimeError(f"Error al procesar el archivo Excel: {e}")