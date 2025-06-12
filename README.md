# Javascript Lazy Load Google Adsense

## Deskripsi

Fakta dilapangan (test Pagespeed Insight) menunjukan bahwa script Google Adsense mempengaruhi load website/blog, Script ini adalah implementasi Lazy Loading untuk Google AdSense menggunakan kelas JavaScript. Dengan menggunakan metode Lazy Loading, iklan hanya dimuat ketika elemen iklan terlihat di viewport pengguna, yang membantu meningkatkan performa/kecepatan  halaman dan pengalaman pengguna.

## Manfaat

1. **Performa Halaman yang Lebih Baik**:
   - Mengurangi waktu muat awal halaman dengan menunda pemuatan iklan hingga elemen tersebut terlihat.

2. **Pengalaman Pengguna yang Lebih Baik**:
   - Menghindari iklan yang mengganggu saat pengguna menggulir halaman, sehingga meningkatkan interaksi pengguna.

3. **Optimalisasi Bandwidth**:
   - Mengurangi penggunaan bandwidth dengan memuat iklan hanya ketika diperlukan.

4. **Dukungan untuk Browser Lama**:
   - Fallback untuk browser yang tidak mendukung `Intersection Observer`, sehingga script tetap dapat berfungsi.

## Breakdown Script

### 1. Kelas `LazyAdSense`

- **Constructor**:
  - Menginisialisasi variabel dan memanggil metode `init`.

### 2. Metode `init`

- Memeriksa apakah `Intersection Observer` didukung oleh browser.
- Jika tidak, memanggil `loadAllAds` sebagai fallback.

### 3. Metode `setupIntersectionObserver`

- Mengatur `IntersectionObserver` untuk memantau elemen iklan.
- Menentukan opsi pengamatan seperti `rootMargin` dan `threshold`.

### 4. Metode `loadAdSenseScript`

- Memuat script Google AdSense jika belum dimuat sebelumnya.
- Menggunakan Promise untuk menangani pemuatan script secara asinkron.

### 5. Metode `loadAd`

- Memperbarui placeholder sebelum memuat iklan.
- Memanggil `loadAdSenseScript` dan membuat elemen iklan baru.
- Menghapus placeholder dan menambahkan elemen iklan ke kontainer.
- Menambahkan iklan ke Google AdSense dengan `adsbygoogle.push()`.

### 6. Metode `createAdElement`

- Membuat elemen `<ins>` untuk iklan dengan atribut yang diperlukan.

### 7. Metode `showErrorPlaceholder`

- Menampilkan pesan kesalahan jika iklan gagal dimuat.

### 8. Metode `loadAllAds`

- Memuat semua iklan secara instan sebagai fallback untuk browser yang tidak mendukung observer.

### 9. Metode `loadAdById` dan `refreshAd`

- Memuat iklan secara manual berdasarkan ID slot iklan dan menyegarkan iklan yang sudah ada.

### 10. Event Listener

- Menginisialisasi lazy loading setelah DOM siap.
- Menambahkan listener untuk debugging ketika script telah dimuat

## Contoh Penggunaan

Tidak ribet seperti script lazy load Adsense lainnya yang harus setting ID publisher di script lazy load, script ini tidak begitu,
tidak usah setting setting sehingga ramah newbie
- Cukup copy isi file [script.js](https://github.com/hendygital/script-lazy-load-google-adsense/blob/main/script.js)
- Masukan diatas tag </head>
- contoh  jadinya seperti ini:
```html
<script>
// isi script lazy load
</script>
</head>
```
Semoga bermanfaat :)
## [Klik disini](https://lynk.id/payme/hendygital) jika ingin berdonasi nraktir saya kopi
