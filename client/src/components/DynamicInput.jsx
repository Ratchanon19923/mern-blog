import { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { CiCirclePlus } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";
import { Datepicker } from "flowbite-react";
import { useSelector } from "react-redux";

let now = new Date(Date.now()).toLocaleDateString("en-US", {
  month: "short", // Abbreviated month name (e.g., "Mar")
  day: "numeric", // Numeric day of the month (e.g., "12")
  year: "numeric", // Full year (e.g., "2024")
});

export default function DynamicInput({ onSubmit }) {
  const [inputs, setInputs] = useState([]); // Initial state with one input field
  const { currentUser } = useSelector((state) => state.user);
  const [selectedDates, setSelectedDates] = useState({});
  const handleAddInput = (index) => {
    const newDateInput = { ...inputs[index], dateBuy: now };
    setInputs([...inputs, newDateInput]); // Add a new empty input field to the inputs array
    // setInputs([...inputs, inputs[index]]); // Add a new empty input field to the inputs array
  };

  const handleInputChange = (e, index, fieldName) => {
    const newFormDataArray = [...inputs]; // Copy the existing formDataArray

    newFormDataArray[index] = newFormDataArray[index] || {};

    if (fieldName === "symbol") {
      newFormDataArray[index][fieldName] = e.target.value.toUpperCase();
    }
    // Initialize formData for the current index if it doesn't exist yet
    newFormDataArray[index][fieldName] = e.target.value;

    // Update the state with the modified formDataArray
    setInputs(newFormDataArray);
  };

  const handleDeleteInput = (index) => {
    const newInputs = [...inputs]; // Create a copy of the inputs array
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = [...inputs];

    onSubmit(newTransaction);
    setInputs([]);   
  };

  const handleDatePickerChange = (date, index) => {
    const dateInputs = date.toLocaleDateString("en-US", {
      day: "numeric", // Numeric day of the month (e.g., "12")
      month: "short", // Abbreviated month name (e.g., "Mar")
      year: "numeric", // Full year (e.g., "2024")
    });

    setSelectedDates((prevSelectedDates) => ({
      ...prevSelectedDates,
      [index]: dateInputs,
    }));

    const newFormDataArray = [...inputs];
    newFormDataArray[index] = newFormDataArray[index] || {};
    newFormDataArray[index]["dateBuy"] = dateInputs;
    setInputs(newFormDataArray);
  };

  return (
    <div className="">
      <Button
        className="mb-3"
        gradientDuoTone="purpleToBlue"
        size="sm"
        onClick={(index) => handleAddInput(index)}
      >
        <CiCirclePlus style={{ fontSize: "24px" }} className="me-1" />
        Add Transction
      </Button>
      <form onSubmit={handleSubmit}>
        {inputs.length > 0 &&
          inputs.map((input, index) => (
            <>
              <div key={input} className=" flex gap-1 my-1">
                <Datepicker
                  id={`date-${index}`}
                  key={`date-${index}`}
                  // onChange={(e) => handleInputChange(e, null, index, "dateBuy")}
                  onSelectedDateChanged={(date) =>
                    handleDatePickerChange(date, index)
                  }
                  value={selectedDates[index] || now}
                  required
                />
                <TextInput
                  id={`symbol-${index}`}
                  key={`symbol-${index}`}
                  type="text"
                  placeholder="Symbol"
                  onChange={(e) => handleInputChange(e, index, "symbol")}
                  required
                />
                <TextInput
                  id={`volume-${index}`}
                  key={`volume-${index}`}
                  type="text"
                  placeholder="Volume"
                  onChange={(e) => handleInputChange(e, index, "volume")}
                  required
                />
                <TextInput
                  id={`price-${index}`}
                  key={`price-${index}`}
                  type="text"
                  placeholder="$Price"
                  onChange={(e) => handleInputChange(e, index, "price")}
                  required
                />
                <Button
                  gradientDuoTone="purpleToBlue"
                  size="sm"
                  onClick={() => handleDeleteInput(index)}
                  key={index}
                >
                  <FaDeleteLeft />
                </Button>
              </div>
            </>
          ))}

        {inputs.length > 0 && (
          <div className="flex  gap-2 w-20">
            <Button
              className="w-full my-2"
              type="submit"
              size="sm"
              gradientDuoTone="purpleToBlue"
            >
              Submit
            </Button>
            <Button
              className="w-full my-2"
              type="submit"
              size="sm"
              gradientDuoTone="pinkToOrange"
              onClick={() => setInputs([])}
            >
              Cancle
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
