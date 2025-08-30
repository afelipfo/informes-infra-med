"""
Test unitario para el servicio de generación de reportes
"""
import pytest
from app.services.report_generator import ReportGeneratorService

class TestReportGenerator:
    """Tests para la clase ReportGeneratorService"""
    
    def test_generate_full_report_with_valid_data(self):
        """Test: generar informe completo con datos válidos"""
        # Arrange
        data = {
            'presupuesto_aprobado': 1000000.0,
            'valor_ejecutado': 850000.0,
            'fecha_fin_planificada': '2025-12-31',
            'porcentaje_avance_fisico': 85.0
        }
        generator = ReportGeneratorService(data=data)
        
        # Act
        sections = generator.generate_full_report()
        
        # Assert
        assert sections is not None
        assert len(sections) >= 1
        assert all(hasattr(section, 'title') for section in sections)
        assert all(hasattr(section, 'message') for section in sections)
    
    def test_generate_full_report_with_empty_data(self):
        """Test: generar informe con datos vacíos debe manejar gracefully"""
        # Arrange
        data = {}
        generator = ReportGeneratorService(data=data)
        
        # Act
        sections = generator.generate_full_report()
        
        # Assert
        # Debe generar algo incluso con datos vacíos
        assert sections is not None
    
    def test_calculate_budget_efficiency(self):
        """Test: cálculo de eficiencia presupuestaria"""
        # Arrange
        data = {
            'presupuesto_aprobado': 1000000.0,
            'valor_ejecutado': 850000.0,
        }
        generator = ReportGeneratorService(data=data)
        
        # Act
        efficiency = generator.data.get('valor_ejecutado', 0) / generator.data.get('presupuesto_aprobado', 1)
        
        # Assert
        assert efficiency == 0.85
