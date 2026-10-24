import { cn } from "@/src/lib/cn";

interface TitleAlignerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function TitleAligner({
  children,
  title,
  className = "",
}: TitleAlignerProps) {
  return (
    <div className={className}>
      {title !== undefined ? (
        <span
          className={cn(
            "grid h-8 w-full place-items-center text-xl text-zinc-500",
            className,
          )}
        >
          {title}
        </span>
      ) : (
        <span className="block h-8" />
      )}

      {children}

      <span className="block h-8" />
    </div>
  );
}
