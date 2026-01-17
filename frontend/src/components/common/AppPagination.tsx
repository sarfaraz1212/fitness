import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface AppPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const AppPagination = ({ currentPage, totalPages, onPageChange }: AppPaginationProps) => {
    if (totalPages < 1) return null;

    const renderPageNumbers = () => {
        const items = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(i);
            }
        } else {
            items.push(1);

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            if (start > 2) {
                items.push("ellipsis-1");
            }

            for (let i = start; i <= end; i++) {
                items.push(i);
            }

            if (end < totalPages - 1) {
                items.push("ellipsis-2");
            }

            items.push(totalPages);
        }

        return items.map((item, index) => {
            if (typeof item === "string") {
                return (
                    <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            return (
                <PaginationItem key={item}>
                    <PaginationLink
                        isActive={item === currentPage}
                        onClick={() => onPageChange(item)}
                        className="cursor-pointer"
                    >
                        {item}
                    </PaginationLink>
                </PaginationItem>
            );
        });
    };

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default AppPagination;
