import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";

// import dummy Google API
import {
  getAddressFromCoords,
  getCoordsFromAddress,
} from "./Utilities/GoogleAPI";

// this class should handle the placefinder section and its attendant functions
class PlaceFinder {
  constructor() {
    // DOM Access Setup
    const addressForm = document.querySelector("form");
    const locateUsrBtn = document.querySelector("#locate-btn");
    this.shareBtn = document.getElementById("share-btn");

    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
    locateUsrBtn.addEventListener("click", this.locateUserHandler.bind(this));
  }

  // EVENT HANDLERS

  async selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    const shareLinkInput = document.getElementById("share-link");
    shareLinkInput.value = `localhost:8080/my-place?${address}?&lat=${coordinates.lat}&lng=${coordinates.lng}&address=${address}`;
  }

  sharePlaceHandler() {
    if (!navigator.clipboard) {
      return;
    }
    const shareLinkInput = document.getElementById("share-link");
    navigator.clipboard
      .writeText(shareLinkInput.value)
      .then(() => {
        alert("Copied into Clipboard!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;

    if (!address || address.trim().length === 0) {
      alert("Invalid address entered - please try again!");
      return;
    }
    // loading spinner
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait"
    );
    modal.show();

    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }

  // note these will be used as event listeners, ie: 'this' refers to the element!
  locateUserHandler() {
    if (!navigator.geolocation) {
      alert("Location feature is not available in your browser!");
      return;
    }

    // loading spinner
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait"
    );
    modal.show();

    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        this.selectPlace(coordinates, address);
      },
      () => {
        alert("Could not retrieve your location!");
      }
    );

    modal.hide();
  }
}

new PlaceFinder();
