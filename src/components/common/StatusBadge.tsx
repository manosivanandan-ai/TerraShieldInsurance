import { statusColor } from '../../utils/helpers';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span className={`badge ${statusColor(status)} ${className}`}>
      {status}
    </span>
  );
}
