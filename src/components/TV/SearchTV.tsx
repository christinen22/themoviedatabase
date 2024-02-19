import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as TVAPI from "../../services/TVAPI/TVAPI";
import { Form, Button } from "react-bootstrap";
import usePaginationFromURL from "../../hooks/usePaginationFromURL";
import Error from "../partials/Error";

const SearchTV = () => {
  const { currentPage } = usePaginationFromURL();
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query") ?? "";

  const { isError } = useQuery(
    ["search-tv", { query, currentPage }],
    () => TVAPI.searchTV(query, currentPage),
    {
      enabled: !!query,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries(["search-tv", { query, currentPage }]);
  }, [currentPage, query, queryClient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim().length) {
      return;
    }

    setSearchParams({ query: searchInput });

    navigate(`/tv-search-results?query=${searchInput}`);
  };

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Form className="mb-4 search-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="searchQuery">
          <Form.Label>Search TV Show</Form.Label>
          <Form.Control
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter your search query"
            required
            type="text"
            value={searchInput}
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="success"
            type="submit"
            disabled={!searchInput.trim().length}
          >
            Search
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SearchTV;
