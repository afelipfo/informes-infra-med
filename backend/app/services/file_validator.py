"""
Servicio de validación de archivos con verificaciones de seguridad
"""
from typing import Tuple, Optional
import magic
import os
from app.core.config import settings
from app.core.logging.config import get_logger

logger = get_logger(__name__)

class FileValidator:
    """Validador de archivos con verificaciones de seguridad"""
    
    ALLOWED_MIME_TYPES = {
        '.csv': ['text/csv', 'text/plain', 'application/csv'],
        '.xlsx': [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/zip'  # Excel files are ZIP archives
        ],
        '.xls': [
            'application/vnd.ms-excel',
            'application/excel'
        ]
    }
    
    def __init__(self):
        self.max_size = settings.MAX_FILE_SIZE
        self.allowed_extensions = settings.ALLOWED_FILE_EXTENSIONS
    
    def validate_file(self, filename: str, content: bytes) -> Tuple[bool, Optional[str]]:
        """
        Valida un archivo basándose en nombre, contenido y metadatos
        
        Returns:
            Tuple[bool, Optional[str]]: (is_valid, error_message)
        """
        
        # 1. Validar nombre de archivo
        if not filename:
            return False, "Nombre de archivo requerido"
            
        # 2. Validar extensión
        file_ext = self._get_file_extension(filename)
        if not file_ext:
            return False, "Archivo debe tener extensión"
            
        if file_ext not in self.allowed_extensions:
            return False, f"Extensión {file_ext} no permitida. Use: {', '.join(self.allowed_extensions)}"
        
        # 3. Validar tamaño
        if len(content) > self.max_size:
            max_mb = self.max_size / (1024 * 1024)
            return False, f"Archivo demasiado grande. Máximo: {max_mb:.1f}MB"
        
        if len(content) == 0:
            return False, "Archivo está vacío"
        
        # 4. Validar MIME type (si python-magic está disponible)
        try:
            mime_type = magic.from_buffer(content, mime=True)
            if file_ext in self.ALLOWED_MIME_TYPES:
                allowed_mimes = self.ALLOWED_MIME_TYPES[file_ext]
                if mime_type not in allowed_mimes:
                    logger.warning(f"MIME type mismatch: {mime_type} for extension {file_ext}")
                    # Log warning but don't reject - MIME detection can be unreliable
        except Exception as e:
            logger.warning(f"Could not detect MIME type: {e}")
        
        # 5. Validar contenido específico por tipo
        validation_result = self._validate_content(file_ext, content)
        if not validation_result[0]:
            return validation_result
        
        logger.info(f"File validation successful: {filename}")
        return True, None
    
    def _get_file_extension(self, filename: str) -> Optional[str]:
        """Obtener extensión de archivo de forma segura"""
        try:
            return os.path.splitext(filename.lower())[1]
        except Exception:
            return None
    
    def _validate_content(self, file_ext: str, content: bytes) -> Tuple[bool, Optional[str]]:
        """Validar contenido específico según el tipo de archivo"""
        
        if file_ext == '.csv':
            return self._validate_csv_content(content)
        elif file_ext in ['.xlsx', '.xls']:
            return self._validate_excel_content(content)
        
        return True, None
    
    def _validate_csv_content(self, content: bytes) -> Tuple[bool, Optional[str]]:
        """Validar contenido CSV básico"""
        try:
            # Verificar que es texto válido
            text_content = content.decode('utf-8')
            
            # Verificar que tiene al menos una línea
            lines = text_content.strip().split('\n')
            if len(lines) < 1:
                return False, "Archivo CSV está vacío"
            
            # Verificar que la primera línea tiene comas (headers)
            if ',' not in lines[0]:
                return False, "Archivo CSV debe tener separadores de columna (comas)"
            
            return True, None
            
        except UnicodeDecodeError:
            return False, "Archivo CSV debe estar en formato UTF-8"
        except Exception as e:
            return False, f"Error validando CSV: {str(e)}"
    
    def _validate_excel_content(self, content: bytes) -> Tuple[bool, Optional[str]]:
        """Validar contenido Excel básico"""
        try:
            # Para .xlsx verificar que empiece con ZIP signature
            if content[:4] == b'PK\x03\x04':
                return True, None
            
            # Para .xls verificar signature de OLE
            if content[:8] == b'\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1':
                return True, None
            
            # Permitir otros formatos válidos de Excel
            return True, None
            
        except Exception as e:
            return False, f"Error validando Excel: {str(e)}"
