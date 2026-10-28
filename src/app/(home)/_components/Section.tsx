import type { IconProps } from "@radix-ui/react-icons/dist/types";
import type {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { cn } from "@/src/lib/cn";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("flex flex-col gap-2 px-6", className)} {...props}>
      {children}
    </section>
  );
}

interface SectionHeaderProps extends ComponentPropsWithoutRef<"button"> {
  sectionTitle: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

export function SectionHeader({
  sectionTitle,
  className,
  Icon,
  ...props
}: SectionHeaderProps) {
  return (
    <h2 className="text-base font-medium">
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between text-primary uppercase",
          className,
        )}
        {...props}
      >
        <span>{sectionTitle}</span>
        <Icon width={24} height={24} />
      </button>
    </h2>
  );
}

interface SectionBodyProps extends ComponentPropsWithoutRef<"div"> {}

export function SectionBody({
  children,
  className,
  ...props
}: SectionBodyProps) {
  return (
    <div
      className={cn("flex flex-col divide-y divide-bg-subtle", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionDivider() {
  return <div className="h-px w-full bg-bg-subtle" />;
}
