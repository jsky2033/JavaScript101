const storeBtn = document.querySelector("#btn-add");
const retrBtn = document.querySelector("#btn-subtract");

let db;

const dbRequest = indexedDB.open("StorageDummy", 1);

// will run whenever succesful connection to db is made
dbRequest.onsuccess = function (event) {
  db = event.target.result;
};

// will run whenever version is changed - basically runs at start
dbRequest.onupgradeneeded = function (event) {
  db = event.target.result;

  const objStore = db.createObjectStore("products", { keyPath: "id" });

  objStore.transaction.oncomplete = function (event) {
    const productsStore = db
      .transaction("products", "readwrite")
      .objectStore("products");
    productsStore.add({
      id: "p1",
      title: "A first product",
      price: 12.99,
      tags: ["Expensive", "Luxury"],
    });
  };
};

dbRequest.onerror = function (event) {
  console.log("ERROR!");
};

storeBtn.addEventListener("click", () => {
  if (!db) {
    return;
  }

  const productsStore = db
    .transaction("products", "readwrite")
    .objectStore("products");
  productsStore.add({
    id: "p2",
    title: "A second product",
    price: 12.99,
    tags: ["Expensive", "Luxury"],
  });
});

retrBtn.addEventListener("click", () => {
  const productsStore = db
    .transaction("products", "readwrite")
    .objectStore("products");
  const request = productsStore.get("p2");
  request.onsuccess = function () {
    console.log(request.result);
  };
});
