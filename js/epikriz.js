/* ============================================
   suleymanalpar.com — Epikriz Yardımcısı
   20 senaryo şablonu + sistem bazlı muayene formatları
   Yalnızca sağlık çalışanlarına yöneliktir.
   Tarayıcıda çalışır, veri sunucuya gitmez.
   Şablonlar Türk acil tıp kılavuz pratiğine göre derlenmiştir.
   ============================================ */

// ─────────── 20 SENARYO ŞABLONU ───────────
// Her senaryo için: başlık + ek_bilgiler (hekim ___ alanlarını doldurur)
// + bas_boyun_ek / neuro_ek / ekg gibi senaryo özel detaylar
const SENARYOLAR = {
  "Göğüs Ağrısı": {
    baslik: "GÖĞÜS AĞRISI",
    ek_bilgiler: [],
    ekg: "Normal sinüs ritmi, ST-T değişikliği yok"
  },
  "Dispne": {
    baslik: "NEFES DARLIĞI (DİSPNE)",
    ek_bilgiler: ["KKY (-), Kullandığı ilaçlar: ___"],
    bas_boyun_ek: "Yabancı cisim (-)",
    ekg: "Normal sinüs ritmi, ST-T değişikliği yok"
  },
  "Karın Ağrısı": {
    baslik: "KARIN AĞRISI",
    ek_bilgiler: ["Gebelik durumu: ___ (varsa son adet tarihi)"]
  },
  "Senkop": {
    baslik: "SENKOP / BAŞ DÖNMESİ",
    ek_bilgiler: [
      "Senkop öncesi: ___ (efor / değişim / ani / aurasız)",
      "Şahit: ___ (var/yok) · Süre: ___ saniye",
      "Sonrası: ___ (oryante / konfüze / postiktal)",
      "Kullandığı ilaçlar: ___",
    ],
    bas_boyun_ek: "Karotis üfürüm (-)",
    neuro_ek: "Dix Hallpike testi (-)",
    ekg: "Normal sinüs ritmi, ST-T değişikliği yok"
  },
  "İnme/SVO": {
    baslik: "AKUT NÖROLOJİK DEFİSİT (İNME / SVO)",
    ek_bilgiler: [
      "Son normal görülme zamanı: ___",
      "Wake-up stroke (uykudan defisitle uyandı): ___",
      "Antikoagülan kullanımı: ___ (varsa son doz saati)",
      "AF öyküsü: ___",
      "FAST: F___ A___ S___ T___",
      "NIHSS: ___ /42",
      "BT bulguları: ___ (kanama / iskemi / negatif)",
      "Trombolitik penceresi (≤4.5 sa): ___ (uygun / kontrendike)",
    ],
  },
  "Baş Ağrısı": {
    baslik: "BAŞ AĞRISI",
    ek_bilgiler: [
      "Karakter: ___ (zonklayıcı / baskı tarzı / saplanıcı / patlayıcı)",
      "Şiddet (NRS): ___/10",
      "Tetikleyici: ___ (efor / valsalva / ışık / yemek)",
      "Önceki migren öyküsü: ___",
      "Kırmızı bayraklar: Yıldırım başlangıç ___ · Ateş+ense ___ · Bilinç değ. ___ · Görme bzk. ___",
    ],
  },
  "Konvülsiyon": {
    baslik: "KONVÜLSİYON / STATUS EPİLEPTİKUS",
    ek_bilgiler: [
      "Nöbet tipi: ___ (jeneralize konvülsif / fokal / NCSE / myoklonik)",
      "Süre (dk): ___",
      "Sayı: ___ (aralarında bilinç döndü mü?)",
      "Bilinen epilepsi: ___ (varsa AED ve son doz saati)",
      "AED uyumsuzluğu: ___",
      "Tetikleyici: ___ (uyku yoksunluğu / alkol / enfeksiyon / travma)",
      "Postiktal süre (dk): ___",
      "Lateral dil ısırığı: ___ · İnkontinans: ___",
    ],
  },
  "Bilinç Değişikliği": {
    baslik: "BİLİNÇ DEĞİŞİKLİĞİ (AMS) — AEIOU-TIPS DEĞERLENDİRMESİ",
    ek_bilgiler: [
      "GKS: ___/15 (E___ V___ M___) · FOUR: ___/16",
      "Başlangıç: ___ (ani / tedrici, saatler-günler)",
      "Son normal durum zamanı: ___",
      "Baseline kognitif durum: ___ (normal / hafif kognitif bozukluk / demans)",
      "Bilinç düzeyi: ___ (alert / letarjik / stupor / koma)",
      "Fokal defisit: ___ (yok / yüz / kol / bacak / konuşma / görme)",
      "AEIOU-TIPS: A___ E___ I___ O___ U___ T___ I___ P___ S___",
      "Son alınan ilaçlar: ___ (polifarmasi, yeni başlanan, doz değişikliği)",
      "Toksik madde: ___ · Travma (son 7 gün): ___ · Antikoagülan: ___",
      "CAM (delirium): ___ (+/−)",
    ],
  },
  "Multitravma": {
    baslik: "MULTİTRAVMA — ATLS PRİMER/SEKONDER BAKI",
    ek_bilgiler: [
      "Olay mekanizması: ___ (trafik kazası / yüksekten düşme / penetran / darp)",
      "Kinetik enerji: ___ (hız, darbe yönü, ejeksiyon, aynı araçta ölüm)",
      "Olay sonrası süre: ___ dk (golden hour)",
      "Prehospital müdahale: ___ (IV, O₂, immobilizasyon, turnike, sıvı)",
      "x — Katastrofik kanama kontrolü: ___ (yok / turnike uygulandı / direkt bası)",
      "A — Hava yolu: ___ · C-spine immobilizasyonu: ___",
      "B — Solunum: RR ___, SpO₂ ___%, solunum sesleri ___, göğüs duvarı ___",
      "C — Dolaşım: KB ___/___ , HR ___, Şok İndeksi ___, kapiller geri dolum ___ sn",
      "D — Bilinç: GKS ___ (E___ V___ M___), pupiller ___, motor defisit ___",
      "E — Maruziyet: Vücut ısısı ___°C, tam soyma ___",
      "AMPLE: Alerji ___ · İlaç ___ · Özgeçmiş ___ · Son yemek ___ · Olay ___",
      "eFAST: peri-hepatik ___ · peri-splenik ___ · pelvik ___ · perikardiyal ___ · akciğer (PTX) ___",
      "Görüntüleme: AC grafi ___ · Pelvis ___ · Kranyal BT ___ · C-spine BT ___",
      "Bölgesel yaralanmalar: ___",
      "Revised Trauma Score: ___/7.84 · ATLS Şok Sınıfı: ___",
      "ABC-MTP Skoru: ___/4 · Masif transfüzyon aktivasyonu: ___",
      "TXA (≤3 saat): ___ · Tetanoz profilaksisi: ___",
      "Konsültasyon: ___ (travma cer., nöroşir., ortopedi, KBB, oftal., göğüs cer.)",
    ],
  },
  "Renal Kolik": {
    baslik: "RENAL KOLİK — STONE SKORU / OBSTRÜKSİYON / ÜROSEPSİS",
    ek_bilgiler: [
      "Ağrı lokalizasyonu: ___ (flank / umbilikal / inguinal / testiküler yayılım)",
      "Ağrı başlangıcı: ___ (ani <6 sa / 6-24 sa / >24 sa)",
      "Şiddet (NRS): ___/10 · Kolik karakteri: ___ (dalgalı / sürekli)",
      "STONE Skoru: ___/13",
      "Hematüri: ___ (makroskopik / mikroskopik / yok)",
      "Dizüri / sık idrar: ___",
      "Ateş: ___ °C · Titreme: ___ (ürosepsis göstergesi)",
      "Bulantı-kusma: ___ (episod sayısı)",
      "Bilinen taş öyküsü: ___ · Geçmiş taş boyutu/konumu: ___",
      "Görüntüleme: USG hidronefroz ___ · BT taş ___ mm, konumu ___ (proksimal/mid/distal üreter)",
      "Hounsfield Unit: ___ (>1000 = kalsiyum oksalat; <500 = ürik asit)",
      "Böbrek fonksiyonu: Kreatinin ___ mg/dL · AKI: ___",
      "Üroloji konsültasyonu: ___ (stent / nefrostomi / ESWL / URS)",
      "MET (medikal taş tedavisi): ___ (tamsulosin 0.4 mg/gün)",
    ],
  },
  "Anafilaksi": {
    baslik: "ANAFİLAKSİ — NIAID/FAAN / SAMPSON GRADE / ADRENALİN",
    ek_bilgiler: [
      "Şüpheli allerjen: ___ (gıda / ilaç / böcek / lateks / idiopatik)",
      "Temas yolu: ___ (oral / parenteral / inhaler / dermal)",
      "Başlangıç zamanı: ___ (temas sonrası dk/sa)",
      "Cilt/mukoza: Ürtiker ___ · Anjiyoödem ___ · Kaşıntı ___ · Flushing ___",
      "Respiratuar: Dispne ___ · Stridor ___ · Wheeze ___ · Boğaz sıkışması ___",
      "Kardiyovasküler: SKB ___ · Senkop ___ · Bilinç kaybı ___",
      "GİS: Kusma ___ · Kramp ___ · Ani ishal ___",
      "NIAID/FAAN Kriterleri: Karşılanan ___ (1 / 2 / 3)",
      "Sampson Grade: ___/5",
      "Adrenalin: ___ mg IM (vastus lateralis) · Saat: ___ · Tekrar: ___ (5-15 dk)",
      "IV sıvı (izotonik): ___ mL · Oksijen ___ L/dk",
      "Adjuvan: H1 ___ · H2 ___ · Kortikosteroid ___ · Salbutamol ___ · Glukagon (β-bloker) ___",
      "Bifazik reaksiyon riski: ___ (gözlem süresi: ___ saat)",
      "Triptaz: ilk 15 dk-3 saat ___ ng/mL · Bazal (24 saat) ___",
      "Taburcu: Oto-enjektör reçetesi ___ · Allerji polikliniği ___",
    ],
  },
  "Sepsis": {
    baslik: "SEPSİS / SEPTİK ŞOK — qSOFA/SOFA/NEWS2/1-SAAT BUNDLE",
    ek_bilgiler: [
      "Enfeksiyon kaynağı şüphesi: ___ (pnömoni / ürosepsis / abdominal / menenjit / yumuşak doku / santral yol / endokardit)",
      "Semptom süresi: ___ saat",
      "qSOFA: ___/3 (RR ≥22 ___ · SKB ≤100 ___ · GKS <15 ___)",
      "SOFA: ___/24 (resp ___ · koag ___ · hepatik ___ · kardiyovasküler ___ · SSS ___ · renal ___)",
      "NEWS2: ___/20",
      "Laktat (başlangıç): ___ mmol/L · 2. saat: ___ · 4. saat: ___",
      "Kan kültürü x2 (antibiyotik öncesi): ___ · İdrar kültürü: ___",
      "Ampirik antibiyotik (kaynak odaklı): ___ · Saat: ___ (hedef <1 sa)",
      "Kristalloid 30 mL/kg: ___ mL verildi (süre: ___ saat)",
      "Vazopressör (norepinefrin): ___ · MAP hedefi ≥65 mmHg sağlandı: ___",
      "Kortikosteroid (hidrokortizon 200 mg/gün): ___",
      "İmmünokompromise: ___ (kemoterapi / steroid / HIV / nötropeni)",
      "Komorbiditeler: ___ (DM / KKY / KOAH / CKD / siroz)",
      "Organ disfonksiyonları: ___ (AKI / ARDS / DIC / hepatik)",
      "Lab: WBC ___ · PLT ___ · CRP ___ · Prokalsitonin ___ · Kreatinin ___",
      "Kaynak kontrolü: ___ (drenaj / cerrahi / kateter değişimi)",
      "Disposition: ___ (YBÜ / Monitörlü servis / Servis / Taburcu)",
    ],
  },
  "Aritmi": {
    baslik: "ARİTMİ / ÇARPINTI",
    ek_bilgiler: [
      "Çarpıntı başlangıcı: ___ (ani / gradual) · Süresi: ___ · Sıklığı: ___",
      "Tetikleyiciler: ___ (kafein / alkol / nikotin / egzersiz / stres / ilaç)",
      "Eşlik eden: Göğüs ağrısı ___ · Dispne ___ · Senkop ___ · Bilinç kaybı ___",
      "EKG ritmi: ___ (sinüs / AF / flutter / SVT / VT) · Nabız ___/dk",
      "QRS: ___ ms · QTc: ___ ms · PR: ___ ms · Aks: ___",
      "P dalgası: ___ (her QRS öncesi / yok / flutter / AV disosiasyon)",
      "Anstabilite bulguları: ___ (hipotansiyon / iskemi / KY / bilinç değ.)",
      "CHA₂DS₂-VASc: ___/9 · İnme riski (yıllık): ___ %",
      "HAS-BLED: ___/9 · Kanama riski: ___ %",
      "AF özellikleri (varsa): ___ (paroksismal / persistan / kalıcı) · EHRA ___",
      "Kardiyoversiyon: ___ (<48 sa / TEE / 3 hf OAK sonrası)",
      "Antiaritmik: ___ (amiodaron / prokainamid / flecainid / propafenon)",
      "Rate kontrol: ___ (metoprolol / diltiazem / verapamil / digoksin)",
      "OAK önerisi: ___ (DOAC / warfarin)",
      "EKO: LVEF ___ % · LA çapı ___ mm",
      "Disposition: ___ (YBÜ / Monitörlü servis / Gözlem / Taburcu + Kardiyoloji)",
    ],
  },
  "Pediatrik Ateş": {
    baslik: "PEDİATRİK ATEŞ — PAT / ROCHESTER / YALE",
    ek_bilgiler: [
      "Yaş: ___ gün/ay · Cinsiyet: ___ · Kilo: ___ kg",
      "Doğum öyküsü: Term ___ / Preterm ___ hf · Perinatal komplikasyon: ___",
      "Aşı takvimi: ___ (tam / kısmi / aşısız)",
      "Kronik hastalık / immünsüpresyon: ___",
      "Ateş özellikleri: Max ___°C · Süre ___ saat/gün · Antipiretik yanıtı ___",
      "PAT — Görünüm (TICLS): ___ · Solunum işi: ___ · Dolaşım: ___",
      "Vital: Nabız ___/dk · SKB ___ · SS ___/dk · SpO₂ ___ %",
      "Ense sertliği ___ · Fontanel ___ · Peteşi/purpura ___ · Eksantem ___ · Otit ___",
      "Rochester (29-60 gün): Karşılanan ___/7 · Düşük risk: ___",
      "Yale Observation Scale (3-36 ay): ___ puan → Risk: ___",
      "Lab: WBC ___ · CRP ___ · Prokalsitonin ___ · İdrar WBC ___",
      "Kan kültürü ___ · İdrar kültürü ___ · BOS kültürü ___",
      "LP (<29 gün rutin): ___ — WBC ___, protein ___, glukoz ___",
      "Ampirik antibiyotik: ___ (<29 gün: ampisilin+sefotaksim)",
      "Antipiretik: Parasetamol 15 mg/kg q6h · İbuprofen 10 mg/kg q8h (≥6 ay)",
      "Disposition: ___ (ÇYBÜ / Pediatri servis / 24 sa gözlem / Ayaktan)",
    ],
  },
  "Yenidoğan": {
    baslik: "YENİDOĞAN — APGAR / SILVERMAN / KAISER EOS / BHUTANI",
    ek_bilgiler: [
      "Gestasyon haftası: ___ hf · Doğum ağırlığı: ___ g · Yaş (postnatal): ___ saat",
      "Cinsiyet: ___ · Doğum şekli: ___ (SVD / C/S / Vakum)",
      "Anne öyküsü: DM ___ · HT ___ · GBS ___ · Antibiyotik profilaksisi: ___",
      "Membran rüptürü süresi: ___ saat · Maternal ateş/koryoamnionit: ___",
      "APGAR: 1. dk ___/10 · 5. dk ___/10 · 10. dk ___/10",
      "Silverman-Andersen: Üst sol ___ · İnterkostal ___ · Ksifoid ___ · Burun kanadı ___ · Grunting ___ → Toplam ___/10",
      "Vital: KTA ___/dk · SS ___/dk · Ateş ___°C · SpO₂ sağ el ___/ayak ___ %",
      "Kaiser EOS Calculator: Risk puanı ___ · Kategori: ___",
      "Bhutani (hiperbilirubinemi): TBIL ___ mg/dL @ ___ saat → Bölge: ___",
      "Hipoglisemi (AAP 2021): Glukoz ___ mg/dL @ ___ saat",
      "Resüsitasyon: ___ (rutin / ısıtma+aspirasyon / PPV / intubasyon)",
      "CCHD taraması: ___ (negatif / pozitif)",
      "Ampirik antibiyotik: ___ (ampisilin 50 mg/kg q12h + gentamisin 4 mg/kg q24h)",
      "Beslenme: ___ (anne sütü / formül / NG / TPN)",
      "Disposition: ___ (YYBÜ / Neonatal servis / Anne yanı / Transport)",
    ],
  },
  "Gebelik Komplikasyonları": {
    baslik: "GEBELİK KOMPLİKASYONLARI — ACOG / HELLP / EKTOPİK",
    ek_bilgiler: [
      "Gebelik haftası: ___ hf · Paritesi: G___P___A___",
      "Son adet (LMP): ___ · Tahmini doğum tarihi (EDD): ___",
      "Ana yakınma: ___ (HT/kanama/ağrı/baş ağrısı/görme/konvülsiyon)",
      "Vital: SKB/DKB ___/___ · Nabız ___/dk · SS ___/dk · SpO₂ ___% · Temp ___°C",
      "Preeklampsi (ACOG 2020):",
      "  - HT: ___ (SKB ≥140 / DKB ≥90)",
      "  - Proteinuri: ___ mg/24sa veya ___ +dipstick",
      "  - Şiddet kriterleri: ___ / 8",
      "  - Tanı: ___ (Yok / Preeklampsi / Şiddetli / Eklampsi)",
      "HELLP: H ___ · EL (AST ___) · LP (Plt ___k)",
      "Ektopik: β-hCG ___ · TVUSG ___ · Adneksal kitle ___",
      "Antepartum kanama: Miktar ___ · Karakter ___ · CTG ___",
      "Lab: Hgb ___ · Plt ___ · Kre ___ · AST/ALT ___ · LDH ___ · D-dimer ___",
      "Tedavi: MgSO₄ ___ · Antihipertansif ___ · Kortikosteroid (24-34 hf) ___",
      "Anti-D (Rh negatifse): ___",
      "Disposition: ___ (OR Acil C/S / Obstetrik YBÜ / KD servis / Gözlem)",
    ],
  },
  "Postpartum Kanama": {
    baslik: "POSTPARTUM KANAMA (PPH) — ACOG / 4T / MTP",
    ek_bilgiler: [
      "Doğum tipi: ___ (NSD / C/S / Vakum / Forseps) · Saat: ___",
      "Gebelik süresi: ___ hf · Parite: G___P___A___ · Önceki PPH: ___",
      "Doğum sonrası süre: ___ saat (primer <24sa / sekonder 24sa-6hf)",
      "Plasenta: ayrılma süresi ___ dk · tamlık ___ (tam / eksik)",
      "Kanama miktarı: ___ mL · Sınıflama: ___ (1/2/3/4)",
      "Vital: SKB/DKB ___/___ · Nabız ___ · Şok İndeksi ___ (>0.9 uyarı)",
      "4T:",
      "  - TONUS: Fundus ___ · Oksitosin yanıtı ___",
      "  - TRAVMA: Serviks/vajinal lazerasyon ___ · Uterin rüptür ___",
      "  - DOKU: Plasenta retansiyonu ___ · Akreta ___",
      "  - TROMBİN: Koagülopati ___ · DIC ___ · Antikoagülan ___",
      "ABC Score (Nunez): ___/4 → MTP endikasyonu: ___",
      "Lab: Hgb ___ · Hct ___ · Plt ___ · Fibrinojen ___ · INR ___",
      "Tedavi adımları:",
      "  1) 2 geniş IV ___ G · Kristalloid ___ mL",
      "  2) Uterotonikler: Oksitosin ___ IU · Metilergonovin ___ · Karboprost ___ · Misoprostol ___",
      "  3) TXA (<3 sa): ___ g IV",
      "  4) Bakri Balon: ___ mL SF",
      "  5) Cerrahi: B-Lynch ___ · O'Leary ___ · Histerektomi ___",
      "  6) MTP (1:1:1): ES ___ Ü · TDP ___ Ü · Plt ___ aferez · Kriyo ___ Ü",
      "Hedef: Hgb >8 · Plt >50k · Fibrinojen >200 · İdrar >30 mL/sa · Laktat <2",
      "Anti-D (Rh negatifse): ___",
      "Disposition: ___ (OR / Obs YBÜ / KD servis / Doğumhane gözlem)",
    ],
  },
  "Zehirlenme": {
    baslik: "TOKSİKOLOJİ / ZEHİRLENME — PSS / TOXIDROME / ANTİDOT",
    ek_bilgiler: [
      "Şüpheli ajan: ___ (asetaminofen / opioid / TCA / benzodiazepin / organofosfat / CO / metanol / etilen glikol / digoksin / bilinmeyen)",
      "Alım şekli: ___ (kasıtlı / kazaen / istismar / iatrojenik)",
      "Alım zamanı: ___ saat önce · Tahmini miktar: ___ mg veya mg/kg",
      "Alım yolu: ___ (oral / parenteral / inhalasyon / dermal / oküler)",
      "Ko-ingestion: ___ (alkol / diğer ilaç)",
      "PSS Grade (max): ___/4 — Organ sistemleri:",
      "  - SSS: ___ (GKS ___, konvülsiyon ___, koma ___)",
      "  - KV: ___ (nabız ___, SKB ___, aritmi ___)",
      "  - Respiratuar: ___ (SpO₂ ___, RR ___, entübasyon ___)",
      "  - GİS: ___ · Hepatik: AST ___, INR ___ · Renal: Kre ___",
      "  - Metabolik: pH ___, laktat ___, anyon gap ___",
      "Toxidrome: ___ (antikolinerjik / opioid / kolinerjik / sempatomimetik / serotonin / NMS)",
      "Rumack-Matthew (asetaminofen): ___ μg/mL @ ___ saat — tedavi çizgisi ___",
      "COHb (CO): ___ % · Osmolar gap: ___ mOsm/L (toksik alkol)",
      "Antidot: ___ (NAC / nalokson / atropin+2-PAM / fomepizol / DigiFab / flumazenil)",
      "Dekontaminasyon: ___ (aktif kömür ___ g, alım <1 sa: evet/hayır)",
      "UZEM (114) danışması: ___ (protokol no: ___)",
      "Psikiyatri: ___ (intihar riski: düşük/orta/yüksek)",
      "Disposition: ___ (YBÜ / Monitörlü servis / Gözlem / Taburcu)",
    ],
  },
  "Bel Ağrısı": {
    baslik: "BEL AĞRISI — STarT BACK / RED FLAGS",
    ek_bilgiler: [
      "Ağrı süresi: ___ (akut <6 hf / subakut 6-12 hf / kronik >12 hf)",
      "Ağrı karakteri: ___ (mekanik / inflamatuar / radiküler / viseral)",
      "Şiddet (NRS): ___/10 · Gece ağrısı: ___",
      "Radiküler yayılım: ___ (L4/L5/S1 dermatom)",
      "Mekanik tetikleyici: ___ (eğilme, kaldırma, öksürük)",
      "Kırmızı Bayraklar:",
      "  - Cauda equina: Saddle anestezi ___ · İdrar retansiyonu ___ · Fekal inkontinans ___",
      "  - Enfeksiyon: Ateş ___ · IVDU ___ · İmmünsupresyon ___ · Spinal cerrahi ___",
      "  - Malignite: Ca öyküsü ___ · Kilo kaybı ___ · Yaş ≥50 ___",
      "  - Kırık: Yaş ≥70 ___ · Osteoporoz ___ · Steroid ___ · Travma ___",
      "  - AAA: Pulsatil kitle ___ · Ani şiddetli ağrı ___ · Hipotansiyon ___",
      "Fizik bulgular: SLR ___ · Cross-SLR ___ · Motor (L2-S1) ___ · Duyu ___ · DTR ___",
      "Perineal duyu + anal tonus: ___ (cauda equina şüphesinde zorunlu)",
      "STarT Back Skoru: ___/9 (fiziksel ___ / psikososyal ___)",
      "Görüntüleme: ___ (yalnızca endikasyonla)",
      "Disposition: ___ (Taburcu / Poliklinik / Yatış / Nöroşir OR)",
    ],
  },
  "GİS Kanama": {
    baslik: "GASTROİNTESTİNAL KANAMA — GBS/ROCKALL/AIMS65",
    ek_bilgiler: [
      "Kanama tipi: ___ (üst / alt / okkült / belirsiz)",
      "Başlangıç: ___ (zaman, şiddet, süreklilik)",
      "Hematemez / kahve telvesi: ___",
      "Melena: ___ (miktar, süre)",
      "Hematokezya: ___ · Kanlı ishal: ___",
      "Öncesi: Şiddetli kusma ___ · NSAİİ ___ · ASA/antiplatelet ___ · Antikoagülan ___",
      "Kronik alkol: ___ · Karaciğer hastalığı / siroz: ___",
      "Bilinen varis öyküsü: ___ · Bilinen PUB: ___",
      "Aortik greft öyküsü: ___ (aorto-enterik fistül riski)",
      "Son endoskopi: ___ (tarih, bulgu)",
      "BUN/Kreatinin oranı: ___ (>30 üst GİS göstergesi)",
      "Hemoglobin baseline vs şu an: ___ → ___",
      "Glasgow-Blatchford: ___/23 · Rockall (pre): ___/7 · AIMS65: ___/5",
      "Şok İndeksi: ___ · Transfüzyon ihtiyacı: ___",
      "Endoskopi: ___ (≤12 sa / ≤24 sa / ayaktan) · Forrest: ___",
      "PPI: ___ (80 mg IV bolus + 8 mg/sa) · Oktreotid (varis): ___ · Seftriakson (siroz): ___",
      "Disposition: ___ (YBÜ / Monitörlü servis / Servis / Ayaktan endoskopi)",
    ],
  },
};

// ─────────── FİZİK MUAYENE BÖLÜMLERİ ───────────
const MUAYENE_BOLUMLERI = {
  solunum: {
    baslik: "Solunum Sistemi",
    norm: "Her iki hemitoraks solunuma eşit katılıyor, solunum sesleri doğal",
    bulgular: [
      "Bilateral ral", "Tek taraflı ral", "Ronküs", "Wheezing",
      "Stridor", "Pleural friction", "Tek taraflı azalmış solunum sesi",
      "Ortopne", "Santral siyanoz", "Periferik siyanoz", "Solukluk"
    ],
  },
  kvs: {
    baslik: "Kardiyovasküler Sistem",
    norm: "Ritmik, kalp sesleri normal, S3/S4 yok, üfürüm yok",
    bulgular: [
      "S3 galop", "S4 galop", "Sistolik üfürüm", "Diastolik üfürüm",
      "Juguler venöz dolgunluk (JVD)", "Perikardiyal frotman",
      "Pretibial ödem (bilateral)", "Tek taraflı bacak ödemi",
      "Hipotansiyon", "Kollar arası nabız/KB farkı",
      "Bradikardi", "Taşikardi", "Ortostatik hipotansiyon"
    ],
  },
  bas_boyun: {
    baslik: "Baş-Boyun",
    norm: "Orafaringeal hafif hiperemi, timpanik membran bakısı normal, tonsiller hipertrofi (-)",
    bulgular: [
      "Orafarenkste eksüda", "Tonsiller hipertrofi", "Peritonsiller apse",
      "Servikal lenfadenopati", "Ense sertliği", "Tiroid büyümesi",
      "Konjonktiva soluk/sarı", "Skleral ikter", "Periorbital ödem",
      "Yüzde asimetri", "Trismus", "Karotis üfürüm"
    ],
  },
  gi: {
    baslik: "GİS",
    norm: "Batın rahat, yumuşak. Hassasiyet (-), defans (-), rebound (-), barsak sesleri olağan",
    bulgular: [
      "Defans", "Rebound", "Rijidite", "Murphy bulgusu",
      "Sağ alt kadran hassasiyet", "Sol alt kadran hassasiyet",
      "Epigastrik hassasiyet", "Distansiyon", "Hepatomegali", "Splenomegali",
      "Pulsatil kitle (AAA şüphesi)", "Rektal kanama", "Melena",
      "Barsak sesleri artmış", "Barsak sesleri azalmış / yok"
    ],
  },
  gu: {
    baslik: "GÜ Sistem",
    norm: "Kostovertebral açı hassasiyeti (-), suprapubik hassasiyet (-), hematüri (-)",
    bulgular: [
      "Sağ KVA hassasiyet", "Sol KVA hassasiyet",
      "Suprapubik hassasiyet", "Makroskopik hematüri",
      "İdrar retansiyonu", "Saddle anestezi"
    ],
  },
  ekstremite: {
    baslik: "Ekstremiteler",
    norm: "Periferik nabızlar açık, palpabl, ekstremitelerde çap farkı (-), ödem (-)",
    bulgular: [
      "Pretibial ödem (bilateral)", "Tek taraflı bacak şişlik/hassasiyet",
      "Periferik nabız azalmış/yok", "Ekstremite çap farkı",
      "Hiperemi", "Eklem şişlik/sıcaklık",
      "Ekstremitede solukluk/soğukluk", "Kompartman bulgusu"
    ],
  },
  norolojik: {
    baslik: "Nörolojik Muayene",
    norm: "GKS 15 (E4M6V5), oryante koopere, kranial sinirler intakt, motor 5/5, duyu doğal, DTR ++, meninks irritasyon (-)",
    bulgular: [
      "Yüz asimetrisi", "Konuşma bozukluğu (dizartri/afazi)",
      "Tek taraflı motor zaaf", "Bilateral motor zaaf",
      "Duyu defisiti", "Kranial sinir defisiti", "Pupil anizokori",
      "Pupil ışık refleksi yok", "Ataksi", "Dismetri", "Nistagmus",
      "Ense sertliği", "Kernig/Brudzinski (+)",
      "Babinski (+)", "Postiktal letarji",
      "Saddle anestezi", "Anal tonus azalmış"
    ],
  },
  cilt_genel: {
    baslik: "Cilt / Genel",
    norm: "Cilt turgor-tonusu doğal, ikter (-), siyanoz (-), döküntü (-)",
    bulgular: [
      "Soğuk soluk cilt", "Terleme/diyaforez",
      "Ürtiker", "Anjiyoödem", "Peteşi/purpura", "Eksantem",
      "Marbling", "Sarılık (ikter)", "Soluk cilt"
    ],
  },
};

// ─────────── EŞLİK EDEN SEMPTOMLAR ───────────
const ESLIK_EDEN_SEMPTOMLAR = [
  "Bulantı", "Kusma", "Terleme", "Çarpıntı", "Baş dönmesi",
  "Senkop", "Nefes darlığı", "Ateş", "Üşüme/titreme",
  "Halsizlik", "Anoreksi", "Kilo kaybı", "Geceleri terleme"
];

// ─────────── ŞABLON OTOMATİK DOLDURMA ───────────
// Senaryo özel şablonundaki vital placeholder'ları
// (___) form değerleriyle değiştirir.
function autofillSenaryoOzel(template, data) {
  if (!template) return template;
  let s = template;
  const v = data.vital || {};
  const gks = (+data.gks_e || 0) + (+data.gks_v || 0) + (+data.gks_m || 0);

  // Yardımcı: "ETİKET[: ]___" pattern'inde ___ → değer
  // (Sadece "___" başka sayı/sembol takip etmiyorsa)
  const replaceLabel = (label, value) => {
    if (value === undefined || value === null || value === "") return;
    // "SKB ___" ya da "SKB: ___" ya da "SKB :___"
    const re = new RegExp(`(${label})([\\s:=]+)___(?![\\d/])`, "gu");
    s = s.replace(re, (_, lbl, sep) => `${lbl}${sep}${value}`);
  };

  // Vital değerler
  replaceLabel("Sistolik KB", v.skb);
  replaceLabel("SKB", v.skb);
  replaceLabel("Diastolik KB", v.dkb);
  replaceLabel("DKB", v.dkb);
  replaceLabel("Nabız", v.nabiz);
  replaceLabel("Nb", v.nabiz);
  replaceLabel("HR", v.nabiz);
  replaceLabel("Solunum", v.solunum);
  replaceLabel("Solunum sayısı", v.solunum);
  replaceLabel("SS", v.solunum);
  replaceLabel("RR", v.solunum);
  replaceLabel("SpO₂", v.spo2);
  replaceLabel("SpO2", v.spo2);
  replaceLabel("Ateş", v.ates);
  replaceLabel("Temp", v.ates);
  replaceLabel("Vücut ısısı", v.ates);

  // GKS / GCS toplam
  if (gks > 0) {
    replaceLabel("GKS", gks);
    replaceLabel("GCS", gks);
  }

  // Yaş, cinsiyet
  if (data.yas) replaceLabel("Yaş", data.yas);
  if (data.cinsiyet) replaceLabel("Cinsiyet", data.cinsiyet);

  // SKB/DKB birleşik: "SKB/DKB ___/___" → "85/50"
  if (v.skb && v.dkb) {
    s = s.replace(/SKB\/DKB([\s:=]+)___\/___/gu, (_, sep) => `SKB/DKB${sep}${v.skb}/${v.dkb}`);
    s = s.replace(/SKB\/DKB:\s*___\s*\/\s*___/gu, `SKB/DKB: ${v.skb}/${v.dkb}`);
    s = s.replace(/TA([\s:=]+)___\/___/gu, (_, sep) => `TA${sep}${v.skb}/${v.dkb}`);
  }

  // E___ V___ M___ (GKS bileşenleri)
  if (data.gks_e) s = s.replace(/E___/g, `E${data.gks_e}`);
  if (data.gks_v) s = s.replace(/V___/g, `V${data.gks_v}`);
  if (data.gks_m) s = s.replace(/M___/g, `M${data.gks_m}`);

  return s;
}

// ─────────── EPİKRİZ OLUŞTURUCU ───────────
function generateEpikriz(d) {
  const senaryo = SENARYOLAR[d.senaryo] || SENARYOLAR["Göğüs Ağrısı"];
  const lines = [];
  const sb = (s) => lines.push(s);

  // Genel durum & bilinç
  let gd = `Genel Durumu: ${d.genel_durum || "İyi"}. Bilinci: ${d.bilinc || "Açık, koopere, oryante"}.`;
  if (d.gks_e || d.gks_m || d.gks_v) {
    const e = d.gks_e || 4, m = d.gks_m || 6, v = d.gks_v || 5;
    gd += ` GKS ${e + m + v} (E${e}M${m}V${v}).`;
  }
  sb(gd);
  sb("");

  // Şikayet & hikaye
  sb("ŞİKAYET VE HİKAYE:");
  let hikaye = "";
  if (d.yas) hikaye += `${d.yas} yaşında `;
  if (d.cinsiyet) hikaye += (d.cinsiyet === "Erkek" ? "erkek" : "kadın") + " hasta";
  if (d.bas_yakinma) hikaye += `, ${d.bas_yakinma} şikayetiyle başvurdu.`;
  else hikaye += " başvurdu.";
  sb(hikaye);
  if (d.hikaye_detay) sb(d.hikaye_detay);
  if (d.eslik_eden && d.eslik_eden.length) sb("Eşlik eden: " + d.eslik_eden.join(", ") + ".");
  if (d.risk_faktorleri) sb("Risk faktörleri: " + d.risk_faktorleri + ".");
  sb("");

  // Senaryo özel ek bilgiler (varsa hekim doldurmuş; yoksa şablon olduğu gibi)
  if (d.senaryo_ozel && d.senaryo_ozel.trim()) {
    sb("SENARYO ÖZEL BİLGİLER:");
    sb(d.senaryo_ozel.trim());
    sb("");
  } else if (senaryo.ek_bilgiler && senaryo.ek_bilgiler.length) {
    sb("SENARYO ÖZEL BİLGİLER:");
    senaryo.ek_bilgiler.forEach(l => sb(l));
    sb("");
  }

  // Vital
  const v = d.vital || {};
  sb("VİTAL BULGULAR:");
  sb(`TA: ${v.skb || "___"}/${v.dkb || "___"} mmHg  Nb: ${v.nabiz || "___"}/dk  ` +
     `SS: ${v.solunum || "___"}/dk  SpO₂: %${v.spo2 || "___"}  Ateş: ${v.ates || "___"}°C`);
  sb("");

  // Sistem muayeneleri
  for (const [k, sec] of Object.entries(MUAYENE_BOLUMLERI)) {
    const findings = (d.muayene && d.muayene[k]) || [];
    if (findings.length === 0) {
      sb(sec.baslik + ": " + sec.norm);
    } else {
      // Bulgu varsa: norm + (bulgu1 (+), bulgu2 (+))
      const positifList = findings.map(b => `${b} (+)`).join(", ");
      sb(sec.baslik + ": " + sec.norm + " · " + positifList);
    }
    // Senaryo özel ek (örn. baş-boyun "Karotis üfürüm (-)")
    if (k === "bas_boyun" && senaryo.bas_boyun_ek) {
      sb("  • " + senaryo.bas_boyun_ek);
    }
    if (k === "norolojik" && senaryo.neuro_ek) {
      sb("  • " + senaryo.neuro_ek);
    }
    sb("");
  }

  // EKG
  if (senaryo.ekg) {
    sb("EKG: " + senaryo.ekg);
    sb("");
  }

  // İmza alanı
  sb("─".repeat(64));
  sb(`Tarih/Saat: ${new Date().toLocaleString("tr-TR")}`);
  sb("Hekim: ___________________________");

  return lines.join("\n");
}

// ─────────── EXPORT (window) ───────────
window.SENARYOLAR = SENARYOLAR;
window.MUAYENE_BOLUMLERI = MUAYENE_BOLUMLERI;
window.ESLIK_EDEN_SEMPTOMLAR = ESLIK_EDEN_SEMPTOMLAR;
window.generateEpikriz = generateEpikriz;
window.autofillSenaryoOzel = autofillSenaryoOzel;
