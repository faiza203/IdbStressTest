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
    </form>
  );
}

function handleSubmit(e: any) {
  e.preventDefault();
  const dbNo = e.target[0].value;
  const blogNo = e.target[1].value;
  for (let i = 0; i < dbNo; i++) {
    let openRequest = indexedDB.open(`Database${i + 1}`, 1);

    openRequest.onupgradeneeded = function () {
      let db = openRequest.result;
      let store = db.createObjectStore("Blobs", {
        autoIncrement: true,
      });

      for (let j = 0; j < blogNo; j++) {
        const obj = { hello: "world" };
        const blob: any = new Blob([JSON.stringify(obj, null, 2)], {
          type: "application/json",
        });
        store.put(JSON.parse(blob));
      }
    };

    openRequest.onsuccess = function () {
      console.log("Database is created");
    };
  }
}

export default Form;
