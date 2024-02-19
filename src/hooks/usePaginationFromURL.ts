import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePaginationFromURL = (defaultPage = 1, defaultTimeWindow = "day") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageFromURL = searchParams.get("page") || defaultPage;
  const timeWindowFromURL = searchParams.get("timeWindow") || defaultTimeWindow;
  const [currentPage, setCurrentPage] = useState(
    Number(currentPageFromURL) || defaultPage
  );
  const query = searchParams.get("query") ?? "";
  const [timeWindow, setTimeWindow] = useState(
    timeWindowFromURL || defaultTimeWindow
  );

  useEffect(() => {
    const urlPage = Number(currentPageFromURL);
    const urlTimeWindow = timeWindowFromURL;
    if (urlPage && urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }
    if (urlTimeWindow && urlTimeWindow !== timeWindow) {
      setTimeWindow(urlTimeWindow);
    }
  }, [currentPageFromURL, timeWindowFromURL]);

  const handleNavigation = (newPage: number) => {
    setSearchParams({ query, page: newPage.toString() });
    setCurrentPage(newPage);
  };

  const handleTimeWindowToggle = (newPage: number, newTimeWindow: string) => {
    setSearchParams({
      page: newPage.toString(),
      timeWindow: newTimeWindow,
    });
    setTimeWindow(newTimeWindow);
  };

  return { currentPage, handleNavigation, timeWindow, handleTimeWindowToggle };
};

export default usePaginationFromURL;
