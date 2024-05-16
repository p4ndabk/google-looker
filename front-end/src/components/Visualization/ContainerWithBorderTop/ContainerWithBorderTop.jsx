import { cn } from "@/lib/utils";

export const ContainerWithBorderTop = ({ children, className }) => {
  return (
    <div className={cn(`gap-2 border-t-[1px] border-border`, className)}>{children}</div>
  );
};
