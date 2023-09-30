import { useCallback, useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);

  const handleNext = useCallback(() => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  }, [hasNext, setPage]);

  const handlePrev = useCallback(() => {
    if (hasPrev) {
      setPage((prev) => prev - 1);
    }
  }, [hasPrev, setPage]);

  return {
    page,
    setPage,
    hasNext,
    hasPrev,
    setHasNext,
    setHasPrev,
    handleNext,
    handlePrev,
  };
};
