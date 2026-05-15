/** Türkçe arayüz metinleri — ileride i18n ile değiştirilebilir. */
export const appCopy = {
  /** Route / global loading — `AppGlobalLoading` varsayılan başlığı; prop ile geçersizlenebilir. */
  loadingDefaultTitle: 'Yükleniyor...',
  userInitials: 'BK',
  backToMetodbox: "Metodbox'a geri dön",
  heroTitle: 'BkAi ile saniyeler içinde ders materyalleri oluşturun',
  heroSubtitle:
    'BkAi ile soru oluşturun, ders planı hazırlayın, ödev ve etüt gönderin, öğrenci performansını analiz edin hepsi tek platformda.',
  introVideo: 'BkAi Tanıtım Videosu',
  comingSoon: 'Yakında',
  notFound: {
    code: '404',
    title: 'Sayfa bulunamadı',
    description: 'Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.',
    backHome: 'Ana sayfaya dön',
  },
  features: {
    soruOlustur: {
      title: 'Soru Oluştur',
      description: 'Kazanımlara uygun hızlı soru üret',
    },
    dersPlaniOlustur: {
      title: 'Ders Planı Oluştur',
      description: 'Dakikalar içinde hazır ders planı',
    },
    etutOlustur: {
      title: 'Etüt Oluştur',
      description: 'Öğrencilere hızlı etütler oluştur gönder',
    },
    ogrenciSinifRaporlari: {
      title: 'Öğrenci ve Sınıf Raporları',
      description: 'Performansı analiz et, gelişimi takip et',
    },
    kompozisyonRubrik: {
      title: 'Kompozisyon ve Rubrik Oluştur',
      description: 'Yazılılar için rubrik ve konu üret',
    },
    evCalismasi: {
      title: 'Ev Çalışması Oluştur',
      description: 'Tek tıkla ödev hazırla ve gönder',
    },
  },
  questionCreate: {
    pageTitle: 'Soru Oluştur',
    tabs: { create: 'Oluştur', list: 'Oluşturulan Sorular', draft2: 'Soru - 2', draft4: 'Soru - 4' },
    workspaceNav: [
      { id: 'soru', label: 'Soru oluştur', icon: 'mdi:sparkles' },
      { id: 'dersPlani', label: 'Ders planı oluştur', icon: 'mdi:scatter-plot-outline' },
      { id: 'etut', label: 'Etüt oluştur', icon: 'mdi:book-education' },
      { id: 'akademik', label: 'Akademik raporlar', icon: 'mdi:chart-bar' },
      { id: 'kompozisyon', label: 'Kompozisyon ve rubrik oluştur', icon: 'mdi:file-document-edit-outline' },
      { id: 'ev', label: 'Ev çalışması oluştur', icon: 'mdi:book-open-variant' },
    ],
    sidebarCreatedShortcut: 'Oluşturulan sorular',
    modeWorkspaces: {
      placeholderNote: 'Bu mod için arayüz ve servis bağlantıları hazırlanıyor.',
    },
    modes: {
      metodbox: {
        title: 'Metodbox Testlerinden Soru Üret',
        description: 'Metodbox testlerinden soru seçerek ilerleyin.',
      },
      tymm: {
        title: 'TYMM Bağlam Temelli Çoktan Seçmeli Soru Üret',
        description: 'Bağlam temelli çoktan seçmeli formatında soru üretin.',
      },
      ai: {
        title: 'Yapay Zeka ile Soru Üret',
        description: 'Konu anlatımına göre yapay zeka ile soru oluşturun.',
        badge: 'BK Ai öneriyor',
      },
    },
    steps: {
      topic: { title: 'Konu seçimi', actionQr: 'Karekod ile ara' },
      metodboxTests: { title: 'Metodbox Testleri' },
      metodboxQuestions: {
        title: 'Metodbox Soruları',
        subtitle: '(Seçili kazanım etiketi olan tüm sorular listelenmektedir.)',
      },
      selectedTests: { title: 'Seçilen Testler ve soru sayısı' },
    },
    fields: {
      level: 'Düzey',
      lesson: 'Ders',
      unit: 'Ünite',
      topic: 'Konu',
    },
    selectPlaceholder: 'Seçiniz',
    continue: 'Devam et',
    /** «Devam et» sonrası geçici yönlendirme ekranı */
    creatingRedirectTitle: 'Oluşturuluyor...',
    stepProceed: 'İlerle',
    stepCompleted: 'Tamamlandı',
    questionStep3: {
      pickCountLabel: 'Seçilen sorulara göre zorluk dağılımı:',
      kolay: 'Kolay',
      orta: 'Orta',
      zor: 'Zor',
      listTitle: 'Soru',
      tabSoru: 'Soru',
      tabCozum: 'Çözüm Videosu',
      kazanimKodu: 'Kazanım Kodu',
      dogruCevap: 'Doğru Cevap',
      sec: 'Seç',
      secimdenVazgec: 'Seçimden vazgeç',
      listSelectedBadge: '1 seçildi',
      icerikPlaceholder: 'Soru içeriği ve görseller servisten yüklenecek.',
      zoomIn: 'Yakınlaştır',
      zoomOut: 'Uzaklaştır',
    },
    questionStep4: {
      emptyHint: 'Önce 2. adımdan bir test seçmelisiniz.',
      selectedCountSuffix: 'seçilen soru sayısı',
    },
    listPlaceholder: 'Soru listeniz burada listelenecek.',
  },
} as const
