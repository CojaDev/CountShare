import { CountdownCard } from '@/components/CountdownCard';

interface Countdown {
  _id: string;
  name: string;
  description: string;
  date: string;
  backgroundColor: string;
  textColor: string;
  backgroundImage?: string;
  createdBy: string;
  creatorName:string;
}

interface CountdownGridProps {
  countdowns: Countdown[];
  isOwnProfile: boolean;
  onEdit?: (_id: string) => void;
  onDelete?: (_id: string) => void;
}

export function CountdownGrid({ countdowns, isOwnProfile, onEdit, onDelete }: CountdownGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {countdowns.map((countdown) => (
        <CountdownCard
          key={countdown._id}
          {...countdown}
          onEdit={isOwnProfile ? () => onEdit && onEdit(countdown._id) : undefined}
          onDelete={isOwnProfile ? () => onDelete && onDelete(countdown._id) : undefined}
          showActions={isOwnProfile}
        />
      ))}
    </div>
  );
}

