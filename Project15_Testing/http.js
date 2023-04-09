export function fetchData() {
  return axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => {
      return response.data;
    });
}
