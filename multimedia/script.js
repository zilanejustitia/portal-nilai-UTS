// Data 30 mahasiswa fiktif untuk tabel nilai UTS
const students = [
  { name: "Ahmad Rizky Pratama", nim: "2410301001", score: 78 },
  { name: "Nadia Ayu Lestari", nim: "2410301002", score: 92 },
  { name: "Bima Aditya Saputra", nim: "2410301003", score: 57 },
  { name: "Citra Maharani", nim: "2410301004", score: 66 },
  { name: "Dimas Fajar Ramadhan", nim: "2410301005", score: 84 },
  { name: "Elisa Nur Azzahra", nim: "2410301006", score: 49 },
  { name: "Farhan Maulana Yusuf", nim: "2410301007", score: 73 },
  { name: "Gita Amalia Putri", nim: "2410301008", score: 88 },
  { name: "Hendra Wijaya", nim: "2410301009", score: 61 },
  { name: "Intan Permata Sari", nim: "2410301010", score: 95 },
  { name: "Joko Febriansyah", nim: "2410301011", score: 54 },
  { name: "Shella Putri", nim: "2233445565", score: 35 },
  { name: "Shella Fasya", nim: "2233445566", score: 85 },
  { name: "Kirana Dwi Anggraini", nim: "2410301014", score: 76 },
  { name: "Lukman Hakim", nim: "2410301015", score: 64 },
  { name: "Maya Kartika Dewi", nim: "2410301016", score: 99 },
  { name: "Naufal Ardiansyah", nim: "2410301017", score: 58 },
  { name: "Olivia Safitri", nim: "2410301018", score: 81 },
  { name: "Putra Bagaskara", nim: "2410301019", score: 43 },
  { name: "Qori Nurhaliza", nim: "2410301020", score: 70 },
  { name: "Raka Dwi Pangestu", nim: "2410301021", score: 90 },
  { name: "Salsa Aurelia", nim: "2410301022", score: 52 },
  { name: "Teguh Santoso", nim: "2410301023", score: 67 },
  { name: "Ulfa Rahmawati", nim: "2410301024", score: 74 },
  { name: "Vino Alfarizi", nim: "2410301025", score: 31 },
  { name: "Wulan Puspitasari", nim: "2410301026", score: 86 },
  { name: "Yudha Prasetyo", nim: "2410301027", score: 63 },
  { name: "Zahra Khairunnisa", nim: "2410301028", score: 97 },
  { name: "Arum Sekar Wangi", nim: "2410301029", score: 59 },
  { name: "Bayu Nugroho", nim: "2410301030", score: 72 }
];

// Mengambil elemen penting dari halaman
const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const resultPage = document.getElementById("resultPage");
const loginLoading = document.getElementById("loginLoading");
const skeletonTable = document.getElementById("skeletonTable");
const tableSection = document.getElementById("tableSection");
const tableBody = document.getElementById("studentTableBody");
const searchName = document.getElementById("searchName");
const searchNim = document.getElementById("searchNim");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

// Pengaturan pagination
const rowsPerPage = 10;
let currentPage = 1;
let filteredStudents = [...students];

// Menentukan status otomatis berdasarkan nilai
function getStatus(score) {
  return score >= 60 ? "Lulus" : "Tidak Lulus";
}

// Membuat baris tabel untuk data mahasiswa pada halaman aktif
function renderTable() {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const pageStudents = filteredStudents.slice(startIndex, startIndex + rowsPerPage);

  tableBody.innerHTML = "";

  if (pageStudents.length === 0) {
    tableBody.innerHTML = '<tr><td class="empty-row" colspan="5">Data mahasiswa tidak ditemukan.</td></tr>';
    pageInfo.textContent = "Halaman 0 dari 0";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  pageStudents.forEach((student, index) => {
    const status = getStatus(student.score);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${startIndex + index + 1}</td>
      <td>${student.name}</td>
      <td>${student.nim}</td>
      <td>${student.score}</td>
      <td>
        <span class="status-badge ${status === "Lulus" ? "status-pass" : "status-fail"}">
          ${status}
        </span>
      </td>
    `;

    tableBody.appendChild(row);
  });

  updatePagination();
}

// Memperbarui tombol dan teks pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  pageInfo.textContent = `Halaman ${currentPage} dari ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Menyaring data berdasarkan nama dan NIM
function filterStudents() {
  const nameKeyword = searchName.value.trim().toLowerCase();
  const nimKeyword = searchNim.value.trim();

  filteredStudents = students.filter((student) => {
    const matchName = student.name.toLowerCase().includes(nameKeyword);
    const matchNim = student.nim.includes(nimKeyword);
    return matchName && matchNim;
  });

  currentPage = 1;
  renderTable();
}

// Menampilkan halaman hasil UTS setelah proses login palsu selesai
function showResultPage() {
  loginLoading.classList.remove("active");
  loginPage.classList.add("hidden");
  resultPage.classList.remove("hidden");
  resultPage.classList.add("fade-in");

  skeletonTable.classList.remove("hidden");
  tableSection.classList.add("hidden");

  setTimeout(() => {
    skeletonTable.classList.add("hidden");
    tableSection.classList.remove("hidden");
    renderTable();
  }, 2000);
}

// Event submit login dengan loading selama 2 detik
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginLoading.classList.add("active");
  setTimeout(showResultPage, 2000);
});

// Event pencarian langsung saat pengguna mengetik
searchName.addEventListener("input", filterStudents);
searchNim.addEventListener("input", filterStudents);

// Event tombol Previous
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    renderTable();
  }
});

// Event tombol Next
nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage += 1;
    renderTable();
  }
});
