import { useState, useRef, useCallback } from 'react';
import { Upload, X, FileSpreadsheet } from 'lucide-react';

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileSelect,
  accept = '.xlsx,.xls,.csv',
  maxSize = 10 * 1024 * 1024, // 10MB
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = useCallback((file: File): string | null => {
    // Validate file type
    const fileType = file.name.split('.').pop()?.toLowerCase() || '';
    if (!['xlsx', 'xls', 'csv'].includes(fileType)) {
      return 'El archivo debe ser de formato Excel (.xlsx, .xls) o CSV (.csv)';
    }

    // Validate file size
    if (file.size > maxSize) {
      return `El archivo es demasiado grande. El tamaño máximo es ${maxSize / (1024 * 1024)}MB`;
    }

    return null;
  }, [maxSize]);

  const processFile = useCallback((file: File) => {
    const validationError = validateFile(file);
    
    if (validationError) {
      setError(validationError);
      setFile(null);
    } else {
      setError(null);
      setFile(file);
      onFileSelect(file);
    }
  }, [validateFile, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      processFile(droppedFile);
    }
  }, [disabled, processFile]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      processFile(selectedFile);
    }
  }, [processFile]);

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={accept}
        className="hidden"
        disabled={disabled}
      />
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-6
          ${isDragging ? 'border-orange-500 bg-orange-50' : 'border-blue-200'}
          ${file ? 'bg-blue-50' : 'bg-white'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
          transition-all duration-200 ease-in-out
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={disabled ? undefined : handleBrowseClick}
      >
        <div className="text-center">
          {!file && (
            <>
              <div className="mx-auto flex justify-center items-center w-12 h-12 bg-blue-100 text-blue-500 rounded-full mb-4">
                <Upload size={24} />
              </div>
              <p className="text-sm font-medium text-blue-900">
                Arrastra y suelta tu archivo aquí o <span className="text-orange-500 underline">selecciónalo</span>
              </p>
              <p className="mt-2 text-xs text-slate-500">Excel o CSV (máx. 10MB)</p>
            </>
          )}
          
          {file && (
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <FileSpreadsheet className="w-10 h-10 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-medium text-blue-900 truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button 
                type="button" 
                className="flex-shrink-0 ml-2 p-1 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};
