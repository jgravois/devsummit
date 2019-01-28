<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

```shell
npm install @esri/arcgis-rest-request
npm install @esri/arcgis-rest-geocoder
```
<div class="container">

<div class="col">
  <pre style="width: 500px; margin: 0 auto; box-shadow: none;"><code class="hljs js" style="height: 400px;">
import { reverseGeocode }
  from '@esri/arcgis-rest-geocoder';

// long, lat
reverseGeocode([ -118.409,33.943 ])
  .then(response);

// or
reverseGeocode({
  latitude: 33.943,
  latitude: -118.409
})
reverseGeocode({
  x: -118.409,
  y: 33.9425
}) // wgs84 is assumed
reverseGeocode({
  x: -13181226,
  y: 4021085,
  spatialReference: {
    wkid: 3857
})
    </code>
    </pre>
</div>

<div class="col">
  <pre style="width: 500px; margin: 0 auto; box-shadow: none;"><code class="hljs json" style="height: 400px;">
{
  "spatialReference": {
    "wkid": 4326,
    "latestWkid": 4326
  },
  "candidates": [
    {
      "address": "LAX",
      "location": {
        "x": -118.40896999999995,
        "y": 33.942510000000027
      },
      "score": 100,
      "attributes": {

      },
      "extent": {
        // ...
      }
    }
  ]
}</code></pre>
</div>

<aside class="notes">
  * Promise based
  * prioritizes simple use cases
  * try to avoid unnecessary GIS jargon
</aside>

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

## Reverse Geocoding

```js


// or
reverseGeocode({ latitude: 33.943, latitude: -118.409 })
reverseGeocode({ x: -118.409, y: 33.9425 }) // wgs84 is assumed
reverseGeocode({ x: -13181226, y: 4021085, spatialReference: { wkid: 3857 })
```

<aside class="notes">
  * overloaded constructor
</aside>

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

## Suggestions

```js
<!-- require polyfills for fetch and Promise from https://polyfill.io -->
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=es5,Promise,fetch"></script>

<script src="https://unpkg.com/@esri/arcgis-rest-request"></script>
<script src="https://unpkg.com/@esri/arcgis-rest-geocoder"></script>

arcgisRest.suggest("Starb")
  .then((response) => {
    response.suggestions[0].text; // => "Starbucks"
  });

```

<aside class="notes">
  * arcgisRest namespace
  * method names reflect that
</aside>

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

## Suggestions

```js
arcgisRest.suggest("Disneyl", {
  httpMethod: "POST",
  params: {
    countryCode: "FR",
    maxSuggestions: 2
  }
})
  .then((response) => {
    console.log(response.suggestions.length); // => 2 (in France)
  });
```

<aside class="notes">
  * second optional parameter
  * other methods that need two pieces of information expect it via a single object
</aside>

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

## Prior art

https://www.npmjs.com/package/geocoder-arcgis

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

Demo ([Batch geocoding](https://github.com/Esri/arcgis-rest-js/blob/509afd71425daa7401c8c0cf6a5eb5b1958985b6/demos/batch-geocoder-node/batch-geocode.js#L79-L82) in Node.js)

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Item Search

- `searchItems( string or options )`

```js
const { searchItems } = require("@esri/arcgis-rest-items");
return searchItems('water')
  .then((results) => {
    // work with the items...
  })
```

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### it's just q

```js
const { searchItems } = require("@esri/arcgis-rest-items");
return searchItems('water AND type: Web Map')
  .then((results) => {
    // work with the items...
  })
```

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Paging...

```js
const { searchItems } = require("@esri/arcgis-rest-items");
return searchItems({
    searchForm: {
      q: 'bike trails AND (typekeywords: hubSolutionTemplate)',
      start: 1203,
      num: 100
    }
  })
  .then((results) => {
    // work with the items...
  })
```

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Private Items on your Portal

```js
return searchItems({
    authentication: myUserSession,
    portal: 'https://my-portal.org/sharing/rest',
    searchForm: {
      q: 'bike trails AND (typekeywords: hubSolutionTemplate)',
      start: 1203,
      num: 100,
    }
  })
  .then((results) => {
    // work with the items...
  })
```

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### CRUD
- `createItem`
- `getItem`
- `updateItem`
- `removeItem`

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Create Item + JSON Data
- Web Maps, Web Apps etc

```js
let itm = {
  title: 'foo',
  owner: 'dbouwman',
  ...
  data: {
    ...createItem() handles this correctly...
  }
}
```

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

```js
function serializeItem(item: IItem): any {
  const clone = JSON.parse(JSON.stringify(item));
  // join keywords and tags...
  clone.typeKeywords = item.typeKeywords.join(", ");
  clone.tags = item.tags.join(", ");
  // stringify json props...
  if (clone.data) {
    clone.text = JSON.stringify(clone.data);
    delete clone.data;
  }
  if (clone.properties) {
    clone.properties = JSON.stringify(clone.properties);
  }
  return clone;
}

```

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Other Item-y Things
- `addItemJson`
- `createItemInFolder`
- `getItemData`

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Resources & Protection

- `getItemResources`
- `updateItemResource`*
- `removeItemResource`*
- `protectItem`
- `unprotectItem`

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Groups

- `searchGroups`
- `createGroup`
- `getGroup`
- `updateGroup`
- `removeGroup`

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Groups


- `getGroupContent`
- `getGroupUsers`
- `protectGroup`
- `unprotectGroup`


---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Node
```js
// need fetch and form-data
require('isomorphic-fetch');
require('isomorphic-form-data');
// bring in modules you need...
const { searchItems } = require("@esri/arcgis-rest-items");

return searchItems({
    searchForm: {
      q: 'bike trails',
      start: 1,
      num: 100
    }
  })
  .then((results) => {
    // work with the items...
  })
```

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Demo

- CLI toolkit
  - build with `commander`
  - easy to add more cli tools
- Hub Cleaner
  - surgical purge for our test org

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

## Feature Services

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Node process to query stats and

<pre style="width: 425px; margin: 0 auto; box-shadow: none;"><code class="hljs json" style="height: 412px;">"statistics": {
  "values": [
    {
      "value": "Yes",
      "count": 199,
      "code": "Y"
    },
    {
      "value": "No",
      "count": 99,
      "code": "N"
    }
  ],
  "count": 2
}</code></pre>

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Get Feature

```js
import { getFeature } from '@esri/arcgis-rest-feature-service';

const url = 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0';

getFeature({ url, id: 42 })
  .then(response => {
    response.attributes.FID; // 42
  });
```

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

### Query Features

```js
import { queryFeatures } from "@esri/arcgis-rest-feature-service";

const queryOptions = {
  url,
  where: "Condition='Poor'",
  returnCountOnly: true
}

queryFeatures(options)
  .then(response => {
    response.count; // 7
  });
```

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

## Demo

[@tomwayson/hub-events](https://github.com/tomwayson/hub-events)

---

<!-- .slide: data-background="../../../fresher-template/img/2019/devsummit/bg-3.png" -->

## Demo

[demos/feature-service-browser](https://github.com/Esri/arcgis-rest-js/tree/master/demos/feature-service-browser)

---
