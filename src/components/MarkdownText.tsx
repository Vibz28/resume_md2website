interface MarkdownTextProps {
  children: string;
  className?: string;
}

export function MarkdownText({ children, className = '' }: MarkdownTextProps) {
  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: children }} 
    />
  );
}