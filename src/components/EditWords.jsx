import React, { useState, useEffect, useMemo } from "react";
import { Box, Card } from "@radix-ui/themes";
import { TextField, Button } from "@mui/material";
import { set } from "mongoose";

const EditWords = () => {
  const [find, setFind] = useState("");
  const [words, setWords] = useState([]);

  const [wordsBasic, setWordsBasic] = useState([]);
  const [wordsIntermediate, setWordsIntermediate] = useState([]);
  const [wordsAdvanced, setWordsAdvanced] = useState([]);

  const [filteredBasic, setFilteredBasic] = useState([]);
  const [filteredIntermediate, setFilteredIntermediate] = useState([]);
  const [filteredAdvanced, setFilteredAdvanced] = useState([]);

  const [error, setError] = useState("");

  //make deleteWOrds function work and delete word on X

  useEffect(() => {
    fetch("http://localhost:5050/api/words")
      .then((response) => response.json())
      .then((data) => {
        const levels = data[0].levels;
        setWords(data);
        setWordsBasic(levels.basic);
        setWordsIntermediate(levels.intermediate);
        setWordsAdvanced(levels.advanced);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [setWords, setWordsBasic, setWordsIntermediate, setWordsAdvanced]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFind(searchValue);
    const fBasic = wordsBasic.filter((word) =>
      word.word.toLowerCase().includes(searchValue)
    );
    const fIntermediate = wordsIntermediate.filter((word) =>
      word.word.toLowerCase().includes(searchValue)
    );
    const fAdvanced = wordsAdvanced.filter((word) =>
      word.word.toLowerCase().includes(searchValue)
    );

    setFilteredBasic(fBasic);
    setFilteredIntermediate(fIntermediate);
    setFilteredAdvanced(fAdvanced);
  };
  const deleteWord = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to manage whitelist users. (No token found.)");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5050/api/words/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center pt-4 pb-0 ">
      <p className="text-3xl font-bold text-blue-500  font-mono">Edit Words:</p>

      <div className="flex flex-row items-center p-0 gap-4">
        <Button
          variant="text"
          sx={{ paddingBottom: 0, marginBottom: 0 }}
          href="/"
        >
          Home
        </Button>
        <TextField
          label="Search field"
          type="search"
          variant="standard"
          value={find}
          onChange={handleSearch}
          className="text-purple-500"
        />
        <Button
          variant="text"
          href="/admin"
          sx={{ paddingBottom: 0, marginBottom: 0 }}
        >
          Dashboard
        </Button>
      </div>

      <div className="flex flex-row items-start  gap-6 border rounded p-4">
        <Box maxWidth="240px" className="bg-green-200 rounded-md p-2">
          <Card>
            <div>
              <span className="font-bold rounded-xl underline text-xl text-blue-500   shadow-blue-500/50 p-2 m-0.5">
                Basic:
              </span>

              {filteredBasic.length === 0
                ? wordsBasic.map((word, index) => (
                    <div key={index} className="m-0.5 ">
                      <span>
                        {word.word.toUpperCase()} -{" "}
                        {word.translation.toUpperCase()}
                      </span>
                      <span
                        onClick={() => deleteWord(word.id)}
                        className="text-red-500  pl-2 pr-2 cursor-pointer w-5 h-5 rounded-full"
                      >
                        X
                      </span>
                    </div>
                  ))
                : filteredBasic.map((word, index) => (
                    <div key={index} className="m-0.5">
                      <span>
                        {word.word.toUpperCase()} -{" "}
                        {word.translation.toUpperCase()}
                      </span>
                      <span
                        onClick={() => deleteWord(word.id)}
                        className="text-red-500  pl-2 pr-2 cursor-pointer w-5 h-5 rounded-full"
                      >
                        {" "}
                        X
                      </span>
                    </div>
                  ))}
            </div>
          </Card>
        </Box>
        <Box maxWidth="240px" className=" bg-orange-200 rounded-md p-2">
          <Card>
            <span className="font-bold rounded-xl underline text-xl text-blue-500   shadow-blue-500/50 p-2 m-0.5">
              Intermediate:
            </span>
            {filteredIntermediate.length === 0
              ? wordsIntermediate.map((word, index) => (
                  <div key={index} className="m-0.5">
                    <span>
                      {" "}
                      {word.word.toUpperCase()} -{" "}
                      {word.translation.toUpperCase()}
                    </span>
                    <span
                      onClick={() => deleteWord(word.id)}
                      className="text-red-500  pl-2 pr-2 cursor-pointer w-5 h-5 rounded-full"
                    >
                      {" "}
                      X
                    </span>
                  </div>
                ))
              : filteredIntermediate.map((word, index) => (
                  <div key={index} className="m-0.5">
                    <span>
                      {word.word.toUpperCase()} -{" "}
                      {word.translation.toUpperCase()}
                    </span>
                    <span
                      onClick={() => deleteWord(word.id)}
                      className="text-red-500  pl-2 pr-2 cursor-pointer w-5 h-5 rounded-full"
                    >
                      {" "}
                      X
                    </span>
                  </div>
                ))}
          </Card>
        </Box>
        <Box maxWidth="240px" className="bg-red-200 rounded-md p-2">
          <Card>
            <span className="font-bold rounded-xl underline text-xl text-blue-500   shadow-blue-500/50 p-2 m-0.5">
              Advanced:
            </span>
            {filteredAdvanced.length === 0
              ? wordsAdvanced.map((word, index) => (
                  <div key={index} className="m-0.5">
                    <span>
                      {" "}
                      {word.word.toUpperCase()} -{" "}
                      {word.translation.toUpperCase()}
                    </span>
                    <span
                      onClick={() => deleteWord(word.id)}
                      className="text-red-500  pl-2 pr-2 cursor-pointer w-5 h-5 rounded-full"
                    >
                      {" "}
                      X
                    </span>
                  </div>
                ))
              : filteredAdvanced.map((word, index) => (
                  <div key={index} className="m-0.5">
                    <span>
                      {word.word.toUpperCase()} -{" "}
                      {word.translation.toUpperCase()}
                    </span>
                    <span
                      onClick={() => deleteWord(word.id)}
                      className="text-red-500  pl-2 pr-2 cursor-pointer w-5 h-5 rounded-full"
                    >
                      {" "}
                      X
                    </span>
                  </div>
                ))}
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default EditWords;
