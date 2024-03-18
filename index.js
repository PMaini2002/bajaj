const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;


const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";


app.use(bodyParser.json());


const processArrays = (inputArray) => {
  const evenNumbers = inputArray
    .filter((num) => num % 2 === 0 && typeof num === "number")
    .map((num) => String(num));
  const oddNumbers = inputArray
    .filter((num) => num % 2 !== 0 && typeof num === "number")
    .map((num) => String(num));
  const alphabets = inputArray.filter(
    (char) => typeof char === "string" && char.match(/[a-zA-Z]/)
  );

  return { evenNumbers, oddNumbers, alphabets };
};

// POST /process_array
app.post("/bfhl", (req, res) => {
  try {
    const inputArray = req.body.array;

    if (!inputArray) {
      throw new Error("Invalid input. 'array' key is missing.");
    }

    if (!Array.isArray(inputArray)) {
      throw new Error("Invalid input. 'array' key is not an array.");
    }

    const { evenNumbers, oddNumbers, alphabets } = processArrays(inputArray);

    const response = {
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      even_numbers: evenNumbers,
      odd_numbers: oddNumbers,
      alphabets: alphabets,
    };

    res.status(200).json(response);
  } catch (error) {
    const errorResponse = {
      is_success: false,
      message: error.message || "An error occurred.",
    };

    res.status(400).json(errorResponse);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
