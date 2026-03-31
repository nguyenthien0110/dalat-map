const listEl = document.getElementById("place-list");
const filterEl = document.getElementById("filter");
const btnGo = document.getElementById("btnGo");
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

let selected = [];
let currentFilter = "all";

hamburger.onclick = () => {
  sidebar.classList.toggle("open");
};

function getTypeInfo(type) {
  if (type === "food")
    return { icon: "🍜", label: "Ăn uống", class: "tag-food" };
  if (type === "cafe") return { icon: "☕", label: "Cafe", class: "tag-cafe" };
  if (type === "play")
    return { icon: "🎯", label: "Vui chơi", class: "tag-play" };
  if (type === "hotel")
    return { icon: "🏨", label: "Khách sạn", class: "tag-hotel" };
  if (type === "transport")
    return { icon: "🛵", label: "Thuê xe", class: "tag-transport" };
  return { icon: "📍", label: "", class: "" };
}

function renderList(filter = "all") {
  currentFilter = filter;
  listEl.innerHTML = "";

  places.forEach((p) => {
    if (filter !== "all" && p.type !== filter) return;

    const type = getTypeInfo(p.type);

    const div = document.createElement("div");
    div.className = "place-item";

    if (selected.includes(p.id)) {
      div.classList.add("active");
    }

    div.innerHTML = `
      <div class="place-left">
        <div class="place-icon">${type.icon}</div>
        <div>${p.name}</div>
      </div>
      <div class="place-tag ${type.class}">${type.label}</div>
    `;

    div.onclick = () => {
      focusPlace(p.id);

      if (selected.includes(p.id)) {
        selected = selected.filter((id) => id !== p.id);
      } else {
        if (selected.length >= 2) {
          alert("Chỉ chọn tối đa 2 địa điểm");
          return;
        }
        selected.push(p.id);
      }

      renderList(currentFilter);
    };

    listEl.appendChild(div);
  });
}

filterEl.onchange = () => renderList(filterEl.value);

btnGo.onclick = () => {
  if (selected.length < 2) {
    alert("Chọn 2 địa điểm");
    return;
  }

  const p1 = places.find((p) => p.id === selected[0]);
  const p2 = places.find((p) => p.id === selected[1]);

  const url = `https://www.google.com/maps/dir/?api=1&origin=${p1.lat},${p1.lng}&destination=${p2.lat},${p2.lng}`;

  window.open(url, "_blank");
};

renderList();
