"""
Modelos de base de datos para el sistema de informes de infraestructura médica
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .session import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class User(Base):
    """Modelo de usuario para autenticación"""
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(String, default="viewer")  # admin, generator, viewer
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relación con informes
    reports = relationship("Report", back_populates="created_by_user")

class Project(Base):
    """Modelo para proyectos de infraestructura"""
    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    description = Column(Text)
    supervisor_name = Column(String)
    contract_type = Column(String, default="Urgencia Manifiesta")
    status = Column(String, default="active")  # active, completed, cancelled
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relación con informes
    reports = relationship("Report", back_populates="project")

class Report(Base):
    """Modelo principal para informes generados"""
    __tablename__ = "reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"))
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    # Datos del contrato
    presupuesto_aprobado = Column(Float)
    valor_ejecutado = Column(Float)
    fecha_fin_planificada = Column(DateTime)
    porcentaje_avance_fisico = Column(Float)
    
    # Metadatos del informe
    contract_type = Column(String, default="Urgencia Manifiesta")
    year = Column(Integer, default=2025)
    context = Column(String, default="Secretaría de Infraestructura Física - Alcaldía de Medellín")
    
    # Datos JSON del informe completo
    sections_data = Column(JSON)  # Almacena las secciones del informe
    raw_data = Column(JSON)       # Datos originales del archivo subido
    
    # Archivo original
    original_filename = Column(String)
    file_type = Column(String)  # csv, xlsx, xls
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relaciones
    project = relationship("Project", back_populates="reports")
    created_by_user = relationship("User", back_populates="reports")

class ReportSection(Base):
    """Modelo para secciones individuales de informes (para análisis detallado)"""
    __tablename__ = "report_sections"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"))
    
    title = Column(String, nullable=False)
    block_name = Column(String)
    message = Column(Text)
    severity = Column(String)  # INFO, WARNING, CRITICAL
    data = Column(JSON)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ReportAnalytics(Base):
    """Modelo para analytics y métricas de informes"""
    __tablename__ = "report_analytics"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"))
    
    # Métricas calculadas
    budget_efficiency = Column(Float)  # valor_ejecutado / presupuesto_aprobado
    time_performance = Column(Float)   # avance real vs planificado
    risk_score = Column(Float)         # Puntuación de riesgo calculada
    
    # Análisis de tendencias
    trend_analysis = Column(JSON)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
