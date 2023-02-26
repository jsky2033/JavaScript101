export class Map {
  constructor(coords) {
    // this.coordinates = coords;
    this.render(coords);
  }

  render(coords) {
    if (!google) {
      alert("Could not load maps library - please try again!");
      return;
    }

    document.querySelector(
      "#map"
    ).innerHTML = `<h2>Latitude: ${coords.lat}, Longitude: ${coords.lng}</h2> `;
  }
}
