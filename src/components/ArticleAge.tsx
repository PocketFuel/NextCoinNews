import { formatDistanceToNow } from 'date-fns';

interface ArticleAgeProps {
  date: string | Date;
  className?: string;
}

export function ArticleAge({ date, className }: ArticleAgeProps) {
  const getAgeColor = (hours: number) => {
    if (hours <= 6) return 'bg-green-500/20 text-green-500';
    if (hours <= 12) return 'bg-yellow-500/20 text-yellow-500';
    if (hours <= 18) return 'bg-orange-500/20 text-orange-500';
    return 'bg-red-500/20 text-red-500';
  };

  const getFormattedAge = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    const age = formatDistanceToNow(date, { addSuffix: false });
    
    return age
      .replace(' seconds', 's')
      .replace(' minutes', 'm')
      .replace(' hours', 'h')
      .replace(' days', 'd')
      .replace(' weeks', 'w')
      .replace(' months', 'mo')
      .replace(' years', 'y')
      .replace('about ', '')
      .replace('over ', '')
      .replace('almost ', '');
  };

  const articleDate = new Date(date);
  const diffInHours = (new Date().getTime() - articleDate.getTime()) / (1000 * 60 * 60);
  const ageColor = getAgeColor(diffInHours);
  const formattedAge = getFormattedAge(articleDate);

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${ageColor} ${className}`}>
      {formattedAge}
    </span>
  );
}