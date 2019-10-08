import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Data } from "./interfaces/Data";

const App: React.FC = () => {
  const [data, setData] = useState<Data>();
  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);

      setData(result.data);
    };

    fetchData();
  }, [url]);

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>
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
    </Fragment>
  );
};

export default App;
