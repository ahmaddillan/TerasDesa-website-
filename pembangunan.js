const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const KEY = "terasdesa.projects";
const uid = () => Math.random().toString(36).slice(2, 9);
const getAll = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const setAll = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

function render(filter = "all") {
  const data = getAll();
  const wrap = $("#list");
  wrap.innerHTML = "";
  const rows = data.filter(p => filter === "all" || p.status === filter);
  rows.forEach(p => {
    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `
      <div style="flex:1">
        <div style="font-weight:600">${p.nama_proyek}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">
          ${p.penanggung_jawab || "-"} • ${p.tanggal_mulai || "-"} → ${p.tanggal_selesai || "-"}
        </div>
        <div style="font-size:12px;margin-top:6px">${p.deskripsi || ""}</div>
        <div class="row" style="margin-top:6px;gap:8px">
          <span class="chip">${labelStatus(p.status)}</span>
          <span class="chip">Progress: ${p.persentase_progress}%</span>
          ${p.estimasi_anggaran ? `<span class="chip">Estimasi: Rp${formatRp(p.estimasi_anggaran)}</span>` : ""}
          ${p.total_anggaran ? `<span class="chip">Total: Rp${formatRp(p.total_anggaran)}</span>` : ""}
        </div>
      </div>
      <select data-a="status" data-id="${p.id}">
        <option value="planned">Planned</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      <button class="btn" data-a="edit" data-id="${p.id}">Edit</button>
      <button class="btn warn" data-a="del" data-id="${p.id}">Hapus</button>
    `;
    wrap.appendChild(el);
    el.querySelector("select").value = p.status;
  });
  updateProgress();
}

function labelStatus(s) {
  return s === "planned" ? "Planned" : s === "completed" ? "Completed" : "Ongoing";
}

function formatRp(n) {
  return Number(n).toLocaleString("id-ID");
}

function updateProgress() {
  const data = getAll();
  if (!data.length) {
    $("#bar").style.width = "0%";
    $("#percent").textContent = "0% rata-rata progress";
    return;
  }
  const avg = Math.round(data.reduce((a, b) => a + (Number(b.persentase_progress) || 0), 0) / data.length);
  $("#bar").style.width = avg + "%";
  $("#percent").textContent = `${avg}% rata-rata progress`;
}

function handleSubmit(e) {
  e.preventDefault();
  const p = {
    id: uid(),
    id_user: 1,
    nama_proyek: $("#p-name").value.trim(),
    status: $("#p-status").value,
    persentase_progress: clamp(Number($("#p-progress").value || 0), 0, 100),
    tanggal_mulai: $("#p-start").value || "",
    tanggal_selesai: $("#p-end").value || "",
    estimasi_anggaran: Number($("#p-est").value || 0),
    total_anggaran: Number($("#p-total").value || 0),
    deskripsi: $("#p-desc").value.trim(),
    penanggung_jawab: $("#p-owner").value.trim()
  };
  if (!p.nama_proyek) return alert("Nama proyek wajib diisi");
  const data = getAll();
  data.push(p);
  setAll(data);
  e.target.reset();
  $("#p-progress").value = 0;
  render();
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function handleListClick(e) {
  const action = e.target.getAttribute("data-a");
  if (!action) return;
  const id = e.target.getAttribute("data-id");
  let data = getAll();
  if (action === "del") {
    data = data.filter(x => x.id !== id);
    setAll(data);
    render();
    return;
  }
  if (action === "edit") {
    const it = data.find(x => x.id === id);
    const nama_proyek = prompt("Nama Proyek", it.nama_proyek) || it.nama_proyek;
    const status = prompt("Status (planned/ongoing/completed)", it.status) || it.status;
    const persentase_progress = clamp(Number(prompt("Progress (%)", it.persentase_progress) || it.persentase_progress), 0, 100);
    const tanggal_mulai = prompt("Tanggal Mulai (YYYY-MM-DD)", it.tanggal_mulai || "") || it.tanggal_mulai;
    const tanggal_selesai = prompt("Tanggal Selesai (YYYY-MM-DD)", it.tanggal_selesai || "") || it.tanggal_selesai;
    const estimasi_anggaran = Number(prompt("Estimasi Anggaran", it.estimasi_anggaran ?? 0) || it.estimasi_anggaran);
    const total_anggaran = Number(prompt("Total Anggaran", it.total_anggaran ?? 0) || it.total_anggaran);
    const deskripsi = prompt("Deskripsi", it.deskripsi || "") || it.deskripsi;
    const penanggung_jawab = prompt("Penanggung Jawab", it.penanggung_jawab || "") || it.penanggung_jawab;
    Object.assign(it, { nama_proyek, status, persentase_progress, tanggal_mulai, tanggal_selesai, estimasi_anggaran, total_anggaran, deskripsi, penanggung_jawab });
    setAll(data);
    render();
  }
}

function handleStatusChange(e) {
  if (e.target.getAttribute("data-a") !== "status") return;
  const id = e.target.getAttribute("data-id");
  const data = getAll();
  const it = data.find(x => x.id === id);
  it.status = e.target.value;
  setAll(data);
  render();
}

function handleFilterClick(e) {
  const f = e.target.getAttribute("data-filter");
  if (!f) return;
  render(f);
}

function clearAll() {
  if (confirm("Hapus semua proyek?")) {
    setAll([]);
    render();
  }
}

$("#proj-form")?.addEventListener("submit", handleSubmit);
$("#list")?.addEventListener("click", handleListClick);
$("#list")?.addEventListener("change", handleStatusChange);
$$("[data-filter]").forEach(b => b.addEventListener("click", handleFilterClick));
$("#clear")?.addEventListener("click", clearAll);
render();
