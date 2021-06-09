import { openDB } from "idb";

function Form() {
  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}

async function handleSubmit(e: any) {
  e.preventDefault();
  const dbNo = e.target[0].value;
  const blogNo = e.target[1].value;
  for (let i = 0; i < dbNo; i++) {
    let db = await openDB(`Database${i + 1}`, 1, {
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
  let firstDB = document.querySelector("#firstDB");
  let lastDB = document.querySelector("#lastDB");
  const allDBs = await indexedDB.databases();
  console.log(allDBs);
}
export default Form;
