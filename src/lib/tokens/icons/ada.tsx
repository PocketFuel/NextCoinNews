export default function ADAIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <circle cx="16" cy="16" r="16" fill="#0033AD"/>
        <path d="M16.34 15.89c.33-.45.54-.98.54-1.56 0-1.44-1.17-2.61-2.61-2.61-1.44 0-2.61 1.17-2.61 2.61 0 1.44 1.17 2.61 2.61 2.61.58 0 1.11-.21 1.56-.54l1.76 1.76c-.87.65-1.93 1.04-3.08 1.04-2.84 0-5.14-2.3-5.14-5.14s2.3-5.14 5.14-5.14 5.14 2.3 5.14 5.14c0 1.15-.39 2.21-1.04 3.08l-1.76-1.76z" fill="#FFF"/>
      </g>
    </svg>
  );
}