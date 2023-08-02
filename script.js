let JudulV = document.getElementById("Judul");
let ArtisV = document.getElementById("Artis");
let DurasiV = document.getElementById("Durasi");
let GenreV = document.getElementById("Genre");
let AlbumV = document.getElementById("Album");
let Tahun_RilisV = document.getElementById("Tahun_Rilis");
let tbody = document.getElementById("tbody");
let editjudul = document.getElementById("editjudul");
let editartis = document.getElementById("editartis");
let editdurasi = document.getElementById("editdurasi");
let editgenre = document.getElementById("editgenre");
let editalbum = document.getElementById("editalbum");
let edittahun = document.getElementById("edittahun");
let idV = document.getElementById("id");
let getid = document.getElementById("getid");

getData();
function getData(params) {
  fetch(
    "https://uasapi-e36a8-default-rtdb.firebaseio.com/musikjepang.json?auth=V0Y2RNQFLgjXqmQBsax1Hr04GtypeHLuy3hHXJfY")
    .then((res) => res.json())
    .then((data) => {
      let tabel = "";
      let no = 1;
      let output = Object.entries(data);
      console.log(output);
      output.forEach((row) => {
        tabel += `
        <tr>

            <td>${no}</td>
            <td>${row[1].Judul}</td>
            <td>${row[1].Artis}</td>
            <td>${row[1].Durasi}</td>
            <td>${row[1].Genre}</td>
            <td>${row[1].Album}</td>
            <td>${row[1].Tahun_Rilis}</td>
            <td><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editRow('${row[0]}')">Edit</td>
            <td><button type="button" class="btn btn-danger"  onclick="deleteRow('${row[0]}')">Hapus</td>
        </tr>
        `;
        no++;
      });

      tbody.innerHTML = tabel;
    });
}

//Create Data

function createData() {
  let data = {
    Judul: JudulV.value,
    Artis: ArtisV.value,
    Durasi: DurasiV.value,
    Genre: GenreV.value,
    Album: AlbumV.value,
    Tahun_Rilis: Tahun_RilisV.value
  };
  console.log(data);
  fetch("https://uasapi-e36a8-default-rtdb.firebaseio.com/musikjepang.json?auth=V0Y2RNQFLgjXqmQBsax1Hr04GtypeHLuy3hHXJfY", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((data) => {
      getData();
    });

    JudulV.value="";
    ArtisV.value="";
    DurasiV.value="";
    GenreV.value="";
    AlbumV.value="";
    Tahun_RilisV.value="";
}

//show data edit
//"https://uasapi-e36a8-default-rtdb.firebaseio.com/musikjepang.json?auth=V0Y2RNQFLgjXqmQBsax1Hr04GtypeHLuy3hHXJfY"
function editRow(id) {
  fetch("https://uasapi-e36a8-default-rtdb.firebaseio.com/musikjepang/" + id + 
  ".json?auth=V0Y2RNQFLgjXqmQBsax1Hr04GtypeHLuy3hHXJfY")
    .then((res) => res.json())
    .then((data) => {
      editjudul.value = data.Judul;
      editartis.value = data.Artis;
      editdurasi.value = data.Durasi;
      editgenre.value = data.Genre;
      editalbum.value = data.Album;
      edittahun.value = data.Tahun_Rilis;
      getid.value = id;
    });
}

//update data
function updateData(id) {
  let updateData = document.getElementById("updateData");
  let putdata = {
    Judul: editjudul.value,
    Artis: editartis.value,
    Durasi: editdurasi.value,
    Genre: editgenre.value,
    Album: editalbum.value,
    Tahun_Rilis: edittahun.value
  };
  fetch("https://uasapi-e36a8-default-rtdb.firebaseio.com/musikjepang/" + id + 
  ".json?auth=V0Y2RNQFLgjXqmQBsax1Hr04GtypeHLuy3hHXJfY", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(putdata)
  })
    .then((res) => res.json())
    .then((data) => {
      getData();
    });
  updateData.setAttribute("data-bs-dismiss", "modal");
}

//delete data
function deleteRow(id) {
  fetch("https://uasapi-e36a8-default-rtdb.firebaseio.com/musikjepang/" + id +
   ".json?auth=V0Y2RNQFLgjXqmQBsax1Hr04GtypeHLuy3hHXJfY", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then(() => {
      //alert("data berhasil dihapus");
      getData();
    });
}
