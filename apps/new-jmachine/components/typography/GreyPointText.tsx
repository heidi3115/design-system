'use client';

type GreyPointTextProps = {
  className?: string;
  children: string;
};

export default function GreyPointText({ className = '', children, ...props }: GreyPointTextProps) {
  return (
    <label
      {...props}
      className={`flex items-center gap-1 text-xs text-juiText-secondary before:content-['•'] before:text-lg ${className}`}>
      {children}
    </label>
  );
}
