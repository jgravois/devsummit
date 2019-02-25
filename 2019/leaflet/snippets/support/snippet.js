function create(tag, attr) {
  var elem = document.createElement(tag);

  for (var k in attr) {
    elem[k] = attr[k];
  }

  return elem;
}

document.head.appendChild(create("link", {
  rel: "stylesheet",
  href: "https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
}));

document.head.appendChild(create("script", {
  src: "https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
}));

document.head.appendChild(create("script", {
  src: "https://unpkg.com/esri-leaflet@2.2.3"
}));

 window.addEventListener("load", init);
