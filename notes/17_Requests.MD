# JSON

JavaScript Object Notation. This refers to storing data as JS Objects. Strings, Objects and Numbers are allowed but NOT functions or any other kind of functional code.

Http responses gives you JSON data that you cannot directly use. You have to convert the JSON data to JS.

JSON.stringify ---> JS to JSON
JSON.parse ---> JSON to JS

XML and similar API interaction functions usually have a way of setting response type so you can skip this text!

# XMLHttpRequests

This was used back when XML format was used to transmit data. It has certain functions that fetch() does not have. For a comprehensive demonstration, please look at Project 8.

# Fetch

The fetch function is newer and is a more integrated API. Which means you can configure a single fetch method to handle GET and POST methods!

<script>
function sendHttpRequest(method, url, data) {
  /*
  fetch returns a promise. You need to then extract the 
  resolution in json format.
  */
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
}
</script>

# Important note on response.json()

Note that response.json() is NOT usable data. Use the 'await' statement to get the return of it and then It is a promise that resolves with the result of parsing the body text. The result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.

# Error Handling with fetch()

Error handling with fetch can be complicated and a good example of it is in Porject 9. 

# XMLHttp vs fetch() vs libraries

Fetch() is a little bit more modern and easy to use but error handling is a bit more complicated. Another option is to use third party libraries but be aware that all those do is wrap fetch() functions that already exist.


# FormData()

This allows you to send data in a format different to JSON. It therefore avoids the need to stringify it into JSON before sending it. 

The advantage is that it is more structured and allows you to add files by passing in a file path and name. 

1) You can easily send files, text, K/V pairs as well. 

2) You can also use this to automatically parse the form! Place name attributes on the form elements to have them show up as the keys in the K/V pairs. You can find a good example of this in Project 9!

Understand that not all APIs support FormData! Some APIs strictly want JSON and you cannot use that in that case. 

# Axios

Axios is a third party library that enables easy use of requests. A good example of this is found in Project 10: Libraries!

