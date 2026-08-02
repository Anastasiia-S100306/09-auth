import css from "./Pagination.module.css"
import ReactPaginate from "react-paginate";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (selected: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {

    const handlePageClick = ({selected} : {selected: number}) => {
        onPageChange(selected + 1)
    }

    if(totalPages <= 1) {
        return null;
    }

    return (
        <ReactPaginate
            breakLabel="..."
            pageCount={totalPages}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            previousLabel="←"
            nextLabel="→"
        />
         );
}