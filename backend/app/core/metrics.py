"""
Sistema de métricas para monitoreo de rendimiento
"""
import time
import asyncio
from functools import wraps
from typing import Dict, Any, Callable
from collections import defaultdict
import json
from datetime import datetime, timedelta
from app.core.logging.config import get_logger

logger = get_logger(__name__)

class MetricsCollector:
    """Recolector de métricas de rendimiento"""
    
    def __init__(self):
        self.metrics = defaultdict(list)
        self.start_time = datetime.now()
    
    def record_metric(self, metric_name: str, value: float, tags: Dict[str, Any] = None):
        """Registrar una métrica"""
        metric_data = {
            'timestamp': datetime.now().isoformat(),
            'value': value,
            'tags': tags or {}
        }
        self.metrics[metric_name].append(metric_data)
        
        # Log para debugging
        logger.debug(f"Metric recorded: {metric_name}={value}", extra={'metric': metric_name, 'value': value})
    
    def get_metrics_summary(self) -> Dict[str, Any]:
        """Obtener resumen de métricas"""
        summary = {}
        for metric_name, values in self.metrics.items():
            if values:
                numeric_values = [v['value'] for v in values if isinstance(v['value'], (int, float))]
                if numeric_values:
                    summary[metric_name] = {
                        'count': len(numeric_values),
                        'min': min(numeric_values),
                        'max': max(numeric_values),
                        'avg': sum(numeric_values) / len(numeric_values),
                        'total': sum(numeric_values)
                    }
        return summary
    
    def reset_metrics(self):
        """Resetear métricas"""
        self.metrics.clear()
        self.start_time = datetime.now()

# Instancia global del recolector
metrics_collector = MetricsCollector()

def measure_execution_time(func_name: str = None):
    """Decorador para medir tiempo de ejecución"""
    def decorator(func: Callable):
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            start_time = time.time()
            try:
                result = await func(*args, **kwargs)
                execution_time = time.time() - start_time
                metric_name = func_name or f"{func.__module__}.{func.__name__}"
                metrics_collector.record_metric(
                    f"{metric_name}_execution_time",
                    execution_time,
                    {'status': 'success'}
                )
                return result
            except Exception as e:
                execution_time = time.time() - start_time
                metric_name = func_name or f"{func.__module__}.{func.__name__}"
                metrics_collector.record_metric(
                    f"{metric_name}_execution_time",
                    execution_time,
                    {'status': 'error', 'error_type': type(e).__name__}
                )
                raise
        
        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            start_time = time.time()
            try:
                result = func(*args, **kwargs)
                execution_time = time.time() - start_time
                metric_name = func_name or f"{func.__module__}.{func.__name__}"
                metrics_collector.record_metric(
                    f"{metric_name}_execution_time",
                    execution_time,
                    {'status': 'success'}
                )
                return result
            except Exception as e:
                execution_time = time.time() - start_time
                metric_name = func_name or f"{func.__module__}.{func.__name__}"
                metrics_collector.record_metric(
                    f"{metric_name}_execution_time",
                    execution_time,
                    {'status': 'error', 'error_type': type(e).__name__}
                )
                raise
        
        if asyncio.iscoroutinefunction(func):
            return async_wrapper
        else:
            return sync_wrapper
    
    return decorator

def record_api_call(endpoint: str, method: str, status_code: int, response_time: float):
    """Registrar llamada a API"""
    metrics_collector.record_metric(
        'api_calls',
        1,
        {
            'endpoint': endpoint,
            'method': method,
            'status_code': status_code,
            'response_time': response_time
        }
    )

def record_file_processing(file_type: str, file_size: int, processing_time: float):
    """Registrar procesamiento de archivo"""
    metrics_collector.record_metric(
        'file_processing',
        1,
        {
            'file_type': file_type,
            'file_size_mb': round(file_size / (1024 * 1024), 2),
            'processing_time': processing_time
        }
    )
