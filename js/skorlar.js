/* ============================================
   suleymanalpar.com — Klinik Skor Hesaplayıcılar
   26 skor, 11 kategori; tamamen istemci tarafı.
   Yalnızca sağlık çalışanlarına yöneliktir.
   Kaynak: ilgili skorların orijinal yayınları (her kartta belirtilmiştir).
   ============================================ */

const TIP = { INT: "int", FLOAT: "float", BOOL: "bool", SELECT: "select", MULTISELECT: "multiselect" };

// Yardımcı: nested helper for risk renk
function risk(label, color, extras = {}) {
  return { risk_sinifi: label, renk: color, ...extras };
}

const KATALOG = [
  // ═════════════════ ACS / Göğüs Ağrısı ═════════════════
  {
    id: "heart", ad: "HEART Skoru", kategori: "ACS / Göğüs Ağrısı",
    aciklama: "Acil servise göğüs ağrısı ile başvuran hastalarda 6 haftalık MACE riskini tahmin eder.",
    referans: "Backus BE, Int J Cardiol 2013;168:2153-2158",
    url: "https://www.mdcalc.com/calc/1752/heart-score-major-cardiac-events",
    alanlar: [
      { key: "hikaye_tipi", label: "Hikaye", tip: TIP.SELECT, varsayilan: "orta_suspicion", opsiyonlar: [
        ["yuksek_suspicion", "Yüksek şüphe — tipik AKS hikayesi (2 pt)"],
        ["orta_suspicion", "Orta — kısmen tipik (1 pt)"],
        ["dusuk_suspicion", "Düşük — atipik (0 pt)"],
      ]},
      { key: "ekg", label: "EKG", tip: TIP.SELECT, varsayilan: "normal", opsiyonlar: [
        ["anormal_spesifik", "ST depresyonu / T inversiyonu / LBBB (2 pt)"],
        ["nonspesifik", "Non-spesifik repolarizasyon (1 pt)"],
        ["normal", "Normal (0 pt)"],
      ]},
      { key: "yas", label: "Yaş", tip: TIP.INT, min: 0, max: 120, varsayilan: 55 },
      { key: "risk_faktorleri", label: "Risk faktörleri", tip: TIP.MULTISELECT,
        opsiyonlar: ["HT", "DM", "Dislipidemi", "Sigara", "Ailede erken KAH", "Obezite"] },
      { key: "bilinen_kad", label: "Bilinen KAH var mı?", tip: TIP.BOOL },
      { key: "troponin_durum", label: "Troponin", tip: TIP.SELECT, varsayilan: "normal", opsiyonlar: [
        ["yuksek", "Normal ÜSL >3× üstünde (2 pt)"],
        ["hafif_yuksek", "Normal ÜSL 1-3× üstünde (1 pt)"],
        ["normal", "Normal (0 pt)"],
      ]},
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += { yuksek_suspicion: 2, orta_suspicion: 1, dusuk_suspicion: 0 }[d.hikaye_tipi] ?? 0;
      toplam += { anormal_spesifik: 2, nonspesifik: 1, normal: 0 }[d.ekg] ?? 0;
      const yas = +d.yas || 0;
      toplam += yas >= 65 ? 2 : yas >= 45 ? 1 : 0;
      const rfSayisi = (d.risk_faktorleri || []).length + (d.bilinen_kad ? 1 : 0);
      toplam += rfSayisi >= 3 || d.bilinen_kad ? 2 : rfSayisi >= 1 ? 1 : 0;
      toplam += { yuksek: 2, hafif_yuksek: 1, normal: 0 }[d.troponin_durum] ?? 0;
      let r;
      if (toplam <= 3) r = risk("Düşük risk", "yesil", { mace_riski: "%0.9-1.7" });
      else if (toplam <= 6) r = risk("Orta risk", "sari", { mace_riski: "%12-16.6" });
      else r = risk("Yüksek risk", "kirmizi", { mace_riski: "%50-65" });
      return { toplam, ...r };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 10, risk_key: "risk_sinifi",
      ek_satirlar: [["mace_riski", "6 haftalık MACE riski"]] },
  },

  {
    id: "timi_uanstemi", ad: "TIMI Skoru (UA/NSTEMI)", kategori: "ACS / Göğüs Ağrısı",
    aciklama: "Unstable angina ve NSTEMI için 14 günlük ölüm/MI/acil revaskülarizasyon riski.",
    referans: "Antman EM, JAMA 2000;284:835-842",
    url: "https://www.mdcalc.com/calc/111/timi-risk-score-ua-nstemi",
    alanlar: [
      { key: "yas_65", label: "Yaş ≥65", tip: TIP.BOOL },
      { key: "risk_faktoru_sayisi", label: "KAH risk faktörü sayısı (0-5)", tip: TIP.INT, min: 0, max: 5, varsayilan: 0,
        aciklama: "HT, DM, dislipidemi, sigara, ailede erken KAH" },
      { key: "bilinen_kah_50", label: "Bilinen koroner stenoz ≥%50", tip: TIP.BOOL },
      { key: "asa_7gun", label: "Son 7 gün içinde ASA kullanımı", tip: TIP.BOOL },
      { key: "siddetli_anjina_24s", label: "Son 24 saatte ≥2 anjina epizodu", tip: TIP.BOOL },
      { key: "st_deviasyon_05mm", label: "EKG'de ST deviasyonu ≥0.5 mm", tip: TIP.BOOL },
      { key: "kardiyak_marker_pozitif", label: "Troponin/CK-MB pozitif", tip: TIP.BOOL },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += d.yas_65 ? 1 : 0;
      toplam += (+d.risk_faktoru_sayisi >= 3) ? 1 : 0;
      toplam += d.bilinen_kah_50 ? 1 : 0;
      toplam += d.asa_7gun ? 1 : 0;
      toplam += d.siddetli_anjina_24s ? 1 : 0;
      toplam += d.st_deviasyon_05mm ? 1 : 0;
      toplam += d.kardiyak_marker_pozitif ? 1 : 0;
      const olayMap = { 0: "%4.7", 1: "%4.7", 2: "%8.3", 3: "%13.2", 4: "%19.9", 5: "%26.2", 6: "%40.9", 7: "%40.9" };
      let r;
      if (toplam <= 2) r = risk("Düşük risk", "yesil");
      else if (toplam <= 4) r = risk("Orta risk", "sari");
      else r = risk("Yüksek risk", "kirmizi");
      return { toplam, ...r, olay_riski: olayMap[toplam] };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 7, risk_key: "risk_sinifi",
      ek_satirlar: [["olay_riski", "14 günlük olumsuz olay riski"]] },
  },

  {
    id: "grace", ad: "GRACE Skoru (basitleştirilmiş)", kategori: "ACS / Göğüs Ağrısı",
    aciklama: "ACS hastalarında hastane içi mortalite tahmini (basitleştirilmiş 8 değişken).",
    referans: "Granger CB, Arch Intern Med 2003;163:2345-2353",
    url: "https://www.mdcalc.com/calc/1099/grace-acs-risk-mortality-calculator",
    alanlar: [
      { key: "yas", label: "Yaş", tip: TIP.INT, min: 0, max: 120, varsayilan: 65 },
      { key: "nabiz", label: "Nabız (/dk)", tip: TIP.INT, min: 20, max: 250, varsayilan: 80 },
      { key: "sistolik_kb", label: "Sistolik KB (mmHg)", tip: TIP.INT, min: 40, max: 260, varsayilan: 120 },
      { key: "kreatinin", label: "Kreatinin (mg/dL)", tip: TIP.FLOAT, min: 0.1, max: 20, step: 0.1, varsayilan: 1.0 },
      { key: "killip_sinif", label: "Killip sınıfı", tip: TIP.SELECT, varsayilan: "I", opsiyonlar: [
        ["I", "I — Kalp yetmezliği bulgusu yok"],
        ["II", "II — S3 gallop veya akciğer ralleri"],
        ["III", "III — Akut pulmoner ödem"],
        ["IV", "IV — Kardiyojenik şok"],
      ]},
      { key: "kardiyak_arrest_basvuru", label: "Başvuruda kardiyak arrest", tip: TIP.BOOL },
      { key: "st_deviasyon", label: "EKG'de ST deviasyonu", tip: TIP.BOOL },
      { key: "kardiyak_marker_pozitif", label: "Kardiyak marker pozitif", tip: TIP.BOOL },
    ],
    compute: (d) => {
      // Basitleştirilmiş GRACE: yaklaşık puanlama (gerçek GRACE log-regression).
      let toplam = 0;
      const yas = +d.yas;
      toplam += yas >= 90 ? 100 : yas >= 80 ? 75 : yas >= 70 ? 53 : yas >= 60 ? 35 : yas >= 50 ? 17 : yas >= 40 ? 8 : 0;
      const n = +d.nabiz;
      toplam += n >= 200 ? 46 : n >= 150 ? 38 : n >= 110 ? 24 : n >= 90 ? 15 : n >= 70 ? 9 : n >= 50 ? 3 : 0;
      const sbp = +d.sistolik_kb;
      toplam += sbp <= 79 ? 58 : sbp <= 99 ? 53 : sbp <= 119 ? 43 : sbp <= 139 ? 34 : sbp <= 159 ? 24 : sbp <= 199 ? 10 : 0;
      const kr = +d.kreatinin;
      toplam += kr >= 4 ? 28 : kr >= 3 ? 21 : kr >= 2 ? 14 : kr >= 1.2 ? 7 : kr >= 0.4 ? 4 : 1;
      toplam += { I: 0, II: 21, III: 43, IV: 64 }[d.killip_sinif] ?? 0;
      toplam += d.kardiyak_arrest_basvuru ? 39 : 0;
      toplam += d.st_deviasyon ? 28 : 0;
      toplam += d.kardiyak_marker_pozitif ? 14 : 0;
      let r, mort;
      if (toplam <= 108) { r = risk("Düşük", "yesil"); mort = "<%1"; }
      else if (toplam <= 140) { r = risk("Orta", "sari"); mort = "%1-3"; }
      else { r = risk("Yüksek", "kirmizi"); mort = ">%3"; }
      return { toplam, ...r, hastane_ici_mortalite: mort };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: null, risk_key: "risk_sinifi",
      ek_satirlar: [["hastane_ici_mortalite", "Hastane içi mortalite riski"]] },
  },

  // ═════════════════ PE ═════════════════
  {
    id: "wells_pe", ad: "Wells Skoru (PE)", kategori: "PE / Pulmoner Emboli",
    aciklama: "PE şüphesinde pre-test olasılık. Düşük (≤4) D-dimer ile, yüksek (>4) görüntüleme ile değerlendirilir.",
    referans: "Wells PS, Thromb Haemost 2000;83:416-420",
    url: "https://www.mdcalc.com/calc/115/wells-criteria-pulmonary-embolism",
    alanlar: [
      { key: "dvt_klinik_bulgu", label: "DVT klinik bulgusu (bacak şişlik/ağrı)", tip: TIP.BOOL },
      { key: "pe_en_olasilik", label: "PE en olası tanı", tip: TIP.BOOL },
      { key: "kalp_hizi_100", label: "Kalp hızı >100/dk", tip: TIP.BOOL },
      { key: "immobilizasyon", label: "İmmobilizasyon / cerrahi (4 hafta içinde)", tip: TIP.BOOL },
      { key: "onceki_dvt_pe", label: "Önceki DVT veya PE öyküsü", tip: TIP.BOOL },
      { key: "hemoptizi", label: "Hemoptizi", tip: TIP.BOOL },
      { key: "aktif_kanser", label: "Aktif kanser (6 ay içinde tedavi/palyatif)", tip: TIP.BOOL },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += d.dvt_klinik_bulgu ? 3 : 0;
      toplam += d.pe_en_olasilik ? 3 : 0;
      toplam += d.kalp_hizi_100 ? 1.5 : 0;
      toplam += d.immobilizasyon ? 1.5 : 0;
      toplam += d.onceki_dvt_pe ? 1.5 : 0;
      toplam += d.hemoptizi ? 1 : 0;
      toplam += d.aktif_kanser ? 1 : 0;
      let r, prev;
      if (toplam <= 4) { r = risk("PE olası değil", "yesil"); prev = "%12.1"; }
      else { r = risk("PE olası", "kirmizi"); prev = "%37.1"; }
      // 3 seviyeli alternatif
      let r3;
      if (toplam < 2) r3 = "Düşük (%3.6)";
      else if (toplam <= 6) r3 = "Orta (%20.5)";
      else r3 = "Yüksek (%66.7)";
      return { toplam, ...r, pe_prevalans: prev, uc_seviyeli: r3 };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 12.5, risk_key: "risk_sinifi",
      ek_satirlar: [["pe_prevalans", "PE prevalansı (2-seviyeli)"], ["uc_seviyeli", "3-seviyeli risk"]] },
  },

  {
    id: "perc", ad: "PERC Kuralı", kategori: "PE / Pulmoner Emboli",
    aciklama: "Wells düşük riskli hastada PE'yi klinik olarak ekarte etme kuralı. 0 ihlalde D-dimer bile gerekmeyebilir.",
    referans: "Kline JA, J Thromb Haemost 2008;6:772-780",
    url: "https://www.mdcalc.com/calc/347/perc-rule-pulmonary-embolism",
    alanlar: [
      { key: "yas_50", label: "Yaş ≥50", tip: TIP.BOOL },
      { key: "kalp_hizi_100", label: "Kalp hızı ≥100/dk", tip: TIP.BOOL },
      { key: "o2_sat_94", label: "SpO₂ <%95 (oda havası)", tip: TIP.BOOL },
      { key: "alt_ekstremite_dvt", label: "Tek taraflı bacak şişliği", tip: TIP.BOOL },
      { key: "hemoptizi", label: "Hemoptizi", tip: TIP.BOOL },
      { key: "exojen_ostrojen", label: "Ekzojen östrojen (OKS/HRT)", tip: TIP.BOOL },
      { key: "onceki_dvt_pe", label: "Önceki DVT/PE öyküsü", tip: TIP.BOOL },
      { key: "cerrahi_4hafta", label: "Son 4 haftada cerrahi/travma", tip: TIP.BOOL },
    ],
    compute: (d) => {
      const ihlaller = [];
      if (d.yas_50) ihlaller.push("Yaş ≥50");
      if (d.kalp_hizi_100) ihlaller.push("Kalp hızı ≥100/dk");
      if (d.o2_sat_94) ihlaller.push("SpO₂ <%95");
      if (d.alt_ekstremite_dvt) ihlaller.push("Tek taraflı bacak şişliği");
      if (d.hemoptizi) ihlaller.push("Hemoptizi");
      if (d.exojen_ostrojen) ihlaller.push("Ekzojen östrojen");
      if (d.onceki_dvt_pe) ihlaller.push("Önceki DVT/PE");
      if (d.cerrahi_4hafta) ihlaller.push("Son 4 haftada cerrahi/travma");
      const ekarte = ihlaller.length === 0;
      return {
        ekarte_edilebilir: ekarte,
        ihlaller,
        risk_sinifi: ekarte ? "PE ekarte edilebilir" : `PE ekarte edilemez (${ihlaller.length} ihlal)`,
        renk: ekarte ? "yesil" : "kirmizi",
      };
    },
    sonuc_sablon: { ozel: "perc", toplam_key: null, max_sabit: null, risk_key: "risk_sinifi" },
  },

  {
    id: "geneva_modified", ad: "Modified Geneva Skoru", kategori: "PE / Pulmoner Emboli",
    aciklama: "PE için objektif (subjektif Gestalt'e bağımlı olmayan) klinik olasılık skoru.",
    referans: "Le Gal G, Ann Intern Med 2006;144:165-171",
    url: "https://www.mdcalc.com/calc/1750/geneva-score-revised-pulmonary-embolism",
    alanlar: [
      { key: "yas", label: "Yaş", tip: TIP.INT, min: 0, max: 120, varsayilan: 50 },
      { key: "onceki_dvt_pe", label: "Önceki DVT veya PE öyküsü", tip: TIP.BOOL },
      { key: "cerrahi_1ay", label: "Son 1 ayda cerrahi / alt ekstremite fraktürü", tip: TIP.BOOL },
      { key: "aktif_malignite", label: "Aktif malignite", tip: TIP.BOOL },
      { key: "tek_tarafli_alt_ekst_agri", label: "Tek taraflı alt ekstremite ağrısı", tip: TIP.BOOL },
      { key: "hemoptizi", label: "Hemoptizi", tip: TIP.BOOL },
      { key: "nabiz", label: "Kalp hızı (/dk)", tip: TIP.INT, min: 20, max: 250, varsayilan: 85 },
      { key: "bacak_palpasyon_agri_odem", label: "Bacak palpasyonda ağrı + tek taraflı ödem", tip: TIP.BOOL },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += +d.yas >= 65 ? 1 : 0;
      toplam += d.onceki_dvt_pe ? 3 : 0;
      toplam += d.cerrahi_1ay ? 2 : 0;
      toplam += d.aktif_malignite ? 2 : 0;
      toplam += d.tek_tarafli_alt_ekst_agri ? 3 : 0;
      toplam += d.hemoptizi ? 2 : 0;
      const n = +d.nabiz;
      toplam += n >= 95 ? 5 : n >= 75 ? 3 : 0;
      toplam += d.bacak_palpasyon_agri_odem ? 4 : 0;
      let r, prev;
      if (toplam <= 3) { r = risk("Düşük", "yesil"); prev = "%8"; }
      else if (toplam <= 10) { r = risk("Orta", "sari"); prev = "%29"; }
      else { r = risk("Yüksek", "kirmizi"); prev = "%74"; }
      return { toplam, ...r, pe_prevalans: prev };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 25, risk_key: "risk_sinifi",
      ek_satirlar: [["pe_prevalans", "PE prevalansı"]] },
  },

  // ═════════════════ AF / OAK ═════════════════
  {
    id: "cha2ds2_vasc", ad: "CHA₂DS₂-VASc Skoru", kategori: "Atriyal Fibrilasyon / OAK",
    aciklama: "Non-valvuler AF'de inme riski; OAK endikasyonu kararı için.",
    referans: "Lip GYH, Chest 2010;137:263-272 (ESC 2020)",
    url: "https://www.mdcalc.com/calc/801/cha2ds2-vasc-score-atrial-fibrillation-stroke-risk",
    alanlar: [
      { key: "kky", label: "KKY / LV disfonksiyonu (EF <%40)", tip: TIP.BOOL },
      { key: "hipertansiyon", label: "Hipertansiyon", tip: TIP.BOOL },
      { key: "yas", label: "Yaş", tip: TIP.INT, min: 0, max: 120, varsayilan: 70 },
      { key: "diyabet", label: "Diyabet (DM)", tip: TIP.BOOL },
      { key: "inme_oykusu", label: "İnme / TIA / tromboemboli öyküsü", tip: TIP.BOOL },
      { key: "vaskuler_hastalik", label: "Vasküler hastalık (KAH / PAD / aort)", tip: TIP.BOOL },
      { key: "cinsiyet", label: "Cinsiyet", tip: TIP.SELECT, varsayilan: "E", opsiyonlar: [["E", "Erkek"], ["K", "Kadın"]] },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += d.kky ? 1 : 0;
      toplam += d.hipertansiyon ? 1 : 0;
      const yas = +d.yas;
      toplam += yas >= 75 ? 2 : yas >= 65 ? 1 : 0;
      toplam += d.diyabet ? 1 : 0;
      toplam += d.inme_oykusu ? 2 : 0;
      toplam += d.vaskuler_hastalik ? 1 : 0;
      toplam += d.cinsiyet === "K" ? 1 : 0;
      const inmeMap = ["%0.2","%0.6","%2.2","%3.2","%4.8","%7.2","%9.7","%11.2","%10.8","%12.2"];
      let oneri, r;
      if (toplam === 0) { oneri = "OAK gerekmez"; r = risk("Çok düşük", "yesil"); }
      else if ((toplam === 1 && d.cinsiyet === "E") || (toplam === 1 && d.cinsiyet === "K" && false)) {
        oneri = "OAK düşünülebilir"; r = risk("Düşük", "yesil");
      } else if (toplam === 1) { oneri = "OAK gerekmez (sadece kadın cinsiyet)"; r = risk("Çok düşük", "yesil"); }
      else { oneri = "OAK önerilir (ESC: ≥2 erkek / ≥3 kadın)"; r = risk("Yüksek", "kirmizi"); }
      return { toplam, ...r, yillik_inme_riski: inmeMap[Math.min(toplam,9)], oneri };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 9, risk_key: "risk_sinifi",
      ek_satirlar: [["yillik_inme_riski", "Yıllık iskemik inme riski"], ["oneri", "ESC önerisi"]] },
  },

  {
    id: "hasbled", ad: "HAS-BLED Skoru", kategori: "Atriyal Fibrilasyon / OAK",
    aciklama: "OAK altında majör kanama riskini tahmin eder. ≥3 → yüksek risk (ama OAK kontrendikasyonu değil).",
    referans: "Pisters R, Chest 2010;138:1093-1100",
    url: "https://www.mdcalc.com/calc/807/has-bled-score-major-bleeding-risk",
    alanlar: [
      { key: "hipertansiyon_kontrolsuz", label: "Kontrolsüz HT (SKB >160 mmHg)", tip: TIP.BOOL },
      { key: "renal_disfonksiyon", label: "Renal disfonksiyon (Kre ≥2.26 / diyaliz)", tip: TIP.BOOL },
      { key: "kc_disfonksiyonu", label: "KC disfonksiyonu / siroz", tip: TIP.BOOL },
      { key: "inme_oykusu", label: "İnme öyküsü", tip: TIP.BOOL },
      { key: "kanama_oykusu", label: "Major kanama öyküsü / predispozisyon", tip: TIP.BOOL },
      { key: "labil_inr", label: "Labil INR (TTR <%60)", tip: TIP.BOOL },
      { key: "yas", label: "Yaş", tip: TIP.INT, min: 0, max: 120, varsayilan: 70 },
      { key: "nsaid_antiplatelet", label: "NSAID / antiplatelet kullanımı", tip: TIP.BOOL },
      { key: "alkol_fazla", label: "Alkol ≥8 içki/hafta", tip: TIP.BOOL },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += d.hipertansiyon_kontrolsuz ? 1 : 0;
      toplam += d.renal_disfonksiyon ? 1 : 0;
      toplam += d.kc_disfonksiyonu ? 1 : 0;
      toplam += d.inme_oykusu ? 1 : 0;
      toplam += d.kanama_oykusu ? 1 : 0;
      toplam += d.labil_inr ? 1 : 0;
      toplam += +d.yas >= 65 ? 1 : 0;
      toplam += d.nsaid_antiplatelet ? 1 : 0;
      toplam += d.alkol_fazla ? 1 : 0;
      const kanMap = ["%1.13","%1.02","%1.88","%3.74","%8.70","%12.5","%12.5","%12.5","%12.5","%12.5"];
      let r, yorum;
      if (toplam <= 1) { r = risk("Düşük", "yesil"); yorum = "OAK güvenli"; }
      else if (toplam === 2) { r = risk("Orta", "sari"); yorum = "Dikkatle başla; risk faktörlerini düzelt"; }
      else { r = risk("Yüksek", "kirmizi"); yorum = "Düzeltilebilir risk faktörleri (HT, INR, NSAID, alkol) optimize edilmeli — OAK kontrendike değildir"; }
      return { toplam, ...r, yillik_kanama_riski: kanMap[Math.min(toplam,9)], yorum };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 9, risk_key: "risk_sinifi",
      ek_satirlar: [["yillik_kanama_riski", "Yıllık major kanama riski"], ["yorum", "Yorum"]] },
  },

  // ═════════════════ Sepsis / Erken Uyarı ═════════════════
  {
    id: "qsofa", ad: "qSOFA", kategori: "Sepsis / Erken Uyarı",
    aciklama: "Enfeksiyon düşünülen hastada mortalite için hızlı tarama. ≥2 → sepsis varsayılarak 1-saat bundle.",
    referans: "Singer M, JAMA 2016;315:801-810 (Sepsis-3)",
    url: "https://www.mdcalc.com/calc/3909/qsofa-quick-sofa-score-sepsis",
    alanlar: [
      { key: "solunum_sayisi", label: "Solunum sayısı (/dk)", tip: TIP.INT, min: 0, max: 80, varsayilan: 18 },
      { key: "sistolik_kb", label: "Sistolik KB (mmHg)", tip: TIP.INT, min: 40, max: 260, varsayilan: 120 },
      { key: "gcs", label: "GCS (toplam)", tip: TIP.INT, min: 3, max: 15, varsayilan: 15 },
      { key: "konfuzyon", label: "Yeni başlangıçlı konfüzyon", tip: TIP.BOOL },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += +d.solunum_sayisi >= 22 ? 1 : 0;
      toplam += +d.sistolik_kb <= 100 ? 1 : 0;
      toplam += (+d.gcs < 15 || d.konfuzyon) ? 1 : 0;
      let r, mort, oneri;
      if (toplam < 2) { r = risk("Düşük risk", "yesil"); mort = "<%3"; oneri = "Sepsis tarama negatif — klinik gözlem"; }
      else { r = risk("Yüksek risk", "kirmizi"); mort = "%24"; oneri = "Sepsis varsayılarak 1-saat bundle başlat (laktat, kültür, antibiyotik)"; }
      return { toplam, max: 3, ...r, mortalite: mort, oneri };
    },
    sonuc_sablon: { toplam_key: "toplam", max_key: "max", risk_key: "risk_sinifi",
      ek_satirlar: [["mortalite", "Mortalite"], ["oneri", "Öneri"]] },
  },

  {
    id: "news2", ad: "NEWS2 (Erken Uyarı)", kategori: "Sepsis / Erken Uyarı",
    aciklama: "Vital bulgular üzerinden erken kötüleşme tahmini. ≥7 acil/YBÜ değerlendirmesi.",
    referans: "Royal College of Physicians NEWS2 2017",
    url: "https://www.rcp.ac.uk/improving-care/resources/national-early-warning-score-news-2/",
    alanlar: [
      { key: "solunum_sayisi", label: "Solunum sayısı (/dk)", tip: TIP.INT, min: 0, max: 80, varsayilan: 16 },
      { key: "spo2", label: "SpO₂ (%)", tip: TIP.INT, min: 50, max: 100, varsayilan: 98 },
      { key: "oksijen_destegi", label: "Oksijen desteği alıyor mu?", tip: TIP.BOOL },
      { key: "sistolik_kb", label: "Sistolik KB (mmHg)", tip: TIP.INT, min: 40, max: 260, varsayilan: 120 },
      { key: "nabiz", label: "Nabız (/dk)", tip: TIP.INT, min: 20, max: 250, varsayilan: 80 },
      { key: "gcs", label: "GCS (toplam)", tip: TIP.INT, min: 3, max: 15, varsayilan: 15 },
      { key: "konfuzyon", label: "Yeni başlangıçlı konfüzyon", tip: TIP.BOOL },
      { key: "ates_deg", label: "Vücut ısısı (°C)", tip: TIP.FLOAT, min: 30, max: 45, step: 0.1, varsayilan: 36.8 },
    ],
    compute: (d) => {
      let toplam = 0;
      const rr = +d.solunum_sayisi;
      toplam += rr <= 8 ? 3 : rr <= 11 ? 1 : rr <= 20 ? 0 : rr <= 24 ? 2 : 3;
      const sp = +d.spo2;
      toplam += sp <= 91 ? 3 : sp <= 93 ? 2 : sp <= 95 ? 1 : 0;
      toplam += d.oksijen_destegi ? 2 : 0;
      const sbp = +d.sistolik_kb;
      toplam += sbp <= 90 ? 3 : sbp <= 100 ? 2 : sbp <= 110 ? 1 : sbp <= 219 ? 0 : 3;
      const n = +d.nabiz;
      toplam += n <= 40 ? 3 : n <= 50 ? 1 : n <= 90 ? 0 : n <= 110 ? 1 : n <= 130 ? 2 : 3;
      toplam += (+d.gcs < 15 || d.konfuzyon) ? 3 : 0;
      const t = +d.ates_deg;
      toplam += t <= 35 ? 3 : t <= 36 ? 1 : t <= 38 ? 0 : t <= 39 ? 1 : 2;
      let r, aksiyon;
      if (toplam <= 0) { r = risk("Düşük", "yesil"); aksiyon = "12 saatte bir vital takibi"; }
      else if (toplam <= 4) { r = risk("Düşük-orta", "sari"); aksiyon = "4-6 saatte bir vital — klinik değerlendirme"; }
      else if (toplam <= 6) { r = risk("Orta", "turuncu"); aksiyon = "Saatte vital — acil hemşire değerlendirmesi, hekim bildirimi"; }
      else { r = risk("Yüksek", "kirmizi"); aksiyon = "Sürekli monitör — kritik bakım/YBÜ değerlendirmesi"; }
      return { toplam, max: 20, ...r, aksiyon };
    },
    sonuc_sablon: { toplam_key: "toplam", max_key: "max", risk_key: "risk_sinifi",
      ek_satirlar: [["aksiyon", "Aksiyon"]] },
  },

  {
    id: "sofa", ad: "SOFA Skoru", kategori: "Sepsis / Erken Uyarı",
    aciklama: "Yoğun bakım organ yetmezliği skoru; sepsis tanısında qSOFA'dan sonra tam SOFA önerilir.",
    referans: "Vincent JL, Intensive Care Med 1996;22:707-710",
    url: "https://www.mdcalc.com/calc/691/sequential-organ-failure-assessment-sofa-score",
    alanlar: [
      { key: "pao2_fio2", label: "PaO₂/FiO₂ oranı", tip: TIP.INT, min: 40, max: 600, varsayilan: 400 },
      { key: "mekanik_ventilasyon", label: "Mekanik ventilasyon altında", tip: TIP.BOOL },
      { key: "trombosit", label: "Trombosit (×10³/µL)", tip: TIP.INT, min: 1, max: 1000, varsayilan: 200 },
      { key: "bilirubin", label: "Bilirubin (mg/dL)", tip: TIP.FLOAT, min: 0.1, max: 50, step: 0.1, varsayilan: 1.0 },
      { key: "oap", label: "Ortalama arter basıncı (mmHg)", tip: TIP.INT, min: 30, max: 150, varsayilan: 75 },
      { key: "vazopressor", label: "Vazopressör kullanımı", tip: TIP.SELECT, varsayilan: "yok", opsiyonlar: [
        ["yok", "Yok"],
        ["dopamin_dusuk", "Dopamin ≤5 µg/kg/dk veya dobutamin"],
        ["dopamin_orta", "Dopamin >5 veya epi/nor ≤0.1 µg/kg/dk"],
        ["dopamin_yuksek", "Dopamin >15 veya epi/nor >0.1 µg/kg/dk"],
      ]},
      { key: "gcs", label: "GCS (toplam)", tip: TIP.INT, min: 3, max: 15, varsayilan: 15 },
      { key: "kreatinin", label: "Kreatinin (mg/dL)", tip: TIP.FLOAT, min: 0.1, max: 20, step: 0.1, varsayilan: 1.0 },
      { key: "idrar_24s", label: "24 saatlik idrar (mL)", tip: TIP.INT, min: 0, max: 10000, varsayilan: 2000 },
    ],
    compute: (d) => {
      let toplam = 0;
      const pf = +d.pao2_fio2;
      const mv = d.mekanik_ventilasyon;
      toplam += pf < 100 && mv ? 4 : pf < 200 && mv ? 3 : pf < 300 ? 2 : pf < 400 ? 1 : 0;
      const plt = +d.trombosit;
      toplam += plt < 20 ? 4 : plt < 50 ? 3 : plt < 100 ? 2 : plt < 150 ? 1 : 0;
      const bil = +d.bilirubin;
      toplam += bil >= 12 ? 4 : bil >= 6 ? 3 : bil >= 2 ? 2 : bil >= 1.2 ? 1 : 0;
      const oap = +d.oap;
      const vp = d.vazopressor;
      toplam += vp === "dopamin_yuksek" ? 4 : vp === "dopamin_orta" ? 3 : vp === "dopamin_dusuk" ? 2 : oap < 70 ? 1 : 0;
      const g = +d.gcs;
      toplam += g < 6 ? 4 : g < 10 ? 3 : g < 13 ? 2 : g < 15 ? 1 : 0;
      const kr = +d.kreatinin, ur = +d.idrar_24s;
      toplam += kr >= 5 || ur < 200 ? 4 : kr >= 3.5 || ur < 500 ? 3 : kr >= 2 ? 2 : kr >= 1.2 ? 1 : 0;
      let r, mort;
      if (toplam <= 6) { r = risk("Düşük", "yesil"); mort = "<%10"; }
      else if (toplam <= 9) { r = risk("Orta", "sari"); mort = "%15-20"; }
      else if (toplam <= 12) { r = risk("Yüksek", "turuncu"); mort = "%40-50"; }
      else { r = risk("Çok yüksek", "kirmizi"); mort = ">%80"; }
      return { toplam, ...r, mortalite_tahmini: mort };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 24, risk_key: "risk_sinifi",
      ek_satirlar: [["mortalite_tahmini", "Mortalite tahmini"]] },
  },

  // ═════════════════ Pnömoni ═════════════════
  {
    id: "curb65", ad: "CURB-65", kategori: "Pnömoni",
    aciklama: "Toplum kökenli pnömoni 30 günlük mortalite + yatış kararı.",
    referans: "Lim WS, Thorax 2003;58:377-382",
    url: "https://www.mdcalc.com/calc/324/curb-65-score-pneumonia-severity",
    alanlar: [
      { key: "konfuzyon", label: "Yeni başlangıçlı konfüzyon", tip: TIP.BOOL },
      { key: "bun_mg_dl", label: "BUN (mg/dL)", tip: TIP.INT, min: 0, max: 300, varsayilan: 15 },
      { key: "solunum_sayisi", label: "Solunum sayısı (/dk)", tip: TIP.INT, min: 0, max: 80, varsayilan: 18 },
      { key: "sistolik_kb", label: "Sistolik KB (mmHg)", tip: TIP.INT, min: 40, max: 260, varsayilan: 120 },
      { key: "diastolik_kb", label: "Diastolik KB (mmHg)", tip: TIP.INT, min: 20, max: 160, varsayilan: 75 },
      { key: "yas", label: "Yaş", tip: TIP.INT, min: 0, max: 120, varsayilan: 65 },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += d.konfuzyon ? 1 : 0;
      toplam += +d.bun_mg_dl > 19 ? 1 : 0;
      toplam += +d.solunum_sayisi >= 30 ? 1 : 0;
      toplam += (+d.sistolik_kb < 90 || +d.diastolik_kb <= 60) ? 1 : 0;
      toplam += +d.yas >= 65 ? 1 : 0;
      const mortMap = ["%0.6","%2.7","%6.8","%14","%27.8","%27.8"];
      let r, oneri;
      if (toplam <= 1) { r = risk("Düşük", "yesil"); oneri = "Ayaktan tedavi"; }
      else if (toplam === 2) { r = risk("Orta", "sari"); oneri = "Kısa yatış / yakın takip"; }
      else { r = risk("Yüksek", "kirmizi"); oneri = "Yatış (≥4 → YBÜ değerlendirmesi)"; }
      return { toplam, max: 5, ...r, mortalite: mortMap[toplam], oneri };
    },
    sonuc_sablon: { toplam_key: "toplam", max_key: "max", risk_key: "risk_sinifi",
      ek_satirlar: [["mortalite", "30 günlük mortalite"], ["oneri", "Öneri"]] },
  },

  // ═════════════════ GIS Kanama ═════════════════
  {
    id: "glasgow_blatchford", ad: "Glasgow-Blatchford Skoru", kategori: "GIS Kanama",
    aciklama: "Üst GIS kanaması ciddiyeti (pre-endoskopik). 0 ise ayaktan takip düşünülebilir.",
    referans: "Blatchford O, Lancet 2000;356:1318-1321",
    url: "https://www.mdcalc.com/calc/518/glasgow-blatchford-bleeding-score-gbs",
    alanlar: [
      { key: "bun_mg_dl", label: "BUN (mg/dL)", tip: TIP.INT, min: 0, max: 300, varsayilan: 15 },
      { key: "hemoglobin", label: "Hemoglobin (g/dL)", tip: TIP.FLOAT, min: 1, max: 25, step: 0.1, varsayilan: 13 },
      { key: "cinsiyet", label: "Cinsiyet", tip: TIP.SELECT, varsayilan: "E", opsiyonlar: [["E", "Erkek"], ["K", "Kadın"]] },
      { key: "sistolik_kb", label: "Sistolik KB (mmHg)", tip: TIP.INT, min: 40, max: 260, varsayilan: 120 },
      { key: "nabiz", label: "Nabız (/dk)", tip: TIP.INT, min: 20, max: 250, varsayilan: 80 },
      { key: "melena", label: "Melena var mı?", tip: TIP.BOOL },
      { key: "senkop", label: "Senkop var mı?", tip: TIP.BOOL },
      { key: "kc_hastaligi", label: "Bilinen KC hastalığı", tip: TIP.BOOL },
      { key: "kalp_yetmezligi", label: "Kalp yetmezliği", tip: TIP.BOOL },
    ],
    compute: (d) => {
      let toplam = 0;
      const bun = +d.bun_mg_dl;
      toplam += bun >= 70 ? 6 : bun >= 28 ? 4 : bun >= 22.4 ? 3 : bun >= 18.2 ? 2 : 0;
      const hb = +d.hemoglobin, k = d.cinsiyet === "K";
      if (k) toplam += hb < 10 ? 6 : hb < 12 ? 1 : 0;
      else toplam += hb < 10 ? 6 : hb < 12 ? 3 : hb < 13 ? 1 : 0;
      const sbp = +d.sistolik_kb;
      toplam += sbp < 90 ? 3 : sbp < 100 ? 2 : sbp < 110 ? 1 : 0;
      toplam += +d.nabiz >= 100 ? 1 : 0;
      toplam += d.melena ? 1 : 0;
      toplam += d.senkop ? 2 : 0;
      toplam += d.kc_hastaligi ? 2 : 0;
      toplam += d.kalp_yetmezligi ? 2 : 0;
      let r, oneri;
      if (toplam === 0) { r = risk("Çok düşük", "yesil"); oneri = "Ayaktan takip uygun olabilir"; }
      else if (toplam <= 3) { r = risk("Düşük", "yesil"); oneri = "Hızlı endoskopi gerekmeyebilir"; }
      else if (toplam <= 7) { r = risk("Orta", "sari"); oneri = "24 saat içinde endoskopi"; }
      else { r = risk("Yüksek", "kirmizi"); oneri = "Erken endoskopi + transfüzyon hazırlığı"; }
      return { toplam, ...r, oneri };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 23, risk_key: "risk_sinifi",
      ek_satirlar: [["oneri", "Öneri"]] },
  },

  {
    id: "aims65", ad: "AIMS65 Skoru", kategori: "GIS Kanama",
    aciklama: "Üst GIS kanaması için hastane içi mortalite (5 klinik parametre).",
    referans: "Saltzman JR, Gastrointest Endosc 2011;74:1215-1224",
    url: "https://www.mdcalc.com/calc/1889/aims65-score-upper-gi-bleeding-mortality",
    alanlar: [
      { key: "albumin", label: "Albumin (g/dL)", tip: TIP.FLOAT, min: 0.5, max: 6, step: 0.1, varsayilan: 3.5 },
      { key: "inr", label: "INR", tip: TIP.FLOAT, min: 0.5, max: 10, step: 0.1, varsayilan: 1.1 },
      { key: "mental_durum_degisikligi", label: "Mental durum değişikliği", tip: TIP.BOOL },
      { key: "sistolik_kb", label: "Sistolik KB (mmHg)", tip: TIP.INT, min: 40, max: 260, varsayilan: 120 },
      { key: "yas", label: "Yaş", tip: TIP.INT, min: 0, max: 120, varsayilan: 65 },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += +d.albumin < 3 ? 1 : 0;
      toplam += +d.inr > 1.5 ? 1 : 0;
      toplam += d.mental_durum_degisikligi ? 1 : 0;
      toplam += +d.sistolik_kb <= 90 ? 1 : 0;
      toplam += +d.yas > 65 ? 1 : 0;
      const mortMap = ["%0.3","%1","%3","%9","%15","%25"];
      let r;
      if (toplam <= 1) r = risk("Düşük", "yesil");
      else if (toplam <= 2) r = risk("Orta", "sari");
      else r = risk("Yüksek", "kirmizi");
      return { toplam, ...r, mortalite: mortMap[toplam] };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 5, risk_key: "risk_sinifi",
      ek_satirlar: [["mortalite", "Hastane içi mortalite"]] },
  },

  {
    id: "rockall_pre", ad: "Rockall Pre-endoskopik", kategori: "GIS Kanama",
    aciklama: "Endoskopi öncesi üst GIS kanaması mortalite tahmini (yaş + şok + komorbidite).",
    referans: "Rockall TA, Gut 1996;38:316-321",
    url: "https://www.mdcalc.com/calc/1754/rockall-score-upper-gi-bleeding-pre-endoscopy",
    alanlar: [
      { key: "yas", label: "Yaş", tip: TIP.INT, min: 0, max: 120, varsayilan: 65 },
      { key: "sistolik_kb", label: "Sistolik KB (mmHg)", tip: TIP.INT, min: 40, max: 260, varsayilan: 120 },
      { key: "nabiz", label: "Nabız (/dk)", tip: TIP.INT, min: 20, max: 250, varsayilan: 80 },
      { key: "komorbidite", label: "Komorbidite", tip: TIP.SELECT, varsayilan: "yok", opsiyonlar: [
        ["yok", "Majör komorbidite yok"],
        ["kalp_yetmezligi_iskemik", "KKY / İKH / majör hastalık"],
        ["bobrek_kc_metastatik", "Renal/KC yetmezliği / metastatik malignite"],
      ]},
    ],
    compute: (d) => {
      let toplam = 0;
      const yas = +d.yas;
      toplam += yas >= 80 ? 2 : yas >= 60 ? 1 : 0;
      const n = +d.nabiz, sbp = +d.sistolik_kb;
      toplam += sbp < 100 ? 2 : n >= 100 ? 1 : 0;
      toplam += { yok: 0, kalp_yetmezligi_iskemik: 2, bobrek_kc_metastatik: 3 }[d.komorbidite] ?? 0;
      const mortMap = ["%0.2","%2.4","%5.6","%11","%24.6","%39.6","%48.9","%50"];
      let r;
      if (toplam <= 2) r = risk("Düşük", "yesil");
      else if (toplam <= 4) r = risk("Orta", "sari");
      else r = risk("Yüksek", "kirmizi");
      return { toplam, ...r, mortalite_tahmini: mortMap[Math.min(toplam,7)] };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 7, risk_key: "risk_sinifi",
      ek_satirlar: [["mortalite_tahmini", "Mortalite tahmini"]] },
  },

  // ═════════════════ Apandisit ═════════════════
  {
    id: "alvarado", ad: "Alvarado Skoru", kategori: "Karın Ağrısı / Apandisit",
    aciklama: "Akut apandisit pre-test olasılığı (MANTRELS).",
    referans: "Alvarado A, Ann Emerg Med 1986;15:557-564",
    url: "https://www.mdcalc.com/calc/617/alvarado-score-acute-appendicitis",
    alanlar: [
      { key: "gocme", label: "M — Ağrının sağ alt kadrana göçmesi", tip: TIP.BOOL },
      { key: "anoreksi", label: "A — Anoreksi", tip: TIP.BOOL },
      { key: "bulanti_kusma", label: "N — Bulantı / kusma", tip: TIP.BOOL },
      { key: "sag_alt_kadran_hassasiyet", label: "T — Sağ alt kadranda hassasiyet (2 pt)", tip: TIP.BOOL },
      { key: "rebound", label: "R — Rebound hassasiyet", tip: TIP.BOOL },
      { key: "ates", label: "E — Ateş (>37.3°C)", tip: TIP.BOOL },
      { key: "lokosit_10k", label: "L — Lökositoz (>10 000/mm³) (2 pt)", tip: TIP.BOOL },
      { key: "sola_kayma", label: "S — Sola kayma (nötrofili >%75)", tip: TIP.BOOL },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += d.gocme ? 1 : 0;
      toplam += d.anoreksi ? 1 : 0;
      toplam += d.bulanti_kusma ? 1 : 0;
      toplam += d.sag_alt_kadran_hassasiyet ? 2 : 0;
      toplam += d.rebound ? 1 : 0;
      toplam += d.ates ? 1 : 0;
      toplam += d.lokosit_10k ? 2 : 0;
      toplam += d.sola_kayma ? 1 : 0;
      let r, yuzde, oneri;
      if (toplam <= 4) { r = risk("Düşük", "yesil"); yuzde = "<%30"; oneri = "Apandisit olası değil — gözlem"; }
      else if (toplam <= 6) { r = risk("Orta", "sari"); yuzde = "%30-65"; oneri = "Görüntüleme (USG/BT)"; }
      else { r = risk("Yüksek", "kirmizi"); yuzde = ">%80"; oneri = "Cerrahi konsültasyon"; }
      return { toplam, ...r, risk_yuzde: yuzde, oneri };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 10, risk_key: "risk_sinifi",
      ek_satirlar: [["risk_yuzde", "Apandisit riski"], ["oneri", "Öneri"]] },
  },

  {
    id: "ripasa", ad: "RIPASA Skoru", kategori: "Karın Ağrısı / Apandisit",
    aciklama: "Asya popülasyonunda Alvarado'ya alternatif apandisit skoru.",
    referans: "Chong CF, Singapore Med J 2010;51:220-225",
    url: "https://www.mdcalc.com/calc/3045/ripasa-score-acute-appendicitis",
    alanlar: [
      { key: "erkek", label: "Erkek cinsiyet", tip: TIP.BOOL },
      { key: "yas_40_alt", label: "Yaş <40", tip: TIP.BOOL },
      { key: "yabanci", label: "Yabancı milli NRIC (Asya dışı)", tip: TIP.BOOL },
      { key: "sag_alt_kadran_agri", label: "Ağrı sağ alt kadranda (0.5 pt)", tip: TIP.BOOL },
      { key: "gocme", label: "Ağrı göçmesi (0.5 pt)", tip: TIP.BOOL },
      { key: "anoreksi", label: "Anoreksi (1 pt)", tip: TIP.BOOL },
      { key: "bulanti_kusma", label: "Bulantı / kusma (1 pt)", tip: TIP.BOOL },
      { key: "semptom_suresi_48s_alt", label: "Semptom süresi <48 saat (1 pt)", tip: TIP.BOOL },
      { key: "sag_alt_kadran_hassasiyet", label: "Sağ alt kadran hassasiyet (1 pt)", tip: TIP.BOOL },
      { key: "rebound", label: "Rebound hassasiyet (1 pt)", tip: TIP.BOOL },
      { key: "rovsing", label: "Rovsing bulgusu (2 pt)", tip: TIP.BOOL },
      { key: "ates", label: "Ateş (>37°C) (1 pt)", tip: TIP.BOOL },
      { key: "lokosit_10k", label: "Lökositoz (>10 000/mm³) (1 pt)", tip: TIP.BOOL },
      { key: "idrar_neg", label: "İdrar tahlili negatif (1 pt)", tip: TIP.BOOL },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += d.erkek ? 1 : 0.5;
      toplam += d.yas_40_alt ? 1 : 0.5;
      toplam += d.yabanci ? 1 : 0;
      toplam += d.sag_alt_kadran_agri ? 0.5 : 0;
      toplam += d.gocme ? 0.5 : 0;
      toplam += d.anoreksi ? 1 : 0;
      toplam += d.bulanti_kusma ? 1 : 0;
      toplam += d.semptom_suresi_48s_alt ? 1 : 0;
      toplam += d.sag_alt_kadran_hassasiyet ? 1 : 0;
      toplam += d.rebound ? 1 : 0;
      toplam += d.rovsing ? 2 : 0;
      toplam += d.ates ? 1 : 0;
      toplam += d.lokosit_10k ? 1 : 0;
      toplam += d.idrar_neg ? 1 : 0;
      let r, yuzde, oneri;
      if (toplam < 5) { r = risk("Çok düşük", "yesil"); yuzde = "<%5"; oneri = "Tani olası değil"; }
      else if (toplam <= 7) { r = risk("Düşük", "sari"); yuzde = "%5-30"; oneri = "Gözlem / görüntüleme"; }
      else if (toplam <= 11) { r = risk("Yüksek", "turuncu"); yuzde = "%30-90"; oneri = "Cerrahi değerlendirme"; }
      else { r = risk("Çok yüksek", "kirmizi"); yuzde = ">%90"; oneri = "Acil cerrahi"; }
      return { toplam, ...r, risk_yuzde: yuzde, oneri };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 17, risk_key: "risk_sinifi",
      ek_satirlar: [["risk_yuzde", "Apandisit riski"], ["oneri", "Öneri"]] },
  },

  // ═════════════════ İnme / Nöroloji ═════════════════
  {
    id: "abcd2", ad: "ABCD² (TIA)", kategori: "İnme / Nöroloji",
    aciklama: "TIA sonrası 2/7/90 günlük inme riski; hospitalizasyon kararı için.",
    referans: "Johnston SC, Lancet 2007;369:283-292",
    url: "https://www.mdcalc.com/calc/357/abcd2-score-tia",
    alanlar: [
      { key: "yas", label: "Yaş", tip: TIP.INT, min: 0, max: 120, varsayilan: 65 },
      { key: "sistolik_kb", label: "Sistolik KB (mmHg)", tip: TIP.INT, min: 40, max: 260, varsayilan: 140 },
      { key: "diastolik_kb", label: "Diastolik KB (mmHg)", tip: TIP.INT, min: 20, max: 160, varsayilan: 85 },
      { key: "klinik_ozellik", label: "Klinik özellik", tip: TIP.SELECT, varsayilan: "unilateral_zaaf", opsiyonlar: [
        ["unilateral_zaaf", "Unilateral zaafiyet (2 pt)"],
        ["konusma_bozuklugu", "Konuşma bozukluğu — zaaf yok (1 pt)"],
        ["diger", "Diğer semptom (0 pt)"],
      ]},
      { key: "sure", label: "TIA süresi", tip: TIP.SELECT, varsayilan: "10_59dk", opsiyonlar: [
        ["60dk_ustu", "≥60 dk (2 pt)"],
        ["10_59dk", "10-59 dk (1 pt)"],
        ["10dk_alti", "<10 dk (0 pt)"],
      ]},
      { key: "diyabet", label: "Diyabet (DM)", tip: TIP.BOOL },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += +d.yas >= 60 ? 1 : 0;
      toplam += (+d.sistolik_kb >= 140 || +d.diastolik_kb >= 90) ? 1 : 0;
      toplam += { unilateral_zaaf: 2, konusma_bozuklugu: 1, diger: 0 }[d.klinik_ozellik] ?? 0;
      toplam += { "60dk_ustu": 2, "10_59dk": 1, "10dk_alti": 0 }[d.sure] ?? 0;
      toplam += d.diyabet ? 1 : 0;
      let r, riskGun, oneri;
      if (toplam <= 3) { r = risk("Düşük", "yesil"); riskGun = "%1.0"; oneri = "Ayaktan değerlendirme uygun olabilir"; }
      else if (toplam <= 5) { r = risk("Orta", "sari"); riskGun = "%4.1"; oneri = "Yatış / hızlı tetkik"; }
      else { r = risk("Yüksek", "kirmizi"); riskGun = "%8.1"; oneri = "Yatış zorunlu"; }
      return { toplam, ...r, iki_gun_inme_riski: riskGun, oneri };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 7, risk_key: "risk_sinifi",
      ek_satirlar: [["iki_gun_inme_riski", "2 gün inme riski"], ["oneri", "Öneri"]] },
  },

  {
    id: "ich", ad: "ICH Skoru", kategori: "İnme / Nöroloji",
    aciklama: "Intraserebral kanama 30 günlük mortalite tahmini.",
    referans: "Hemphill JC, Stroke 2001;32:891-897",
    url: "https://www.mdcalc.com/calc/1602/ich-score-intracerebral-hemorrhage",
    alanlar: [
      { key: "gcs", label: "GCS toplam", tip: TIP.INT, min: 3, max: 15, varsayilan: 13 },
      { key: "ich_hacim_cm3", label: "Hematom hacmi (cm³)", tip: TIP.INT, min: 0, max: 300, varsayilan: 20 },
      { key: "intraventrikuler_kanama", label: "İntraventrikuler kanama var", tip: TIP.BOOL },
      { key: "infratentoriyal", label: "İnfratentoriyal lokasyon", tip: TIP.BOOL },
      { key: "yas", label: "Yaş (≥80 ise +1)", tip: TIP.INT, min: 0, max: 120, varsayilan: 65 },
    ],
    compute: (d) => {
      let toplam = 0;
      const g = +d.gcs;
      toplam += g <= 4 ? 2 : g <= 12 ? 1 : 0;
      toplam += +d.ich_hacim_cm3 >= 30 ? 1 : 0;
      toplam += d.intraventrikuler_kanama ? 1 : 0;
      toplam += d.infratentoriyal ? 1 : 0;
      toplam += +d.yas >= 80 ? 1 : 0;
      const mortMap = ["%0","%13","%26","%72","%97","%100","%100"];
      let r;
      if (toplam <= 1) r = risk("Düşük", "yesil");
      else if (toplam <= 2) r = risk("Orta", "sari");
      else if (toplam <= 3) r = risk("Yüksek", "turuncu");
      else r = risk("Çok yüksek", "kirmizi");
      return { toplam, ...r, mortalite_30gun: mortMap[Math.min(toplam,6)] };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 6, risk_key: "risk_sinifi",
      ek_satirlar: [["mortalite_30gun", "30 günlük mortalite"]] },
  },

  // ═════════════════ Senkop ═════════════════
  {
    id: "canadian_syncope", ad: "Canadian Syncope Risk Score", kategori: "Senkop",
    aciklama: "Acil serviste senkop sonrası 30 günlük ciddi olay riski.",
    referans: "Thiruganasambandamoorthy V, CMAJ 2016;188:E289-E298",
    url: "https://www.mdcalc.com/calc/10008/canadian-syncope-risk-score",
    alanlar: [
      { key: "vaso_vagal_predispozisyon", label: "Vazovagal predispozan faktör (-1)", tip: TIP.BOOL },
      { key: "kardiyak_hastalik_oykusu", label: "Kardiyak hastalık öyküsü (+1)", tip: TIP.BOOL },
      { key: "skb_90_180", label: "Başvuruda SKB <90 veya >180 mmHg (+2)", tip: TIP.BOOL },
      { key: "troponin_yuksek", label: "Troponin yüksekliği (+2)", tip: TIP.BOOL },
      { key: "qrs_aks_anormal", label: "EKG'de anormal QRS aksı / süresi (+1)", tip: TIP.BOOL },
      { key: "qtc_480_ustu", label: "QTc >480 ms (+2)", tip: TIP.BOOL },
      { key: "acil_tani_vazovagal", label: "Acil hekim ilk tanısı vazovagal senkop (-2)", tip: TIP.BOOL },
      { key: "acil_tani_kardiyak", label: "Acil hekim ilk tanısı kardiyak senkop (+2)", tip: TIP.BOOL },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += d.vaso_vagal_predispozisyon ? -1 : 0;
      toplam += d.kardiyak_hastalik_oykusu ? 1 : 0;
      toplam += d.skb_90_180 ? 2 : 0;
      toplam += d.troponin_yuksek ? 2 : 0;
      toplam += d.qrs_aks_anormal ? 1 : 0;
      toplam += d.qtc_480_ustu ? 2 : 0;
      toplam += d.acil_tani_vazovagal ? -2 : 0;
      toplam += d.acil_tani_kardiyak ? 2 : 0;
      let r, riskCiddi, oneri;
      if (toplam <= -2) { r = risk("Çok düşük", "yesil"); riskCiddi = "%0.4-0.7"; oneri = "Taburculuk uygun"; }
      else if (toplam <= 0) { r = risk("Düşük", "yesil"); riskCiddi = "%1.2-1.9"; oneri = "Taburculuk düşünülebilir"; }
      else if (toplam <= 3) { r = risk("Orta", "sari"); riskCiddi = "%3.1-8.1"; oneri = "Gözlem / monitör"; }
      else { r = risk("Yüksek", "kirmizi"); riskCiddi = "%12.9-83.6"; oneri = "Yatış / monitör"; }
      return { toplam, ...r, ciddi_olay_riski: riskCiddi, oneri };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 11, risk_key: "risk_sinifi",
      ek_satirlar: [["ciddi_olay_riski", "30 gün ciddi olay riski"], ["oneri", "Öneri"]] },
  },

  {
    id: "san_francisco_syncope", ad: "San Francisco Syncope Rule", kategori: "Senkop",
    aciklama: "Senkop sonrası 7 gün içinde ciddi olay riski (CHESS).",
    referans: "Quinn J, Ann Emerg Med 2006;47:448-454",
    url: "https://www.mdcalc.com/calc/700/san-francisco-syncope-rule",
    alanlar: [
      { key: "kalp_yetmezligi", label: "C — Konjestif KY öyküsü", tip: TIP.BOOL },
      { key: "hematokrit_30_alt", label: "H — Hematokrit <%30", tip: TIP.BOOL },
      { key: "ekg_anormal", label: "E — EKG anormalliği (yeni değişiklik / non-sinus)", tip: TIP.BOOL },
      { key: "nefes_darligi", label: "S — Nefes darlığı şikayeti", tip: TIP.BOOL },
      { key: "skb_90_alt", label: "S — Triyajda SKB <90 mmHg", tip: TIP.BOOL },
    ],
    compute: (d) => {
      let toplam = 0;
      toplam += d.kalp_yetmezligi ? 1 : 0;
      toplam += d.hematokrit_30_alt ? 1 : 0;
      toplam += d.ekg_anormal ? 1 : 0;
      toplam += d.nefes_darligi ? 1 : 0;
      toplam += d.skb_90_alt ? 1 : 0;
      let r, riskGun;
      if (toplam === 0) { r = risk("Düşük", "yesil"); riskGun = "<%2"; }
      else { r = risk("Yüksek", "kirmizi"); riskGun = "%7-15"; }
      return { toplam, ...r, yedi_gun_riski: riskGun };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 5, risk_key: "risk_sinifi",
      ek_satirlar: [["yedi_gun_riski", "7 gün ciddi olay riski"]] },
  },

  // ═════════════════ Travma ═════════════════
  {
    id: "revised_trauma", ad: "Revised Trauma Score (RTS)", kategori: "Travma",
    aciklama: "Triyaj aşamasında travma ciddiyetinin hızlı fizyolojik ölçümü (GCS + SKB + SH).",
    referans: "Champion HR, J Trauma 1989;29:623-629",
    url: "https://www.mdcalc.com/calc/4038/revised-trauma-score",
    alanlar: [
      { key: "gcs", label: "GCS toplam", tip: TIP.INT, min: 3, max: 15, varsayilan: 15 },
      { key: "sistolik_kb", label: "Sistolik KB (mmHg)", tip: TIP.INT, min: 0, max: 260, varsayilan: 120 },
      { key: "solunum_sayisi", label: "Solunum sayısı (/dk)", tip: TIP.INT, min: 0, max: 80, varsayilan: 16 },
    ],
    compute: (d) => {
      const g = +d.gcs, sbp = +d.sistolik_kb, rr = +d.solunum_sayisi;
      const gcsKod = g >= 13 ? 4 : g >= 9 ? 3 : g >= 6 ? 2 : g >= 4 ? 1 : 0;
      const sbpKod = sbp > 89 ? 4 : sbp >= 76 ? 3 : sbp >= 50 ? 2 : sbp >= 1 ? 1 : 0;
      const rrKod = (rr >= 10 && rr <= 29) ? 4 : rr > 29 ? 3 : rr >= 6 ? 2 : rr >= 1 ? 1 : 0;
      const toplam = +(0.9368 * gcsKod + 0.7326 * sbpKod + 0.2908 * rrKod).toFixed(2);
      let r, sk;
      if (toplam >= 7) { r = risk("Düşük", "yesil"); sk = ">%95"; }
      else if (toplam >= 5) { r = risk("Orta", "sari"); sk = "%75-90"; }
      else if (toplam >= 3) { r = risk("Yüksek", "turuncu"); sk = "%40-65"; }
      else { r = risk("Çok yüksek", "kirmizi"); sk = "<%30"; }
      return { toplam, ...r, sagkalim_tahmini: sk };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 7.84, risk_key: "risk_sinifi",
      ek_satirlar: [["sagkalim_tahmini", "Sağkalım tahmini"]] },
  },

  {
    id: "shock_index", ad: "Şok İndeksi", kategori: "Travma",
    aciklama: "Nabız / SKB oranı. >0.9 → okült şok şüphesi. Travma + GIS + obstetrik kullanım.",
    referans: "Allgöwer M, Dtsch Med Wochenschr 1967;92:1947-1950",
    url: "https://www.mdcalc.com/calc/1316/shock-index",
    alanlar: [
      { key: "nabiz", label: "Nabız (/dk)", tip: TIP.INT, min: 20, max: 250, varsayilan: 80 },
      { key: "sistolik_kb", label: "Sistolik KB (mmHg)", tip: TIP.INT, min: 40, max: 260, varsayilan: 120 },
    ],
    compute: (d) => {
      const indeks = +(+d.nabiz / Math.max(+d.sistolik_kb, 1)).toFixed(2);
      let r, yorum;
      if (indeks < 0.7) { r = risk("Normal", "yesil"); yorum = "Hemodinami stabil"; }
      else if (indeks < 0.9) { r = risk("Sınırda", "sari"); yorum = "Yakın takip"; }
      else if (indeks < 1.4) { r = risk("Yüksek (okült şok)", "turuncu"); yorum = "Sıvı resüsitasyonu, kanama kaynağı ara"; }
      else { r = risk("Çok yüksek", "kirmizi"); yorum = "Ciddi şok — masif transfüzyon/cerrahi gerekebilir"; }
      return { indeks, ...r, yorum };
    },
    sonuc_sablon: { ozel: "shock", toplam_key: "indeks", max_sabit: null, risk_key: "risk_sinifi",
      ek_satirlar: [["yorum", "Yorum"]] },
  },

  // ═════════════════ Bilinç / Mental Durum ═════════════════
  {
    id: "cam", ad: "CAM (Deliryum)", kategori: "Bilinç / Mental Durum",
    aciklama: "Confusion Assessment Method — acil serviste deliryum tarama.",
    referans: "Inouye SK, Ann Intern Med 1990;113:941-948",
    url: "https://www.mdcalc.com/calc/10268/confusion-assessment-method-cam",
    alanlar: [
      { key: "akut_baslangic_dalgalanma", label: "1 — Akut başlangıç VEYA dalgalanan seyir", tip: TIP.BOOL },
      { key: "dikkat_kusuru", label: "2 — Dikkat kusuru", tip: TIP.BOOL },
      { key: "dagnik_dusunce", label: "3 — Dağınık düşünce", tip: TIP.BOOL },
      { key: "bilinc_duzeyi_degisiklik", label: "4 — Bilinç düzeyi değişikliği", tip: TIP.BOOL },
    ],
    compute: (d) => {
      const k1 = !!d.akut_baslangic_dalgalanma;
      const k2 = !!d.dikkat_kusuru;
      const k34 = !!d.dagnik_dusunce || !!d.bilinc_duzeyi_degisiklik;
      const pozitif = k1 && k2 && k34;
      return {
        kriterler_pozitif: pozitif,
        risk_sinifi: pozitif ? "Deliryum (CAM pozitif)" : "Deliryum yok (CAM negatif)",
        renk: pozitif ? "kirmizi" : "yesil",
        kriter_aciklama: "CAM pozitif: 1 + 2 + (3 VEYA 4)",
      };
    },
    sonuc_sablon: { ozel: "cam", toplam_key: null, max_sabit: null, risk_key: "risk_sinifi",
      ek_satirlar: [["kriter_aciklama", "Kriter"]] },
  },

  {
    id: "four_score", ad: "FOUR Skoru", kategori: "Bilinç / Mental Durum",
    aciklama: "GCS alternatifi; entübe hastada da uygulanabilir (göz + motor + beyin sapı + solunum).",
    referans: "Wijdicks EF, Ann Neurol 2005;58:585-593",
    url: "https://www.mdcalc.com/calc/3080/four-score-consciousness",
    alanlar: [
      { key: "goz", label: "Göz yanıtı (E)", tip: TIP.SELECT, varsayilan: 4, opsiyonlar: [
        [4, "Göz açık + komut ile takip/göz kırpma (4)"],
        [3, "Göz açık ama takip yok (3)"],
        [2, "Yüksek sesle göz açar (2)"],
        [1, "Ağrıya göz açar (1)"],
        [0, "Ağrıya yanıtsız (0)"],
      ]},
      { key: "motor", label: "Motor yanıt (M)", tip: TIP.SELECT, varsayilan: 4, opsiyonlar: [
        [4, "Komut ile parmak kaldırma / iyi oluyor jesti (4)"],
        [3, "Ağrıyı lokalize eder (3)"],
        [2, "Fleksör yanıt (dekortikasyon) (2)"],
        [1, "Ekstansör yanıt (deserebrasyon) (1)"],
        [0, "Yanıtsız veya status myoclonicus (0)"],
      ]},
      { key: "beyin_sapi", label: "Beyin sapı refleksleri (B)", tip: TIP.SELECT, varsayilan: 4, opsiyonlar: [
        [4, "Pupil + kornea refleksleri normal (4)"],
        [3, "Bir pupil mid-dilate ve fikse (3)"],
        [2, "Pupil VEYA kornea refleksleri yok (2)"],
        [1, "Pupil + kornea refleksleri yok (1)"],
        [0, "Pupil + kornea + öksürük refleksleri yok (0)"],
      ]},
      { key: "solunum", label: "Solunum paterni (R)", tip: TIP.SELECT, varsayilan: 4, opsiyonlar: [
        [4, "Entübe değil + düzenli solunum (4)"],
        [3, "Entübe değil + Cheyne-Stokes paterni (3)"],
        [2, "Entübe değil + düzensiz solunum (2)"],
        [1, "Ventilatörün hızının üstünde solunum (1)"],
        [0, "Ventilatör hızında veya apne (0)"],
      ]},
    ],
    compute: (d) => {
      const toplam = +d.goz + +d.motor + +d.beyin_sapi + +d.solunum;
      let r, yorum;
      if (toplam >= 14) { r = risk("Düşük risk", "yesil"); yorum = "Hafif bilinç bozukluğu"; }
      else if (toplam >= 10) { r = risk("Orta", "sari"); yorum = "Orta bilinç bozukluğu"; }
      else if (toplam >= 5) { r = risk("Yüksek", "turuncu"); yorum = "Ciddi bilinç bozukluğu"; }
      else { r = risk("Çok yüksek", "kirmizi"); yorum = "Beyin ölümüne yakın klinik"; }
      return { toplam, ...r, yorum };
    },
    sonuc_sablon: { toplam_key: "toplam", max_sabit: 16, risk_key: "risk_sinifi",
      ek_satirlar: [["yorum", "Yorum"]] },
  },
];

// ─── Kategori listesi (sıralı, benzersiz) ───
function kategoriler() {
  const seen = [];
  for (const s of KATALOG) {
    if (!seen.includes(s.kategori)) seen.push(s.kategori);
  }
  return seen;
}

// ─── ID ile bul ───
function skorBul(id) {
  return KATALOG.find(s => s.id === id);
}

// ─── Varsayılan veri ───
function varsayilanData(skor) {
  const out = {};
  for (const a of skor.alanlar) {
    if ("varsayilan" in a) { out[a.key] = a.varsayilan; continue; }
    if (a.tip === TIP.INT) out[a.key] = 0;
    else if (a.tip === TIP.FLOAT) out[a.key] = 0;
    else if (a.tip === TIP.BOOL) out[a.key] = false;
    else if (a.tip === TIP.SELECT) out[a.key] = a.opsiyonlar?.[0]?.[0] ?? null;
    else if (a.tip === TIP.MULTISELECT) out[a.key] = [];
  }
  return out;
}

// Globals
window.SKOR_KATALOG = KATALOG;
window.SKOR_TIP = TIP;
window.skorKategoriler = kategoriler;
window.skorBul = skorBul;
window.skorVarsayilanData = varsayilanData;
