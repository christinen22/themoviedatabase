import { Button } from "react-bootstrap";

interface IPaginationProps {
  currentPage: number;
  total_pages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  total_pages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="prev">
        <Button
          disabled={currentPage === 1}
          onClick={onPreviousPage}
          variant="primary"
        >
          Previous Page
        </Button>
      </div>

      <div className="page">
        Page {currentPage}/{total_pages}
      </div>

      <div className="next">
        <Button
          disabled={currentPage >= total_pages}
          onClick={onNextPage}
          variant="primary"
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
