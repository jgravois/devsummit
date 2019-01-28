<!-- .slide: data-background-size="cover" style="padding-left: 80px" data-background="../..//template/img/2019/devsummit/bg-1.png" -->

<h1 style="text-align: left; font-size: 2em;">Node.js and browser applications </h1>
<h2 style="text-align: left; font-size: 1.5em;">with ArcGIS REST JS</h2>
  <p style="text-align: left; font-size: .5em;">Daniel Fenton
  <a href="https://github.com/dmfenton" target="_blank">@dmfenton</a></p>
  <p style="font-size: 1em;">slides: <a href="http://bit.ly/..."><code>http://bit.ly/...</code></a>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-2.png" -->

## Agenda

1. 🌐 What is ArcGIS REST JS good for?
1. 👩‍🚀 Who else is using it? For what?
1. 📆 What's new in 2019?
1. 🤹‍ demos/code (to learn how it works)

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-3.png" -->

> @esri/arcgis-rest-js helps you talk

> to ArcGIS Online and Enterprise

> from modern browsers and Node.js.

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-4.png" -->

### Code 🎛
[github.com/Esri/arcgis-rest-js](https://github.com/Esri/arcgis-rest-js)

<aside class="notes">
  * its an open source thing
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-5.png" -->

### Doc (API Reference/Guides) 📚
[esri.github.io/arcgis-rest-js](https://esri.github.io/arcgis-rest-js)

<aside class="notes">
  API reference is generated from comments within the code
  Guides
  pull requests (suggestions, improvements) welcome
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-6.png" -->

Vanilla [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
```js
// construct the url yourself and don't forget to tack on f=json
const url = "https://www.arcgis.com/sharing/rest/community/users/dmfenton";

url += "?f=json";

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == XMLHttpRequest.DONE) {
    // make sure JSON response doesnt indicate an error
    if (!xhr.responseText.error) {
      xhr.responseText; // { firstName: "Daniel", description: "open source geodev" ... }
    }
  }
}
xhr.open('GET', url, true);
xhr.send(null);
```
<aside class="notes">
  this is tedious (and old)
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-2.png" -->

Vanilla [`Fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
```js
const url = "https://www.arcgis.com/sharing/rest/community/users/dmfenton";

fetch(url, {
  method: "POST", // set the request type
  headers: {
    "Content-Type": "application/x-www-form-urlencoded" // append the right header
  },
  // concatentate and encode parameters, append f=json
  body: encodeURIComponent("f=json")
}).then(response => {
    if (response.ok) { return response.json() } // dig out the json
  }).then(response => {
    // trap for errors inside a 200 response
    if (!response.error) { return response; }
  })
```
<aside class="notes">
  the comments show the work the library is doing under the hood.
  this is still tedious
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-3.png" -->

`@esri/arcgis-rest-js`
```js
import { request } from "@esri/arcgis-rest-request";

request(url)
  .then(response) // { firstName: "Daniel", description: "open source geodev" ... }
```

<aside class="notes">
  could you do this without a dependency, yes!
  but why would you?
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-4.png" -->

### Value adds

* appends `f=json` and request headers
* encodes query string parameters
* creates `FormData` (when required)
* throws an error when a `200` response fails
* ~~display a map~~
* ~~clientside analysis~~

<aside class="notes">

</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-5.png" -->

request only expects a url, but exposes requestOptions too.
```js
// url, IRequestOptions
request(url, {
  params: {
    foo: true,
    bar: "baz",
    more: File(),
    num: 999 // etc.
  },
  // authentication
  // httpMethod: "GET",
  // portal,
  // headers,
  // fetch
})
```

<aside class="notes">
  IRequestOptions give you more control over the request
  authentication helps you generate tokens when you cant make an anonymous request
  a custom Fetch implementation can be passed in too
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-6.png" -->

the rest of the API builds on top of `request`
```js
import { geocode } from "@esri/arcgis-rest-geocoder";

// assumes you want to use ArcGIS Online
geocode("LAX")
  .then(response) // { ... candidates: [] }

// IRequestOptions is still available
geocode("LAX", {
  params: {
    forStorage: true
  },
  authentication
})
```

<aside class="notes">
  could you do this without a dependency, yes!
  but why would you?
  promise based
  try to avoid unnecessary GIS jargon
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-2.png" -->

### Goals

* Node.js and (modern) browsers
* a la carte / svelte
* framework agnostic
* shave down the sharp edges

<aside class="notes">
 originally because PDX was using Angular and Hub was using Ember
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-3.png" -->

### Disclaimer*

* not a product, no roadmap
* work in progress
* scratching our own itch

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-4.png" -->

### Comparison

* _kind of_ analogous to ArcGIS API for Python
* **much different** than the ArcGIS API for JavaScript

<aside class="notes">
  thin wrapper, web centric
  pairs well with other open source libraries
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-5.png" -->

### < 2018 👵 collaborators

* https://developers.arcgis.com
* https://hub.arcgis.com
* customers!

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-6.png" -->

### >= 2018 👶 collaborators

* Storymaps
* Web AppBuilder (next generation)
* ArcGIS Urban
* Professional Services
* ArcGIS Solutions
* Startups
* Enterprise (via Hub)
* Esri UK

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-2.png" -->

### since the last talk (on [YouTube](https://www.youtube.com/watch?v=n0WtJPSprqc))...
* **5** new packages 📦!
* **15** releases 🎉!

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-3.png" -->

## 👵 packages 📦!

* `request` / ~~2~~ 2.4 kb
* `auth` / ~~2.5~~ 3 kb
* `feature-service` / ~~500~~ 1.1 kb
* `items` / ~~1~~ 1.1 kb
* `groups` / ~~750~~ 780 b
* `geocoder` / ~~1 kb~~ 990 b

<aside class="notes">
  compact
  compact because they are works in progress
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-4.png" -->

## 👶 packages 📦!
* `feature-service-admin` / 680 b
* `sharing` / 1.2 kb
* `users` / 690 b
* `routing` / 590 b
* `common` / 240 b

<aside class="notes">
  5 new packages
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-5.png" -->

### using the CDN

```html
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=es5,Promise,fetch"></script>
<script src="https://unpkg.com/@esri/arcgis-rest-request"></script>
<script src="https://unpkg.com/@esri/arcgis-rest-feature-service"></script>

```
<div class="container">

<div class="col">
  <pre style="width: 500px; margin: 0 auto; box-shadow: none;"><code class="hljs js" style="height: 400px;">
// arcgisRest.request(url);

arcgisRest.deleteFeatures({
  url,
  objectIds: [ 123 ]
})
  .then(response)
    </code>
    </pre>
</div>

<div class="col">
  <pre style="width: 500px; margin: 0 auto; box-shadow: none;"><code class="hljs json" style="height: 400px;">
{
  "deleteResults": [
    {
      "objectId": 123,
      "success": true
    }
  ]
}
</code></pre>
</div>

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-6.png" -->

when only **one** piece of information is required

```js
import { getLayer } from "@esri/arcgis-rest-feature-service";

const url = `http://sampleserver6.arcgisonline.com/arcgis/rest/services/SF311/FeatureServer/0/deleteFeatures`;

getLayer(url)
  .then(response) // { name: "311", id: 0, ... }

// or
getLayer(url, { httpMethod: "GET" })
```
[IRequestOptions](https://esri.github.io/arcgis-rest-js/api/feature-service/getLayer/) plays second 🎻
.

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-2.png" -->

if **more** than one piece of information is needed

```js
import { setItemAccess } from "@esri/arcgis-rest-sharing";

setItemAccess({
  id: `fe8`, // which item?
  access: `public`, // who should be able to see it?
  authentication // who wants to update?
})
  .then(response) //
```
we [_extend_](https://esri.github.io/arcgis-rest-js/api/sharing/setItemAccess/) IRequestOptions
<aside class="notes">
show that this method expects ISetAccessRequestOptions
this gives a higher level abstraction than just { params }
admit that required parameters are obscured by optional (and inherited ones)
remind folks that the code snippet is good enough for most
and that the structure is mostly for TypeScript consumers
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-3.png" -->

## Authentication

```js
import { UserSession } from "@esri/arcgis-rest-auth";

// ArcGIS Online credentials
const authentication = new UserSession({ username, password })

// ArcGIS Enterprise credentials
const enterpriseAuth = new UserSession({
  username,
  password,
  portal: `https://gis.city.gov/sharing/rest`
})
```

<aside class="notes">
  a token isnt fetched until its time to make a request
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-4.png" -->

`UserSession` keeps track of token expiration

```js
const url = `http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/`;

request(url, { authentication })
  .then(response => {
    // the new token will be reused for the second request
    request(url, { authentication })
  })
```
 and whether or not a server is trusted (federated)

<aside class="notes">
  the session keeps track of the expiration of tokens and trusted servers
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-5.png" -->

```js
const url = `http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/`;

request(url, { authentication })
  .then(response => {
    // reuse the same token since it hasn't expired
    request(url, { authentication })
  })
```

<aside class="notes">
  this in and of itself doesnt fetch a token
  similar to JSAPI IdentityManager
    * DOESNT juggle multiple portals
    * doesnt present a UI to login when an anonymous request fails
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-6.png" -->

## lets make this [Observable](https://beta.observablehq.com/@jgravois/introduction-to-esri-arcgis-rest-js)

<aside class="notes">
  this in and of itself doesnt fetch a token
  similar to JSAPI IdentityManager
    * DOESNT juggle multiple portals
    * doesnt present a UI to login when an anonymous request fails
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-2.png" -->

## Demo
### [Feature Service Attachments](https://github.com/Esri/arcgis-rest-js/tree/master/demos/attachments)

<aside class="notes">
  OAuth 2.0
  demo (and API functionality) came from a user
  admit that we should be hosting live demos but for now you have to run them yourself.
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-3.png" -->

### What's next?

* param [builders](https://github.com/Esri/arcgis-rest-js/issues/384)?
* more hooks to modify fetch behavior
* selectively [decorating](https://github.com/Esri/arcgis-rest-js/issues/371) responses
* [`v2.0.0`](https://github.com/Esri/arcgis-rest-js/issues/137)?
* ??

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-rating.png" -->

---

<!-- .slide: data-background="../..//template/img/2019/devsummit/bg-esri.png" -->