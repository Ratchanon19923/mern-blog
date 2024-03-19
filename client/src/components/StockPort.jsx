import { Label, TextInput, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";

import DynamicInput from "./DynamicInput";

export default function StockPort() {
  const { currentUser } = useSelector((state) => state.user);
  const apiKey = "017ea3f5e613421c8c2462d6974bc312"; // Replace 'YOUR_API_KEY' with your actual API key
  const baseCurrency = "USD";
  const targetCurrency = "THB";

  const [exchange, setExchange] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const exchangeRate = async () => {
    try {
      const res = await fetch(
        `https://open.er-api.com/v6/latest/${baseCurrency}?apikey=${apiKey}`
      );

      if (res.ok) {
        const data = await res.json();
        setExchange(data.rates[targetCurrency]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTransactions = async () => {
    try {
      const res = await fetch(`api/stock/getTransactions/${currentUser._id}`);
      if (res.ok) {
        const data = await res.json();
        setTransactions('');
        setTransactions(data.transactions)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    exchangeRate();
    getTransactions();
  }, [currentUser]);


  return (
    <div className="mx-auto p-8 w-full">
      <div className="">
        <span className="text-md font-semibold bg-gray-50">
          EXCHANGE RATE :{" "}
        </span>
        <Label
          className="text-md text-red-600 bg-gray-50"
          htmlFor="small"
          value={`1 ${baseCurrency} = ${exchange}${targetCurrency}`}
        />
      </div>
      <hr className="my-4 border-t-2 border-gray-300" />

      <div className="my-3  flex justify-center">
        <DynamicInput />
      </div>

      <div className="overflow-x-auto">
        <h1 className="text-center font-semibold text-xl my-2 p-2">
          PortFolio
        </h1>
        <Table>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Vol.</Table.HeadCell>
            <Table.HeadCell> Value </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {transactions ? (
              <>
                {transactions.map((transac) => (
                  <Table.Row
                    key={transac._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {transac.dateBuy}
                    </Table.Cell>
                    <Table.Cell> {transac.symbol}</Table.Cell>
                    <Table.Cell> {transac.price}</Table.Cell>
                    <Table.Cell> {transac.volume}</Table.Cell>
                    <Table.Cell>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  No Transaction
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
