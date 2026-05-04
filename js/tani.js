/* ============================================
   suleymanalpar.com — Tanı Yardımcısı
   20 şikayet × ayırıcı tanı listesi (statik referans)
   Sağlık çalışanlarına yöneliktir.
   Kaynak: kurumsal pratik + Tintinalli, Rosen, UpToDate, ESC/AHA/SSC
   güncel kılavuzları temelinde derlenmiştir; klinik karar destekçisidir,
   yerine geçmez.
   ============================================ */

// Aciliyet renk kodu: kirmizi (kritik), turuncu (acil), sari (orta), yesil (rutin)
const TANI_KATALOG = {

  "Göğüs Ağrısı": {
    aciklama: "Acil servise göğüs ağrısı yakınmasıyla başvurunun ayırıcı tanısı. Hayati nedenler (5 'killer chest pain') önce dışlanır.",
    tanilar: [
      { tani: "Akut Koroner Sendrom (AKS)", alt: "STEMI / NSTEMI / USAP", aciliyet: "kirmizi",
        destekleyen: ["Egzersizle artan, dinlenme/nitratla geçen baskı/sıkışma", "Sol kol/çene/sırta yayılım", "Diyaforez, bulantı", "DM/HT/sigara/aile öyküsü", "S3 galo, hipotansiyon (kompike)"],
        bayraklar: ["Yeni ST elevasyonu / depresyonu", "Troponin pozitif", "Hemodinamik instabilite"],
        tetkikler: ["EKG ilk 10 dk", "Yüksek-duyarlık troponin (0/1 saat protokol)", "EKO (kompike/şüphe)", "Acil koroner anjiyografi (STEMI)"],
        skor: "HEART, TIMI, GRACE" },
      { tani: "Pulmoner Emboli (PE)", alt: "Submasif / masif", aciliyet: "kirmizi",
        destekleyen: ["Akut başlangıç dispne + plöritik göğüs ağrısı", "Taşikardi, taşipne", "DVT belirtisi", "İmmobilizasyon, malignite, OKS, gebelik", "Hemoptizi"],
        bayraklar: ["Hipotansiyon + sağ kalp gerilimi (masif)", "SpO₂ < %90", "Senkop"],
        tetkikler: ["Wells / PERC", "D-dimer (yaş düzeltmeli) düşük orta riskte", "BT pulmoner anjiyo (orta-yüksek risk)", "EKO (sağ kalp gerilimi)"],
        skor: "Wells PE, PERC, Geneva" },
      { tani: "Aort Diseksiyonu", alt: "Tip A / Tip B (Stanford)", aciliyet: "kirmizi",
        destekleyen: ["Ani başlayan, yırtılır tarzda göğüs/sırt ağrısı", "Kollar arası KB / nabız farkı", "Yeni AY üfürümü", "Kontrolsüz HT öyküsü, Marfan, gebelik"],
        bayraklar: ["Hipotansiyon + sırt ağrısı", "Mediasten genişleme (PA AC)", "Nörolojik defisit eşliği"],
        tetkikler: ["BT angio (toraks-abdomen)", "TEE / TTE", "D-dimer (negatif ekarte etmez)"],
        skor: "ADD-RS (Aortic Dissection Detection Risk Score)" },
      { tani: "Tansiyon Pnömotoraks", alt: "Acil dekompresyon", aciliyet: "kirmizi",
        destekleyen: ["Ani göğüs ağrısı + dispne", "Hiperrezonans, azalmış solunum sesi (tek taraflı)", "Trakea deviasyonu", "Boyun veni dolgun"],
        bayraklar: ["Hipotansiyon", "Hipoksi"],
        tetkikler: ["Klinik tanı — görüntüleme bekleme!", "Acil iğne dekompresyonu (2. interkostal aralık MCL)", "Sonra göğüs tüpü", "PA AC / akciğer USG (kuru tip)"] },
      { tani: "Özefagus Rüptürü (Boerhaave)", alt: "Mediastinit riski", aciliyet: "kirmizi",
        destekleyen: ["Şiddetli kusma sonrası ani göğüs ağrısı", "Mackler triadı: kusma + ağrı + subkutan amfizem", "Toksik görünüm"],
        bayraklar: ["Plöral efüzyon (sol)", "Hamman bulgusu (mediastinal krepitasyon)", "Sepsis tablosu"],
        tetkikler: ["BT toraks (oral kontrast)", "Özefagogram", "Cerrahi konsültasyonu acil"] },
      { tani: "Akut Perikardit / Tamponad", alt: "Viral / postinfeksiyöz / üremik", aciliyet: "turuncu",
        destekleyen: ["Plöritik ağrı, öne eğilince azalır", "Perikardiyal frotman", "Genç hasta + viral öykü", "EKG'de yaygın ST elevasyonu, PR depresyonu"],
        bayraklar: ["Beck triadı (hipotansiyon + JVD + kalp sesleri azalmış)", "Pulsus paradoksus > 10 mmHg"],
        tetkikler: ["EKG", "EKO (efüzyon + kollaps)", "Troponin (miyoperikardit ayırımı)"] },
      { tani: "Kostokondrit / Tietze", alt: "Muskuloskeletal", aciliyet: "yesil",
        destekleyen: ["Reproduktif palpasyonla ağrı", "Hareket, derin nefesle artış", "Genç hasta, travma/efor öyküsü"],
        bayraklar: ["Diğer akut tanılar dışlanmadıkça atlama!"],
        tetkikler: ["Tanı dışlama sonrası klinik"] },
      { tani: "Gastroözofageal Reflü / Özofajit", alt: "GIS kaynaklı", aciliyet: "yesil",
        destekleyen: ["Yanma karakteri, yemek sonrası", "Antiasit ile gerileme", "Yatınca artış"],
        bayraklar: ["Disfaji, kilo kaybı, kanama (kırmızı bayraklar — endoskopi)"],
        tetkikler: ["Tedavi denemesi (PPI)", "Gastroskopi (kırmızı bayrak/dirençli)"] },
    ]
  },

  "Dispne": {
    aciklama: "Akut nefes darlığında ayırıcı tanı. Solunum, kardiyak, anemi, metabolik nedenler.",
    tanilar: [
      { tani: "Akut Akciğer Ödemi", alt: "Kardiyojenik", aciliyet: "kirmizi",
        destekleyen: ["Yatınca artan dispne (ortopne), PND", "Bilateral ral", "S3, JVD, pretibial ödem", "Pembe köpüklü balgam", "KKY öyküsü"],
        bayraklar: ["Hipotansiyon + akut akciğer ödemi (kardiyojenik şok)"],
        tetkikler: ["EKG", "Troponin", "BNP / NT-proBNP", "AC grafi", "EKO", "Akciğer USG (B-line)"] },
      { tani: "Pulmoner Emboli", alt: "Akut", aciliyet: "kirmizi",
        destekleyen: ["Akut dispne + plöritik ağrı", "Taşikardi, taşipne", "DVT bulgusu", "Risk faktörleri"],
        bayraklar: ["Hipotansiyon + sağ kalp gerilimi"],
        tetkikler: ["Wells, D-dimer", "BT pulmoner anjiyo", "EKO"] },
      { tani: "Astım Atağı", alt: "Hafif / orta / ciddi / hayatı tehdit", aciliyet: "turuncu",
        destekleyen: ["Hışıltı, ekspiryum uzaması", "Astım öyküsü", "Tetikleyici (alerjen, viral, egzersiz)", "Reliever kullanımına yanıt"],
        bayraklar: ["Sessiz akciğer", "Bilinç değişikliği", "PEF < %50", "Konuşamama"],
        tetkikler: ["PEF", "Kan gazı (ağır atak)", "AC grafi (komplikasyon şüphesi)"] },
      { tani: "KOAH Alevlenmesi", alt: "Anthonisen tip 1-3", aciliyet: "turuncu",
        destekleyen: ["Bilinen KOAH + dispne artışı", "Balgam miktar/renk değişikliği", "Hışıltı, uzun ekspiryum"],
        bayraklar: ["Bilinç değişikliği (CO₂ retansiyonu)", "Siyanoz", "Asidoz pH < 7.35"],
        tetkikler: ["Kan gazı", "AC grafi", "EKG", "Eosinofil (steroid yanıt)"] },
      { tani: "Pnömoni", alt: "Toplum / hastane / aspirasyon", aciliyet: "turuncu",
        destekleyen: ["Ateş, öksürük, pürülan balgam", "Plöritik ağrı", "Lokalize ral, krepitasyon"],
        bayraklar: ["Sepsis kriterleri (qSOFA ≥2)", "Multilober tutulum", "Hipoksi"],
        tetkikler: ["AC grafi", "CRP, prokalsitonin", "Kan/balgam kültürü", "Akciğer USG"],
        skor: "CURB-65, PSI" },
      { tani: "Pnömotoraks (Spontan / Travmatik)", alt: "Tek taraflı", aciliyet: "turuncu",
        destekleyen: ["Ani başlangıç", "Hiperrezonans, azalmış solunum sesi"],
        bayraklar: ["Tansiyon pnömotoraks (hipotansiyon, trakea deviasyonu)"],
        tetkikler: ["AC grafi (ekspirasyon)", "Akciğer USG (no-lung-sliding)"] },
      { tani: "Anafilaksi", alt: "Sistemik allerjik reaksiyon", aciliyet: "kirmizi",
        destekleyen: ["Akut başlangıç + cilt belirtileri (ürtiker, anjiyoödem)", "Hipotansiyon, taşikardi", "Stridor, hışıltı", "GİS belirtileri"],
        bayraklar: ["Hipotansiyon", "Stridor", "Bilinç kaybı"],
        tetkikler: ["Klinik tanı — adrenalin geciktirme!", "Triptaz (24 saat)"] },
      { tani: "Metabolik Asidoz (Kompanzasyon)", alt: "DKA, üremi, intoks.", aciliyet: "turuncu",
        destekleyen: ["Kussmaul solunum", "DM, kronik böbrek hastalığı, ilaç/madde alımı"],
        bayraklar: ["Bilinç değişikliği", "Hemodinamik instabilite"],
        tetkikler: ["Kan gazı", "Anion gap", "Glikoz, keton, laktat", "Toksik alkol şüphesi → osmolar gap"] },
    ]
  },

  "Karın Ağrısı": {
    aciklama: "Akut karın ağrısında ayırıcı tanı. Lokalizasyon, karakter, eşlik eden bulgulara göre.",
    tanilar: [
      { tani: "Akut Apandisit", alt: "Komplike / komplike olmayan", aciliyet: "turuncu",
        destekleyen: ["Periumbilikal ağrı → sağ alt kadrana göçme", "Anoreksi, bulantı, kusma", "Sağ alt kadran rebound, McBurney hassasiyeti", "Düşük dereceli ateş"],
        bayraklar: ["Yaygın peritoneal bulgu (perforasyon)", "Yüksek ateş + toksisite"],
        tetkikler: ["WBC, CRP", "USG (özellikle çocuk/genç kadın)", "Abdomen BT (yetişkin)"],
        skor: "Alvarado, RIPASA" },
      { tani: "Akut Kolesistit / Safra Yolu", alt: "Taşlı / akalküloz", aciliyet: "turuncu",
        destekleyen: ["Sağ üst kadran ağrı, omuza yayılım", "Yağlı yemek tetikleyici", "Murphy bulgusu (+)", "Ateş, lökositoz"],
        bayraklar: ["Sarılık + ateş + ağrı (Charcot — kolanjit) → sepsis"],
        tetkikler: ["USG hepatobiliyer", "AST/ALT, ALP, GGT, bilirubin", "Lipaz (pankreatit ayırımı)"] },
      { tani: "Akut Pankreatit", alt: "Biliyer / alkolik / ilaç", aciliyet: "turuncu",
        destekleyen: ["Üst karın, sırta yayılan, sürekli şiddetli ağrı", "Bulantı, kusma", "Alkol/safra taşı/ERCP öyküsü"],
        bayraklar: ["BUN > 25 / kreatinin yükselmesi", "Hematokrit > %44", "Cullen / Grey-Turner bulgusu (hemorajik)"],
        tetkikler: ["Lipaz (3× ÜSL)", "Trigliserit", "USG → BT 48-72 saat", "Ranson, BISAP, APACHE-II"] },
      { tani: "Bağırsak Tıkanıklığı", alt: "İnce / kalın bağırsak", aciliyet: "turuncu",
        destekleyen: ["Kramp tarzı ağrı, distansiyon", "Kusma (proksimal: erken, distal: geç)", "Konstipasyon, gaz çıkaramama", "Önceki cerrahi öyküsü, herni"],
        bayraklar: ["Strangülasyon: persistan ağrı, ateş, taşikardi, peritonit", "Laktat yüksekliği"],
        tetkikler: ["Ayakta direkt karın grafisi (hava-sıvı seviyeleri)", "BT abdomen (geçiş noktası)"] },
      { tani: "Mezenter İskemi", alt: "Akut arteryel / venöz / nonokluzif", aciliyet: "kirmizi",
        destekleyen: ["Yaşlı + AF / vasküler hastalık + 'pain out of proportion'", "Postprandial ağrı öyküsü (kronik)", "Erken muayene bulgusu az → geç tablo peritonit"],
        bayraklar: ["Laktat yüksek", "Metabolik asidoz", "Hemodinamik instabilite"],
        tetkikler: ["BT angio (mezenter)", "Laktat", "Acil cerrahi/girişimsel radyoloji konsültasyonu"] },
      { tani: "Peptik Ülser Perforasyonu", alt: "Peritonit", aciliyet: "kirmizi",
        destekleyen: ["Ani başlayan şiddetli üst karın ağrısı", "Tahta sertliği, defans, rebound", "NSAID, H. pylori öyküsü"],
        bayraklar: ["Diafram altı serbest hava", "Septik şok"],
        tetkikler: ["Ayakta direkt karın / akciğer grafisi", "BT abdomen", "Acil genel cerrahi"] },
      { tani: "Aort Anevrizma Yırtılması", alt: "AAA rüptürü", aciliyet: "kirmizi",
        destekleyen: ["Yaşlı erkek, sigara öyküsü", "Pulsatil karın kitlesi", "Sırt/yan ağrısı + senkop", "Hipotansiyon"],
        bayraklar: ["Hemodinamik instabilite + karın ağrısı = aksi kanıtlanana kadar AAA"],
        tetkikler: ["Yatakbaşı USG", "BT angio (stabil hastada)", "Acil damar cerrahisi"] },
      { tani: "Dış Gebelik", alt: "Reprodüktif yaş kadın", aciliyet: "kirmizi",
        destekleyen: ["Adet gecikmesi, vajinal kanama", "Yan / alt karın ağrısı", "Pelvik hassasiyet"],
        bayraklar: ["Hipotansiyon + hemoperitoneum (rüptür)"],
        tetkikler: ["β-hCG kantitatif", "TVUSG", "Kadın doğum konsültasyonu"] },
      { tani: "Renal Kolik", alt: "Üreter taşı", aciliyet: "sari",
        destekleyen: ["Yan ağrı, inguinal/testiküler yayılım", "Kıvranma (kolik)", "Hematüri (mikroskopik/makroskopik)", "Bulantı, kusma"],
        bayraklar: ["Ateş + titreme = ürosepsis (acil dekompresyon)"],
        tetkikler: ["İdrar tetkiki", "USG / BT (taşa özel düşük doz)", "STONE skoru"] },
    ]
  },

  "Senkop": {
    aciklama: "Geçici bilinç kaybı. Kardiyak nedenler (en tehlikeli) önce dışlanır.",
    tanilar: [
      { tani: "Vazovagal Senkop", alt: "Refleks senkopu", aciliyet: "yesil",
        destekleyen: ["Tetikleyici (uzun ayakta durma, ağrı, kalkış, sıcak ortam)", "Prodromal solukluk, terleme, bulantı", "Hızlı toparlanma"],
        bayraklar: ["Uzun postiktal konfüzyon yok", "Aritmi/iskemi şüphesi yok"],
        tetkikler: ["Klinik tanı + EKG (kardiyak ekarte)", "Tilt-table (atipik)"] },
      { tani: "Aritmi (Bradi/Taşi)", alt: "VT, SVT, AV blok, hasta sinüs", aciliyet: "kirmizi",
        destekleyen: ["Çarpıntı önce, sonra senkop", "Aurasız ani senkop", "Yaşlı, kalp hastalığı öyküsü", "Aile öyküsü ani ölüm"],
        bayraklar: ["Egzersiz sırasında senkop", "EKG anormallikleri", "Yapısal kalp hastalığı"],
        tetkikler: ["EKG (acil)", "Telemetri", "Holter / event recorder", "Elektrofizyoloji"] },
      { tani: "Pulmoner Emboli", alt: "Senkopla başvuru (~%10)", aciliyet: "kirmizi",
        destekleyen: ["Senkop + dispne", "DVT belirtisi", "Risk faktörleri"],
        bayraklar: ["Hipotansiyon", "Sağ kalp gerilimi"],
        tetkikler: ["Wells, D-dimer, BT angio"] },
      { tani: "Aort Stenozu (Ciddi)", alt: "Yapısal kalp hastalığı", aciliyet: "turuncu",
        destekleyen: ["Egzersizle senkop", "Sistolik üfürüm (sağ üst sternal kenar, karotise yayılım)", "Yaşlı"],
        bayraklar: ["Triada (anjina, dispne, senkop)"],
        tetkikler: ["EKO acil", "Kardiyoloji"] },
      { tani: "Aort Diseksiyonu", alt: "Karotid yayılım", aciliyet: "kirmizi",
        destekleyen: ["Senkop + sırt/göğüs ağrısı", "Asimetrik nabız/KB"],
        bayraklar: ["Nörolojik defisit eşliği"],
        tetkikler: ["BT angio toraks-abdomen"] },
      { tani: "Subaraknoid Kanama", alt: "Anevrizma rüptürü", aciliyet: "kirmizi",
        destekleyen: ["Yıldırım baş ağrısı + senkop", "Ense sertliği, fotofobi"],
        bayraklar: ["Bilinç değişikliği", "Fokal nörolojik defisit"],
        tetkikler: ["Acil BT (kontrastsız)", "LP (BT negatifse)"] },
      { tani: "Ortostatik Hipotansiyon", alt: "Volüm/ilaç/otonom", aciliyet: "sari",
        destekleyen: ["Pozisyon değişikliği ile senkop", "Yaşlı", "Antihipertansif, diüretik, alfa bloker"],
        bayraklar: ["Volüm kaybı (kanama, GİS sıvı kaybı)"],
        tetkikler: ["Yatış-ayakta KB ölçümü (3 dk)", "Hb, glikoz, elektrolit"] },
      { tani: "Hipoglisemi", alt: "İnsülin/oral antidiyabetik", aciliyet: "turuncu",
        destekleyen: ["DM + senkop", "Tremor, terleme, açlık (yoksa hızlı koma)"],
        bayraklar: ["Bilinç tamamen geri dönmez (sürekli verme gerekebilir)"],
        tetkikler: ["Parmak ucu glikoz", "İVD glikoz tedavi tanı koyar"] },
    ]
  },

  "İnme/SVO": {
    aciklama: "Akut nörolojik defisit. İskemik vs. hemorajik, taklit edenler.",
    tanilar: [
      { tani: "Akut İskemik İnme", alt: "Tromboz / emboli / lakuner", aciliyet: "kirmizi",
        destekleyen: ["Ani başlayan fokal defisit", "FAST + (yüz / kol / konuşma)", "AF, AKS, vasküler risk faktörleri"],
        bayraklar: ["Trombolitik penceresi (≤4.5 sa)", "LVO → trombektomi 24 sa'a kadar"],
        tetkikler: ["NIHSS", "BT (kanama ekarte)", "BT angio + perfüzyon", "Kan glikoz (hipoglisemi taklit)"],
        skor: "NIHSS, ABCD² (TIA)" },
      { tani: "İntraserebral Kanama (ICH)", alt: "HT'ye bağlı en sık", aciliyet: "kirmizi",
        destekleyen: ["Kontrolsüz HT öyküsü", "Akut başlangıç + baş ağrısı, kusma", "Bilinç değişikliği"],
        bayraklar: ["GKS düşüklüğü", "Hematom genişlemesi"],
        tetkikler: ["Acil BT (kontrastsız)", "BT angio (anevrizma şüphesi)"],
        skor: "ICH skoru" },
      { tani: "Subaraknoid Kanama", alt: "Anevrizma rüptürü", aciliyet: "kirmizi",
        destekleyen: ["Yıldırım baş ağrısı (\"life of life\")", "Ense sertliği, fotofobi", "Bilinç değişikliği"],
        bayraklar: ["Hunt-Hess sınıflama"],
        tetkikler: ["BT (ilk 6 sa: %95 duyarlılık)", "BT negatif → LP (ksantokromi)", "BT angio"] },
      { tani: "Geçici İskemik Atak (TIA)", alt: "Geçici nörolojik defisit", aciliyet: "turuncu",
        destekleyen: ["Defisit < 24 saat", "FAST belirtisi geçici", "Vasküler risk"],
        bayraklar: ["ABCD² ≥ 4 → 7 gün inme riski yüksek"],
        tetkikler: ["BT/MR", "Karotid USG / MRA", "Kardiyak (AF, EKO)"],
        skor: "ABCD²" },
      { tani: "İnme Taklit Edenler", alt: "Stroke mimics", aciliyet: "turuncu",
        destekleyen: ["Hipoglisemi, hiperglisemi", "Konvülsiyon postiktal Todd parezi", "Migrenle ilgili", "Konversiyon", "Hiponatremi"],
        bayraklar: ["Tedaviyi gecikertmemek için hızlı dışla"],
        tetkikler: ["Glikoz, elektrolit", "EKG", "MRG (yapısal/iskemik ayırım)"] },
      { tani: "Posterior Sirkülasyon İnmesi", alt: "Vertebrobasiler", aciliyet: "kirmizi",
        destekleyen: ["Vertigo, ataksi, dizartri, dipopli, görme bozukluğu", "FAST sıklıkla negatif"],
        bayraklar: ["HINTS muayenesi: santral patern (test pozitif → BT angio)"],
        tetkikler: ["BT angio + perfüzyon (sınırlı)", "MR diffüzyon (kesin tanı)"] },
      { tani: "Serebral Venöz Sinüs Trombozu", alt: "CVST", aciliyet: "turuncu",
        destekleyen: ["Genç kadın + OKS / postpartum", "Subakut baş ağrısı, papilödem", "Konvülsiyon, defisit"],
        bayraklar: ["Bilinç değişikliği"],
        tetkikler: ["MR venografi", "BT venografi"] },
    ]
  },

  "Baş Ağrısı": {
    aciklama: "Akut/yeni baş ağrısı. SNOOP kırmızı bayraklarına dikkat.",
    tanilar: [
      { tani: "Subaraknoid Kanama", alt: "SAH", aciliyet: "kirmizi",
        destekleyen: ["Yıldırım başlangıç (saniyeler içinde maksimum)", "\"Hayatımın en kötü baş ağrısı\"", "Ense sertliği, kusma, bilinç değişikliği"],
        bayraklar: ["Sentinel kanama öyküsü"],
        tetkikler: ["BT (ilk 6 sa: %95)", "LP (ksantokromi)", "BT angio (anevrizma)"],
        skor: "Ottawa SAH kuralı" },
      { tani: "Bakteriyel Menenjit", alt: "Pnömokok, meningokok", aciliyet: "kirmizi",
        destekleyen: ["Ateş + ense sertliği + bilinç değ. + baş ağrısı (klasik tetrad)", "Peteşi/purpura (meningokok)", "Kernig / Brudzinski (+)"],
        bayraklar: ["Sepsis kriterleri", "Bilinç GKS < 13"],
        tetkikler: ["Kan kültürü", "BT (LP öncesi seçilmiş hasta)", "LP (acil)", "Antibiyotik gecikmemeli — empirik başla"] },
      { tani: "Dev Hücreli Arterit", alt: "Temporal arterit", aciliyet: "turuncu",
        destekleyen: ["≥50 yaş", "Yeni temporal baş ağrısı", "Çene kladikasyon", "Görme bozukluğu (PMR eşliği)"],
        bayraklar: ["Görme kaybı (geri dönüşsüz iskemik nöropati)"],
        tetkikler: ["ESH > 50, CRP yüksek", "Temporal arter biyopsisi", "Yüksek doz kortikosteroid (biyopsi beklerken)"] },
      { tani: "İdiyopatik İntrakraniyal Hipertansiyon", alt: "Pseudotümör serebri", aciliyet: "turuncu",
        destekleyen: ["Genç obez kadın", "Postural baş ağrısı, sabah daha kötü", "Görme bozuklukları", "Pulsatil tinnitus", "Papilödem"],
        bayraklar: ["Görme kaybı"],
        tetkikler: ["MR + MRV (CVST ekarte)", "LP (açılış basıncı > 25 cm H₂O)"] },
      { tani: "Migren / Cluster", alt: "Primer baş ağrısı", aciliyet: "yesil",
        destekleyen: ["Tekrarlayıcı atak öyküsü", "Migren: tek taraflı zonklayıcı + foto/fonofobi + bulantı", "Cluster: tek taraflı ağrı + otonomik bulgular"],
        bayraklar: ["Yeni karakter / kötüleşme = SNOOP düşün"],
        tetkikler: ["Klinik tanı (kırmızı bayrak yoksa)"] },
      { tani: "Servisikojenik / Gerginlik Tipi", alt: "Muskuloskeletal", aciliyet: "yesil",
        destekleyen: ["Bilateral, baskı tarzı, hafif-orta şiddet", "Stres / pozisyon tetikleyici", "Servikal hassasiyet"],
        bayraklar: ["Atipik özellikler → diğer tanıları dışla"],
        tetkikler: ["Klinik"] },
      { tani: "Karbonmonoksit Zehirlenmesi", alt: "Sıklıkla atlanır", aciliyet: "turuncu",
        destekleyen: ["Birden fazla kişide aynı semptom", "Soba/şofben kullanımı", "Baş ağrısı + bulantı + halsizlik"],
        bayraklar: ["Bilinç değişikliği", "Kardiyak iskemi"],
        tetkikler: ["COHb (>5% sigara içmeyen, >10% içici)", "%100 O₂ tedavisi"] },
    ]
  },

  "Konvülsiyon": {
    aciklama: "Yeni veya tekrarlayıcı nöbet. Provokatif vs. unprovokatif.",
    tanilar: [
      { tani: "Status Epileptikus", alt: "≥5 dk veya arka arkaya bilinç dönmeden", aciliyet: "kirmizi",
        destekleyen: ["Sürekli nöbet aktivitesi", "Bilinç dönüşü yok"],
        bayraklar: ["Hayati tehlike — ilk 5 dk içinde tedaviye başla"],
        tetkikler: ["Glikoz, elektrolit, kan gazı", "İlk basamak: benzodiyazepin", "EEG (NCSE şüphesi)", "BT/MR (yapısal)"] },
      { tani: "İlk Kez Geçirilen Nöbet", alt: "Yeni başlangıçlı epilepsi şüphesi", aciliyet: "turuncu",
        destekleyen: ["Hiç nöbet öyküsü yok", "Postiktal dönem var"],
        bayraklar: ["Yapısal lezyon, enfeksiyon, metabolik tetikleyici"],
        tetkikler: ["BT acil (kanama, kitle)", "MR (sonra)", "EEG", "Lab: glikoz, Na, Ca, Mg, üre, alkol/ilaç"] },
      { tani: "Bilinen Epilepsi + Atak", alt: "AED uyumsuzluğu / tetikleyici", aciliyet: "sari",
        destekleyen: ["Bilinen tanı", "AED düzeyi düşük", "Uyku yoksunluğu, alkol, infeksiyon"],
        bayraklar: ["Atak özellikleri değişmiş", "Status'a ilerleme"],
        tetkikler: ["AED düzeyi", "İnfeksiyon arama"] },
      { tani: "Provokatif Nöbet", alt: "Hipoglisemi, hiponatremi, üremi, alkol çekilmesi, ilaç toksisitesi", aciliyet: "turuncu",
        destekleyen: ["Tetikleyici öykü"],
        bayraklar: ["Tetikleyici düzeltilmezse tekrarlar"],
        tetkikler: ["Metabolik panel", "Toksikoloji"] },
      { tani: "Eklampsi", alt: "Gebe / postpartum (≤6 hf)", aciliyet: "kirmizi",
        destekleyen: ["20+ haftalık gebe veya postpartum + nöbet", "Preeklampsi öyküsü"],
        bayraklar: ["Anne ve fetus için hayati tehdit"],
        tetkikler: ["MgSO₄ tedavi tanı koyar", "KB kontrolü", "Kadın doğum"] },
      { tani: "Psikojen Non-Epileptik Atak", alt: "PNES", aciliyet: "yesil",
        destekleyen: ["Senkron olmayan hareketler", "Pelvik thrust", "Açık gözler ile direnme", "Postiktal hızlı toparlanma", "Stres tetikleyici"],
        bayraklar: ["Gerçek nöbet ile aynı anda olabilir"],
        tetkikler: ["Video-EEG (kesin tanı)"] },
      { tani: "Sinkop (Konvülsif)", alt: "Senkop sırasında miyoklonus", aciliyet: "sari",
        destekleyen: ["Kısa süreli (<1 dk) miyoklonus + senkop", "Postiktal konfüzyon yok / minimal"],
        bayraklar: ["Kardiyak senkop ekarte edilmeli"],
        tetkikler: ["EKG", "Senkop algoritması"] },
    ]
  },

  "Bilinç Değişikliği": {
    aciklama: "Akut konfüzyon, letarji, koma. AEIOU-TIPS yaklaşımı.",
    tanilar: [
      { tani: "Hipoglisemi", alt: "Kolayca dışlanan, hızlı düzelir", aciliyet: "kirmizi",
        destekleyen: ["DM + ilaç", "Adrenerjik bulgular yoksa hızlı koma"],
        bayraklar: ["Beyin hasarı önlemek için hızlı tedavi"],
        tetkikler: ["Kapiller glikoz", "İVD glikoz tedavi tanı koyar"] },
      { tani: "Sepsis Ensefalopatisi", alt: "Enfeksiyon kaynaklı", aciliyet: "kirmizi",
        destekleyen: ["Yaşlı + enfeksiyon odağı", "Ateş veya hipotermi", "qSOFA ≥2"],
        bayraklar: ["MAP düşüklüğü", "Laktat yüksek"],
        tetkikler: ["1-saat sepsis bundle", "Kaynak araştırma"] },
      { tani: "Toksik Metabolik", alt: "Üremi, hepatik, hiponatremi, hiperkalsemi, B12, tiroid", aciliyet: "turuncu",
        destekleyen: ["Kronik hastalık öyküsü", "Subakut başlangıç"],
        bayraklar: ["Şiddetli hiponatremi (Na < 120) — konvülsiyon riski"],
        tetkikler: ["Tam metabolik panel", "Amonyak", "TSH, B12", "Toksikoloji"] },
      { tani: "İlaç / Madde", alt: "Sedatif, opioid, antikolinerjik, sempatomimetik", aciliyet: "turuncu",
        destekleyen: ["Toxidrome bulguları", "Polifarmasi, yaşlı"],
        bayraklar: ["Solunum baskısı", "Aritmi"],
        tetkikler: ["Toksikoloji paneli", "Antidot (nalokson, flumazenil seçilmiş)"] },
      { tani: "İntrakraniyal Olay", alt: "İnme, kanama, kitle, abse, menenjit", aciliyet: "kirmizi",
        destekleyen: ["Fokal nörolojik defisit", "Travma öyküsü", "Ateş + ense sertliği"],
        bayraklar: ["Pupiller değişiklik (uncal herniasyon)"],
        tetkikler: ["BT acil", "LP (BT sonrası)"] },
      { tani: "Wernicke Ensefalopatisi", alt: "Tiamin eksikliği", aciliyet: "turuncu",
        destekleyen: ["Alkol kullanımı, malnütrisyon", "Triad: ataksi + oftalmopleji + konfüzyon (sıklıkla eksik)"],
        bayraklar: ["Tiamin verilmeden glikoz Wernicke'yi kötüleştirebilir"],
        tetkikler: ["Klinik tanı — empirik IV tiamin 200-500 mg"] },
      { tani: "Status Epileptikus (NCSE)", alt: "Konvülsif olmayan", aciliyet: "kirmizi",
        destekleyen: ["Nöbet öyküsü olan hastada uzamış konfüzyon", "Subtle motor (göz, ağız)"],
        bayraklar: ["EEG ile tanı"],
        tetkikler: ["EEG acil", "Empirik benzodiyazepin"] },
    ]
  },

  "Multitravma": {
    aciklama: "ATLS prensiplerine göre primer ve sekonder bakı. Hayati yaralanmalar.",
    tanilar: [
      { tani: "Tansiyon Pnömotoraks", alt: "Acil iğne dekompresyonu", aciliyet: "kirmizi",
        destekleyen: ["Tek taraflı solunum sesi azlığı", "Hiperrezonans", "Trakea deviasyonu", "JVD, hipotansiyon"],
        bayraklar: ["Klinik tanı — görüntüleme bekleme"],
        tetkikler: ["Klinik + acil dekompresyon (5. interkostal aralık AAL)"] },
      { tani: "Masif Hemotoraks", alt: "Göğüs tüpü endikasyonu", aciliyet: "kirmizi",
        destekleyen: ["Tek taraflı solunum sesi azlığı + matite", "Şok bulgusu"],
        bayraklar: [">1500 mL akut veya >200 mL/saat → cerrahi"],
        tetkikler: ["AC grafi, eFAST", "Göğüs tüpü", "Cerrahi konsültasyon"] },
      { tani: "Perikardiyal Tamponad", alt: "Penetran travmada özellikle", aciliyet: "kirmizi",
        destekleyen: ["Beck triadı (hipotansiyon + JVD + boğuk kalp sesleri)", "Pulsus paradoksus"],
        bayraklar: ["Hızlı kötüleşme"],
        tetkikler: ["eFAST (perikardiyal sıvı)", "Acil perikardiosentez / cerrahi"] },
      { tani: "Açık Pnömotoraks (Sucking Chest Wound)", alt: "Penetran göğüs", aciliyet: "kirmizi",
        destekleyen: ["Göğüs duvarı defekti", "Hava giriş-çıkışı"],
        bayraklar: ["Tansiyon pnömotoraksa dönüşebilir"],
        tetkikler: ["3 taraflı kapama → göğüs tüpü"] },
      { tani: "Flail Göğüs", alt: "Multipl kostal kırık", aciliyet: "turuncu",
        destekleyen: ["Paradoksal göğüs duvarı hareketi", "Solunum yetmezliği eğilimi"],
        bayraklar: ["Pulmoner kontüzyon eşliği"],
        tetkikler: ["AC grafi, BT", "Pozitif basınçlı ventilasyon eşiği düşük"] },
      { tani: "İntra-abdominal Hemoraji", alt: "Künt / penetran", aciliyet: "kirmizi",
        destekleyen: ["Karın hassasiyeti, distansiyon", "Şok bulgusu", "Yüksek enerji travma"],
        bayraklar: ["Hipotansiyon + (+) FAST → laparotomi"],
        tetkikler: ["eFAST", "BT (stabil hasta)", "DPL (selektif)"] },
      { tani: "Pelvik Kırık + Kanama", alt: "Hayati kanama kaynağı", aciliyet: "kirmizi",
        destekleyen: ["Pelvik instabilite", "Yüksek enerji"],
        bayraklar: ["Açık kitap kırık → masif retroperitoneal kanama"],
        tetkikler: ["Pelvik bağ", "BT angio", "Damar girişimsel rad."] },
      { tani: "Travmatik Beyin Hasarı", alt: "Hafif / orta / ciddi", aciliyet: "kirmizi",
        destekleyen: ["GKS düşüklüğü", "Lokalize defisit", "Pupiller anormallik", "Battle / raccoon eyes"],
        bayraklar: ["Cushing triad — hertz", "Anizokori", "GKS düşüşü"],
        tetkikler: ["Kafa BT", "ICP yönetimi", "Nöroşir konsültasyon"] },
      { tani: "Spinal Kord Yaralanması", alt: "Komplet / inkomplet", aciliyet: "kirmizi",
        destekleyen: ["Bilateral motor/duyu defisiti", "Nörojenik şok (hipotansiyon + bradikardi)"],
        bayraklar: ["Servikal stabilizasyon", "Solunum yetmezliği (yüksek lezyon)"],
        tetkikler: ["NEXUS / Canadian C-spine", "BT C-spine", "MR (yumuşak doku)"] },
    ]
  },

  "Renal Kolik": {
    aciklama: "Üreter taşı ayırıcı tanısı + ürosepsis riski.",
    tanilar: [
      { tani: "Üreter Taşı (Klasik)", alt: "Proksimal / mid / distal", aciliyet: "sari",
        destekleyen: ["Yan ağrı, inguinal/testiküler yayılım", "Kıvranma", "Hematüri", "Bulantı, kusma"],
        bayraklar: ["Ateş + titreme = ürosepsis", "Tek böbrek / nakli + obstrüksiyon"],
        tetkikler: ["İdrar tetkiki", "USG / düşük doz BT", "Kreatinin"],
        skor: "STONE" },
      { tani: "AAA Rüptürü", alt: "Renal kolik taklidi", aciliyet: "kirmizi",
        destekleyen: ["Yaşlı erkek + yan ağrı", "Pulsatil kitle", "Hipotansiyon"],
        bayraklar: ["İlk başvuru renal kolik gibi olabilir — yaşa bakın"],
        tetkikler: ["Yatakbaşı USG", "BT angio"] },
      { tani: "Akut Pyelonefrit", alt: "Üst ÜSE", aciliyet: "turuncu",
        destekleyen: ["Yan ağrı + ateş + dizüri", "KVA hassasiyet", "Lökositüri, nitrit (+)"],
        bayraklar: ["Sepsis", "Komplike (DM, gebelik, taş)"],
        tetkikler: ["İdrar kültürü", "Kan kültürü (sepsis şüphesi)"] },
      { tani: "Testis Torsiyonu", alt: "Genç erkek", aciliyet: "kirmizi",
        destekleyen: ["Ani başlangıç skrotal ağrı + bulantı", "Yüksek konumlu testis", "Kremaster refleksi yok"],
        bayraklar: ["6 saat içinde detorsion"],
        tetkikler: ["Doppler USG", "Acil üroloji"] },
      { tani: "Apandisit / Yan Apandisit", alt: "Atipik lokalizasyon", aciliyet: "turuncu",
        destekleyen: ["Sağ tarafta + yan ağrı + lökositoz"],
        bayraklar: ["Atipik prezentasyon"],
        tetkikler: ["BT abdomen"] },
      { tani: "Ektopik Gebelik (Rüptüre)", alt: "Reprodüktif yaş kadın", aciliyet: "kirmizi",
        destekleyen: ["Yan ağrı + kanama + adet gecikmesi"],
        bayraklar: ["Hemoperitoneum"],
        tetkikler: ["β-hCG", "TVUSG"] },
    ]
  },

  "Anafilaksi": {
    aciklama: "Sistemik allerjik reaksiyon. Adrenalin geciktirme.",
    tanilar: [
      { tani: "Anafilaksi (Sertifika Tanısı)", alt: "NIAID/FAAN kriterleri", aciliyet: "kirmizi",
        destekleyen: ["Akut başlangıç + cilt belirtileri + (solunum / KB / GİS)", "Bilinen allerjen + 2 sistem", "Bilinen allerjen + hipotansiyon"],
        bayraklar: ["Stridor / wheezing", "Hipotansiyon", "Bilinç değişikliği"],
        tetkikler: ["Klinik tanı — adrenalin IM (vastus lateralis)", "Triptaz (15 dk-3 saat)"],
        skor: "Sampson grade" },
      { tani: "Anjiyoödem (ACE-İ / Herediter)", alt: "Bradikinin aracılı", aciliyet: "turuncu",
        destekleyen: ["Yüz, dil, larinks ödemi", "Ürtiker yok", "ACE-İ kullanımı veya HAE öyküsü"],
        bayraklar: ["Hava yolu tıkanıklığı"],
        tetkikler: ["Adrenaline kısmen yanıt", "C1-INH eksikliği (HAE)", "Icatibant / TDP"] },
      { tani: "Vazovagal", alt: "Senkop benzeri", aciliyet: "yesil",
        destekleyen: ["Tetikleyici sonrası bayılma", "Bradikardi + hipotansiyon", "Cilt belirtisi yok"],
        bayraklar: ["Anafilaksiye benzeyebilir"],
        tetkikler: ["Klinik"] },
      { tani: "Astım Atağı", alt: "İzole solunum", aciliyet: "turuncu",
        destekleyen: ["Hışıltı, ekspiryum uzaması", "Cilt/GİS yok", "Astım öyküsü"],
        bayraklar: ["Anafilaksinin bir bileşeni de olabilir"],
        tetkikler: ["PEF, kan gazı"] },
      { tani: "Skombroid Zehirlenmesi", alt: "Histamin benzeri", aciliyet: "sari",
        destekleyen: ["Kötü saklanan balık tüketimi", "Histamin benzeri belirtiler", "Aynı yemekten yiyenler benzer şikayet"],
        bayraklar: ["Genelde kendini sınırlar"],
        tetkikler: ["H1 antihistaminik"] },
    ]
  },

  "Sepsis": {
    aciklama: "Şüpheli enfeksiyon + organ disfonksiyonu. Kaynak ve şiddet.",
    tanilar: [
      { tani: "Septik Şok", alt: "Vazopressör + laktat ≥2", aciliyet: "kirmizi",
        destekleyen: ["MAP <65 sıvıya rağmen", "Laktat ≥2 mmol/L", "Kaynak şüphesi"],
        bayraklar: ["Hayati tehdit"],
        tetkikler: ["1-saat bundle", "Laktat seri", "Vazopressör (norepinefrin)"],
        skor: "qSOFA, SOFA, NEWS2" },
      { tani: "Pnömoni Kaynaklı", alt: "Toplum / hastane / aspirasyon", aciliyet: "turuncu",
        destekleyen: ["Öksürük + balgam + ateş", "Lokalize ral", "Konsolidasyon (radyoloji)"],
        bayraklar: ["Multilober tutulum", "CURB-65 ≥3"],
        tetkikler: ["AC grafi, BT", "Balgam/kan kültürü"],
        skor: "CURB-65" },
      { tani: "Ürosepsis", alt: "Üst ÜSE / obstrüktif", aciliyet: "kirmizi",
        destekleyen: ["KVA hassasiyet", "Dizüri, sık idrar", "İdrar tetkiki pozitif"],
        bayraklar: ["Obstrüksiyon → acil dekompresyon"],
        tetkikler: ["İdrar/kan kültürü", "USG / BT (obstrüksiyon)"] },
      { tani: "İntra-abdominal Sepsis", alt: "Perforasyon, kolesistit, kolanjit, divertikülit", aciliyet: "kirmizi",
        destekleyen: ["Karın ağrısı + ateş", "Peritonit bulgusu"],
        bayraklar: ["Charcot triadı (kolanjit)"],
        tetkikler: ["BT abdomen + IV kontrast", "Cerrahi konsültasyon"] },
      { tani: "Yumuşak Doku Enfeksiyonu", alt: "Selülit / fasiit", aciliyet: "turuncu",
        destekleyen: ["Eritem, sıcaklık, hassasiyet", "Diyabetik ayak / venöz ülser"],
        bayraklar: ["Nekrotizan fasiit: bül, krepitasyon, orantısız ağrı, hızlı yayılım"],
        tetkikler: ["LRINEC skoru", "BT/MR", "Acil cerrahi debridman"] },
      { tani: "Menenjit", alt: "Bakteriyel acil", aciliyet: "kirmizi",
        destekleyen: ["Ateş + ense sertliği + bilinç değ. + baş ağrısı", "Peteşi (meningokok)"],
        bayraklar: ["Empirik antibiyotik gecikmemeli"],
        tetkikler: ["Kan kültürü", "BT → LP (seçilmiş)", "Empirik tedavi"] },
      { tani: "Nötropenik Ateş", alt: "Hemato-onkoloji", aciliyet: "kirmizi",
        destekleyen: ["Kemoterapi sonrası", "ANC < 500", "Tek ölçüm ≥38.3°C veya ≥38°C ≥1 saat"],
        bayraklar: ["1 saat içinde geniş spektrumlu antibiyotik"],
        tetkikler: ["Kan kültürü", "Empirik antipsödomonal"] },
    ]
  },

  "Aritmi": {
    aciklama: "Çarpıntı, taşi/bradi aritmiler. Stabilite öncelikli.",
    tanilar: [
      { tani: "Atriyal Fibrilasyon", alt: "Hızlı ventrikül yanıtlı", aciliyet: "turuncu",
        destekleyen: ["Düzensiz ritim, P dalgası yok", "Çarpıntı, dispne, halsizlik", "AF risk faktörleri"],
        bayraklar: ["Ön-eksitasyonlu AF (geniş QRS, düzensiz)"],
        tetkikler: ["EKG", "TSH, elektrolit", "EKO"],
        skor: "CHA₂DS₂-VASc, HAS-BLED" },
      { tani: "Supraventriküler Taşikardi (SVT)", alt: "AVNRT, AVRT", aciliyet: "turuncu",
        destekleyen: ["Düzenli dar QRS, hız 150-250", "Ani başlangıç, ani sonlanım"],
        bayraklar: ["Stabilse vagal manevra → adenozin"],
        tetkikler: ["EKG", "Vagal manevra"] },
      { tani: "Ventriküler Taşikardi (VT)", alt: "Stabil / instabil", aciliyet: "kirmizi",
        destekleyen: ["Düzenli geniş QRS (>120 ms)", "AV disosiasyon", "Iskemi öyküsü"],
        bayraklar: ["Hemodinamik instabil → kardiyoversiyon"],
        tetkikler: ["EKG", "Brugada algoritması", "Kardiyoloji acil"] },
      { tani: "Bradiaritmi (AV blok)", alt: "1° / 2° (Mobitz I-II) / 3°", aciliyet: "turuncu",
        destekleyen: ["Bradikardi + senkop / presenkop", "İlaç (BB, digoksin, CCB)"],
        bayraklar: ["3° AV blok → kalıcı pacemaker", "Mobitz II → riskli"],
        tetkikler: ["EKG", "İlaç gözden geçir", "Atropin / izoproterenol", "Geçici pace"] },
      { tani: "Torsades de Pointes", alt: "Polimorfik VT (uzun QT)", aciliyet: "kirmizi",
        destekleyen: ["QTc uzaması", "Hipokalemi, hipomagnesi", "İlaç (kinolon, antiaritmik, antidepresan)"],
        bayraklar: ["Defibrilasyon eşiği düşük"],
        tetkikler: ["EKG QTc", "Mg verme", "İlaç durdurma", "Overdrive pace"] },
      { tani: "WPW Sendromu", alt: "Pre-eksitasyon", aciliyet: "turuncu",
        destekleyen: ["Delta dalgası, kısa PR", "Çarpıntı atak öyküsü"],
        bayraklar: ["AF + WPW: AV nodal blokerlerden kaçın"],
        tetkikler: ["EKG", "Elektrofizyoloji + ablasyon"] },
    ]
  },

  "Pediatrik Ateş": {
    aciklama: "Yaşa göre yaklaşım: <29 gün, 29-90 gün, 3 ay+. Kırmızı bayraklar.",
    tanilar: [
      { tani: "Erken Bakteriyemi / Sepsis (<90 gün)", alt: "Yenidoğan + erken bebek", aciliyet: "kirmizi",
        destekleyen: ["≥38°C", "Toksik görünüm", "Beslenme bozukluğu, irritabilite", "Solunum güçlüğü"],
        bayraklar: ["<29 gün rutin tam sepsis çalışması + LP"],
        tetkikler: ["Kan/idrar/BOS kültürü", "CBC, CRP, prokalsitonin", "Empirik antibiyotik"],
        skor: "Rochester (29-60 gün)" },
      { tani: "İdrar Yolu Enfeksiyonu", alt: "En sık gizli enfeksiyon (<2 yaş)", aciliyet: "turuncu",
        destekleyen: ["İdrar tetkiki anormal", "Klasik dizüri (büyük çocuk)", "Tekrarlayan ateş"],
        bayraklar: ["Sünnetsiz erkek <1 yaş risk", "Yapısal anormallik şüphesi"],
        tetkikler: ["Kateter idrar kültürü (≤2 yaş)", "USG (anomali şüphesi)"] },
      { tani: "Otit Media", alt: "Akut", aciliyet: "yesil",
        destekleyen: ["Kulak ağrısı", "TM hiperemik / bombe", "Üst solunum öyküsü"],
        bayraklar: ["Mastoidit (post-aurikuler şişlik)"],
        tetkikler: ["Otoskopi", "Klinik"] },
      { tani: "Faranjit / Tonsillit", alt: "Viral / Streptokok", aciliyet: "yesil",
        destekleyen: ["Boğaz ağrısı, eksüda", "Servikal LAP", "GAS skor"],
        bayraklar: ["Romatizmal ateş, glomerülonefrit (post-strep)"],
        tetkikler: ["Hızlı strep antijen / kültür"],
        skor: "Centor / McIsaac" },
      { tani: "Pnömoni", alt: "Bakteriyel / viral", aciliyet: "turuncu",
        destekleyen: ["Takipne (yaşa göre)", "Çekilme, hipoksi", "Lokalize ral"],
        bayraklar: ["Hipoksi, ciddi solunum güçlüğü"],
        tetkikler: ["AC grafi (tipik vakada gerekmeyebilir)"] },
      { tani: "Kawasaki Hastalığı", alt: "Vaskülit", aciliyet: "turuncu",
        destekleyen: ["≥5 gün ateş + 4/5 kriter (konjonktivit, dudak/dil değ., el-ayak değ., LAP, döküntü)"],
        bayraklar: ["Koroner anevrizma riski → IVIG"],
        tetkikler: ["Klinik tanı", "EKO", "İltihap markerleri"] },
      { tani: "Menenjit / Ensefalit", alt: "Bakteriyel / viral", aciliyet: "kirmizi",
        destekleyen: ["Ateş + bilinç değ. + ense sertliği", "Konvülsiyon", "Peteşi (meningokok)"],
        bayraklar: ["Hızlı kötüleşme"],
        tetkikler: ["LP", "Empirik antibiyotik / asiklovir"] },
      { tani: "Akut Apandisit", alt: "Atipik prezentasyon (çocuk)", aciliyet: "turuncu",
        destekleyen: ["Karın ağrısı + ateş + kusma"],
        bayraklar: ["Çocukta perforasyon yüksek"],
        tetkikler: ["USG > BT", "Cerrahi"] },
    ]
  },

  "Yenidoğan": {
    aciklama: "İlk 28 günde acil değerlendirme. Sepsis, kalp, metabolik.",
    tanilar: [
      { tani: "Yenidoğan Sepsisi", alt: "Erken (≤72 sa) / geç başlangıç", aciliyet: "kirmizi",
        destekleyen: ["Sıcaklık instabilitesi", "Beslenme bozukluğu", "Letarji / irritabilite", "Solunum sıkıntısı"],
        bayraklar: ["GBS+ anne, ROM>18 sa, koryoamnionit"],
        tetkikler: ["Tam sepsis çalışması", "Empirik ampisilin + gentamisin"],
        skor: "Kaiser EOS" },
      { tani: "Konjenital Kalp Hastalığı (Duktus-bağımlı)", alt: "Sol-kalp / sağ-kalp obstrüksiyonu, transpozisyon", aciliyet: "kirmizi",
        destekleyen: ["Siyanoz / şok 24-48 saatte", "Üfürüm", "CCHD taraması (+)"],
        bayraklar: ["Duktus kapanması (PGE1 başla)"],
        tetkikler: ["EKO", "Pre/post-duktal SpO₂", "Hiperoksi testi"] },
      { tani: "Hiperbilirubinemi", alt: "Patolojik / fototerapi/exchange eşiği", aciliyet: "turuncu",
        destekleyen: ["Sarılık ≤24 saat = patolojik", "Aile öyküsü", "G6PD eksikliği, Coombs+"],
        bayraklar: ["Kernikterus riski"],
        tetkikler: ["TBIL (Bhutani nomogramı)", "Fototerapi / exchange (AAP 2022)"] },
      { tani: "İnborn Errors of Metabolism", alt: "Üre döngüsü, organik asidemi", aciliyet: "kirmizi",
        destekleyen: ["İyi başlangıç → kötüleşme (saatler-günler)", "Beslenme bozukluğu, kusma, letarji"],
        bayraklar: ["Yüksek amonyak", "Anion gap asidoz"],
        tetkikler: ["Amonyak, laktat, kan gazı", "Tarama testleri", "Pediatri metabolizma"] },
      { tani: "Hipoglisemi", alt: "SGA, LGA, DM anne, perinatal stres", aciliyet: "turuncu",
        destekleyen: ["İrritabilite, jitterness", "Beslenme zorluğu, apne"],
        bayraklar: ["Şiddetli / uzamış → beyin hasarı"],
        tetkikler: ["Kapiller glikoz", "AAP 2021 protokolü"] },
      { tani: "NAS (Neonatal Abstinens)", alt: "Anne madde kullanımı", aciliyet: "sari",
        destekleyen: ["Tremor, irritabilite, beslenme zayıf, hipertonisite", "Yüksek pitch ağlama"],
        bayraklar: ["Konvülsiyon (geç, %2-11)"],
        tetkikler: ["Finnegan / ESC skoru"] },
    ]
  },

  "Gebelik Komplikasyonları": {
    aciklama: "20+ haftalık gebede ve postpartum dönemde acil değerlendirme.",
    tanilar: [
      { tani: "Preeklampsi (Şiddetli) / Eklampsi", alt: "≥20 hafta", aciliyet: "kirmizi",
        destekleyen: ["KB ≥160/110", "Proteinüri", "Şiddet kriterleri (baş ağrısı, görme, RUQ, plt < 100k, AST > 40, Cr > 1.1, akciğer ödemi)"],
        bayraklar: ["Eklampsi: konvülsiyon"],
        tetkikler: ["MgSO₄", "Antihipertansif (labetalol/hidralazin)", "Kortikosteroid 24-34 hf"] },
      { tani: "HELLP Sendromu", alt: "Tennessee / Mississippi", aciliyet: "kirmizi",
        destekleyen: ["Hemoliz + AST/ALT + plt < 100k", "RUQ ağrı, bulantı"],
        bayraklar: ["Plt < 50k → kritik", "DIC riski"],
        tetkikler: ["LDH, haptoglobin, AST/ALT, plt", "Doğum kararı"] },
      { tani: "Plasenta Dekolmanı (Abruptio)", alt: "Antepartum kanama", aciliyet: "kirmizi",
        destekleyen: ["Ağrılı kanama", "Sert/tonus artmış uterus", "Fetal distres"],
        bayraklar: ["Hemodinamik instabilite", "DIC"],
        tetkikler: ["CTG", "USG", "Acil C/S"] },
      { tani: "Plasenta Previa", alt: "Antepartum kanama", aciliyet: "turuncu",
        destekleyen: ["Ağrısız kanama", "Bilinen plasenta previa"],
        bayraklar: ["Yumuşak uterus", "Dijital muayene yapma!"],
        tetkikler: ["TVUSG", "Kadın doğum"] },
      { tani: "Ektopik Gebelik (Rüptüre)", alt: "İlk trimester acil", aciliyet: "kirmizi",
        destekleyen: ["Adneksal ağrı + kanama", "β-hCG + intrauterin gebelik yok"],
        bayraklar: ["Hemoperitoneum"],
        tetkikler: ["β-hCG", "TVUSG", "Acil cerrahi"] },
      { tani: "Akut Yağlı Karaciğer Gebeliği", alt: "AFLP", aciliyet: "kirmizi",
        destekleyen: ["Bulantı, kusma, ikterus", "Hipoglisemi, koagulopati"],
        bayraklar: ["Akut karaciğer yetmezliği"],
        tetkikler: ["Acil doğum"] },
      { tani: "Postpartum Endometrit", alt: "Doğum sonrası enfeksiyon", aciliyet: "turuncu",
        destekleyen: ["Doğum sonrası ateş, uterin hassasiyet", "Kötü kokulu lokia"],
        bayraklar: ["Sepsis"],
        tetkikler: ["Geniş spektrumlu antibiyotik (klindamisin + gentamisin)"] },
    ]
  },

  "Postpartum Kanama": {
    aciklama: "PPH = ≥500 mL (NSD) / ≥1000 mL (C/S). 4T etiyoloji.",
    tanilar: [
      { tani: "Tonus (Atoni)", alt: "%70-80, en sık", aciliyet: "kirmizi",
        destekleyen: ["Yumuşak fundus", "Uzamış doğum, yüksek pariteli, çoğul gebelik"],
        bayraklar: ["İlk müdahale: masaj + uterotonikler"],
        tetkikler: ["Klinik", "Oksitosin → metilergonovin → karboprost → misoprostol", "Bakri balon"] },
      { tani: "Travma", alt: "Lazerasyon, hematom, rüptür", aciliyet: "kirmizi",
        destekleyen: ["Sert fundus + aktif kanama", "Vaginal/serviks lazerasyonu", "Vakum/forseps doğum"],
        bayraklar: ["Uterin rüptür → laparotomi"],
        tetkikler: ["Detaylı muayene", "Sütür / cerrahi"] },
      { tani: "Doku (Plasenta)", alt: "Retansiyon, akreta", aciliyet: "kirmizi",
        destekleyen: ["Eksik plasenta", "Önceki C/S, kürtaj"],
        bayraklar: ["Akreta → histerektomi gerekebilir"],
        tetkikler: ["Manuel ekstraksiyon", "Pelvik USG", "Anestezi destekli kürtaj"] },
      { tani: "Trombin (Koagülopati)", alt: "DIC, AFLP, HELLP, antikoagülan", aciliyet: "kirmizi",
        destekleyen: ["Genel sızıntı, ekimoz", "Önceden bilinen kanama bozukluğu"],
        bayraklar: ["Fibrinojen < 200"],
        tetkikler: ["INR, aPTT, fibrinojen", "TEG/ROTEM", "Kriyo, TDP, plt", "TXA <3 saat"] },
      { tani: "Sekonder PPH (24 saat-6 hafta)", alt: "Geç PPH", aciliyet: "turuncu",
        destekleyen: ["Plasenta retansiyonu, endometrit"],
        bayraklar: ["Sepsis"],
        tetkikler: ["USG", "Antibiyotik", "Kürtaj"] },
    ]
  },

  "Zehirlenme": {
    aciklama: "Toxidrome ve önemli antidotlar.",
    tanilar: [
      { tani: "Asetaminofen", alt: "Hepatotoksisite", aciliyet: "kirmizi",
        destekleyen: ["Erken dönem semptomsuz", "Geç AST/ALT yükselmesi"],
        bayraklar: ["Plazma düzeyi 4 saat sonra Rumack-Matthew"],
        tetkikler: ["NAC IV protokolü", "AST/ALT, INR"] },
      { tani: "Opioid", alt: "Triad: bilinç ↓ + miyozis + bradipne", aciliyet: "kirmizi",
        destekleyen: ["İğne izi, dil/dudak siyanoz", "Solunum baskısı"],
        bayraklar: ["Solunum yetmezliği"],
        tetkikler: ["Nalokson 0.04-0.4 mg IV titre"] },
      { tani: "TCA (Trisiklik antidepresan)", alt: "Antikolinerjik + Na kanal blokajı", aciliyet: "kirmizi",
        destekleyen: ["QRS uzaması (>100 ms)", "Antikolinerjik bulgular", "Konvülsiyon"],
        bayraklar: ["Aritmi, hipotansiyon"],
        tetkikler: ["NaHCO₃ (QRS >100 ms veya hipotansiyon)", "Lipid emülsiyon (refrakter)"] },
      { tani: "Karbonmonoksit", alt: "Sıklıkla gözden kaçar", aciliyet: "turuncu",
        destekleyen: ["Aile/ev birden çok kişi etkilenmiş", "Soba, şofben"],
        bayraklar: ["Bilinç değ., kardiyak iskemi"],
        tetkikler: ["COHb", "%100 O₂ → hiperbarik (seçilmiş)"] },
      { tani: "Organofosfat / Karbamat", alt: "Kolinerjik kriz", aciliyet: "kirmizi",
        destekleyen: ["DUMBELS / SLUDGE", "Pesticid maruziyeti"],
        bayraklar: ["Aspirasyon, solunum yetmezliği"],
        tetkikler: ["Atropin (titre), 2-PAM (organofosfatta)"] },
      { tani: "Toksik Alkoller", alt: "Metanol, etilen glikol", aciliyet: "kirmizi",
        destekleyen: ["Anion gap asidoz + osmolar gap", "Görme bozukluğu (metanol)", "Renal yetmezlik (EG)"],
        bayraklar: ["Tedavi gecikmemeli"],
        tetkikler: ["Fomepizol veya etanol", "Hemodiyaliz"] },
      { tani: "Benzodiyazepin", alt: "Bilinç baskısı", aciliyet: "turuncu",
        destekleyen: ["Solunum baskısı görece az (saf alımda)"],
        bayraklar: ["Mikst alım yaygın"],
        tetkikler: ["Flumazenil seçilmiş (kronik kullanıcıda kontrendike)"] },
    ]
  },

  "Bel Ağrısı": {
    aciklama: "Mekanik vs. ciddi nedenler. Kırmızı bayrak değerlendirmesi.",
    tanilar: [
      { tani: "Mekanik Bel Ağrısı", alt: "Kas-iskelet, en sık (~%85)", aciliyet: "yesil",
        destekleyen: ["Hareket/eğilme tetikleyici", "Lokalize ağrı", "Gece ağrısı yok"],
        bayraklar: ["Yok"],
        tetkikler: ["Klinik (görüntüleme rutin değil)"],
        skor: "STarT Back" },
      { tani: "Lomber Disk Hernisi (Radikülopati)", alt: "L4-L5, L5-S1 en sık", aciliyet: "turuncu",
        destekleyen: ["Dermatomal radiküler ağrı", "SLR (+)", "Motor / duyu defisiti"],
        bayraklar: ["İlerleyici defisit"],
        tetkikler: ["MR (defisit / 6 hafta yanıtsız)"] },
      { tani: "Cauda Equina", alt: "Cerrahi acil", aciliyet: "kirmizi",
        destekleyen: ["Saddle anestezi", "İdrar retansiyonu / inkontinans", "Bilateral motor defisit", "Anal tonus azalmış"],
        bayraklar: ["48 saat içinde dekompresyon"],
        tetkikler: ["Acil MR", "Nöroşirurji"] },
      { tani: "Spinal Enfeksiyon", alt: "Diskit / vertebra osteomyeliti / epidural abse", aciliyet: "kirmizi",
        destekleyen: ["Ateş + bel ağrısı", "IVDU, immünsüpresyon, son enfeksiyon", "Spinal cerrahi öyküsü"],
        bayraklar: ["Nörolojik defisit"],
        tetkikler: ["ESH, CRP", "MR + kontrast", "Kan kültürü"] },
      { tani: "Spinal Malignite", alt: "Metastatik / primer", aciliyet: "kirmizi",
        destekleyen: ["≥50 yaş, kanser öyküsü, kilo kaybı", "Gece ağrısı", "Travmasız ağrı 1+ ay"],
        bayraklar: ["Spinal kord basısı"],
        tetkikler: ["MR", "ALP, kalsiyum"] },
      { tani: "Vertebra Kompresyon Kırığı", alt: "Osteoporotik / patolojik", aciliyet: "turuncu",
        destekleyen: ["Yaşlı + minor travma", "Steroid kullanımı"],
        bayraklar: ["Nörolojik defisit"],
        tetkikler: ["Lomber grafi", "MR (akut/iatrojenik)"] },
      { tani: "AAA", alt: "Anevrizma rüptürü", aciliyet: "kirmizi",
        destekleyen: ["Yaşlı, sigara öyküsü", "Pulsatil kitle", "Hipotansiyon + bel ağrısı"],
        bayraklar: ["Hipotansiyon = aksi kanıtlanana kadar AAA"],
        tetkikler: ["Yatakbaşı USG", "BT angio"] },
    ]
  },

  "GİS Kanama": {
    aciklama: "Üst (>%75) vs. alt GİS kanaması. Hemodinamik öncelik.",
    tanilar: [
      { tani: "Peptik Ülser", alt: "En sık üst GİS nedeni (~%40)", aciliyet: "turuncu",
        destekleyen: ["Hematemez / kahve telvesi / melena", "NSAID, H. pylori, alkol", "Forrest sınıflama (endoskopi)"],
        bayraklar: ["Aktif kanama (Forrest Ia, Ib)"],
        tetkikler: ["PPI 80 mg bolus + 8 mg/sa", "Endoskopi"],
        skor: "GBS, Rockall, AIMS65" },
      { tani: "Özofagus Varisi", alt: "Sirozda", aciliyet: "kirmizi",
        destekleyen: ["Bilinen siroz / portal HT", "Masif hematemez"],
        bayraklar: ["Aktif kanama → kontrol zor"],
        tetkikler: ["Oktreotid", "Seftriakson (SBP profilaksisi)", "Endoskopik bant ligasyonu"] },
      { tani: "Mallory-Weiss", alt: "Özofagogastrik mukozal yırtık", aciliyet: "sari",
        destekleyen: ["Şiddetli kusma sonrası hematemez", "Genelde kendini sınırlar"],
        bayraklar: ["Boerhaave (özofagus rüptürü) ayırımı"],
        tetkikler: ["Endoskopi (gerekirse)"] },
      { tani: "Aorto-Enterik Fistül", alt: "Greft öyküsü", aciliyet: "kirmizi",
        destekleyen: ["Önceki AAA / aortik greft", "Sentinel kanama (önce küçük, sonra masif)"],
        bayraklar: ["Hayati kanama"],
        tetkikler: ["BT angio", "Damar cerrahisi"] },
      { tani: "Divertiküler Kanama", alt: "En sık alt GİS nedeni (yaşlı)", aciliyet: "turuncu",
        destekleyen: ["Ağrısız hematokezya", "Yaşlı"],
        bayraklar: ["Çoğu spontan durur, %25 tekrar"],
        tetkikler: ["Kolonoskopi", "BT angio (aktif kanama)"] },
      { tani: "Hemoroid / Anal Fissür", alt: "Hafif kanama", aciliyet: "yesil",
        destekleyen: ["Tuvalet kağıdına sürtünen kan", "Defekasyon ağrısı (fissür)"],
        bayraklar: ["Diğer nedenler atlanmamalı (özellikle yaşlı)"],
        tetkikler: ["Anoskopi / proktoskopi"] },
      { tani: "Anjio-Displazi", alt: "Yaşlı, kronik anemi", aciliyet: "sari",
        destekleyen: ["Tekrarlayan, gizli kanama", "Yaşlı"],
        bayraklar: ["Aort stenozu (Heyde sendromu) eşliği"],
        tetkikler: ["Kolonoskopi", "Kapsül endoskopi"] },
      { tani: "Kolorektal Kanser", alt: "Yaşlıda kırmızı bayrak", aciliyet: "turuncu",
        destekleyen: ["Kilo kaybı, dışkı alışkanlık değişikliği", "Demir eksikliği anemisi", "Aile öyküsü"],
        bayraklar: ["Yaşlı + GİS kanaması = aksi kanıtlanana kadar Ca"],
        tetkikler: ["Kolonoskopi (acil veya ayaktan)"] },
    ]
  },
};

// ─────────── SERBEST METİN PARSER ───────────
// Hekim açıklamasını yapılandırılmış bilgiye çevirir
function parseHastaTanim(text) {
  if (!text) return { yas: null, cinsiyet: null, sikayet: null, rf: [], ham: "" };
  const t = (" " + text + " ").toLowerCase();

  // Yaş
  const yasMatch = t.match(/(\d{1,3})\s*ya[sş]/);
  const yas = yasMatch ? +yasMatch[1] : null;

  // Cinsiyet
  let cinsiyet = null;
  if (/\berkek\b|\bbey\b/.test(t)) cinsiyet = "Erkek";
  else if (/\bkad[ıi]n\b|\bhan[ıi]m\b/.test(t)) cinsiyet = "Kadın";

  // Risk faktörleri & komorbidite
  const rf = [];
  const negatif = /(yok|olmayan|olmadan|içmiyor|kullanmıyor|negatif)/;
  const inekRiskFactor = (key, regex) => {
    if (regex.test(t) && !negatif.test(t.slice(Math.max(0, t.search(regex) - 25), t.search(regex) + 25))) {
      rf.push(key);
    }
  };
  inekRiskFactor("Sigara", /sigara|t[üu]t[üu]n|içici/);
  inekRiskFactor("HT", /hipertansiyon|tansiyon hastal|y[üu]ksek tansiyon|ht\b/);
  inekRiskFactor("DM", /diyabet|[şs]eker hastal|\bdm\b|insülin/);
  inekRiskFactor("Hiperlipidemi", /kolesterol|hiperlipidemi|dislipid/);
  inekRiskFactor("Aile öyküsü KAH", /aile [öo]yk[üu]|ailede.*(kalp|kah)/);
  inekRiskFactor("Bilinen KAH", /bilinen koroner|stent|bypass|kah \(\+\)|\bkah\b/);
  inekRiskFactor("KOAH", /koah|kronik obstr/);
  inekRiskFactor("Astım", /ast[ıi]m\b/);
  inekRiskFactor("KKY", /kalp yetmez|\bky\b|kky|ef d[üu][şs][üu]k/);
  inekRiskFactor("AF", /atriyal fibril|\baf\b|atriyel fibril/);
  inekRiskFactor("Antikoagülan", /antikoag[üu]l|kumadin|warfarin|eliquis|xarelto|apiksaban|rivaroks|edoks|dabigatran/);
  inekRiskFactor("Malignite", /kanser|malignite|onkoloji|metastaz|kemoterapi|ca [öo]yk/);
  inekRiskFactor("Gebelik", /gebe(lik)?|hamile|trimester/);
  inekRiskFactor("Postpartum", /postpartum|do[ğg]um sonras|loh[uü]sa/);
  inekRiskFactor("İmmobilizasyon", /imm[öo]bilizasyon|yat[ıi]r|son cerrahi|son ameliyat|uzun u[çc]u[şs]/);
  inekRiskFactor("DVT/PE öyküsü", /\bdvt\b|tromboz|p[ıi]ht[ıi].*[öo]yk|pe [öo]yk/);
  inekRiskFactor("İlaç (NSAID)", /nsa[iıİ][iıİ]|ibuprof|asetilsalis|aspirin|naproksen/);
  inekRiskFactor("Alkol", /alkol|i[çc]ki/);
  inekRiskFactor("İmmünsüpresyon", /imm[üu]ns[üu]presyon|kortikosteroid|hiv|kemoterapi/);

  // Şikayet — anahtar kelimelerle eşleştir
  const matches = {
    "Göğüs Ağrısı": /g[öo][ğg][üu]s a[ğg]r[ıi]|retrosternal|anjina|kalp a[ğg]r[ıi]/,
    "Dispne": /nefes darl[ıi][ğg][ıi]|dispne|hava a[çc]l[ıi][ğg][ıi]|nefes alamama|soluk[ s]+a/,
    "Karın Ağrısı": /kar[ıi]n a[ğg]r[ıi]|abdominal a[ğg]r|bat[ıi]n a[ğg]r/,
    "Senkop": /senkop|bay[ıi]lma|baygınl[ıi]k|ge[çc]ici bilin[çc]|kollaps/,
    "İnme/SVO": /\binme\b|fel[çc]|svo|fokal defisit|fast pozitif|y[üu]z kayma|konu[şs]ma bozukluğu/,
    "Baş Ağrısı": /ba[şs] a[ğg]r[ıi]|migren|cephalalgia|y[ıi]ld[ıi]r[ıi]m ba[şs]/,
    "Konvülsiyon": /konv[üu]lsiyon|n[öo]bet ge[çc]ir|havale|epileptik|status epilept/,
    "Bilinç Değişikliği": /bilin[çc] de[ğg]i[şs]|konf[üu]zyon|letarji|stupor|koma|ams|deliryum/,
    "Multitravma": /travma|kaza|d[üu][şs]me|trafik kazas|yaralanma|y[üu]ksekten/,
    "Renal Kolik": /renal kolik|b[öo]brek ta[şs]|yan a[ğg]r[ıi]|hidronefroz|[üu]reter ta[şs]/,
    "Anafilaksi": /anafilaksi|allerjik [şs]ok|[üu]rtiker.*[şs]ok|anjio[öo]dem.*[şs]ok/,
    "Sepsis": /sepsis|septik [şs]ok|sirs|ate[şs] \+ enfeksi/,
    "Aritmi": /[çc]arp[ıi]nt[ıi]|aritmi|atriyal fibril|svt|vt(ent[üu]b)?|bradik/,
    "Pediatrik Ateş": /pediatrik ate[şs]|[çc]ocuk.*ate[şs]|bebek.*ate[şs]|infant ate[şs]/,
    "Yenidoğan": /yenido[ğg]an|neonat/,
    "Gebelik Komplikasyonları": /gebe.*kanama|preeklampsi|eklampsi|hellp|ektopik gebelik/,
    "Postpartum Kanama": /postpartum kanama|do[ğg]um sonras[ıi] kanama|pph/,
    "Zehirlenme": /zehirlenme|intoks|ila[çc] al[ıi]m[ıi]|toksik|asetaminofen al/,
    "Bel Ağrısı": /bel a[ğg]r[ıi]|lomber a[ğg]r[ıi]|s[ıi]rtbel/,
    "GİS Kanama": /g[ıi][şs] kanama|hematemez|melena|hematokezya|kanl[ıi] kusma|kanl[ıi] d[ıi][şs]k/,
  };
  let sikayet = null;
  for (const [k, re] of Object.entries(matches)) {
    if (re.test(t)) { sikayet = k; break; }
  }

  return { yas, cinsiyet, sikayet, rf, ham: text };
}

// ─────────── ÖN TANI SIRALAMA ───────────
// Tanılara metin/yaş/RF eşleşmesine göre relevans skoru verir
function rankTanilar(tanilar, parsed) {
  const rfSet = new Set(parsed.rf || []);
  const yas = parsed.yas || 0;
  const cinsiyet = parsed.cinsiyet;

  // RF ↔ destekleyen metni içinde aranacak regex eşlemesi
  const rfRe = {
    "HT": /(\bht\b|tansiyon|hipertansiyon)/i,
    "DM": /(\bdm\b|diyabet|[şs]eker)/i,
    "Sigara": /sigara/i,
    "Hiperlipidemi": /(kolesterol|lipid|hiperlipid)/i,
    "Aile öyküsü KAH": /(aile [öo]yk[üu]|ailede)/i,
    "Bilinen KAH": /(\bkah\b|koroner|stent|bypass)/i,
    "KOAH": /\bkoah\b/i,
    "Astım": /ast[ıi]m/i,
    "KKY": /(\bkky\b|kalp yetmez|\bky\b)/i,
    "AF": /(\baf\b|atriyal fibril|atriyel fibril)/i,
    "Antikoagülan": /antikoag/i,
    "Malignite": /(malign|kanser|metast)/i,
    "Gebelik": /(gebe|hamile|trimester)/i,
    "Postpartum": /postpartum/i,
    "İmmobilizasyon": /(imm[öo]b|cerrahi|ameliyat|uzun u[çc]u[şs])/i,
    "DVT/PE öyküsü": /(\bdvt\b|önceki dvt|önceki pe)/i,
    "İlaç (NSAID)": /(nsa[iıİ]|ibuprof|aspirin|naproksen)/i,
    "Alkol": /alkol/i,
    "İmmünsüpresyon": /(imm[üu]ns[üu]presyon|kortikosteroid|hiv|nötropeni)/i,
  };

  return tanilar.map(t => {
    let score = 0;
    const matched = [];
    const dText = ((t.destekleyen || []).join(" ") + " " + (t.bayraklar || []).join(" ") + " " + (t.alt || ""))
      .toLowerCase();

    // RF eşleşmeleri
    for (const r of rfSet) {
      const re = rfRe[r];
      if (re && re.test(dText)) {
        score += 2;
        matched.push(r);
      }
    }

    // Yaş profili
    if (yas >= 50 && /(yaşl[ıi]|≥50|≥45|≥60|aks|akut koroner|aort|aaa|malign|kanser|ca [öo]yk)/i.test(dText)) score += 1;
    if (yas >= 65 && /(divertik[üu]l|geriatri|polifarmasi)/i.test(dText)) score += 1;
    if (yas < 40 && /(gen[çc]|pnömotoraks|anksiyete|migren|primer)/i.test(dText)) score += 1;

    // Cinsiyet (özellikle gebelik)
    if (cinsiyet === "Kadın" && yas >= 15 && yas <= 50 && /(gebe|ektopik|pelvik)/i.test(dText)) score += 1;

    // Aciliyet bonus — kritik öne çıksın
    const ab = { kirmizi: 0.6, turuncu: 0.4, sari: 0.2, yesil: 0 };
    score += ab[t.aciliyet] || 0;

    return { ...t, _score: score, _matched: matched };
  }).sort((a, b) => b._score - a._score);
}

// ─────────── SKOR ÖNERİSİ ───────────
// Tanılarda referans verilen klinik skorları, skorlar.html ID'leriyle eşleştir
const SKOR_ID_MAP = {
  "HEART": "heart",
  "TIMI": "timi_uanstemi",
  "GRACE": "grace",
  "Wells PE": "wells_pe",
  "Wells": "wells_pe",
  "PERC": "perc",
  "Geneva": "geneva_modified",
  "Modified Geneva": "geneva_modified",
  "CHA₂DS₂-VASc": "cha2ds2_vasc",
  "CHA2DS2-VASc": "cha2ds2_vasc",
  "HAS-BLED": "hasbled",
  "qSOFA": "qsofa",
  "NEWS2": "news2",
  "SOFA": "sofa",
  "CURB-65": "curb65",
  "GBS": "glasgow_blatchford",
  "Glasgow-Blatchford": "glasgow_blatchford",
  "AIMS65": "aims65",
  "Rockall": "rockall_pre",
  "Alvarado": "alvarado",
  "RIPASA": "ripasa",
  "ABCD²": "abcd2",
  "ABCD2": "abcd2",
  "ICH": "ich",
  "Canadian Syncope": "canadian_syncope",
  "SF Syncope": "san_francisco_syncope",
  "RTS": "revised_trauma",
  "Revised Trauma": "revised_trauma",
  "Şok İndeksi": "shock_index",
  "Sok Indeksi": "shock_index",
  "CAM": "cam",
  "FOUR": "four_score",
};

function onerilenSkorlar(tanilar) {
  const set = new Map();
  for (const t of tanilar) {
    if (!t.skor) continue;
    const adlar = t.skor.split(/[,;/]/).map(s => s.trim()).filter(Boolean);
    for (const ad of adlar) {
      // En yakın eşleşmeyi bul
      for (const [key, id] of Object.entries(SKOR_ID_MAP)) {
        if (ad.toLowerCase() === key.toLowerCase()) {
          if (!set.has(id)) set.set(id, { id, ad: key, ilk_tani: t.tani });
          break;
        }
      }
    }
  }
  return Array.from(set.values());
}

window.TANI_KATALOG = TANI_KATALOG;
window.parseHastaTanim = parseHastaTanim;
window.rankTanilar = rankTanilar;
window.onerilenSkorlar = onerilenSkorlar;
