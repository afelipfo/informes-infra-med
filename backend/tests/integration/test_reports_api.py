"""
Tests de integración para los endpoints de reportes
"""
import pytest
from httpx import AsyncClient
import io

class TestReportsAPI:
    """Tests de integración para la API de reportes"""
    
    @pytest.mark.asyncio
    async def test_generate_demo_report(self, client: AsyncClient):
        """Test: endpoint de reporte demo"""
        # Act
        response = await client.post("/api/v1/reports/generate-demo")
        
        # Assert
        assert response.status_code == 200
        data = response.json()
        assert "sections" in data
        assert "contract_type" in data
        assert len(data["sections"]) > 0
    
    @pytest.mark.asyncio
    async def test_generate_report_with_csv_file(self, client: AsyncClient):
        """Test: endpoint de generación con archivo CSV"""
        # Arrange
        csv_content = """presupuesto_aprobado,valor_ejecutado,fecha_fin_planificada,porcentaje_avance_fisico
2000000.0,1500000.0,2025-12-31,75.0"""
        
        files = {
            "file": ("test.csv", io.BytesIO(csv_content.encode()), "text/csv")
        }
        
        # Act
        response = await client.post("/api/v1/reports/generate", files=files)
        
        # Assert
        assert response.status_code == 200
        data = response.json()
        assert "sections" in data
        assert len(data["sections"]) > 0
    
    @pytest.mark.asyncio
    async def test_generate_report_invalid_file_type(self, client: AsyncClient):
        """Test: archivo con tipo no válido debe fallar"""
        # Arrange
        files = {
            "file": ("test.txt", io.BytesIO(b"invalid content"), "text/plain")
        }
        
        # Act
        response = await client.post("/api/v1/reports/generate", files=files)
        
        # Assert
        assert response.status_code == 400
        assert "formato de archivo no soportado" in response.json()["detail"].lower()
