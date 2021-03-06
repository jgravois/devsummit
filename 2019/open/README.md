<!-- .slide: data-background-size="cover" style="padding-left: 80px" data-background="../../template/img/2019/psdw/bg-1.png" -->

<h1 style="text-align: left; font-size: 2em;">Open Source @Esri</h1>
  <p style="text-align: left; font-size: 1em;">John Gravois
  <a href="https://github.com/jgravois" target="_blank">@jgravois</a></p>
  <p style="font-size: 1em;">slides: <a href="https://bit.ly/2uFWWPr"><code>https://bit.ly/2uFWWPr</code></a>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

## Agenda

1. 📆- What's new in 2019?
1. 🤵- What's > 2019, but still going strong?
1. ☠️- Anything to avoid?
1. 👩‍🚀- Who else is using OSS?
1. ❓- Q/A

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

## Who am i?

1. ☎️- Tech Support
1. 🐛- [Esri Leaflet](https://esri.github.io/esri-leaflet/)
1. 🏗- [Terraformer](http://terraformer.io)
1. 🖼- LERC
1. 👩‍🚀- [ArcGIS Hub](https://hub.arcgis.com)

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-1.png" -->

`@esri/arcgis-rest-js` helps you talk

to ArcGIS Online and Enterprise

from modern browsers and Node.js.

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-4.png" -->

### On GitHub

Code 🎛 [github.com/Esri/arcgis-rest-js](https://github.com/Esri/arcgis-rest-js)

Doc 📚 [esri.github.io/arcgis-rest-js](https://esri.github.io/arcgis-rest-js)

<aside class="notes">
  * its an open source thing
  *  API reference is generated from comments within the code
  * Guides
  * pull requests (suggestions, improvements) welcome
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

Vanilla [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
```js
// construct the url yourself and don't forget to tack on f=json
var url = "https://www.arcgis.com/sharing/rest/community/users/dmfenton";

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

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

Vanilla [`Fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
```js
const url = "https://www.arcgis.com/sharing/rest/community/users/dmfenton";

fetch(url, {
  method: "POST", // set the request type
  headers: {
    "Content-Type": "application/x-www-form-urlencoded" // append the right header
  },
  // concat and encode parameters, append f=json
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

<!-- .slide: data-background="../../template/img/2019/psdw/bg-4.png" -->

# complexity

* What are all the error codes?
* How do you handle auth?
* How are dates supposed to be encoded?
* How are objects supposed to be passed?
* How do you manage tokens for federated servers?
* How do I refresh a token?

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-1.png" -->

<p style="font-size: 400%;">💥</p>

---


<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

`@esri/arcgis-rest-js`
```js
import { request } from "@esri/arcgis-rest-request";

const url = "https://www.arcgis.com/sharing/rest/community/users/dmfenton";

request(url)
  .then(response) // { firstName: "Daniel", description: "open source geodev" ... }
  .catch((error => {
    if(err.name === "ArcGISAuthError"){
      // handle auth error
    } else {
      // handle regular error
    }
  })
```

<aside class="notes">
  could you do this without a dependency, yes!
  but why would you?
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

### Value adds

* appends `f=json` (and request headers)
* encodes query string parameters
* creates `FormData` (when required)
* clear and informative error handling
* proper parameter encoding
* supports authentication

<aside class="notes">

</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-4.png" -->

### Value adds

* ~~display a map~~
* ~~clientside analysis~~

<aside class="notes">

</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-1.png" -->

`request` only expects a url, but it exposes `requestOptions` too.
```js
// url, IRequestOptions
request(url, {
  params: { // anything you want to pass
    foo: true,
    bar: "baz",
    more: File(),
    num: 999,
    when: Date().now() // etc.
  },
  // httpMethod: "GET",
  // authentication
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

<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

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
  you dont have to wait for us to wrap every ArcGIS Online call
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

### Goals

* Node.js and (modern) browsers
* a la carte / svelte
* framework agnostic
* shave down the sharp edges

<aside class="notes">
 originally because PDX was using Angular and Hub was using Ember
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-4.png" -->

### Disclaimer*

* not a product, no roadmap
* work [in progress](https://developers.arcgis.com/rest/)
* scratching our own itch

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-1.png" -->

### Comparison

* _kind of_ analogous to ArcGIS API for Python
* **much different** than the ArcGIS API for JavaScript

<aside class="notes">
  thin wrapper, web centric
  pairs well with other open source libraries
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

### < 2018 👵 collaborators

* https://developers.arcgis.com
* https://hub.arcgis.com
* customers!

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

### >= 2018 👶 collaborators

* Storymaps
* Web AppBuilder (next generation)
* ArcGIS Urban
* PS
* ArcGIS Solutions
* Enterprise (via Hub)
* Esri UK
* Startups / Partners
* ??

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-4.png" -->

### since the last talk (on [YouTube](https://www.youtube.com/watch?v=n0WtJPSprqc))...
* **5** new packages 📦!
* **15** releases 🎉!

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-1.png" -->

## 👵 packages 📦!

* `request` / ~~2~~ 2.4 kb
* `auth` / ~~2.5~~ 3 kb
* `feature-service` / ~~500~~ 1.1 kb
* `items` / ~~1~~ 1.1 kb
* `groups` / ~~750~~ 780 b
* `geocoder` / ~~1 kb~~ 990 b

<aside class="notes">
  compact (on purpose and because they are wips)
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

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

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

when only **one** piece of information is required

```js
import { getLayer } from "@esri/arcgis-rest-feature-service";

const url = `http://services.arcgis.com/.../SF311/FeatureServer/0`;

getLayer(url)
  .then(response) // { name: "311", id: 0, ... }

// or
getLayer(url, {
  httpMethod: "GET",
  authentication // etc.
})
```
[IRequestOptions](https://esri.github.io/arcgis-rest-js/api/feature-service/getLayer/) still plays second 🎻
.

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-4.png" -->

### if **more** than one piece of information is needed

```js
deleteFeatures({
  url,
  objectIds: [ 123 ]
})
  .then(response)

// { "deleteResults": [ { "objectId": 123, "success": true } ] }
```
only one parameter is exposed and we [_extend_](https://esri.github.io/arcgis-rest-js/api/feature-service/deleteFeatures/) `IRequestOptions`
<aside class="notes">
this method expects ISetAccessRequestOptions
a higher level abstraction than just { params }
admit that required parameters are obscured by optional (and inherited ones)
remind folks that the code snippet is good enough for most
and that the structure is mostly for TypeScript consumers
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-1.png" -->

### update who can access an [item](http://edn.maps.arcgis.com/home/item.html?id=d9af3e31a562431988666e86bfc8a0d5)

```js
import { setItemAccess } from "@esri/arcgis-rest-sharing";

setItemAccess({
  id: `fe8`, // which item?
  access: `public`, // who should be able to see it?
  authentication // who is making the request?
})
  .then(response)
```

[`ISetItemAccessOptions`](https://esri.github.io/arcgis-rest-js/api/sharing/setItemAccess/)

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

A simple DX, even when the underlying logic is [complicated](https://github.com/Esri/arcgis-rest-js/blob/master/packages/arcgis-rest-sharing/src/group-sharing.ts#L74-L161)

* we ensure the response is _deterministic
* we figure out _which_ url to call (based on role)

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

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
  this in and of itself doesnt fetch a token
  similar to JSAPI IdentityManager
    * DOESNT juggle multiple portals
    * doesnt present a UI to login when an anonymous request fails

  tokens arent fetched until its time to make a request
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-4.png" -->

`UserSession` keeps track of token expiration

```js
const url = `http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/`;

request(url, { authentication })
  .then(response => {
    // the same token will be reused for the second request
    request(url, { authentication })
  })
```
 and whether or not a server is trusted (federated)

<aside class="notes">
  the session keeps track of the expiration of tokens and trusted servers
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

## lets make this [Observable](https://beta.observablehq.com/@jgravois/introduction-to-esri-arcgis-rest-js)

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

## Demo - [Node.js](https://github.com/Esri/arcgis-rest-js/tree/master/demos/node-cli-item-management/)

<aside class="notes">
  OAuth 2.0
  demo (and API functionality) came from a user
  admit that we should be hosting live demos but for now you have to run them yourself.
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-4.png" -->

## Demo - [React Component](https://github.com/oppoudel/react-geocoder)

<aside class="notes">
  geocoding
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

## Demo - [Web Component](https://github.com/esridc/hub-components)

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

## [Lamda Functions](https://medium.com/@adamjpfister/know-your-apis-6dc6ea3d084c)

(you get the idea.)

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-4.png" -->

### Enough about rest-js, what else do ya got?

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-1.png" -->

### [esri-loader](https://github.com/esri/esri-loader)

```js
import { loadModules } from 'esri-loader';

// first, we use Dojo's loader to require the map class
loadModules(['esri/views/MapView', 'esri/WebMap'])
  .then(([MapView, WebMap]) => {
```

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

### [Koop](https://koopjs.github.io/)

[server.com/github/koopjs::geodata::north-america/FeatureServer/0](http://www.arcgis.com/home/webmap/viewer.html?url=http://localhost:8080/github/koopjs::geodata::north-america/FeatureServer/0)

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

### [Koop](https://koopjs.github.io/)

```js
function getData(req, callback) {
  // ...
  // fetch geojson from craigslist
  request(`https://${city}.craigslist.org/jsonsearch/type/${type}`, (err, res, body) => {
    if (err) return callback(err)
    // translate the raw response from Craigslist into GeoJSON
    const geojson = translate(res.body, type)
    // add a little bit of metadata to enrich the payload
    geojson.metadata = {
      name: `${city} ${type}`,
      description: `Craigslist ${type} listings proxied by https://github.com/dmfenton/koop-provider-craigslist`
    }
    // hand the geojson back to Koop
    callback(null, geojson)
  })
}
```
<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-4.png" -->

### @esri/[react-arcgis](https://github.com/Esri/react-arcgis)

```js
import { Map } from '@esri/react-arcgis';

ReactDOM.render(<Map />, document.getElementById('container'));
```
<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-1.png" -->

### @esri/[proj-codes](https://www.npmjs.com/package/@esri/proj-codes)

```js
const codes = require('@esri/proj-codes')

const crs = codes.lookup(3857)

crs.wkt
> 'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984"...'
```
<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-1.png" -->

### [@esri/arcgis-html-sanitizer](https://github.com/Esri/arcgis-html-sanitizer)

```js
// Sanitize a string
const sanitizedHtml = sanitizer.sanitize(
  '<img src="https://example.com/fake-image.jpg" onerror="alert(1);" />'
);
```

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

### [i3s](https://github.com/Esri/i3s-spec)-spec/[cim](https://github.com/Esri/cim-spec)-spec

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

### [lerc](https://github.com/Esri/lerc/)

```js
Lerc.decode(xhrResponse, {
  pixelType: "U8", // leave pixelType out in favor of F32 for lerc1
  inputOffset: 10 // start from the 10th byte
});
```

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-3.png" -->

### [Esri/Bayview](https://github.com/Esri/bayview)

<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-4.png" -->

### [geometry-api-java](http://esri.github.io/geometry-api-java/doc/Contains.html)

```java
static boolean geometryContains(Geometry geometryA, Geometry geometryB, SpatialReference sr)
{
  boolean contains = OperatorContains.local().execute(geometryA, geometryB, sr, null);
  return contains;
}
```
<aside class="notes">
</aside>

---

<!-- .slide: data-background="../../template/img/2019/psdw/bg-2.png" -->

### questions?

<aside class="notes">
</aside>
