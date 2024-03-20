import { Label, TextInput, Table, Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import DynamicInput from "./DynamicInput";

let now = new Date(Date.now()).toLocaleDateString("en-US", {
  month: "short", // Abbreviated month name (e.g., "Mar")
  day: "numeric", // Numeric day of the month (e.g., "12")
  year: "numeric", // Full year (e.g., "2024")
});
let options = { year: "numeric", month: "short", day: "2-digit" };
export default function StockPort() {
  const { currentUser } = useSelector((state) => state.user);
  const apiKey = "017ea3f5e613421c8c2462d6974bc312"; // Replace 'YOUR_API_KEY' with your actual API key
  const baseCurrency = "USD";
  const targetCurrency = "THB";

  const [exchange, setExchange] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [transactionIdToDelete, setTransactionIdToDelete] = useState("");

  // console.log(transactions);
  // useEffect(() => {
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

  // }, []);

  const getTransactions = async () => {
    try {
      const res = await fetch(`api/stock/getTransactions/${currentUser._id}`);
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTransactions();
    exchangeRate();
  }, [currentUser._id]);

  const handleDeleteTransaction = async () => {
    setShowModal(false);

    try {
      const res = await fetch(
        `/api/stock/deleteTransactions/${transactionIdToDelete}`,
        { method: "DELETE" }
      );

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setTransactions((prev) =>
          prev.filter(
            (transaction) => transaction._id !== transactionIdToDelete
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      const res = await fetch(`/api/stock/addTransactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: data,
          userId: currentUser._id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
    
        setTransactions([...transactions, ...data]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log(transactions);
  return (
    <div className="mx-auto p-8 w-full">
      <h1 className="text-lg font-semibold bg-gray-50 dark:bg-gray-800">
        Date : {now}
      </h1>
      <span className="text-md font-semibold bg-gray-50 dark:bg-gray-800">
        EXCHANGE RATE :{" "}
      </span>
      <Label
        className="text-md text-red-600 bg-gray-50 dark:bg-gray-800"
        htmlFor="small"
        value={`1 ${baseCurrency} = ${exchange}${targetCurrency}`}
      />

      <hr className="my-4 border-t-2 border-gray-300" />

      <div className="my-3  flex justify-center">
        <DynamicInput onSubmit={handleFormSubmit} />
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
            <Table.HeadCell> Edit </Table.HeadCell>
            <Table.HeadCell> Delete </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {transactions.transactions ? (
              <>
                {transactions.transactions.map((transac) => (
                  <Table.Row
                    key={transac._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {new Date(transac.dateBuy).toLocaleDateString(
                        "en-US",
                        options
                      )}
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
                    <Table.Cell>
                      <a
                        className="font-medium text-red-500 hover:underline dark:text-red-500"
                        onClick={() => {
                          setShowModal(true);
                          setTransactionIdToDelete(transac._id);
                        }}
                      >
                        Delete
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
                <Table.Row>
                  <Table.Cell colSpan={5}></Table.Cell>
                </Table.Row>
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
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteTransaction}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No , Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
