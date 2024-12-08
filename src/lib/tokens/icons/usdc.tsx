export default function USDCIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <circle cx="16" cy="16" r="16" fill="#2775CA"/>
        <path d="M16 6C10.48 6 6 10.48 6 16s4.48 10 10 10 10-4.48 10-10S21.52 6 16 6zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5S11.86 8.5 16 8.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z" fill="#FFF"/>
        <path d="M16.5 11.5h-1v7h1v-7zm3 2h-1v3h1v-3zm-6 0h-1v3h1v-3z" fill="#FFF"/>
      </g>
    </svg>
  );
}