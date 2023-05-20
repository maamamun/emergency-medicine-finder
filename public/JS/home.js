const x = document.getElementById("viwe");
x.style.display = "none"
const getdiv2 = document.getElementById("data")
const markers = []
let demo = []
let curentlat = 0.00
let curentlng = 0.00

let greenIcon = L.icon({
  iconUrl: 'images/map-marker.png',
  // shadowUrl: 'leaf-shadow.png',
  iconSize: [20, 75], // size of the icon
  // shadowSize:   [50, 64], // size of the shadow
  iconAnchor: [4, 94], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [4, -76] // point from which the popup should open relative to the iconAnchor
});

function calculateDistance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180
  var radlon1 = Math.PI * lon1 / 180
  var radlon2 = Math.PI * lon2 / 180
  var theta = lon1 - lon2
  var radtheta = Math.PI * theta / 180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  if (unit == "K") { dist = dist * 1.609344 }
  if (unit == "N") { dist = dist * 0.8684 }

  return dist
}
const map = L.map('shopmap', { doubleClickZoom: false }).locate({ setView: true, maxZoom: 30 });

const searchInput = document.getElementById('searchmedi')
searchInput.addEventListener('input', e => {
  fetch(`/searchmedicine?mname=${e.target.value}`,
  ).then(
    res => res.json()
  ).then(data => {
    for (i = 0; i < data.length; i++) {
      data[i]["distance"] = calculateDistance(curentlat, curentlng, data[i]["lat"], data[i]["lng"]);
    }

    data.sort(function (a, b) {
      const disData = a.distance - b.distance;
      return a.distance - b.distance;
    });
    markers.forEach(m => map.removeLayer(m))
    for (i = 0; i < data.length; i++) {
      var marker = L.marker([data[i].lat, data[i].lng], {
        draggable: false,
        autoPan: true,
        icon: greenIcon
      }).addTo(map);
      if (i === 0) {
        marker.bindPopup(`${data[i].shopname}.<br> ${data[i].mediname}(${data[i].medistrength})<br>Price:${data[i].price} tk`).openPopup()
      } else {
        marker.bindPopup(`${data[i].shopname}.<br> ${data[i].mediname}(${data[i].medistrength})<br> Price:${data[i].price} tk`)
      }
      markers.push(marker)
    }
    console.log(data)

    let newHtml = ''
    for (i = 0; i < data.length; i++) {
      newHtml += ` 
                   
            <div class="col-sm-6 col-lg-4 mx-auto ">
              <div class="box">
                <div class="img-box">
                  <img src="images/s1.png" alt="">
                </div>
                <div class="detail-box">
                ${data[i].email}

                ${data[i].id}

                  <h5>
                    ${data[i].shopname}
                  </h5>
                  <p>
                    ${data[i].mediname} (${data[i].meditype})
                  </p>
                  <p>
                    Strentgh: ${data[i].medistrength}
                  </p>
                  <p>
                    ${data[i].medigeneric} 
                  </p>  
                  <p>                   
                  Contract: ${data[i].phone}
                  </p>
                  <h5>
                    Price ${data[i].price} BDT (per piece)
                  </h5>
                </div>
                
                   <div class="btn-box">
                  <form action="/book-service" method="post">                   
                   <input type="hidden" name="service_id" value="${data[i].id}">
                   <button type="submit">
                   Send Request
                    </button>
                  </form>

                </div> 
              </div>
            </div>
                          `
    }
    x.style.display = "none"

    if (x.style.display === "none") {
      x.style.display = "block";
    }
    getdiv2.innerHTML = newHtml
    demo = data
  })
})



L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

navigator.geolocation.getCurrentPosition(position => {
  const { coords: { latitude, longitude } } = position;
  curentlat = latitude;
  curentlng = longitude;
  //new
  var greenIcon = L.icon({
    iconUrl: 'images/map-marker.png',
    // shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
    iconSize: [15, 45], // size of the icon
    // shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  //
  var marker = L.marker([latitude, longitude], {
    // icon: greenIcon,
    draggable: true,
    autoPan: true,
  }).addTo(map);
  marker.bindPopup(`current location`).openPopup()

  marker.on("drag", function (e) {
    var marker = e.target;
    var position = marker.getLatLng();
  });
  var circle = L.circle([latitude, longitude], {
    color: '#8fce00',
    fillColor: '#d9ead3',
    fillOpacity: 0.5,
    radius: 300
  }).addTo(map);
})