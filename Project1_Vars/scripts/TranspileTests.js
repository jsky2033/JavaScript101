const storeBtn2 = document.querySelector("#btn-add");

storeBtn2.addEventListener("click", () => {
  const text = document.querySelector("h2.title").innerText;

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("Feature not available on this Browser!");
  }
});
