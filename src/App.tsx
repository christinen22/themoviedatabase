import "./assets/scss/App.scss";
import { Routes, Route } from "react-router-dom";
import TopRated from "./pages/Movie/TopRated";
import MovieDetails from "./pages/Movie/MovieDetails";
import Latest from "./pages/Movie/Latest";
import MostPopular from "./pages/Movie/MostPopular";
import MovieByGenre from "./pages/Movie/MovieByGenre";
import HomePage from "./pages/HomePage";
import NotFound from "./components/partials/NotFound";
import MovieCast from "./pages/Movie/MovieCast";
import SingleActor from "./pages/Movie/SingleActor";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SearchResults from "./components/Movie/SearchResults";
import Header from "./components/Header";
import TVTopRated from "./pages/TV/TVTopRated";
import TVDetails from "./pages/TV/TVDetails";
import TVSearchResult from "./components/TV/TVSearchResult";

const App = () => {
  return (
    <div id="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/toprated" element={<TopRated />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/movie/:id/cast" element={<MovieCast />} />
        <Route path="/movie/:id/cast/:id" element={<SingleActor />} />
        <Route path="/popular" element={<MostPopular />} />
        <Route path="/genre/:id" element={<MovieByGenre />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/tv-search-results" element={<TVSearchResult />} />
        <Route path="/toprated-tv" element={<TVTopRated />} />
        <Route path="/tv/:id" element={<TVDetails />} />
        <Route path="/tv/:id/cast/:id" element={<SingleActor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </div>
  );
};

export default App;
