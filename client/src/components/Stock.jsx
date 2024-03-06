import { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";

export default function Stock() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [keyWord, setKeyword] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // https://www.alphavantage.co/ ref
      try {
        const apiKey = import.meta.env.API_KEY_ALPHAVANTAGE; // Replace 'YOUR_API_KEY' with your Alpha Vantage API key
        const key = "AAPL";
        // const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${key}&interval=5min&apikey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

    // Clean up function to cancel fetch request if component unmounts or before next fetch
    return () => {
      // Any cleanup code
    };
  }, []); // Empty dependency array means this effect runs only once after component mounts

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
