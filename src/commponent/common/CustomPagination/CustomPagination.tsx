import "./CustomPagination.scss";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const CustomPagination = ({ currentPage, totalPages, onPageChange }: Props) => {
    if (totalPages < 1) return null;

    const getPageNumbers = () => {
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + 2);
        if (endPage - startPage < 2) startPage = Math.max(1, endPage - 2);

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="pagination-wrapper">
            <button
                className="page-btn nav-btn"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ← Prev
            </button>

            {currentPage > 3 && (
                <>
                    <button className="page-btn" onClick={() => onPageChange(1)}>1</button>
                    {currentPage > 4 && <span className="page-ellipsis">…</span>}
                </>
            )}

            {getPageNumbers().map(num => (
                <button
                    key={num}
                    className={`page-btn${num === currentPage ? " active" : ""}`}
                    onClick={() => onPageChange(num)}
                >
                    {num}
                </button>
            ))}

            {currentPage < totalPages - 2 && (
                <>
                    {currentPage < totalPages - 3 && <span className="page-ellipsis">…</span>}
                    <button className="page-btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                </>
            )}

            <button
                className="page-btn nav-btn"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next →
            </button>
        </div>
    );
};

export default CustomPagination;