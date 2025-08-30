'use client';

interface ProgressRingProps {
  percentage: number;
  label: string;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({ 
  percentage, 
  label, 
  size = 120, 
  strokeWidth = 8 
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (percent: number) => {
    if (percent >= 90) return '#10B981'; // green
    if (percent >= 70) return '#F59E0B'; // yellow
    if (percent >= 50) return '#EF4444'; // red
    return '#6B7280'; // gray
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor(percentage)}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-900">
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>
      <div className="mt-2 text-sm font-medium text-gray-600 text-center">
        {label}
      </div>
    </div>
  );
}
