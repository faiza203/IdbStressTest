import React from "react";
import { openDB } from "idb";

let databases = ["Database1", "Database2"];

function Form() {
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="number"
        id="dbs"
        placeholder=" Enter Numbers of Data Bases
"
      ></input>
      <input
        type="number"
        id="blobs"
        placeholder=" Enter Numbers of Blobs
"
      ></input>
      <button type="submit">Submit</button>
      <input
        type="number"
        id="firstDB"
        placeholder=" Enter Start Number of Data Bases
"
      ></input>
      <input
        type="number"
        id="lastDB"
        placeholder=" Enter End Number of Blobs
"
      ></input>
      <button type="button" onClick={() => handleGetAllDBS()}>
        Get DBS
      </button>
      <button type="button" onClick={() => handleCloseDB()}>
        Close DBS
      </button>

      <ul className="databases">
        {databases.map((element, i) => {
          return <li key={i}>{element}</li>;
        })}
      </ul>
    </form>
  );
}

async function handleSubmit(e) {
  e.preventDefault();
  const dbNo = e.target[0].value;
  const blogNo = e.target[1].value;
  for (let i = 1; i <= dbNo; i++) {
    let db = await openDB(`Database${i}`, 1, {
      upgrade(db) {
        db.createObjectStore("Blobs", {
          autoIncrement: true,
        });
      },
    });
    for (let j = 0; j < blogNo; j++) {
      const blob = new Blob(["my Blob"], {
        type: "text/plain",
      });
      await db.put("Blobs", blob);
      await db.getAllKeys("Blobs");
    }
    db.close();
  }
}

async function handleGetAllDBS() {
  let firstDB = document.querySelector("#firstDB").value;
  let lastDB = document.querySelector("#lastDB").value;
  const allDBs = await indexedDB.databases();

  if (firstDB < allDBs.length && allDBs.length >= lastDB && firstDB <= lastDB) {
    for (let i = firstDB; i <= lastDB; i++) {
      allDBs.forEach((db) => {
        return db.name === `Database${i}` ? databases.push(db.name) : null;
      });
    }
    console.log(databases);
  } else {
    alert(
      `Please Check db Numbers You have total ${allDBs.length} dbs from 0 to ${allDBs.length}`
    );
  }
}

async function handleCloseDB() {
  let db = await openDB("Database1");
  db.close();
}

export default Form;
