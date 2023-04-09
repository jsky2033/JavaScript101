# Cross-Site Scripting Attacks (XSS)

This is an attack where malicious JS code gets injected and executed. An example can be unchecked user-generated content. 

Look at Project 14. We want to set the inner HTML of an element based on user input. But what if <script>console.log('hello there! I am injecting malicious code')</script> is being input instead?

Modern browsers actually block this behavior by restricting code injected that gets executed by innerHTML!

The user may not realize that this happening. Maybe they are using an autofill or that code gets injected artificially into inputs. It could also be done by setting

However there is more than one way of doing this! What if they were to alter the URL parameters? If the innerHTML of an element comes from part of the URL, then an unwary user has just exposed themselves to an XSS attack.

They could then read localStorage, Cookies, user data and send them to another location. 


## How to solve this?

- Never use innerHTML, use textContent instead. 
- Sanitize the data. This is done through npm packages such as sanitize-html. This should be done server-side. 

## Third Party Packages

This could also be a potential source of XSS. Compromised libraries can be the cause of XSS attacks on unwary users if the developer has not properly vetted the libraries they are using. 

# CSRF 

This involves a malicious server making requests made using the user's cookies such that the real server thinks that this is the authentic user. This is more of a server side issue and is resolved with CSRF tokens. 

Let us say a user visits a fake site and then send a request to the backend of that site. Now that malicious backend server can read the cookies in your header and replicate an authentic request to the real server backend. 


# IP-protected API keys

A lot of API keys offer a security feature which locks out any requests send by an IP address that is not your own which attempts to use the key directly. So you can lock the DB key to your backend server only for example. 

# Cross-Origin Resource Sharing (CORS)

Let us say we have two servers:

* frontend.com
* backend.com

By default only requests with the same origin are allowed by backend.com so it will refuse any attempt at communication from frontend.com!

To relax this policy, we need to add some headers on the BACKEND side. This is because it is the frontend that is sending requests to the backend!

See an example of this in Project 13:

<script>
    // CORS Policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
});
</script>