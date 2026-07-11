/* ============================================
   suleymanalpar.com — Yayın vitrini otomasyonu
   PubMed (NCBI E-utilities) üzerinden yazar yayınlarını
   çeker ve "Seçilmiş yayınlar" bölümünü günceller.
   API erişilemezse HTML'deki statik kartlar korunur.
   ============================================ */

(function () {
  'use strict';

  var GRID = document.getElementById('pubGrid');
  if (!GRID) return;

  // Yazar sorgusu: ORCID auid (kesin) + ad birleşik; PubMed tekrarları teker.
  var TERM = '(0000-0002-8509-0660[auid]) OR (Alpar Suleyman[Author])';
  var EUTILS = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
  var MAX = 6;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function yazarlariBicimle(authors) {
    if (!authors || !authors.length) return '';
    var adlar = authors
      .filter(function (a) { return a.authtype === 'Author'; })
      .map(function (a) { return a.name; });
    if (adlar.length <= 3) return adlar.join(', ');
    return adlar.slice(0, 3).join(', ') + ', ve ark.';
  }

  function yilAl(pubdate) {
    var m = String(pubdate || '').match(/\d{4}/);
    return m ? m[0] : '';
  }

  function doiAl(ids) {
    if (!ids) return null;
    for (var i = 0; i < ids.length; i++) {
      if (ids[i].idtype === 'doi') return ids[i].value;
    }
    return null;
  }

  function kartYap(item) {
    var doi = doiAl(item.articleids);
    var dergi = item.fulljournalname || item.source || '';
    var yil = yilAl(item.pubdate);
    var meta = esc(dergi) + (yil ? ' · ' + yil : '');
    var baslik = esc(item.title || '').replace(/\.$/, '');
    var yazarlar = esc(yazarlariBicimle(item.authors));
    var ic =
      '<span class="pub-journal" lang="en">' + meta + '</span>' +
      '<span class="pub-title" lang="en">' + baslik + '</span>' +
      '<span class="pub-authors">' + yazarlar + '</span>';
    if (doi) {
      return '<a class="pub-card" href="https://doi.org/' + esc(doi) +
        '" target="_blank" rel="noopener">' + ic + '</a>';
    }
    return '<div class="pub-card">' + ic + '</div>';
  }

  function j(url) {
    return fetch(url, { credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  var esearch = EUTILS + 'esearch.fcgi?db=pubmed&retmode=json&sort=pub+date&retmax=' +
    MAX + '&term=' + encodeURIComponent(TERM);

  j(esearch).then(function (s) {
    var ids = s && s.esearchresult && s.esearchresult.idlist;
    if (!ids || !ids.length) return; // sonuç yok → statik kalsın
    var esummary = EUTILS + 'esummary.fcgi?db=pubmed&retmode=json&id=' + ids.join(',');
    return j(esummary).then(function (d) {
      var res = d && d.result;
      if (!res) return;
      var kartlar = ids
        .map(function (id) { return res[id]; })
        .filter(Boolean)
        .map(kartYap);
      if (kartlar.length) {
        GRID.innerHTML = kartlar.join('');
      }
    });
  }).catch(function () {
    /* Sessizce statik kartlarla devam (ağ/CORS/API hatası) */
  });
})();
