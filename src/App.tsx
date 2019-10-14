import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Data } from "./interfaces/Data";

/**
 * https://levelup.gitconnected.com/usetypescript-a-complete-guide-to-react-hooks-and-typescript-db1858d1fb9c
 */
type Hook = () => [
  { data: Data | undefined; isLoading: boolean; isError: boolean },
  (url: string) => void
];

const useHackerNewsApi: Hook = () => {
  const [data, setData] = useState<Data>();
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

const App: React.FC = () => {
  const [query, setQuery] = useState("redux");
  const [{ data, isLoading, isError }, doFatch] = useHackerNewsApi();

  return (
    <Fragment>
      <form
        onSubmit={e => {
          e.preventDefault();
          doFatch(`http://hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button
          type="submit"
          // onClick={() =>
          //   setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
          // }
        >
          Search
        </button>
      </form>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data &&
            data.hits.map(item => (
              <li key={item.objectID}>
                <a target="blank" href={item.url}>
                  {item.title}
                </a>
              </li>
            ))}
        </ul>
      )}
    </Fragment>
  );
};

export default App;
