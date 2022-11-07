let curElementNumber = 0;

function scrollHandler() {
    // this gives distance from top of viewport to bottom of page
  const distanceToBottom = document.body.getBoundingClientRect().bottom;
    // clientHeight measures the window height itself (what we can see)
    // 150 is our buffer 
  if (distanceToBottom < document.documentElement.clientHeight + 150) {
    const newDataElement = document.createElement("div");
    curElementNumber++;
    newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
    document.body.append(newDataElement);
  }
}

window.addEventListener("scroll", scrollHandler);
