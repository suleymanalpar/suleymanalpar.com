/* ============================================
   suleymanalpar.com - Main JavaScript
   Language switching, navigation, animations
   ============================================ */

// --- Translation Data ---
const translations = {
  tr: {
    // Nav
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımda',
    'nav.patients': 'Hastalar',
    'nav.students': 'Sağlık Çalışanları',
    'nav.healthcare': 'Sağlık Çalışanları',
    'nav.courses': 'Kurslar',
    'nav.blog': 'Blog',
    'nav.contact': 'İletişim',

    // Hero
    'hero.name': 'Dr. Süleyman Alpar',
    'hero.subtitle': 'Acil Tıp Uzmanı',
    'hero.tagline': '',
    'hero.badge1': 'Acil Tıp Uzmanı',
    'hero.cta1': 'Hastalar İçin',
    'hero.cta2': 'Sağlık Çalışanları İçin',

    // Sections
    'services.label': 'HİZMETLER',
    'services.title': 'Neler Sunuyorum?',
    'services.desc': 'Acil tıp alanında uzmanlaşmış hizmetler',

    'services.patient.title': 'Hasta Bilgilendirme',
    'services.patient.desc': 'Hastalıklar, tedavi yöntemleri ve hasta hakları konusunda güvenilir, anlaşılır bilgiler.',
    'services.student.title': 'Sağlık Çalışanları',
    'services.student.desc': 'Tıp öğrencileri, asistan hekimler ve meslektaşlar için acil tıp protokolleri ve akademik kaynaklar.',
    'services.healthcare.title': 'Sağlık Çalışanları',
    'services.healthcare.desc': 'Tıp öğrencileri, asistan hekimler ve meslektaşlar için acil tıp protokolleri ve akademik kaynaklar.',
    'services.blog.title': 'Blog & Makaleler',
    'services.blog.desc': 'Acil tıp, tıbbi etik ve bilimsel konularda derinlemesine yazılar.',
    'services.more': 'Devamını oku →',

    // About
    'about.label': 'HAKKIMDA',
    'about.title': 'Dr. Süleyman Alpar Kimdir?',
    'about.p1': 'Acil tıp uzmanıyım. İstanbul Üniversitesi İstanbul Tıp Fakültesi mezunuyum. İstanbul Eğitim ve Araştırma Hastanesi\'nde acil tıp uzmanlığımı tamamladım.',
    'about.p2': 'Şu anda İstanbul Beykent Üniversitesi Tıp Fakültesi Acil Tıp Anabilim Dalı\'nda öğretim üyesi ve anabilim dalı başkanı olarak görev yapıyorum. Aynı zamanda Bahçelievler Memorial Hastanesi\'nde acil tıp uzmanı olarak çalışıyorum.',
    'about.stat1': 'Yıl Deneyim',
    'about.stat2': 'Yayınlarım',

    // Blog
    'blog.label': 'SON YAZILAR',
    'blog.title': 'Blog & Makaleler',
    'blog.desc': 'Acil tıp ve sağlık dünyasından en güncel yazılar',
    'blog.cat1': 'Acil Tıp',
    'blog.cat2': 'Tıbbi Etik',
    'blog.cat3': 'Bilimsel Araştırma',
    'blog.title1': 'Acil Serviste Triaj: Doğru Önceliklendirme Hayat Kurtarır',
    'blog.desc1': 'Acil servislerde triaj sisteminin önemi ve hastaların bilmesi gerekenler.',
    'blog.title2': 'Tıpta Yapay Zeka: Etik Sınırlar Nerede?',
    'blog.desc2': 'Yapay zekanın tıbbi kararlardaki rolü ve etik boyutları üzerine bir değerlendirme.',
    'blog.title3': 'Klinik Araştırmalarda Hasta Onayı',
    'blog.desc3': 'Bilgilendirilmiş onam süreçleri ve hasta güvenliği perspektifinden klinik araştırmalar.',
    'blog.readmore': 'Tümünü Gör →',
    'blog.readtime': 'dk okuma',

    // Contact
    'contact.label': 'İLETİŞİM',
    'contact.title': 'İletişime Geçin',
    'contact.desc': 'Sorularınız, işbirliği teklifleriniz veya danışmanlık talepleriniz için benimle iletişime geçebilirsiniz.',
    'contact.email.label': 'E-posta',
    'contact.location.label': 'Konum',
    'contact.location': 'Türkiye',
    'contact.social.label': 'Sosyal Medya',
    'contact.form.name': 'Adınız Soyadınız',
    'contact.form.email': 'E-posta Adresiniz',
    'contact.form.subject': 'Konu',
    'contact.form.subject.opt1': 'Genel Soru',
    'contact.form.subject.opt2': 'İşbirliği Teklifi',
    'contact.form.subject.opt3': 'Danışmanlık',
    'contact.form.subject.opt4': 'Diğer',
    'contact.form.message': 'Mesajınız',
    'contact.form.send': 'Mesaj Gönder',

    // Footer
    'footer.desc': 'Acil tıp alanında bilgi ve deneyim paylaşımı sunan kişisel web sitesi.',
    'footer.links': 'Hızlı Bağlantılar',
    'footer.resources': 'Kaynaklar',
    'footer.legal': 'Yasal',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.terms': 'Kullanım Şartları',
    'footer.cookie': 'Çerez Politikası',
    'footer.copyright': '© 2026 Dr. Süleyman Alpar. Tüm hakları saklıdır.',

    // Patient page
    'patient.header.title': 'Hasta Bilgilendirme',
    'patient.header.desc': 'Sağlığınız hakkında güvenilir, anlaşılır ve güncel bilgiler',
    'patient.rights.label': 'HASTA HAKLARI',
    'patient.rights.title': 'Haklarınızı Bilin',
    'patient.rights.desc': 'Her hastanın bilmesi gereken temel haklar ve yasal güvenceler',
    'patient.right1.title': 'Bilgilendirilme Hakkı',
    'patient.right1.desc': 'Tanı, tedavi yöntemleri, riskler ve alternatifler hakkında açık ve anlaşılır bir şekilde bilgilendirilme hakkınız vardır.',
    'patient.right2.title': 'Onay Hakkı',
    'patient.right2.desc': 'Herhangi bir tıbbi müdahale öncesinde bilgilendirilmiş onamınızın alınması yasal zorunluluktur.',
    'patient.right3.title': 'Mahremiyet Hakkı',
    'patient.right3.desc': 'Tıbbi bilgileriniz gizlidir. Yasal zorunluluklar dışında üçüncü kişilerle paylaşılamaz.',
    'patient.right4.title': 'Tedavi Reddi Hakkı',
    'patient.right4.desc': 'Önerilen tedaviyi reddetme hakkınız bulunmaktadır. Reddiniz kayıt altına alınır.',
    'patient.health.label': 'SAĞLIK BİLGİLERİ',
    'patient.health.title': 'Sık Karşılaşılan Konular',
    'patient.health1.title': 'Koruyucu Sağlık',
    'patient.health1.desc': 'Düzenli check-up, aşılar ve erken tanı taramalarının önemi hakkında bilgiler.',
    'patient.health2.title': 'Kronik Hastalıklar',
    'patient.health2.desc': 'Diyabet, hipertansiyon ve kalp hastalıkları yönetimi hakkında pratik bilgiler.',
    'patient.health3.title': 'İlaç Kullanımı',
    'patient.health3.desc': 'Doğru ilaç kullanımı, yan etkiler ve ilaç etkileşimleri hakkında rehber.',
    'patient.faq.label': 'SIK SORULAN SORULAR',
    'patient.faq.title': 'Merak Edilenler',
    'patient.faq1.q': 'Hasta haklarım ihlal edildiğinde ne yapmalıyım?',
    'patient.faq1.a': 'Öncelikle ilgili sağlık kuruluşunun hasta hakları birimine başvurabilirsiniz. Sonuç alamazsanız İl Sağlık Müdürlüğü Hasta Hakları Kurulu\'na şikayette bulunabilirsiniz. Ayrıca hukuki danışmanlık almak da hakkınızdır.',
    'patient.faq2.q': 'Tıbbi kayıtlarıma nasıl erişebilirim?',
    'patient.faq2.a': 'Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında tıbbi kayıtlarınızın bir kopyasını talep etme hakkınız vardır. Sağlık kuruluşunun tıbbi kayıt birimine yazılı başvuru yapabilirsiniz.',
    'patient.faq3.q': 'İkinci görüş alma hakkım var mı?',
    'patient.faq3.a': 'Evet, her hastanın tanı ve tedavi konusunda başka bir hekimden görüş alma hakkı bulunmaktadır. Bu hakkınızı kullanmanız tedavinizi olumsuz etkilemez.',
    'patient.faq4.q': 'Acil durumda hasta onamı gerekli midir?',
    'patient.faq4.a': 'Acil ve hayati tehlike durumlarında, hastanın veya yasal temsilcisinin onam veremeyeceği hallerde, hekimler gerekli müdahaleyi onam almaksızın yapabilir.',

    // Student page
    'student.header.title': 'Öğrenci Kaynakları',
    'student.header.desc': 'Tıp öğrencileri için akademik kaynaklar, notlar ve kariyer rehberliği',
    'student.notes.label': 'DERS NOTLARI',
    'student.notes.title': 'Akademik Kaynaklar',
    'student.notes.desc': 'Tıp eğitiminizde size yardımcı olacak kapsamlı kaynaklar',
    'student.note1.title': 'Anatomi Atlası ve Notları',
    'student.note1.desc': 'Sistematik ve topografik anatomi ders notları, şemalar ve pratik bilgiler.',
    'student.note1.tag': 'Temel Tıp',
    'student.note2.title': 'Acil Tıp Protokolleri',
    'student.note2.desc': 'Acil serviste sık karşılaşılan durumlar, protokoller ve tedavi algoritmaları.',
    'student.note2.tag': 'Acil Tıp',
    'student.note3.title': 'Klinik Vaka Çalışmaları',
    'student.note3.desc': 'Gerçek vakalardan uyarlanmış interaktif vaka çalışmaları ve çözüm analizleri.',
    'student.note3.tag': 'Klinik',
    'student.note4.title': 'Bilimsel Makale Yazma Rehberi',
    'student.note4.desc': 'Araştırma tasarımından yayına kadar akademik yazarlık sürecinin tüm aşamaları.',
    'student.note4.tag': 'Araştırma',
    'student.note5.title': 'Tıbbi Etik ve Deontoloji',
    'student.note5.desc': 'Etik ikilemler, hasta-hekim ilişkisi ve mesleki değerler üzerine kapsamlı notlar.',
    'student.note5.tag': 'Etik',
    'student.career.label': 'KARİYER REHBERLİĞİ',
    'student.career.title': 'Kariyer Yol Haritası',
    'student.career1.title': 'Uzmanlık Sınavı (TUS) Hazırlığı',
    'student.career1.desc': 'TUS hazırlık stratejileri, kaynak önerileri ve çalışma planları.',
    'student.career2.title': 'Akademik Kariyer',
    'student.career2.desc': 'Araştırma görevliliğinden profesörlüğe akademik yolculuk rehberi.',
    'student.career3.title': 'Acil Tıp Uzmanlığı',
    'student.career3.desc': 'Acil tıp uzmanlığı süreci, kariyer fırsatları ve çalışma alanları.',

    // Blog page
    'blogpage.header.title': 'Blog & Makaleler',
    'blogpage.header.desc': 'Acil tıp, tıbbi etik ve bilimsel araştırma',
    'blogpage.filter.all': 'Tümü',
    'blogpage.filter.law': 'Acil Tıp',
    'blogpage.filter.ethics': 'Tıbbi Etik',
    'blogpage.filter.science': 'Bilimsel Araştırma',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.patients': 'Patients',
    'nav.students': 'Healthcare Professionals',
    'nav.healthcare': 'Healthcare Professionals',
    'nav.courses': 'Courses',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',

    'hero.name': 'Dr. Süleyman Alpar',
    'hero.subtitle': 'Emergency Medicine Specialist',
    'hero.tagline': '',
    'hero.badge1': 'Emergency Medicine Specialist',
    'hero.cta1': 'For Patients',
    'hero.cta2': 'For Healthcare Professionals',

    'services.label': 'SERVICES',
    'services.title': 'What I Offer',
    'services.desc': 'Specialized services in emergency medicine',
    'services.patient.title': 'Patient Information',
    'services.patient.desc': 'Reliable, accessible information on diseases, treatments, and patient rights.',
    'services.student.title': 'Healthcare Professionals',
    'services.student.desc': 'Emergency medicine protocols and academic resources for medical students, residents, and colleagues.',
    'services.healthcare.title': 'Healthcare Professionals',
    'services.healthcare.desc': 'Emergency medicine protocols and academic resources for medical students, residents, and colleagues.',
    'services.blog.title': 'Blog & Articles',
    'services.blog.desc': 'In-depth articles on emergency medicine, medical ethics, and scientific topics.',
    'services.more': 'Read more →',

    'about.label': 'ABOUT',
    'about.title': 'Who is Dr. Süleyman Alpar?',
    'about.p1': 'I am an emergency medicine specialist. I graduated from Istanbul University Istanbul Faculty of Medicine and completed my residency at Istanbul Training and Research Hospital.',
    'about.p2': 'I currently serve as a faculty member and head of the Department of Emergency Medicine at Istanbul Beykent University Faculty of Medicine. I also work as an emergency medicine specialist at Bahçelievler Memorial Hospital.',
    'about.stat1': 'Years Experience',
    'about.stat2': 'My Publications',

    'blog.label': 'LATEST POSTS',
    'blog.title': 'Blog & Articles',
    'blog.desc': 'Latest writings from the world of emergency medicine and health',
    'blog.cat1': 'Emergency Medicine',
    'blog.cat2': 'Medical Ethics',
    'blog.cat3': 'Scientific Research',
    'blog.title1': 'Triage in Emergency Department: Correct Prioritization Saves Lives',
    'blog.desc1': 'The importance of triage systems in emergency departments and what patients need to know.',
    'blog.title2': 'AI in Medicine: Where Are the Ethical Boundaries?',
    'blog.desc2': 'An assessment of AI\'s role in medical decisions and its ethical dimensions.',
    'blog.title3': 'Patient Consent in Clinical Research',
    'blog.desc3': 'Clinical research from the perspective of informed consent processes and patient safety.',
    'blog.readmore': 'View All →',
    'blog.readtime': 'min read',

    'contact.label': 'CONTACT',
    'contact.title': 'Get in Touch',
    'contact.desc': 'Feel free to reach out for questions, collaboration proposals, or consultation requests.',
    'contact.email.label': 'Email',
    'contact.location.label': 'Location',
    'contact.location': 'Turkey',
    'contact.social.label': 'Social Media',
    'contact.form.name': 'Your Full Name',
    'contact.form.email': 'Your Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.subject.opt1': 'General Question',
    'contact.form.subject.opt2': 'Collaboration',
    'contact.form.subject.opt3': 'Consultation',
    'contact.form.subject.opt4': 'Other',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',

    'footer.desc': 'A personal website sharing knowledge and experience in emergency medicine.',
    'footer.links': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.cookie': 'Cookie Policy',
    'footer.copyright': '© 2026 Dr. Süleyman Alpar. All rights reserved.',

    'patient.header.title': 'Patient Information',
    'patient.header.desc': 'Reliable, accessible, and up-to-date information about your health',
    'patient.rights.label': 'PATIENT RIGHTS',
    'patient.rights.title': 'Know Your Rights',
    'patient.rights.desc': 'Essential rights and legal protections every patient should know',
    'patient.right1.title': 'Right to Information',
    'patient.right1.desc': 'You have the right to be informed clearly about your diagnosis, treatment options, risks, and alternatives.',
    'patient.right2.title': 'Right to Consent',
    'patient.right2.desc': 'Obtaining your informed consent before any medical intervention is a legal requirement.',
    'patient.right3.title': 'Right to Privacy',
    'patient.right3.desc': 'Your medical information is confidential and cannot be shared with third parties except as required by law.',
    'patient.right4.title': 'Right to Refuse Treatment',
    'patient.right4.desc': 'You have the right to refuse recommended treatment. Your refusal will be documented.',
    'patient.health.label': 'HEALTH INFORMATION',
    'patient.health.title': 'Common Health Topics',
    'patient.health1.title': 'Preventive Health',
    'patient.health1.desc': 'Information about regular check-ups, vaccinations, and the importance of early screening.',
    'patient.health2.title': 'Chronic Diseases',
    'patient.health2.desc': 'Practical information on managing diabetes, hypertension, and heart disease.',
    'patient.health3.title': 'Medication Use',
    'patient.health3.desc': 'Guide on proper medication use, side effects, and drug interactions.',
    'patient.faq.label': 'FREQUENTLY ASKED QUESTIONS',
    'patient.faq.title': 'Common Questions',
    'patient.faq1.q': 'What should I do if my patient rights are violated?',
    'patient.faq1.a': 'First, you can apply to the patient rights unit of the healthcare facility. If unresolved, you can file a complaint with the Provincial Health Directorate Patient Rights Board. You also have the right to seek legal consultation.',
    'patient.faq2.q': 'How can I access my medical records?',
    'patient.faq2.a': 'Under the Personal Data Protection Law (KVKK), you have the right to request a copy of your medical records. You can submit a written application to the medical records department of the healthcare facility.',
    'patient.faq3.q': 'Do I have the right to seek a second opinion?',
    'patient.faq3.a': 'Yes, every patient has the right to seek another doctor\'s opinion regarding diagnosis and treatment. Exercising this right will not negatively affect your treatment.',
    'patient.faq4.q': 'Is patient consent required in emergencies?',
    'patient.faq4.a': 'In emergency and life-threatening situations where the patient or legal representative cannot provide consent, physicians may perform necessary interventions without consent.',

    'student.header.title': 'Student Resources',
    'student.header.desc': 'Academic resources, notes, and career guidance for medical students',
    'student.notes.label': 'LECTURE NOTES',
    'student.notes.title': 'Academic Resources',
    'student.notes.desc': 'Comprehensive resources to help you in your medical education',
    'student.note1.title': 'Anatomy Atlas and Notes',
    'student.note1.desc': 'Systematic and topographic anatomy lecture notes, diagrams, and practical information.',
    'student.note1.tag': 'Basic Medicine',
    'student.note2.title': 'Emergency Medicine Protocols',
    'student.note2.desc': 'Common emergency situations, protocols, and treatment algorithms.',
    'student.note2.tag': 'Emergency',
    'student.note3.title': 'Clinical Case Studies',
    'student.note3.desc': 'Interactive case studies adapted from real cases with solution analyses.',
    'student.note3.tag': 'Clinical',
    'student.note4.title': 'Scientific Writing Guide',
    'student.note4.desc': 'All stages of academic writing from research design to publication.',
    'student.note4.tag': 'Research',
    'student.note5.title': 'Medical Ethics and Deontology',
    'student.note5.desc': 'Comprehensive notes on ethical dilemmas, patient-doctor relationships, and professional values.',
    'student.note5.tag': 'Ethics',
    'student.career.label': 'CAREER GUIDANCE',
    'student.career.title': 'Career Roadmap',
    'student.career1.title': 'Specialty Exam Preparation',
    'student.career1.desc': 'Preparation strategies, resource recommendations, and study plans.',
    'student.career2.title': 'Academic Career',
    'student.career2.desc': 'A guide from research assistantship to professorship.',
    'student.career3.title': 'Emergency Medicine Specialization',
    'student.career3.desc': 'Emergency medicine specialization process, career opportunities, and fields of work.',

    'blogpage.header.title': 'Blog & Articles',
    'blogpage.header.desc': 'Emergency medicine, medical ethics, and scientific research',
    'blogpage.filter.all': 'All',
    'blogpage.filter.law': 'Emergency Medicine',
    'blogpage.filter.ethics': 'Medical Ethics',
    'blogpage.filter.science': 'Scientific Research',
  }
};

// --- Language Management ---
let currentLang = localStorage.getItem('lang') || 'tr';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
}

// --- Navigation ---
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Mobile menu
  mobileToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Active link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// --- Language Switch Buttons ---
function initLanguageSwitch() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });
}

// --- FAQ Accordion ---
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// --- Scroll Animations ---
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

// --- Contact Form ---
function initContactForm() {
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = currentLang === 'tr' ? 'Gönderildi!' : 'Sent!';
    btn.style.background = '#38a169';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      form.reset();
    }, 2000);
  });
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLanguageSwitch();
  initFAQ();
  initAnimations();
  initContactForm();
  setLanguage(currentLang);
});
