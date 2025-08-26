import { Button } from '@common/ui';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from '@common/ui/icons';

type PaginationProps = {
  totalCount?: number;
  pageSize?: number;
  serverPage?: number;
  onPageChange?: (page: number) => void;
  onClientPageChange: (page: number) => void;
  isShowFirstPageButton?: boolean;
  isShowLastPageButton?: boolean;
  clientPageCount: number;
  clientCurrentPage: number;
};

function Pagination({
  clientPageCount,
  clientCurrentPage,
  totalCount,
  pageSize = 5,
  serverPage,
  onPageChange,
  onClientPageChange,
  isShowFirstPageButton,
  isShowLastPageButton,
}: PaginationProps) {
  const pageCount = totalCount ? Math.ceil(totalCount / pageSize) : clientPageCount;
  const currentPage = serverPage ?? clientCurrentPage;
  const pages = Array.from({ length: pageCount }, (_, i) => i);
  const isServer = serverPage !== undefined;

  const handlePageChange = (page: number) => {
    if (isServer) {
      onPageChange?.(page);
    } else {
      onClientPageChange(page);
    }
  };

  return (
    <div className="flex gap-2 m-auto">
      {isShowFirstPageButton && (
        <Button
          className="border-none hover:bg-juiGrey-200 rounded-2xl w-8 h-8"
          onClick={() => handlePageChange(0)}
          disabled={currentPage <= 0}
          variant="transparent">
          <ChevronsLeftIcon />
        </Button>
      )}
      <Button
        className="border-none hover:bg-juiGrey-200 rounded-2xl w-8 h-8"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 0}
        variant="transparent">
        <ChevronLeftIcon />
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'transparent'}
          className="border-none hover:bg-juiGrey-200 rounded-2xl w-8 h-8"
          onClick={() => handlePageChange(page)}>
          {page + 1}
        </Button>
      ))}
      <Button
        className="border-none hover:bg-juiGrey-200 rounded-2xl w-8 h-8"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= pageCount - 1}
        variant="transparent">
        <ChevronRightIcon />
      </Button>
      {isShowLastPageButton && (
        <Button
          className="border-none hover:bg-juiGrey-200 rounded-2xl w-8 h-8"
          onClick={() => handlePageChange(pageCount - 1)}
          disabled={currentPage >= pageCount - 1}
          variant="transparent">
          <ChevronsRightIcon />
        </Button>
      )}
    </div>
  );
}

export default Pagination;
