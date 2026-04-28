// Global Değişkenler
let ogrenciler = JSON.parse(localStorage.getItem('kursKayitlari')) || [];
let currentSlide = 0;

// GİRİŞ KONTROLÜ
function girisYap() {
    const sifre = document.getElementById('adminPassword').value;
    if (sifre === "1234") {
        document.getElementById('login-container').style.display = "none";
        document.getElementById('main-content').style.display = "block";
        tabloyuGuncelle();
        showSlides();
    } else {
        document.getElementById('hataMesaji').style.display = "block";
    }
}

function cikisYap() {
    location.reload(); // Sayfayı yenileyerek çıkış yapar
}

// Sayfa Yüklendiğinde Çalışacaklar
document.addEventListener('DOMContentLoaded', () => {
    // Grup değişimine göre etiket güncelleme
    const grupRadiolar = document.querySelectorAll('input[name="grup"]');
    grupRadiolar.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const etiket = document.getElementById('cuzEtiket');
            const input = document.getElementById('cuzNo');
            if(e.target.value === "Elif-Ba") {
                etiket.innerText = "Bulunduğu Sayfa (1-55)";
                input.max = 55;
            } else {
                etiket.innerText = "Bulunduğu Cüz (1-30)";
                input.max = 30;
            }
        });
    });
});

// Kayıt Formu Yönetimi
document.getElementById('kayitFormu').addEventListener('submit', function(e) {
    e.preventDefault();

    const adSoyad = document.getElementById('adSoyad').value;
    const telNo = document.getElementById('telNo').value;
    const hoca = document.getElementById('hocaSecimi').value;
    const grup = document.querySelector('input[name="grup"]:checked').value;
    const sayfa = document.getElementById('cuzNo').value;
    const editIndex = document.getElementById('editIndex').value;

    const ogrenciVerisi = { adSoyad, telNo, hoca, grup, sayfa };

    if (editIndex === "-1") {
        ogrenciler.push(ogrenciVerisi);
    } else {
        ogrenciler[editIndex] = ogrenciVerisi;
        document.getElementById('editIndex').value = "-1";
        document.getElementById('islemDurumu').innerText = "";
        document.getElementById('vazgecBtn').style.display = "none";
    }

    localStorage.setItem('kursKayitlari', JSON.stringify(ogrenciler));
    this.reset();
    tabloyuGuncelle();
});

function tabloyuGuncelle() {
    const tbody = document.querySelector('#ogrenciTablosu tbody');
    if(!tbody) return;
    tbody.innerHTML = '';

    ogrenciler.forEach((ogr, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${ogr.adSoyad}</td>
            <td>${ogr.telNo}</td>
            <td>${ogr.hoca}</td>
            <td>${ogr.grup}</td>
            <td>${ogr.sayfa}. ${ogr.grup === 'Elif-Ba' ? 'Sayfa' : 'Cüz'}</td>
            <td>
                <button class="btn-edit" onclick="duzenle(${index})">Düzenle</button>
                <button class="btn-delete" onclick="sil(${index})">Sil</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('toplamOgrenci').innerText = `Toplam Kayıt: ${ogrenciler.length}`;
}

function sil(index) {
    if(confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
        ogrenciler.splice(index, 1);
        localStorage.setItem('kursKayitlari', JSON.stringify(ogrenciler));
        tabloyuGuncelle();
    }
}

function duzenle(index) {
    const ogr = ogrenciler[index];
    document.getElementById('adSoyad').value = ogr.adSoyad;
    document.getElementById('telNo').value = ogr.telNo;
    document.getElementById('hocaSecimi').value = ogr.hoca;
    document.getElementById('cuzNo').value = ogr.sayfa;
    document.getElementById('editIndex').value = index;
    
    document.getElementById('islemDurumu').innerText = "Düzenleme Modu";
    document.getElementById('vazgecBtn').style.display = "inline-block";
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Slider Fonksiyonları
function showSlides() {
    const slides = document.querySelectorAll('.slide');
    if(slides.length === 0) return;
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    setTimeout(showSlides, 3000);
}

function changeSlide(n) {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}