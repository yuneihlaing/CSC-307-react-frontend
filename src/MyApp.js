import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import axios from "axios";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:5000/users");
      return response.data.users_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setCharacters(result);
    });
  }, []);

  async function makePostCall(person) {
    try {
      const response = await axios.post("http://localhost:5000/users", person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) {
    makePostCall(person).then((result) => {
      console.log(result.status);
      if (result && result.status === 201)
        setCharacters([...characters, result.data]);
    });
  }

  async function deleteCall(id) {
    try {
      const response = await axios.delete("http://localhost:5000/users/" + id);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function removeOneCharacter(index) {
    const c = characters.find((user, i) => i === index);
    deleteCall(c.id).then((result) => {
      if (result && result.status === 200) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
    });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
