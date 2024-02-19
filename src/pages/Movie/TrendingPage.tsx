import TrendingMovies from "../../components/Movie/TrendingMovies";
import usePaginationFromURL from "../../hooks/usePaginationFromURL";
import RecentlyVisitedMovies from "../../components/Movie/RecentlyVisited";
import Search from "../../components/Search";

const TrendingPage = () => {
  const { timeWindow, handleTimeWindowToggle } = usePaginationFromURL();

  return (
    <>
      <RecentlyVisitedMovies />
      <Search />
      <TrendingMovies
        selectedWindow={timeWindow}
        onToggle={handleTimeWindowToggle}
      />
    </>
  );
};

export default TrendingPage;
