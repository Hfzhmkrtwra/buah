import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGYnq4VKq-YGu4RbfoI_ZHez9fishYjZo",
  authDomain: "insan-cemerlang-afd2f.firebaseapp.com",
  projectId: "insan-cemerlang-afd2f",
  storageBucket: "insan-cemerlang-afd2f.appspot.com",
  messagingSenderId: "686649580589",
  appId: "1:686649580589:web:61374bbbd68adb604eaca4",
  measurementId: "G-LNZTQBCE26"
};

//inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function tambahBuah(nama, warna, harga) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "buah"), {
      nama: nama,
      warna: warna,
      harga: harga
    })

    // menampilkan pesan berhasil
    console.log('berhasil menyimpan data buah')
  } catch (error) {
    // menampilkan pesan gagal 
    console.log('gagal menyimpan data buah' + error)
  }
}

export async function ambilDaftarBuah() {
  const refDokumen = collection(basisdata, "buah");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      warna: dokumen.data().warna,
      harga: dokumen.data().harga
    })
  })

  return hasilKueri;
}

export async function hapusBuah(id) {
  await deleteDoc(doc(basisdata, "buah", id))
}

export async function ubahBuah(id, namabaru, warnabaru, hargabaru) {
  await updateDoc(
    doc(basisdata, "buah", id), 
    { nama: namabaru, warna: warnabaru, harga: hargabaru }
    )
}
  
export async function ambilBuah(id) {
  const refDokumen = await doc(basisdata, "buah", id)
  const snapshotDokumen = await getDoc(refDokumen)

  return await snapshotDokumen.data()
}