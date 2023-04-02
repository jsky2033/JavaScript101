class testRequests {
  constructor() {
    var form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.sendData(event.currentTarget);
    });

    var getAllDataButton = document.querySelector("#get-data");
    getAllDataButton.addEventListener("click", this.getAllData);

    var getOneDataButton = document.querySelector("#get-data-specific");
    getOneDataButton.addEventListener("click", this.getOneData);
  }

  // event handlers

  sendData(form) {
    const formData = new FormData(form);
    let fd = {};
    formData.forEach((value, key) => {
      fd[key] = value;
    });

    navigator.geolocation.getCurrentPosition(async (data) => {
      fd = {
        ...fd,
        coords: {
          lat: data.coords.latitude,
          lng: data.coords.longitude,
        },
      };

      try {
        const serverResponse = await axios.post(
          "http://localhost:3000/add-location",
          fd
        );
        console.log(serverResponse.data);
      } catch (err) {
        console.log(err);
      }
    });
  }

  async getAllData() {
    try {
      const serverResponse = await axios.get(
        "http://localhost:3000/all-locations"
      );
      console.log(serverResponse.data.locationStorage.locations);
    } catch (err) {
      console.log(err);
    }
  }

  async getOneData() {
    try {
      var storageId = document.querySelector('input[name="id"]').value;
      var url = new URL(`http://localhost:3000/location/${storageId}`);
      url.searchParams.append("age", 25);
      const serverResponse = await axios.get(url);
      console.log(serverResponse.data);
    } catch (err) {
      console.log(err);
    }
  }
}

new testRequests();
