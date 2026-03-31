const map = L.map("map").setView([11.936232, 108.464543], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

const markers = {};

function getIcon(type) {
  let emoji = "📍";

  if (type === "food") emoji = "🍜";
  if (type === "cafe") emoji = "☕";
  if (type === "play") emoji = "🎯";
  if (type === "hotel") emoji = "🏨";
  if (type === "transport") emoji = "🛵";

  return L.divIcon({
    html: `<div style="font-size:20px">${emoji}</div>`,
    className: "",
  });
}

places.forEach((p) => {
  const marker = L.marker([p.lat, p.lng], {
    icon: getIcon(p.type),
  })
    .addTo(map)
    .bindPopup(`<b>${p.name}</b><br>${p.address}`);

  markers[p.id] = marker;
});

function focusPlace(id) {
  const p = places.find((x) => x.id === id);
  if (!p) return;

  map.setView([p.lat, p.lng], 16);

  const marker = markers[id];
  if (marker) marker.openPopup();
}
