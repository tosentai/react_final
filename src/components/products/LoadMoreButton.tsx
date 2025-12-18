import { Loader2 } from "lucide-react";
import type { LoadMoreButtonProps } from "../../lib/productsTypes";

export const LoadMoreButton = ({
    hasNextPage,
    isFetchingNextPage,
    onLoadMore,
}: LoadMoreButtonProps) => {
    if (!hasNextPage) return null;

    return (
        <div className="flex justify-center pt-4">
            <button
                onClick={onLoadMore}
                disabled={isFetchingNextPage}
                className="px-6 py-3 bg-card border rounded-xl font-medium hover:bg-muted/40 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
                {isFetchingNextPage ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Loading...</span>
                    </>
                ) : (
                    <span>Load More</span>
                )}
            </button>
        </div>
    );
};
