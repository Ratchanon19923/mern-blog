import { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";

export default function Stock() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchResukt = async () => {
      if (query.trim() !== "") {
        query.toUpperCase();
        setLoading(true);
        try {
          // const apiKey = import.meta.env.API_KEY_ALPHAVANTAGE;
          const apiKey = "6ESI4ErTbxktW_26MJRUWEpzWrZNdFSj";
          const res = await fetch(
            // `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=${apiKey}`
            `https://api.polygon.io/v3/reference/tickers?search=${query}&type=CS&locale=us&market=stocks&active=true&limit=10&apiKey=${apiKey}`
          );
          const data = await res.json();
          console.log(data);
          setResults(data.results);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching results:", error.message);
        }
      } else {
        setResults([]);
      }
    };
    fetchResukt();
  }, [query]);

  const handleItemClick = (item) => {
    setLoading(false);
    setResults([]);
    setSelectedItem(item);
    // Here you can perform actions with the selected item, such as submitting it or displaying its data
    console.log("Selected Item:", item);
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl ">Stock</h1>
      <TextInput
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <div>Loading...</div>}

      {results.length === 0 && !selectedItem ? (
        <p>No results found</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index} onClick={() => handleItemClick(result)}>
              {result.ticker} - {result.name} - {result.locale}
            </li>
          ))}
        </ul>
      )}

      {selectedItem && (
        <>
          <div>
            <h3>Selected Item</h3>
            <p>Symbol: {selectedItem.ticker}</p>
            <p>Name: {selectedItem.name}</p>
            <p>Name: {selectedItem.locale}</p>
            {/* Add additional data display here if needed */}
          </div>
        </>
      )}
    </div>
  );
}
