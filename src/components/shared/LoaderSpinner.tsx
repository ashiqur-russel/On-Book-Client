import { cn } from "@/lib/utils"

const LoadingSpinner = ({ size = 80, color = 'text-purple-900 border-purple-600 border-t-8 border-b-8', className }: { size?: number, color?: string, className?: string }) => {
    return (
        <div className={cn(
            "animate-spin rounded-full border-t-4 border-b-4 mt-10",
            color,
            `w-${size} h-${size}`,
            "mx-auto",
            className
        )}
            role="status"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

const CustomStyledSpinner = () => {
    return (

        <LoadingSpinner
            size={20}
            color="text-purple-600 border-purple-600 border-t-8 border-b-8"
            className="rounded-full"
        />

    );
};

export default CustomStyledSpinner;
