import { cn } from "@/lib/utils";

export default function CardGrid({ children, className }: React.ComponentProps<'div'>) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
            {children}
        </div>
    )
}