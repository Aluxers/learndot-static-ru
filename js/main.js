// Получаем инициалы из имени
// Например: "Анна Ким" → "АК"
// Используется для аватаров (кружки с буквами)

function getInitials(name) {
  var parts = name.split(' ');
  var initials = '';
  for (var i = 0; i < parts.length; i++) {
    initials += parts[i][0];
  }
  return initials;
}


// ==============================================================
//   ПЕРЕВОД РОЛИ НА РУССКИЙ
//   student → Студент, teacher → Преподаватель, admin → Администратор
//   Используется в шапке, боковом меню и на страницах
// ==============================================================

function getRoleLabel(role) {
  if (role === 'student') return t('student');
  if (role === 'teacher') return t('teacher');
  if (role === 'admin') return t('admin');
  return role;
}


// ==============================================================
//   ПРОВЕРКА: демо-пользователь или новый аккаунт
//
//   Демо-аккаунты: u1 (студент), u2 (преподаватель), u3 (админ)
//   Новые аккаунты: ID начинается с 'u' + число (временная метка)
//
//   Для демо-пользователей показываем данные из DATA
//   Для новых пользователей показываем пустые данные или localStorage
// ==============================================================

function isDemoUser() {
  var user = LearnDot.auth.getCurrentUser();
  if (!user) return false;
  if (user.id === 'u1' || user.id === 'u2' || user.id === 'u3') {
    return true;
  }
  return false;
}


// ==============================================================
//   ПОЛУЧЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
//
//   Для демо → данные из DATA + localStorage
//   Для нового → только localStorage (или пусто)
// ==============================================================

// Записи на курсы (для студента)
function getUserEnrollments() {
  var all = [];

  // Для демо — берём из DATA
  if (isDemoUser()) {
    for (var i = 0; i < DATA.enrollments.length; i++) {
      all.push(DATA.enrollments[i]);
    }
  }

  // Добавляем записи из localStorage
  try {
    var saved = localStorage.getItem('learndot-enrollments');
    if (saved) {
      var extra = JSON.parse(saved);
      for (var i = 0; i < extra.length; i++) {
        var exists = false;
        for (var j = 0; j < all.length; j++) {
          if (all[j].courseId === extra[i].courseId) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          all.push(extra[i]);
        }
      }
    }
  } catch (e) {}

  return all;
}

// Задания (для студента)
function getUserAssignments() {
  if (!isDemoUser()) return [];
  return DATA.assignments;
}

// Оплаты (для студента)
function getUserPayments() {
  if (!isDemoUser()) return [];
  return DATA.payments;
}

// Уведомления (для студента)
function getUserNotifications() {
  if (!isDemoUser()) {
    return [{
      id: 'n-welcome',
      type: 'system',
      title: 'Добро пожаловать!',
      message: 'Ваш аккаунт создан. Запишитесь на первый курс!',
      date: new Date().toISOString().split('T')[0],
      read: false
    }];
  }
  return DATA.notifications;
}

// Сертификаты (для студента)
function getUserCertificates() {
  if (!isDemoUser()) return [];
  return DATA.certificates;
}

// Курсы преподавателя
function getTeacherCourses() {
  if (!isDemoUser()) return [];
  return DATA.teacherCourses;
}

// Работы студентов (для преподавателя)
function getTeacherSubmissions() {
  if (!isDemoUser()) return [];
  return DATA.submissions;
}


// ==============================================================
//   ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА (RU / KZ / EN)
//
//   Простая реализация:
//   1. Текущий язык хранится в localStorage('learndot-lang')
//   2. При переключении — перезагружаем страницу
//   3. Тексты берутся из словаря LANG
//   4. По умолчанию — RU
//
//   Ключ localStorage: 'learndot-lang'
//   Значения: 'ru', 'kz', 'en'
// ==============================================================

// Получаем текущий язык
function getCurrentLang() {
  try {
    var saved = localStorage.getItem('learndot-lang');
    if (saved === 'kz' || saved === 'en' || saved === 'ru') {
      return saved;
    }
  } catch (e) {}
  return 'ru';
}

// Устанавливаем язык
function setLang(lang) {
  try {
    localStorage.setItem('learndot-lang', lang);
  } catch (e) {}
  window.location.reload();
}

// Словарь переводов для основных элементов интерфейса
var LANG = {
  ru: {
    home: 'Главная',
    courses: 'Курсы',
    teachers: 'Преподаватели',
    pricing: 'Тарифы',
    blog: 'Блог',
    login: 'Войти',
    register: 'Регистрация',
    cabinet: 'Кабинет',
    logout: 'Выйти',
    free: 'Бесплатно',
    students: 'студентов',
    lessons: 'уроков',
    homeHeroTitle: 'Освойте <span class="text-primary">Дизайн</span> и <span class="text-primary">IT</span> в своём темпе',
    homeHeroText: 'Структурированные курсы, опытные преподаватели, практические проекты и поддержка сообщества.',
    homeHeroCourses: 'Смотреть курсы',
    homeHeroRegister: 'Регистрация',
    ctaTitle: 'Начните обучение уже сегодня',
    ctaText: 'Получите доступ к курсам по дизайну и IT, развивайте практические навыки и двигайтесь к профессии в удобном темпе.',
    ctaBtn1: 'Начать бесплатно',
    ctaBtn2: 'Смотреть курсы',
    homeCategoriesTitle: 'Направления, с которых начинается рост',
    homeCategoriesText: 'Выберите сферу, которая вам ближе, и начните обучение в удобном формате с понятной подачей и практикой.',
    homeDesignTitle: 'Дизайн',
    homeDesignText: 'Курсы по UX/UI, веб-дизайну, графике и визуальным инструментам для тех, кто хочет мыслить креативно и создавать эстетичные решения.',
    homeItTitle: 'IT и разработка',
    homeItText: 'Курсы по основам программирования и веб-разработки для тех, кто хочет уверенно войти в цифровую профессию.',
    chooseCategory: 'Выбрать направление →',
    popularCoursesTitle: 'Популярные курсы',
    popularCoursesText: 'Самые востребованные курсы, которым доверяют тысячи студентов.',
    allCourses: 'Все курсы',
    benefitsTitle: 'Почему выбирают Learn?',
    benefitsText: 'Мы продумали каждую деталь, чтобы вы добились успеха.',
    benefitStructuredTitle: 'Структурированная программа',
    benefitStructuredText: 'Курс выстроен по понятной логике, чтобы вам было легче осваивать материал.',
    benefitTeachersTitle: 'Опытные преподаватели',
    benefitTeachersText: 'Занимайтесь со специалистами, которые объясняют сложные темы простым языком.',
    benefitPaceTitle: 'Учитесь в своём темпе',
    benefitPaceText: 'Выбирайте комфортный ритм и проходите материалы в удобное время.',
    benefitProjectsTitle: 'Практические проекты',
    benefitProjectsText: 'Выполняйте задания, которые помогают закреплять знания и получать опыт.',
    benefitMobileTitle: 'Мобильная версия',
    benefitMobileText: 'Пользуйтесь платформой на компьютере, планшете или телефоне.',
    benefitCertificatesTitle: 'Сертификаты',
    benefitCertificatesText: 'После прохождения курса вы получаете сертификат для портфолио или резюме.',
    teachersTitle: 'Наши преподаватели',
    teachersText: 'Профессионалы индустрии, увлечённые обучением.',
    allTeachers: 'Все преподаватели',
    reviewsTitle: 'Что говорят наши студенты',
    reviewsText: 'Отзывы тех, кто уже прошёл обучение и применяет знания на практике.',
    allReviews: 'Все отзывы',
    reviews: 'Отзывы',
    faq: 'Вопросы',
    footerTagline: 'Онлайн-платформа для изучения дизайна и IT. Развивайте навыки с современными курсами.',
    platform: 'Платформа',
    designCourses: 'Курсы дизайна',
    itCourses: 'Курсы IT',
    resources: 'Ресурсы',
    student: 'Студент',
    teacher: 'Преподаватель',
    admin: 'Админ'
    ,
    coursesPageTitle: 'Каталог курсов',
    coursesPageText: 'Все курсы по дизайну и IT в одном месте.',
    searchCourses: 'Поиск курсов...',
    sortPopular: 'По популярности',
    sortRating: 'По рейтингу',
    sortPriceAsc: 'Цена: по возрастанию',
    sortPriceDesc: 'Цена: по убыванию',
    categoryLabel: 'Категория:',
    levelLabel: 'Уровень:',
    durationLabel: 'Длительность',
    all: 'Все',
    design: 'Дизайн',
    beginner: 'Начальный',
    middle: 'Средний',
    found: 'Найдено:',
    nothingFound: 'Ничего не найдено',
    changeFilters: 'Попробуйте изменить фильтры.',
    teachersPageTitle: 'Наши преподаватели',
    teachersPageText: 'Профессионалы индустрии, создающие и ведущие курсы.',
    teacherCourses: 'Курсы',
    teacherCtaTitle: 'Хотите преподавать?',
    teacherCtaText: 'Поделитесь знаниями с тысячами студентов.',
    pricingPageTitle: 'Простые и прозрачные тарифы',
    pricingPageText: 'Выберите план под ваши цели. Отмена в любой момент.',
    popular: 'Популярный',
    forever: 'навсегда',
    perMonth: '/мес',
    start: 'Начать',
    startPro: 'Начать Pro',
    contact: 'Связаться',
    notSureTitle: 'Не уверены в выборе?',
    notSureText: 'Начните бесплатно и обновитесь в любое время.',
    faqPageTitle: 'Частые вопросы',
    faqPageText: 'Ответы на вопросы о курсах, доступе, оплате и сертификатах.',
    topic: 'Тема:',
    common: 'Общие',
    access: 'Доступ',
    payment: 'Оплата',
    certificates: 'Сертификаты',
    stillQuestions: 'Остались вопросы?',
    blogPageTitle: 'Идеи, знания, практика',
    blogPageText: 'Актуальные статьи, практические рекомендации и вдохновение для тех, кто развивается в дизайне и IT.',
    blogCtaTitle: 'Хотите написать статью?',
    blogCtaText: 'Поделитесь опытом с нашим сообществом.',
    reviewsPageTitle: 'Отзывы студентов',
    reviewsPageText: 'Реальные отзывы от тех, кто учился с нами.',
    reviewsCount: 'отзывов',
    joinTitle: 'Присоединяйтесь',
    joinText: 'Начните обучение и станьте следующей историей успеха.',
    designCoursesTitle: 'Курсы дизайна',
    designCoursesText: 'UX/UI, веб-дизайн, графический дизайн, Figma и моушн-дизайн.',
    itCoursesTitle: 'Курсы IT',
    itCoursesText: 'Программирование, веб-разработка, Python, JavaScript и другие цифровые навыки.'
    ,
    courseNotFound: 'Курс не найден',
    toCatalog: 'К каталогу',
    enrolled: 'Вы записаны',
    goLearning: 'Перейти к обучению',
    enroll: 'Записаться',
    module: 'Модуль',
    aboutCourse: 'О курсе',
    whatLearn: 'Чему вы научитесь',
    courseProgram: 'Программа курса',
    format: 'Формат',
    online: 'Онлайн',
    certificate: 'Сертификат',
    yes: 'Да',
    refund: 'Гарантия возврата 14 дней'
    ,
    courseCtaTitle: 'Понравился курс?',
    courseCtaText: 'Записывайтесь и начните обучение уже сегодня.',
    articleCtaTitle: 'Хотите узнать больше?',
    articleCtaText: 'Изучайте курсы и развивайте навыки в дизайне и IT.',
    user: 'Пользователь',
    dashboard: 'Панель',
    studentDashboard: 'Панель студента',
    teacherDashboard: 'Кабинет преподавателя',
    adminDashboard: 'Панель администратора',
    myCourses: 'Мои курсы',
    assignments: 'Задания',
    quizzes: 'Тесты',
    payments: 'Оплаты',
    notifications: 'Уведомления',
    profile: 'Профиль',
    settings: 'Настройки',
    lessonManage: 'Уроки',
    works: 'Работы',
    stats: 'Статистика',
    categories: 'Категории',
    users: 'Пользователи',
    content: 'Контент',
    analytics: 'Аналитика',
    toSite: 'На сайт',
    hello: 'Привет',
    welcome: 'Добро пожаловать',
    learningOverview: 'Обзор вашего обучения.',
    teacherOverview: 'Обзор вашей преподавательской деятельности.',
    platformOverview: 'Обзор платформы.',
    activeCourses: 'Активные курсы',
    nearestAssignments: 'Ближайшие задания',
    recommendedCourses: 'Рекомендуемые курсы',
    enrolledCourses: 'Записан на курсы',
    completed: 'Пройдено',
    totalProgress: 'Общий прогресс',
    continueLearning: 'Продолжить',
    noActiveCourses: 'Нет активных курсов',
    enrollToStart: 'Запишитесь на курс, чтобы начать обучение.',
    allAssignments: 'Все задания →',
    allNotifications: 'Все уведомления →',
    pending: 'Ожидает',
    newLabel: 'Новое',
    yourCourses: 'Ваши курсы',
    pendingChecks: 'Ожидающие проверки',
    published: 'Опубликован',
    avgRating: 'Средний рейтинг',
    allWorks: 'Все работы →',
    topCourses: 'Топ курсов',
    revenue: 'Доход',
    rating: 'Рейтинг',
    lastPayments: 'Последние платежи',
    amount: 'Сумма',
    date: 'Дата',
    status: 'Статус',
    paid: 'Оплачено',
    refunded: 'Возврат',
    waitModeration: 'Ожидают модерации'
  },
  kz: {
    home: 'Басты',
    courses: 'Курстар',
    teachers: 'Оқытушылар',
    pricing: 'Тарифтер',
    blog: 'Блог',
    login: 'Кіру',
    register: 'Тіркелу',
    cabinet: 'Кабинет',
    logout: 'Шығу',
    free: 'Тегін',
    students: 'студент',
    lessons: 'сабақ',
    homeHeroTitle: '<span class="text-primary">Дизайн</span> мен <span class="text-primary">IT</span>-ды өз қарқыныңызбен меңгеріңіз',
    homeHeroText: 'Құрылымды курстар, тәжірибелі оқытушылар, практикалық жобалар және қауымдастық қолдауы.',
    homeHeroCourses: 'Курстарды қарау',
    homeHeroRegister: 'Тіркелу',
    ctaTitle: 'Бүгін оқуды бастаңыз',
    ctaText: 'Дизайн мен IT курстарына қол жеткізіп, практикалық дағдыларды дамытыңыз.',
    ctaBtn1: 'Тегін бастау',
    ctaBtn2: 'Курстарды қарау',
    homeCategoriesTitle: 'Өсу басталатын бағыттар',
    homeCategoriesText: 'Өзіңізге жақын саланы таңдап, түсінікті форматта оқуды бастаңыз.',
    homeDesignTitle: 'Дизайн',
    homeDesignText: 'UX/UI, веб-дизайн, графика және визуалды құралдар бойынша курстар.',
    homeItTitle: 'IT және әзірлеу',
    homeItText: 'Бағдарламалау және веб-әзірлеу негіздері бойынша курстар.',
    chooseCategory: 'Бағытты таңдау →',
    popularCoursesTitle: 'Танымал курстар',
    popularCoursesText: 'Мыңдаған студент сенетін ең сұранысты курстар.',
    allCourses: 'Барлық курстар',
    benefitsTitle: 'Неге Learn таңдайды?',
    benefitsText: 'Сіз жетістікке жету үшін әр бөлшекті ойластырдық.',
    benefitStructuredTitle: 'Құрылымды бағдарлама',
    benefitStructuredText: 'Курс түсінікті логикамен құрылған, сондықтан материалды меңгеру жеңіл болады.',
    benefitTeachersTitle: 'Тәжірибелі оқытушылар',
    benefitTeachersText: 'Күрделі тақырыптарды қарапайым тілмен түсіндіретін мамандармен оқыңыз.',
    benefitPaceTitle: 'Өз қарқыныңызбен оқыңыз',
    benefitPaceText: 'Өзіңізге ыңғайлы ырғақты таңдап, материалдарды қолайлы уақытта өтіңіз.',
    benefitProjectsTitle: 'Практикалық жобалар',
    benefitProjectsText: 'Білімді бекітуге және тәжірибе алуға көмектесетін тапсырмаларды орындаңыз.',
    benefitMobileTitle: 'Мобильді нұсқа',
    benefitMobileText: 'Платформаны компьютерде, планшетте немесе телефонда қолданыңыз.',
    benefitCertificatesTitle: 'Сертификаттар',
    benefitCertificatesText: 'Курсты аяқтағаннан кейін портфолио немесе түйіндеме үшін сертификат аласыз.',
    teachersTitle: 'Біздің оқытушылар',
    teachersText: 'Оқытуға қызығатын сала мамандары.',
    allTeachers: 'Барлық оқытушылар',
    reviewsTitle: 'Студенттеріміз не дейді',
    reviewsText: 'Оқудан өтіп, білімін практикада қолданып жүрген студенттердің пікірлері.',
    allReviews: 'Барлық пікірлер',
    reviews: 'Пікірлер',
    faq: 'Сұрақтар',
    footerTagline: 'Дизайн мен IT үйренуге арналған онлайн-платформа. Заманауи курстармен дағдыларыңызды дамытыңыз.',
    platform: 'Платформа',
    designCourses: 'Дизайн курстары',
    itCourses: 'IT курстары',
    resources: 'Ресурстар',
    student: 'Студент',
    teacher: 'Оқытушы',
    admin: 'Админ'
    ,
    coursesPageTitle: 'Курстар каталогы',
    coursesPageText: 'Дизайн және IT курстары бір жерде.',
    searchCourses: 'Курстарды іздеу...',
    sortPopular: 'Танымалдығы бойынша',
    sortRating: 'Рейтингі бойынша',
    sortPriceAsc: 'Баға: өсуі бойынша',
    sortPriceDesc: 'Баға: кемуі бойынша',
    categoryLabel: 'Санат:',
    levelLabel: 'Деңгей:',
    durationLabel: 'Ұзақтығы',
    all: 'Барлығы',
    design: 'Дизайн',
    beginner: 'Бастапқы',
    middle: 'Орта',
    found: 'Табылды:',
    nothingFound: 'Ештеңе табылмады',
    changeFilters: 'Сүзгілерді өзгертіп көріңіз.',
    teachersPageTitle: 'Біздің оқытушылар',
    teachersPageText: 'Курстарды жасайтын және жүргізетін сала мамандары.',
    teacherCourses: 'Курстар',
    teacherCtaTitle: 'Оқытушы болғыңыз келе ме?',
    teacherCtaText: 'Біліміңізді мыңдаған студентпен бөлісіңіз.',
    pricingPageTitle: 'Қарапайым және түсінікті тарифтер',
    pricingPageText: 'Мақсатыңызға сай жоспарды таңдаңыз. Кез келген уақытта бас тартуға болады.',
    popular: 'Танымал',
    forever: 'мәңгі',
    perMonth: '/ай',
    start: 'Бастау',
    startPro: 'Pro бастау',
    contact: 'Байланысу',
    notSureTitle: 'Таңдауға сенімді емессіз бе?',
    notSureText: 'Тегін бастап, кейін кез келген уақытта жаңартыңыз.',
    faqPageTitle: 'Жиі қойылатын сұрақтар',
    faqPageText: 'Курстар, қолжетімділік, төлем және сертификаттар туралы жауаптар.',
    topic: 'Тақырып:',
    common: 'Жалпы',
    access: 'Қолжетімділік',
    payment: 'Төлем',
    certificates: 'Сертификаттар',
    stillQuestions: 'Сұрақтарыңыз қалды ма?',
    blogPageTitle: 'Идеялар, білім, практика',
    blogPageText: 'Дизайн және IT бағытында дамитындар үшін пайдалы мақалалар мен кеңестер.',
    blogCtaTitle: 'Мақала жазғыңыз келе ме?',
    blogCtaText: 'Тәжірибеңізді қауымдастықпен бөлісіңіз.',
    reviewsPageTitle: 'Студенттердің пікірлері',
    reviewsPageText: 'Бізбен оқыған адамдардың нақты пікірлері.',
    reviewsCount: 'пікір',
    joinTitle: 'Қосылыңыз',
    joinText: 'Оқуды бастап, келесі жетістік тарихына айналыңыз.',
    designCoursesTitle: 'Дизайн курстары',
    designCoursesText: 'UX/UI, веб-дизайн, графикалық дизайн, Figma және моушн-дизайн.',
    itCoursesTitle: 'IT курстары',
    itCoursesText: 'Бағдарламалау, веб-әзірлеу, Python, JavaScript және басқа цифрлық дағдылар.'
    ,
    courseNotFound: 'Курс табылмады',
    toCatalog: 'Каталогқа өту',
    enrolled: 'Сіз жазылдыңыз',
    goLearning: 'Оқуға өту',
    enroll: 'Жазылу',
    module: 'Модуль',
    aboutCourse: 'Курс туралы',
    whatLearn: 'Не үйренесіз',
    courseProgram: 'Курс бағдарламасы',
    format: 'Формат',
    online: 'Онлайн',
    certificate: 'Сертификат',
    yes: 'Иә',
    refund: '14 күн қайтару кепілдігі'
    ,
    courseCtaTitle: 'Курс ұнады ма?',
    courseCtaText: 'Жазылып, оқуды бүгін бастаңыз.',
    articleCtaTitle: 'Көбірек білгіңіз келе ме?',
    articleCtaText: 'Курстарды оқып, дизайн және IT дағдыларыңызды дамытыңыз.',
    user: 'Пайдаланушы',
    dashboard: 'Панель',
    studentDashboard: 'Студент панелі',
    teacherDashboard: 'Оқытушы кабинеті',
    adminDashboard: 'Әкімші панелі',
    myCourses: 'Менің курстарым',
    assignments: 'Тапсырмалар',
    quizzes: 'Тесттер',
    payments: 'Төлемдер',
    notifications: 'Хабарламалар',
    profile: 'Профиль',
    settings: 'Баптаулар',
    lessonManage: 'Сабақтар',
    works: 'Жұмыстар',
    stats: 'Статистика',
    categories: 'Санаттар',
    users: 'Пайдаланушылар',
    content: 'Контент',
    analytics: 'Аналитика',
    toSite: 'Сайтқа',
    hello: 'Сәлем',
    welcome: 'Қош келдіңіз',
    learningOverview: 'Оқуыңыздың қысқаша шолуы.',
    teacherOverview: 'Оқытушылық жұмысыңыздың шолуы.',
    platformOverview: 'Платформа шолуы.',
    activeCourses: 'Белсенді курстар',
    nearestAssignments: 'Жақын тапсырмалар',
    recommendedCourses: 'Ұсынылатын курстар',
    enrolledCourses: 'Курстарға жазылған',
    completed: 'Аяқталды',
    totalProgress: 'Жалпы прогресс',
    continueLearning: 'Жалғастыру',
    noActiveCourses: 'Белсенді курстар жоқ',
    enrollToStart: 'Оқуды бастау үшін курсқа жазылыңыз.',
    allAssignments: 'Барлық тапсырмалар →',
    allNotifications: 'Барлық хабарламалар →',
    pending: 'Күтуде',
    newLabel: 'Жаңа',
    yourCourses: 'Сіздің курстарыңыз',
    pendingChecks: 'Тексеруді күтуде',
    published: 'Жарияланды',
    avgRating: 'Орташа рейтинг',
    allWorks: 'Барлық жұмыстар →',
    topCourses: 'Үздік курстар',
    revenue: 'Табыс',
    rating: 'Рейтинг',
    lastPayments: 'Соңғы төлемдер',
    amount: 'Сома',
    date: 'Күні',
    status: 'Статус',
    paid: 'Төленді',
    refunded: 'Қайтару',
    waitModeration: 'Модерация күтуде'
  },
  en: {
    home: 'Home',
    courses: 'Courses',
    teachers: 'Teachers',
    pricing: 'Pricing',
    blog: 'Blog',
    login: 'Log in',
    register: 'Sign up',
    cabinet: 'Dashboard',
    logout: 'Log out',
    free: 'Free',
    students: 'students',
    lessons: 'lessons',
    homeHeroTitle: 'Learn <span class="text-primary">Design</span> and <span class="text-primary">IT</span> at your own pace',
    homeHeroText: 'Structured courses, experienced teachers, practical projects and community support.',
    homeHeroCourses: 'Browse courses',
    homeHeroRegister: 'Sign up',
    ctaTitle: 'Start learning today',
    ctaText: 'Get access to design and IT courses, develop practical skills and move towards your dream career.',
    ctaBtn1: 'Start for free',
    ctaBtn2: 'Browse courses',
    homeCategoriesTitle: 'Directions where growth starts',
    homeCategoriesText: 'Choose the field that fits you and start learning in a clear practical format.',
    homeDesignTitle: 'Design',
    homeDesignText: 'Courses in UX/UI, web design, graphics and visual tools for creative work.',
    homeItTitle: 'IT and development',
    homeItText: 'Courses in programming basics and web development for a confident start in digital work.',
    chooseCategory: 'Choose direction →',
    popularCoursesTitle: 'Popular courses',
    popularCoursesText: 'The most requested courses trusted by thousands of students.',
    allCourses: 'All courses',
    benefitsTitle: 'Why choose Learn?',
    benefitsText: 'We thought through every detail to help you succeed.',
    benefitStructuredTitle: 'Structured program',
    benefitStructuredText: 'The course follows a clear logic, so it is easier to study the material.',
    benefitTeachersTitle: 'Experienced teachers',
    benefitTeachersText: 'Study with specialists who explain difficult topics in simple language.',
    benefitPaceTitle: 'Learn at your own pace',
    benefitPaceText: 'Choose a comfortable rhythm and study the materials at a convenient time.',
    benefitProjectsTitle: 'Practical projects',
    benefitProjectsText: 'Complete tasks that help you strengthen knowledge and gain experience.',
    benefitMobileTitle: 'Mobile version',
    benefitMobileText: 'Use the platform on a computer, tablet or phone.',
    benefitCertificatesTitle: 'Certificates',
    benefitCertificatesText: 'After completing a course, you receive a certificate for your portfolio or CV.',
    teachersTitle: 'Our teachers',
    teachersText: 'Industry professionals who care about teaching.',
    allTeachers: 'All teachers',
    reviewsTitle: 'What our students say',
    reviewsText: 'Reviews from people who have completed learning and use their knowledge in practice.',
    allReviews: 'All reviews',
    reviews: 'Reviews',
    faq: 'Questions',
    footerTagline: 'An online platform for learning design and IT. Build your skills with modern courses.',
    platform: 'Platform',
    designCourses: 'Design courses',
    itCourses: 'IT courses',
    resources: 'Resources',
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Admin'
    ,
    coursesPageTitle: 'Course catalog',
    coursesPageText: 'All design and IT courses in one place.',
    searchCourses: 'Search courses...',
    sortPopular: 'By popularity',
    sortRating: 'By rating',
    sortPriceAsc: 'Price: low to high',
    sortPriceDesc: 'Price: high to low',
    categoryLabel: 'Category:',
    levelLabel: 'Level:',
    durationLabel: 'Duration',
    all: 'All',
    design: 'Design',
    beginner: 'Beginner',
    middle: 'Intermediate',
    found: 'Found:',
    nothingFound: 'Nothing found',
    changeFilters: 'Try changing the filters.',
    teachersPageTitle: 'Our teachers',
    teachersPageText: 'Industry professionals who create and lead courses.',
    teacherCourses: 'Courses',
    teacherCtaTitle: 'Want to teach?',
    teacherCtaText: 'Share your knowledge with thousands of students.',
    pricingPageTitle: 'Simple and clear pricing',
    pricingPageText: 'Choose a plan for your goals. Cancel at any time.',
    popular: 'Popular',
    forever: 'forever',
    perMonth: '/mo',
    start: 'Start',
    startPro: 'Start Pro',
    contact: 'Contact us',
    notSureTitle: 'Not sure what to choose?',
    notSureText: 'Start for free and upgrade at any time.',
    faqPageTitle: 'Frequently asked questions',
    faqPageText: 'Answers about courses, access, payment and certificates.',
    topic: 'Topic:',
    common: 'General',
    access: 'Access',
    payment: 'Payment',
    certificates: 'Certificates',
    stillQuestions: 'Still have questions?',
    blogPageTitle: 'Ideas, knowledge, practice',
    blogPageText: 'Useful articles, practical tips and inspiration for people growing in design and IT.',
    blogCtaTitle: 'Want to write an article?',
    blogCtaText: 'Share your experience with our community.',
    reviewsPageTitle: 'Student reviews',
    reviewsPageText: 'Real reviews from people who studied with us.',
    reviewsCount: 'reviews',
    joinTitle: 'Join us',
    joinText: 'Start learning and become the next success story.',
    designCoursesTitle: 'Design courses',
    designCoursesText: 'UX/UI, web design, graphic design, Figma and motion design.',
    itCoursesTitle: 'IT courses',
    itCoursesText: 'Programming, web development, Python, JavaScript and other digital skills.'
    ,
    courseNotFound: 'Course not found',
    toCatalog: 'Back to catalog',
    enrolled: 'You are enrolled',
    goLearning: 'Go to learning',
    enroll: 'Enroll',
    module: 'Module',
    aboutCourse: 'About the course',
    whatLearn: 'What you will learn',
    courseProgram: 'Course program',
    format: 'Format',
    online: 'Online',
    certificate: 'Certificate',
    yes: 'Yes',
    refund: '14-day refund guarantee'
    ,
    courseCtaTitle: 'Like this course?',
    courseCtaText: 'Enroll and start learning today.',
    articleCtaTitle: 'Want to learn more?',
    articleCtaText: 'Explore courses and build your skills in design and IT.',
    user: 'User',
    dashboard: 'Dashboard',
    studentDashboard: 'Student dashboard',
    teacherDashboard: 'Teacher dashboard',
    adminDashboard: 'Admin dashboard',
    myCourses: 'My courses',
    assignments: 'Assignments',
    quizzes: 'Quizzes',
    payments: 'Payments',
    notifications: 'Notifications',
    profile: 'Profile',
    settings: 'Settings',
    lessonManage: 'Lessons',
    works: 'Works',
    stats: 'Statistics',
    categories: 'Categories',
    users: 'Users',
    content: 'Content',
    analytics: 'Analytics',
    toSite: 'To site',
    hello: 'Hello',
    welcome: 'Welcome',
    learningOverview: 'Overview of your learning.',
    teacherOverview: 'Overview of your teaching activity.',
    platformOverview: 'Platform overview.',
    activeCourses: 'Active courses',
    nearestAssignments: 'Upcoming assignments',
    recommendedCourses: 'Recommended courses',
    enrolledCourses: 'Enrolled courses',
    completed: 'Completed',
    totalProgress: 'Total progress',
    continueLearning: 'Continue',
    noActiveCourses: 'No active courses',
    enrollToStart: 'Enroll in a course to start learning.',
    allAssignments: 'All assignments →',
    allNotifications: 'All notifications →',
    pending: 'Pending',
    newLabel: 'New',
    yourCourses: 'Your courses',
    pendingChecks: 'Pending checks',
    published: 'Published',
    avgRating: 'Average rating',
    allWorks: 'All works →',
    topCourses: 'Top courses',
    revenue: 'Revenue',
    rating: 'Rating',
    lastPayments: 'Latest payments',
    amount: 'Amount',
    date: 'Date',
    status: 'Status',
    paid: 'Paid',
    refunded: 'Refunded',
    waitModeration: 'Waiting moderation'
  }
};

// Получаем текст по ключу на текущем языке
function t(key) {
  var lang = getCurrentLang();
  if (LANG[lang] && LANG[lang][key]) {
    return LANG[lang][key];
  }
  // Если нет перевода — возвращаем русский
  return LANG.ru[key] || key;
}

// Переводы данных курсов. DATA.courses оставляем как есть, а для вывода берем эти тексты.
var COURSE_LANG = {
  kz: {
    'ux-ui-design': {
      title: 'UX/UI дизайн нөлден',
      shortDesc: 'Интерфейс жобалау негіздерін үйреніп, портфолиоға жұмыс дайындаңыз.',
      description: 'Бұл курс UX/UI дизайнының негізгі кезеңдерін түсіндіреді: зерттеу, прототип, визуалды дизайн және портфолио.',
      duration: '10 апта',
      outcomes: ['UX/UI негіздерін түсіну', 'Figma-да прототип жасау', 'Пайдаланушы сценарийін құру', 'Дизайн-жүйемен жұмыс', 'Портфолиоға жоба дайындау'],
      modules: ['UX/UI кіріспе', 'Зерттеу және персоналар', 'Ақпараттық архитектура', 'Прототиптеу', 'Визуалды дизайн', 'Дизайн-жүйелер', 'Юзабилити тестілеу', 'Портфолио']
    },
    'figma-beginners': {
      title: 'Figma бастаушыларға',
      shortDesc: 'Figma құралдарын, компоненттерді және прототиптерді қарапайым деңгейден үйреніңіз.',
      description: 'Курс Figma интерфейсін, фигуралармен жұмысты, auto layout, компоненттерді және прототип жасауды қамтиды.',
      duration: '4 апта',
      outcomes: ['Figma интерфейсін білу', 'Макет жасау', 'Auto layout қолдану', 'Компоненттер құру', 'Прототип дайындау'],
      modules: ['Figma негіздері', 'Фигуралар, мәтін, суреттер', 'Auto layout', 'Компоненттер және варианттар', 'Прототиптер']
    },
    'web-design-basics': {
      title: 'Веб-дизайн негіздері',
      shortDesc: 'Заманауи сайттардың құрылымын, типографикасын және визуалды стилін үйреніңіз.',
      description: 'Курс веб-дизайн принциптерін, түстерді, торларды, адаптивтілікті және сайт жобасын жасауды түсіндіреді.',
      duration: '6 апта',
      outcomes: ['Веб-дизайн принциптері', 'Түс және типографика', 'Адаптивті макет', 'Сайт құрылымын ойлау', 'Оқу жобасын жасау'],
      modules: ['Дизайн принциптері', 'Типографика және түс', 'Торлар', 'Адаптивтілік', 'Сайт жобасы']
    },
    'graphic-design': {
      title: 'Графикалық дизайн негіздері',
      shortDesc: 'Графикалық дизайн мен визуалды коммуникацияның базалық қағидаларын меңгеріңіз.',
      description: 'Курс визуалды дизайн, типографика, түс, логотип және бренд негіздерін қарапайым түрде көрсетеді.',
      duration: '8 апта',
      outcomes: ['Визуалды композиция құру', 'Типографикамен жұмыс', 'Түстерді таңдау', 'Логотип жасау', 'Портфолио жобасын дайындау'],
      modules: ['Визуалды дизайн негіздері', 'Типографика', 'Түс', 'Логотип және бренд', 'Баспа және цифр', 'Портфолио жобасы']
    },
    'motion-design': {
      title: 'Моушн-дизайн негіздері',
      shortDesc: 'Анимация принциптерін үйреніп, қарапайым моушн-графика жасаңыз.',
      description: 'Курс анимация принциптері, негізгі кадрлар, UI анимация және финалдық жобаны қамтиды.',
      duration: '6 апта',
      outcomes: ['Анимация принциптерін білу', 'Негізгі кадрлармен жұмыс', 'UI анимация жасау', 'Моушн-графика құру', 'Финалдық жоба дайындау'],
      modules: ['Анимация принциптері', 'Негізгі кадрлар', 'UI анимация', 'Моушн-графика', 'Финалдық жоба']
    },
    'html-css': {
      title: 'HTML/CSS нөлден',
      shortDesc: 'Веб-әзірлеуді HTML және CSS негіздерінен бастаңыз.',
      description: 'Курс семантикалық HTML, CSS, Flexbox, Grid, адаптивтілік және алғашқы сайтты жариялау негіздерін үйретеді.',
      duration: '6 апта',
      outcomes: ['Семантикалық HTML жазу', 'CSS-пен безендіру', 'Flexbox және Grid қолдану', 'Адаптивті сайт жасау', 'Алғашқы сайтты жариялау'],
      modules: ['HTML негіздері', 'CSS негіздері', 'Flexbox және Grid', 'Адаптивтілік', 'Формалар және медиа', 'Финалдық жоба']
    },
    'javascript-beginners': {
      title: 'JavaScript бастаушыларға',
      shortDesc: 'JavaScript негіздері: айнымалылар, функциялар, DOM, оқиғалар және асинхрондық.',
      description: 'Курс JavaScript тілін нөлден түсіндіреді және интерактивті шағын жобалар жасауға көмектеседі.',
      duration: '8 апта',
      outcomes: ['Айнымалылармен жұмыс', 'Функциялар жазу', 'Массивтер мен объектілерді қолдану', 'DOM-пен жұмыс', 'Шағын интерактивті жобалар жасау'],
      modules: ['JS негіздері', 'Функциялар', 'Массивтер және объектілер', 'DOM', 'Оқиғалар және формалар', 'Асинхрондық', 'Жобалар']
    },
    'frontend-development': {
      title: 'Фронтенд-әзірлеу негіздері',
      shortDesc: 'React арқылы заманауи веб-қосымшалар жасауды үйреніңіз.',
      description: 'Курс заманауи JavaScript, React компоненттері, state, props, роутинг және API жұмысына арналған.',
      duration: '10 апта',
      outcomes: ['React негіздерін білу', 'Компоненттер құру', 'State және props қолдану', 'API-мен жұмыс', 'Дипломдық жоба жасау'],
      modules: ['Заманауи JS', 'React негіздері', 'State және Props', 'Роутинг', 'API', 'React-та стильдер', 'Тестілеу', 'Дипломдық жоба']
    },
    'python-basics': {
      title: 'Python негіздері',
      shortDesc: 'Бастаушыларға арналған әмбебап Python тілін үйреніңіз.',
      description: 'Курс Python синтаксисін, деректер құрылымдарын, функцияларды, файлдарды және кітапханаларды түсіндіреді.',
      duration: '8 апта',
      outcomes: ['Python кодын жазу', 'Тізімдер және сөздіктер', 'Функциялар қолдану', 'Файлдармен жұмыс', 'Практикалық есептер шығару'],
      modules: ['Орнату және синтаксис', 'Айнымалылар және типтер', 'Шарттар және циклдер', 'Функциялар', 'Деректер құрылымдары', 'Файлдар', 'Кітапханалар және жобалар']
    },
    'backend-intro': {
      title: 'Бэкендке кіріспе',
      shortDesc: 'Node.js, Express және дерекқорлар арқылы серверлік әзірлеуді үйреніңіз.',
      description: 'Курс сервердің жұмысын, REST API, дерекқорлар, аутентификация және деплой негіздерін түсіндіреді.',
      duration: '8 апта',
      outcomes: ['Сервер логикасын түсіну', 'REST API жасау', 'SQL және NoSQL негіздері', 'Аутентификация қосу', 'Жобаны жариялау'],
      modules: ['Веб қалай жұмыс істейді', 'Node.js', 'Express және API', 'SQL', 'MongoDB', 'Қауіпсіздік', 'Деплой']
    },
    'git-collaboration': {
      title: 'Git және командалық жұмыс',
      shortDesc: 'Git пен командалық әзірлеу процесін меңгеріңіз.',
      description: 'Курс Git негіздерін, тармақтарды, GitHub, pull request және командалық жұмыс ережелерін түсіндіреді.',
      duration: '3 апта',
      outcomes: ['Git командаларын қолдану', 'Тармақтармен жұмыс', 'GitHub пайдалану', 'Pull request жасау', 'Командамен жұмыс істеу'],
      modules: ['Git негіздері', 'Тармақтар', 'GitHub және PR', 'Командалық процестер']
    },
    'ai-design-basics': {
      title: 'Дизайндағы AI негіздері',
      shortDesc: 'AI құралдарын дизайн процесін жылдамдату үшін қолдануды үйреніңіз.',
      description: 'Курс дизайндағы генеративті құралдар, AI және Figma, практикалық жобалар туралы.',
      duration: '4 апта',
      outcomes: ['AI құралдарын түсіну', 'Генеративті құралдармен жұмыс', 'Figma-да AI қолдану', 'Дизайн процесін жылдамдату', 'Практикалық жоба жасау'],
      modules: ['Дизайнға арналған AI кіріспе', 'Генеративті құралдар', 'Figma-дағы AI', 'Практикалық жобалар']
    },
    'midjourney-course': {
      title: 'Midjourney және сурет генерациясы',
      shortDesc: 'Midjourney және басқа AI генераторларымен кәсіби суреттер жасаңыз.',
      description: 'Курс промпт жазу, стиль таңдау және коммерциялық визуалдар жасау негіздерін көрсетеді.',
      duration: '3 апта',
      outcomes: ['Midjourney негіздерін білу', 'Промпт жазу', 'Стильмен жұмыс', 'Визуалды идея жасау', 'Коммерциялық жоба дайындау'],
      modules: ['Midjourney негіздері', 'Промпт-инженеринг', 'Стильдер және эстетика', 'Коммерциялық жобалар']
    },
    'ai-ux-research': {
      title: 'UX зерттеулеріне арналған AI',
      shortDesc: 'AI арқылы пайдаланушыларды талдау, персона жасау және интерфейстерді тестілеуді үйреніңіз.',
      description: 'Курс UX зерттеулерінде AI қолдануды, деректерді талдауды, сценарийлер мен тестілеуді түсіндіреді.',
      duration: '5 апта',
      outcomes: ['UX зерттеулерінде AI қолдану', 'Деректерді талдау', 'Персона жасау', 'Сценарий құру', 'AI арқылы тестілеу'],
      modules: ['UX зерттеулеріндегі AI', 'Деректерді талдау', 'Персоналар және сценарийлер', 'AI арқылы тестілеу', 'Дипломдық жоба']
    }
  },
  en: {
    'ux-ui-design': { title: 'UX/UI Design from Scratch', shortDesc: 'Learn interface design from basics to a portfolio project.', description: 'This course covers UX/UI research, prototyping, visual design, design systems and portfolio work.', duration: '10 weeks', outcomes: ['Understand UX/UI basics', 'Create prototypes in Figma', 'Build user scenarios', 'Work with design systems', 'Prepare a portfolio project'], modules: ['Intro to UX/UI', 'Research and personas', 'Information architecture', 'Prototyping', 'Visual design', 'Design systems', 'Usability testing', 'Portfolio'] },
    'figma-beginners': { title: 'Figma for Beginners', shortDesc: 'Learn Figma from basic tools to components and prototypes.', description: 'The course explains Figma interface, shapes, text, images, auto layout, components and prototypes.', duration: '4 weeks', outcomes: ['Use Figma interface', 'Create layouts', 'Use auto layout', 'Build components', 'Prepare prototypes'], modules: ['Figma basics', 'Shapes, text and images', 'Auto layout', 'Components and variants', 'Prototypes'] },
    'web-design-basics': { title: 'Web Design Basics', shortDesc: 'Learn how to create clean modern websites with layout and visual design basics.', description: 'The course covers design principles, typography, color, grids, responsive design and a website project.', duration: '6 weeks', outcomes: ['Use web design principles', 'Work with typography and color', 'Create responsive layouts', 'Plan website structure', 'Build a study project'], modules: ['Design principles', 'Typography and color', 'Grids', 'Responsiveness', 'Website project'] },
    'graphic-design': { title: 'Graphic Design Basics', shortDesc: 'Build a foundation in graphic design and visual communication.', description: 'The course covers visual design, typography, color, logo and brand basics, print and digital formats.', duration: '8 weeks', outcomes: ['Create visual compositions', 'Work with typography', 'Choose colors', 'Create a logo', 'Prepare a portfolio project'], modules: ['Visual design basics', 'Typography', 'Color', 'Logo and brand', 'Print and digital', 'Portfolio project'] },
    'motion-design': { title: 'Motion Design Basics', shortDesc: 'Learn animation principles and create motion graphics.', description: 'The course covers animation principles, keyframes, UI animation, motion graphics and a final project.', duration: '6 weeks', outcomes: ['Understand animation principles', 'Work with keyframes', 'Create UI animation', 'Create motion graphics', 'Prepare a final project'], modules: ['Animation principles', 'Keyframes', 'UI animation', 'Motion graphics', 'Final project'] },
    'html-css': { title: 'HTML/CSS from Scratch', shortDesc: 'Start web development with solid HTML and CSS basics.', description: 'The course teaches semantic HTML, CSS, Flexbox, Grid, responsive design and publishing a first website.', duration: '6 weeks', outcomes: ['Write semantic HTML', 'Style pages with CSS', 'Use Flexbox and Grid', 'Create responsive websites', 'Publish a first website'], modules: ['HTML basics', 'CSS basics', 'Flexbox and Grid', 'Responsiveness', 'Forms and media', 'Final project'] },
    'javascript-beginners': { title: 'JavaScript for Beginners', shortDesc: 'JavaScript from scratch: variables, functions, DOM, events and async basics.', description: 'The course introduces JavaScript step by step and helps build small interactive projects.', duration: '8 weeks', outcomes: ['Work with variables', 'Write functions', 'Use arrays and objects', 'Work with DOM', 'Build small interactive projects'], modules: ['JS basics', 'Functions', 'Arrays and objects', 'DOM', 'Events and forms', 'Async basics', 'Projects'] },
    'frontend-development': { title: 'Frontend Development Basics', shortDesc: 'Build modern web applications with React.', description: 'The course covers modern JavaScript, React components, state, props, routing and API work.', duration: '10 weeks', outcomes: ['Understand React basics', 'Create components', 'Use state and props', 'Work with APIs', 'Build a diploma project'], modules: ['Modern JS', 'React basics', 'State and Props', 'Routing', 'API', 'Styling in React', 'Testing', 'Diploma project'] },
    'python-basics': { title: 'Python Basics', shortDesc: 'Learn Python, a universal language for beginners.', description: 'The course explains Python syntax, data structures, functions, files and popular libraries.', duration: '8 weeks', outcomes: ['Write clean Python code', 'Use lists and dictionaries', 'Create functions', 'Work with files', 'Solve practical tasks'], modules: ['Setup and syntax', 'Variables and types', 'Conditions and loops', 'Functions', 'Data structures', 'Files', 'Libraries and projects'] },
    'backend-intro': { title: 'Introduction to Backend', shortDesc: 'Learn server-side development with Node.js, Express and databases.', description: 'The course explains how servers work, REST API, databases, authentication and deployment.', duration: '8 weeks', outcomes: ['Understand server logic', 'Create REST API', 'Use SQL and NoSQL basics', 'Add authentication', 'Deploy a project'], modules: ['How the web works', 'Node.js', 'Express and API', 'SQL', 'MongoDB', 'Security', 'Deployment'] },
    'git-collaboration': { title: 'Git and Teamwork', shortDesc: 'Learn Git and professional team workflow.', description: 'The course explains Git basics, branches, GitHub, pull requests and teamwork rules.', duration: '3 weeks', outcomes: ['Use Git commands', 'Work with branches', 'Use GitHub', 'Create pull requests', 'Work in a team'], modules: ['Git basics', 'Branching', 'GitHub and PR', 'Team workflow'] },
    'ai-design-basics': { title: 'AI in Design: Basics', shortDesc: 'Use AI tools to speed up the design process.', description: 'The course covers generative tools, AI in Figma and practical design projects.', duration: '4 weeks', outcomes: ['Understand AI tools', 'Use generative tools', 'Use AI in Figma', 'Speed up design work', 'Create a practical project'], modules: ['Intro to AI for design', 'Generative tools', 'AI in Figma', 'Practical projects'] },
    'midjourney-course': { title: 'Midjourney and Image Generation', shortDesc: 'Create professional images with Midjourney and other AI generators.', description: 'The course explains prompts, styles, aesthetics and commercial visual projects.', duration: '3 weeks', outcomes: ['Use Midjourney basics', 'Write prompts', 'Work with styles', 'Create visual ideas', 'Prepare commercial projects'], modules: ['Midjourney basics', 'Prompt engineering', 'Styles and aesthetics', 'Commercial projects'] },
    'ai-ux-research': { title: 'AI for UX Research', shortDesc: 'Use AI to analyze users, create personas and test interfaces.', description: 'The course covers AI in UX research, data analysis, personas, scenarios and testing.', duration: '5 weeks', outcomes: ['Use AI in UX research', 'Analyze data', 'Create personas', 'Build scenarios', 'Test with AI'], modules: ['AI in UX research', 'Data analysis', 'Personas and scenarios', 'Testing with AI', 'Diploma project'] }
  }
};

function getCourseText(course) {
  var lang = getCurrentLang();
  var translated = COURSE_LANG[lang] && COURSE_LANG[lang][course.id];
  var copy = {};

  for (var key in course) {
    copy[key] = course[key];
  }

  copy.category = course.category === 'Дизайн' ? t('design') : 'IT';
  if (course.level === 'Начальный') copy.level = t('beginner');
  if (course.level === 'Средний') copy.level = t('middle');

  if (translated) {
    copy.title = translated.title || copy.title;
    copy.shortDesc = translated.shortDesc || copy.shortDesc;
    copy.description = translated.description || copy.description;
    copy.duration = translated.duration || copy.duration;
    copy.outcomes = translated.outcomes || copy.outcomes;

    if (translated.modules) {
      copy.modules = [];
      for (var i = 0; i < course.modules.length; i++) {
        copy.modules.push({
          title: translated.modules[i] || course.modules[i].title,
          lessons: course.modules[i].lessons
        });
      }
    }
  }

  return copy;
}

// Простой перевод готовых фраз в кабинете. Нужен для страниц, где текст рисуется через innerHTML.
var DASH_TEXT = {
  kz: {
    'Мои курсы': 'Менің курстарым',
    'Все курсы, на которые вы записаны.': 'Сіз жазылған барлық курстар.',
    'Задания': 'Тапсырмалар',
    'Ваши курсовые задания.': 'Сіздің курстық тапсырмаларыңыз.',
    'Тесты': 'Тесттер',
    'Проверьте свои знания по курсам.': 'Курстар бойынша біліміңізді тексеріңіз.',
    'Сертификаты': 'Сертификаттар',
    'Сертификаты за пройденные курсы.': 'Аяқталған курстарға арналған сертификаттар.',
    'Уведомления': 'Хабарламалар',
    'Будьте в курсе событий.': 'Жаңалықтардан хабардар болыңыз.',
    'История оплат': 'Төлемдер тарихы',
    'Все ваши транзакции.': 'Барлық транзакцияларыңыз.',
    'Профиль': 'Профиль',
    'Личный профиль и прогресс обучения.': 'Жеке профиль және оқу прогресі.',
    'Настройки': 'Баптаулар',
    'Управление аккаунтом.': 'Аккаунтты басқару.',
    'Внешний вид': 'Сыртқы көрініс',
    'Тёмная тема': 'Қараңғы тақырып',
    'Сейчас: Светлая': 'Қазір: ашық',
    'Сейчас: Тёмная': 'Қазір: қараңғы',
    'Переключить': 'Ауыстыру',
    'Имя': 'Аты',
    'О себе': 'Өзі туралы',
    'Расскажите о себе...': 'Өзіңіз туралы жазыңыз...',
    'Сохранить': 'Сақтау',
    'Смена пароля': 'Құпиясөзді өзгерту',
    'Текущий пароль': 'Қазіргі құпиясөз',
    'Новый пароль': 'Жаңа құпиясөз',
    'Мин. 6 символов': 'Кемінде 6 таңба',
    'Обновить пароль': 'Құпиясөзді жаңарту',
    'Курсы преподавателя': 'Оқытушы курстары',
    'Управление вашими курсами.': 'Курстарыңызды басқару.',
    '+ Новый курс': '+ Жаңа курс',
    'Управление уроками': 'Сабақтарды басқару',
    'Организация и редактирование уроков.': 'Сабақтарды ұйымдастыру және өңдеу.',
    'Курс:': 'Курс:',
    'Проверка работ': 'Жұмыстарды тексеру',
    'Оценивайте задания студентов.': 'Студенттердің тапсырмаларын бағалаңыз.',
    'Статистика студентов': 'Студенттер статистикасы',
    'Анализ успеваемости по вашим курсам.': 'Курстарыңыз бойынша үлгерімді талдау.',
    'Лучшие студенты': 'Үздік студенттер',
    'Панель администратора': 'Әкімші панелі',
    'Управление категориями': 'Санаттарды басқару',
    'Организация курсов по категориям.': 'Курстарды санаттар бойынша ұйымдастыру.',
    '+ Добавить': '+ Қосу',
    'Управление контентом': 'Контентті басқару',
    'Секции сайта, FAQ, блог.': 'Сайт бөлімдері, FAQ, блог.',
    'Секции': 'Бөлімдер',
    'Блог': 'Блог',
    'Управление платежами': 'Төлемдерді басқару',
    'Все транзакции платформы.': 'Платформаның барлық транзакциялары.',
    'Управление пользователями': 'Пайдаланушыларды басқару',
    'Аналитика': 'Аналитика',
    'Показатели и рост платформы.': 'Платформа көрсеткіштері және өсуі.',
    'Модерация отзывов': 'Пікірлерді модерациялау',
    'Курс': 'Курс',
    'Дата': 'Күні',
    'Способ': 'Әдіс',
    'Сумма': 'Сома',
    'Статус': 'Статус',
    'Пользователь': 'Пайдаланушы',
    'Доход': 'Табыс',
    'Рейтинг': 'Рейтинг',
    'Пройден': 'Аяқталды',
    'Сертификат': 'Сертификат',
    'Продолжить': 'Жалғастыру',
    'Пока нет курсов': 'Әзірге курстар жоқ',
    'Запишитесь на курс, чтобы начать обучение.': 'Оқуды бастау үшін курсқа жазылыңыз.',
    'Смотреть курсы': 'Курстарды қарау',
    'Оценено': 'Бағаланды',
    'Отправлено': 'Жіберілді',
    'Ожидает': 'Күтуде',
    'Комментарий': 'Пікір',
    'Оценка:': 'Баға:',
    'Сдано:': 'Тапсырылды:',
    'Загрузить работу': 'Жұмысты жүктеу',
    'Срок:': 'Мерзім:',
    'Пока нет сертификатов': 'Әзірге сертификаттар жоқ',
    'Завершите курс, чтобы получить первый сертификат.': 'Алғашқы сертификатты алу үшін курсты аяқтаңыз.',
    'Сертификат об окончании': 'Аяқтау сертификаты',
    'Выдан': 'Берілді',
    'Преподаватель:': 'Оқытушы:',
    'Скачать PDF': 'PDF жүктеу',
    'Поделиться': 'Бөлісу',
    'Прочитать все': 'Барлығын оқылды ету',
    'Новое': 'Жаңа',
    'Оплачено': 'Төленді',
    'Бесплатно': 'Тегін',
    'Транзакций': 'Транзакциялар',
    'Всего потрачено': 'Барлығы жұмсалды',
    'Бесплатных': 'Тегін',
    'Не начат': 'Басталмаған',
    'Начать тест': 'Тестті бастау',
    'Пересдать': 'Қайта тапсыру',
    'Результат:': 'Нәтиже:',
    'Назад': 'Артқа',
    'Отправить ответы': 'Жауаптарды жіберу',
    'Тест пройден!': 'Тест өтті!',
    'Не сдано': 'Өтпеді',
    'Опубликован': 'Жарияланды',
    'Управление уроками': 'Сабақтарды басқару',
    'Статистика': 'Статистика',
    'Активен': 'Белсенді',
    'Ред.': 'Өңдеу',
    'Удалить': 'Жою',
    'Добавить модуль': 'Модуль қосу',
    'Всего': 'Барлығы',
    'Проверено': 'Тексерілді',
    'Ваш комментарий': 'Сіздің пікіріңіз',
    'Оценить': 'Бағалау',
    'Средний чек': 'Орташа чек',
    'Поиск по имени или курсу...': 'Аты немесе курс бойынша іздеу...',
    'Поиск по имени или email...': 'Аты немесе email бойынша іздеу...'
  },
  en: {
    'Мои курсы': 'My courses',
    'Все курсы, на которые вы записаны.': 'All courses you are enrolled in.',
    'Задания': 'Assignments',
    'Ваши курсовые задания.': 'Your course assignments.',
    'Тесты': 'Quizzes',
    'Проверьте свои знания по курсам.': 'Check your course knowledge.',
    'Сертификаты': 'Certificates',
    'Сертификаты за пройденные курсы.': 'Certificates for completed courses.',
    'Уведомления': 'Notifications',
    'Будьте в курсе событий.': 'Stay up to date.',
    'История оплат': 'Payment history',
    'Все ваши транзакции.': 'All your transactions.',
    'Профиль': 'Profile',
    'Личный профиль и прогресс обучения.': 'Personal profile and learning progress.',
    'Настройки': 'Settings',
    'Управление аккаунтом.': 'Account management.',
    'Внешний вид': 'Appearance',
    'Тёмная тема': 'Dark theme',
    'Сейчас: Светлая': 'Now: Light',
    'Сейчас: Тёмная': 'Now: Dark',
    'Переключить': 'Switch',
    'Имя': 'Name',
    'О себе': 'About me',
    'Расскажите о себе...': 'Tell about yourself...',
    'Сохранить': 'Save',
    'Смена пароля': 'Change password',
    'Текущий пароль': 'Current password',
    'Новый пароль': 'New password',
    'Мин. 6 символов': 'Min. 6 characters',
    'Обновить пароль': 'Update password',
    'Курсы преподавателя': 'Teacher courses',
    'Управление вашими курсами.': 'Manage your courses.',
    '+ Новый курс': '+ New course',
    'Управление уроками': 'Lesson management',
    'Организация и редактирование уроков.': 'Organize and edit lessons.',
    'Курс:': 'Course:',
    'Проверка работ': 'Work review',
    'Оценивайте задания студентов.': 'Grade student assignments.',
    'Статистика студентов': 'Student statistics',
    'Анализ успеваемости по вашим курсам.': 'Analyze progress in your courses.',
    'Лучшие студенты': 'Best students',
    'Панель администратора': 'Admin dashboard',
    'Управление категориями': 'Category management',
    'Организация курсов по категориям.': 'Organize courses by categories.',
    '+ Добавить': '+ Add',
    'Управление контентом': 'Content management',
    'Секции сайта, FAQ, блог.': 'Site sections, FAQ, blog.',
    'Секции': 'Sections',
    'Блог': 'Blog',
    'Управление платежами': 'Payment management',
    'Все транзакции платформы.': 'All platform transactions.',
    'Управление пользователями': 'User management',
    'Аналитика': 'Analytics',
    'Показатели и рост платформы.': 'Platform metrics and growth.',
    'Модерация отзывов': 'Review moderation',
    'Курс': 'Course',
    'Дата': 'Date',
    'Способ': 'Method',
    'Сумма': 'Amount',
    'Статус': 'Status',
    'Пользователь': 'User',
    'Доход': 'Revenue',
    'Рейтинг': 'Rating',
    'Пройден': 'Completed',
    'Сертификат': 'Certificate',
    'Продолжить': 'Continue',
    'Пока нет курсов': 'No courses yet',
    'Запишитесь на курс, чтобы начать обучение.': 'Enroll in a course to start learning.',
    'Смотреть курсы': 'Browse courses',
    'Оценено': 'Graded',
    'Отправлено': 'Submitted',
    'Ожидает': 'Pending',
    'Комментарий': 'Comment',
    'Оценка:': 'Grade:',
    'Сдано:': 'Submitted:',
    'Загрузить работу': 'Upload work',
    'Срок:': 'Due:',
    'Пока нет сертификатов': 'No certificates yet',
    'Завершите курс, чтобы получить первый сертификат.': 'Complete a course to get your first certificate.',
    'Сертификат об окончании': 'Certificate of completion',
    'Выдан': 'Issued to',
    'Преподаватель:': 'Teacher:',
    'Скачать PDF': 'Download PDF',
    'Поделиться': 'Share',
    'Прочитать все': 'Mark all read',
    'Новое': 'New',
    'Оплачено': 'Paid',
    'Бесплатно': 'Free',
    'Транзакций': 'Transactions',
    'Всего потрачено': 'Total spent',
    'Бесплатных': 'Free',
    'Не начат': 'Not started',
    'Начать тест': 'Start quiz',
    'Пересдать': 'Retake',
    'Результат:': 'Result:',
    'Назад': 'Back',
    'Отправить ответы': 'Submit answers',
    'Тест пройден!': 'Quiz passed!',
    'Не сдано': 'Not passed',
    'Опубликован': 'Published',
    'Управление уроками': 'Manage lessons',
    'Статистика': 'Statistics',
    'Активен': 'Active',
    'Ред.': 'Edit',
    'Удалить': 'Delete',
    'Добавить модуль': 'Add module',
    'Всего': 'Total',
    'Проверено': 'Reviewed',
    'Ваш комментарий': 'Your comment',
    'Оценить': 'Grade',
    'Средний чек': 'Average order',
    'Поиск по имени или курсу...': 'Search by name or course...',
    'Поиск по имени или email...': 'Search by name or email...'
  }
};

function translateDashNode(node) {
  var lang = getCurrentLang();
  var dict = DASH_TEXT[lang];
  if (!dict || !document.querySelector('.dash-wrap')) return;

  if (node.nodeType === 3) {
    var text = node.nodeValue;
    var trimmed = text.trim();
    if (dict[trimmed]) {
      node.nodeValue = text.replace(trimmed, dict[trimmed]);
      return;
    }

    var newText = text;

    if (window.DATA && DATA.courses) {
      for (var c = 0; c < DATA.courses.length; c++) {
        var course = DATA.courses[c];
        var courseText = getCourseText(course);
        if (course.title && courseText.title) {
          newText = newText.split(course.title).join(courseText.title);
        }
        if (course.duration && courseText.duration) {
          newText = newText.split(course.duration).join(courseText.duration);
        }
      }
    }

    if (lang === 'en') {
      newText = newText
        .replace(/уроков/g, 'lessons')
        .replace(/студ\./g, 'students')
        .replace(/Записан /g, 'Enrolled ')
        .replace(/Обновлено:/g, 'Updated:')
        .replace(/Страница:/g, 'Page:')
        .replace(/Действия/g, 'Actions')
        .replace(/Заголовок/g, 'Title')
        .replace(/Автор/g, 'Author')
        .replace(/Обложка/g, 'Cover')
        .replace(/Категория/g, 'Category');
    }

    if (lang === 'kz') {
      newText = newText
        .replace(/уроков/g, 'сабақ')
        .replace(/студ\./g, 'студент')
        .replace(/Записан /g, 'Жазылды ')
        .replace(/Обновлено:/g, 'Жаңартылды:')
        .replace(/Страница:/g, 'Бет:')
        .replace(/Действия/g, 'Әрекеттер')
        .replace(/Заголовок/g, 'Тақырып')
        .replace(/Автор/g, 'Автор')
        .replace(/Обложка/g, 'Мұқаба')
        .replace(/Категория/g, 'Санат');
    }

    if (newText !== text) {
      node.nodeValue = newText;
    }
    return;
  }

  if (node.nodeType !== 1) return;
  if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;

  if (node.placeholder && dict[node.placeholder]) {
    node.placeholder = dict[node.placeholder];
  }

  for (var i = 0; i < node.childNodes.length; i++) {
    translateDashNode(node.childNodes[i]);
  }
}

function startDashboardTranslator() {
  if (!document.querySelector('.dash-wrap')) return;
  translateDashNode(document.body);

  var obs = new MutationObserver(function (items) {
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < items[i].addedNodes.length; j++) {
        translateDashNode(items[i].addedNodes[j]);
      }
    }
  });

  obs.observe(document.body, { childList: true, subtree: true });
}

// Переводим простые статичные элементы на странице
// Пример в HTML: <h1 data-i18n="homeHeroTitle">...</h1>
// Если внутри нужен span или другой тег: data-i18n-html
function applyPageTranslations() {
  document.documentElement.lang = getCurrentLang();

  var htmlItems = document.querySelectorAll('[data-i18n-html]');

  for (var h = 0; h < htmlItems.length; h++) {
    var htmlKey = htmlItems[h].getAttribute('data-i18n-html');
    htmlItems[h].innerHTML = t(htmlKey);
  }

  var items = document.querySelectorAll('[data-i18n]');

  for (var i = 0; i < items.length; i++) {
    var key = items[i].getAttribute('data-i18n');
    items[i].textContent = t(key);
  }

  var simpleItems = document.querySelectorAll('[data-lang]');

  for (var s = 0; s < simpleItems.length; s++) {
    var simpleKey = simpleItems[s].getAttribute('data-lang');
    simpleItems[s].textContent = t(simpleKey);
  }

  var placeholders = document.querySelectorAll('[data-i18n-placeholder]');

  for (var j = 0; j < placeholders.length; j++) {
    var placeholderKey = placeholders[j].getAttribute('data-i18n-placeholder');
    placeholders[j].setAttribute('placeholder', t(placeholderKey));
  }
}



/* ==============================================
   Главный JS — общие функции для всего сайта

   Этот файл подключается на КАЖДОЙ странице.
   Он содержит:
   - вспомогательные функции (инициалы, дата, звёзды)
   - рисование шапки сайта
   - рисование подвала сайта
   - рисование бокового меню кабинета
   - рисование карточек курсов
   - рисование блока CTA
   - рисование полосы прогресса
   - рисование карточек статистики (общая функция)
   - переключение активных фильтров (общая функция)
   ============================================== */


// ==============================================================
//   ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
//   Используются на многих страницах для работы с данными
// ==============================================================




// Форматируем дату на русский язык
// format='long' → "15 января 2026"
// без формата   → "15 янв 2026"
function formatDate(dateStr, format) {
  var d = new Date(dateStr);

  // Короткие названия месяцев
  var monthsShort = [
    'янв', 'фев', 'мар', 'апр', 'май', 'июн',
    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
  ];

  // Полные названия месяцев (в родительном падеже)
  var monthsFull = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  var day = d.getDate();
  var month = d.getMonth();
  var year = d.getFullYear();

  // Длинный формат: "15 января 2026"
  if (format === 'long') {
    return day + ' ' + monthsFull[month] + ' ' + year;
  }

  // Короткий формат: "15 янв 2026"
  return day + ' ' + monthsShort[month] + ' ' + year;
}


// Рисуем звёздочки рейтинга
// rating    — число от 1 до 5 (например 4.8)
// sizeClass — CSS-класс для размера: 'stars-sm', 'stars-md', 'stars-course', 'stars-lg'
//             Если не указан — размер по умолчанию (14px из CSS)
//
// Размеры звёзд задаются через CSS-классы (не через JS):
//   .stars-sm     → 13px (для карточек курсов, преподавателей)
//   .stars-md     → 15px (для отзывов)
//   .stars-course → 16px (для страницы курса)
//   .stars-lg     → 20px (для сводки отзывов)
function renderStars(rating, sizeClass) {

  // Если передали число вместо класса (для обратной совместимости)
  // — конвертируем в класс
  if (typeof sizeClass === 'number') {
    if (sizeClass <= 13) sizeClass = 'stars-sm';
    else if (sizeClass <= 15) sizeClass = 'stars-md';
    else if (sizeClass <= 16) sizeClass = 'stars-course';
    else sizeClass = 'stars-lg';
  }

  // CSS-класс для обёртки
  var wrapClass = 'stars';
  if (sizeClass) {
    wrapClass = 'stars ' + sizeClass;
  }

  // Собираем HTML звёзд
  var html = '<span class="' + wrapClass + '">';

  // 5 звёзд — заполненные или пустые
  var rounded = Math.round(rating);
  for (var i = 1; i <= 5; i++) {
    if (i <= rounded) {
      html += '<span class="star filled">★</span>';
    } else {
      html += '<span class="star">★</span>';
    }
  }

  // Числовое значение рейтинга рядом со звёздами
  html += '<span class="star-value">' + rating + '</span>';
  html += '</span>';

  return html;
}


// Текущая страница (имя файла из URL)
// Например: "courses.html" или "index.html"
function getCurrentPage() {
  var path = window.location.pathname;
  var parts = path.split('/');
  var filename = parts[parts.length - 1];
  return filename || 'index.html';
}


// ==============================================================
//   ОБЩИЕ ФУНКЦИИ ДЛЯ МНОГИХ СТРАНИЦ
//   Используются на страницах кабинетов для повторяющихся блоков
// ==============================================================


// Рисуем карточки статистики
// Принимает массив объектов: [{ v: значение, l: подпись }, ...]
// Возвращает HTML-строку с карточками stat-card
//
// Пример:
//   renderStatCards([
//     { v: 42, l: 'Студентов' },
//     { v: '85%', l: 'Прогресс' }
//   ])
function renderStatCards(items) {
  var html = '';
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    html += '<div class="stat-card">';
    html += '<div class="stat-value">' + item.v + '</div>';
    html += '<div class="stat-label">' + item.l + '</div>';
    html += '</div>';
  }
  return html;
}


// Переключаем активный фильтр (чипсы)
// container — родительский элемент с чипсами
// activeBtn — кнопка, которую нужно сделать активной
//
// Используется на страницах: каталог курсов, блог, FAQ,
// модерация отзывов, управление пользователями
function setActiveChip(container, activeBtn) {

  // Убираем класс active со всех чипсов в контейнере
  var chips = container.querySelectorAll('.chip');
  for (var i = 0; i < chips.length; i++) {
    chips[i].classList.remove('active');
  }

  // Добавляем active на нажатую кнопку
  activeBtn.classList.add('active');
}


// ==============================================================
//   ШАПКА САЙТА
//   Рисуется на всех публичных страницах
// ==============================================================

function renderHeader(containerId) {

  // Находим контейнер
  var el = document.getElementById(containerId);
  if (!el) return;

  // Получаем текущего пользователя (или null)
  var user = LearnDot.auth.getCurrentUser();

  // Определяем текущую страницу для подсветки активной ссылки
  var page = getCurrentPage();


  // ----- Ссылки навигации -----

  // Основные ссылки (всегда видны)
  // ===== Навигационные ссылки (с переводом) =====
  var navLinks = [
    { href: 'index.html',    label: t('home'),       match: ['index.html', ''] },
    { href: 'courses.html',  label: t('courses'),    match: ['courses.html', 'category-design.html', 'category-it.html', 'course-details.html'] },
    { href: 'teachers.html', label: t('teachers'),   match: ['teachers.html'] },
    { href: 'pricing.html',  label: t('pricing'),    match: ['pricing.html'] },
    { href: 'blog.html',     label: t('blog'),       match: ['blog.html'] }
  ];

  // Дополнительные ссылки (видны в мобильном меню)
  var extraLinks = [
    { href: 'reviews.html',  label: t('reviews') },
  ];


  // ----- Рисуем HTML для навигационных ссылок -----

  var navHtml = '';
  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    // Проверяем, активна ли эта ссылка
    var isActive = link.match.indexOf(page) !== -1;
    var activeClass = isActive ? ' active' : '';
    navHtml += '<a href="' + link.href + '" class="nav-link' + activeClass + '">' + link.label + '</a>';
  }

  // Дополнительные ссылки
  var extraHtml = '';
  for (var j = 0; j < extraLinks.length; j++) {
    var extra = extraLinks[j];
    var isExtraActive = page === extra.href;
    var extraActiveClass = isExtraActive ? ' active' : '';
    extraHtml += '<a href="' + extra.href + '" class="nav-link' + extraActiveClass + '">' + extra.label + '</a>';
  }


  // ----- Правая часть шапки (зависит от авторизации) -----

  // Переключатель языка (RU / KZ / EN)
  var curLang = getCurrentLang().toUpperCase();
  var langSwitcherHtml =
    '<div class="lang-switcher">' +
      '<button class="lang-btn">' + curLang + '</button>' +
      '<div class="lang-dropdown">' +
        '<button class="lang-option' + (curLang === 'RU' ? ' active' : '') + '" onclick="setLang(\'ru\')">RU</button>' +
        '<button class="lang-option' + (curLang === 'KZ' ? ' active' : '') + '" onclick="setLang(\'kz\')">KZ</button>' +
        '<button class="lang-option' + (curLang === 'EN' ? ' active' : '') + '" onclick="setLang(\'en\')">EN</button>' +
      '</div>' +
    '</div>';

  var actionsHtml = '';

  if (user) {
    // Пользователь авторизован — кабинет + аватар + выйти
    var dashUrl = LearnDot.auth.getDashboardUrl(user.role);

    actionsHtml =
      langSwitcherHtml +
      '<button class="theme-toggle" title="Сменить тему">🌙</button>' +
      '<a href="' + dashUrl + '" class="btn btn-outline btn-sm">' + t('cabinet') + '</a>' +
      '<div class="nav-user">' +
        '<div class="nav-user-avatar"><img src="' + (user.avatar || 'images/avatars/default.png') + '" alt=""></div>' +
        '<div>' +
          '<div class="nav-user-name">' + user.name + '</div>' +
          '<div class="nav-user-role">' + getRoleLabel(user.role) + '</div>' +
        '</div>' +
      '</div>' +
      '<button class="btn btn-secondary btn-sm" onclick="LearnDot.auth.logout(); window.location.href=\'index.html\'">' + t('logout') + '</button>';
  } else {
    // Не авторизован — войти + регистрация
    actionsHtml =
      langSwitcherHtml +
      '<button class="theme-toggle" title="Сменить тему">🌙</button>' +
      '<a href="login.html" class="btn btn-outline btn-sm">' + t('login') + '</a>' +
      '<a href="register.html" class="btn btn-primary btn-sm">' + t('register') + '</a>';
  }


  // ----- Мобильный аватар (маленький, рядом с бургером) -----

  var mobileAvatarHtml = '';
  if (user) {
    mobileAvatarHtml = '<div class="nav-user-avatar-sm"><img src="' + (user.avatar || 'images/avatars/default.png') + '" alt=""></div>';
  }


  // ----- Собираем полный HTML шапки -----

  el.innerHTML =
    '<header class="header">' +
      '<div class="container header-inner">' +

        // Логотип
        '<a href="index.html" class="logo">' +
          '<img src="images/logo/Logotype.png" class = "logo-icon">'+
        '</a>' +

        // Навигация (скрывается на мобильных, открывается бургером)
        '<nav class="nav" id="mainNav">' +
          navHtml +
          '<div class="mobile-extra">' + extraHtml + '</div>' +
          '<div class="nav-actions">' + actionsHtml + '</div>' +
        '</nav>' +

        // Мобильные кнопки (бургер + тема + аватар)
        '<div class="mobile-actions">' +
          mobileAvatarHtml +
          '<button class="theme-toggle" title="Сменить тему">🌙</button>' +
          '<button class="burger" id="burgerBtn"><span></span><span></span><span></span></button>' +
        '</div>' +

      '</div>' +
    '</header>' +

    // Затемнение фона при открытом мобильном меню
    '<div class="nav-overlay" id="navOverlay"></div>';


  // ----- Обработчик мобильного меню -----

  var burger = document.getElementById('burgerBtn');
  var nav = document.getElementById('mainNav');
  var overlay = document.getElementById('navOverlay');

  if (burger) {
    // Клик по бургеру — открыть/закрыть меню
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
      overlay.classList.toggle('show');
    });

    // Клик по затемнению — закрыть меню
    overlay.addEventListener('click', function () {
      burger.classList.remove('open');
      nav.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
}


// ==============================================================
//   ПОДВАЛ САЙТА
//   Рисуется на всех публичных страницах
// ==============================================================

function renderFooter(containerId) {

  // Находим контейнер
  var el = document.getElementById(containerId);
  if (!el) return;

  // Текущий год для копирайта
  var year = new Date().getFullYear();

  el.innerHTML =
    '<footer class="footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +

          // Логотип и описание
          '<div class="footer-brand">' +
          '<a href="index.html" class="logo">' +
          '<img src="images/logo/Logotype.png" alt="Логотип LearnDot" class="logo-image">' +
          '</a>' +
          '<p class="footer-tagline">' + t('footerTagline') + '</p>' +
        '</div>' +

          // Колонка «Платформа»
          '<div class="footer-col">' +
            '<h4 class="footer-col-title">' + t('platform') + '</h4>' +
            '<a href="courses.html" class="footer-link">' + t('courses') + '</a>' +
            '<a href="category-design.html" class="footer-link">' + t('designCourses') + '</a>' +
            '<a href="category-it.html" class="footer-link">' + t('itCourses') + '</a>' +
            '<a href="teachers.html" class="footer-link">' + t('teachers') + '</a>' +
            '<a href="pricing.html" class="footer-link">' + t('pricing') + '</a>' +
          '</div>' +

          // Колонка «Ресурсы»
          '<div class="footer-col">' +
            '<h4 class="footer-col-title">' + t('resources') + '</h4>' +
            '<a href="blog.html" class="footer-link">' + t('blog') + '</a>' +
            '<a href="reviews.html" class="footer-link">' + t('reviews') + '</a>' +
          '</div>' +

        '</div>' +



      '</div>' +
    '</footer>';
}


// ==============================================================
//   БОКОВОЕ МЕНЮ ЛИЧНОГО КАБИНЕТА
//   Рисуется на всех страницах кабинета (студент, препод, админ)
// ==============================================================

function renderDashSidebar(containerId, role, activeItem) {

  // Находим контейнер
  var el = document.getElementById(containerId);
  if (!el) return;

  // Получаем имя пользователя для аватара
  var user = LearnDot.auth.getCurrentUser();
  var name = user ? user.name : role;

  // Названия ролей на русском
  var roleLabel = t('user');
  if (role === 'student') roleLabel = t('student');
  if (role === 'teacher') roleLabel = t('teacher');
  if (role === 'admin') roleLabel = t('admin');


  // ----- Пункты меню для каждой роли -----

  var navItems = {
    student: [
      { href: 'student-dashboard.html', label: t('dashboard'),       icon: '📊', key: 'dashboard' },
      { href: 'my-courses.html',        label: t('myCourses'),       icon: '📚', key: 'courses' },
      { href: 'assignments.html',       label: t('assignments'),     icon: '📝', key: 'assignments' },
      { href: 'quizzes.html',           label: t('quizzes'),         icon: '✅', key: 'quizzes' },
      { href: 'certificates.html',      label: t('certificates'),    icon: '🎓', key: 'certificates' },
      { href: 'payments.html',          label: t('payments'),        icon: '💳', key: 'payments' },
      { href: 'notifications.html',     label: t('notifications'),   icon: '🔔', key: 'notifications' },
      { href: 'profile.html',           label: t('profile'),         icon: '👤', key: 'profile' },
      { href: 'settings.html',          label: t('settings'),        icon: '⚙️', key: 'settings' }
    ],
    teacher: [
      { href: 'teacher-dashboard.html',  label: t('dashboard'),     icon: '📊', key: 'dashboard' },
      { href: 'teacher-courses.html',    label: t('myCourses'),     icon: '📚', key: 'courses' },
      { href: 'lesson-management.html',  label: t('lessonManage'),  icon: '📝', key: 'lessons' },
      { href: 'assignment-review.html',  label: t('works'),         icon: '✅', key: 'reviews' },
      { href: 'student-statistics.html', label: t('stats'),         icon: '📈', key: 'stats' }
    ],
    admin: [
      { href: 'admin-dashboard.html',    label: t('dashboard'),   icon: '📊', key: 'dashboard' },
      { href: 'course-management.html',  label: t('courses'),     icon: '📚', key: 'courses' },
      { href: 'category-management.html',label: t('categories'),  icon: '🏷️', key: 'categories' },
      { href: 'user-management.html',    label: t('users'),       icon: '👥', key: 'users' },
      { href: 'review-management.html',  label: t('reviews'),     icon: '⭐', key: 'reviews' },
      { href: 'payment-management.html', label: t('payments'),    icon: '💳', key: 'payments' },
      { href: 'content-management.html', label: t('content'),     icon: '📄', key: 'content' },
      { href: 'analytics.html',          label: t('analytics'),   icon: '📈', key: 'analytics' }
    ]
  };

  // Берём пункты для текущей роли
  var items = navItems[role] || [];


  // ----- Рисуем HTML пунктов меню -----

  var navHtml = '';
  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    // Подсвечиваем активный пункт
    var activeClass = '';
    if (item.key === activeItem) {
      activeClass = ' active';
    }

    navHtml +=
      '<a href="' + item.href + '" class="dash-nav-item' + activeClass + '">' +
        '<span class="dash-nav-icon">' + item.icon + '</span>' +
        item.label +
      '</a>';
  }


  // ----- Собираем полный HTML сайдбара -----

  el.innerHTML =
    '<aside class="dash-sidebar">' +

      // Логотип
      '<div class="dash-sidebar-header">' +
      '<a href="index.html" class="logo">' +
      '<img src="images/logo/Logotype.png" alt="" class="logo-image">' +
      '</a>' +
    '</div>' +

      // Блок пользователя (аватар + имя + роль)
      '<div class="dash-user-block">' +
        '<div class="dash-user-avatar"><img src="' + (user ? (user.avatar || 'images/avatars/default.png') : 'images/avatars/default.png') + '" alt=""></div>' +
        '<div>' +
          '<div class="dash-user-name">' + name + '</div>' +
          '<div class="dash-user-role">' + roleLabel + '</div>' +
        '</div>' +
      '</div>' +

      // Пункты меню
      '<nav class="dash-nav">' + navHtml + '</nav>' +

      // Нижняя часть (ссылка на сайт + кнопка выхода)
      '<div class="dash-sidebar-footer">' +
        '<a href="index.html" class="dash-nav-item">' +
          '<span class="dash-nav-icon">🏠</span>' + t('toSite') +
        '</a>' +
        '<button class="dash-nav-item logout" onclick="LearnDot.auth.logout(); window.location.href=\'index.html\'">' +
          '<span class="dash-nav-icon">🚪</span>' + t('logout') +
        '</button>' +
      '</div>' +

    '</aside>' +

    // Затемнение фона (для мобильного сайдбара)
    '<div class="dash-overlay" id="dashOverlay"></div>';


  // ----- Обработчик мобильного сайдбара -----

  var menuBtn = document.getElementById('dashMenuBtn');
  // Находим сайдбар по CSS-классу внутри контейнера (не по ID — он дублируется)
  var sidebar = el.querySelector('.dash-sidebar');
  var overlay = document.getElementById('dashOverlay');

  if (menuBtn && sidebar) {
    // Клик по кнопке меню — открыть/закрыть сайдбар
    menuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    });

    // Клик по затемнению — закрыть сайдбар
    overlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
}


// Рисуем мобильную верхнюю панель кабинета
// (бургер-кнопка + название + переключатель темы)
function renderDashTopbar(containerId, title) {
  var el = document.getElementById(containerId);
  if (!el) return;

  if (title === 'Кабинет студента') title = t('studentDashboard');
  if (title === 'Кабинет преподавателя') title = t('teacherDashboard');
  if (title === 'Панель администратора') title = t('adminDashboard');

  el.innerHTML =
    '<div class="dash-topbar">' +
      '<button class="dash-menu-btn" id="dashMenuBtn"><span></span><span></span><span></span></button>' +
      '<span class="dash-topbar-title">' + title + '</span>' +
      '<button class="theme-toggle">🌙</button>' +
    '</div>';
}


// ==============================================================
//   КАРТОЧКА КУРСА
//   Используется на главной, в каталоге, в категориях,
//   в рекомендациях на панели студента
// ==============================================================

function renderCourseCard(course) {
  var courseText = getCourseText(course);

  // Определяем иконку и цвет бейджа по категории
  var catIcon = '💻';
  var badgeClass = 'badge-success';
  if (course.category === 'Дизайн') {
    catIcon = '🎨';
    badgeClass = 'badge-primary';
  }

  // Определяем текст цены
  var priceText = course.price.toLocaleString() + ' ₸';
  if (course.price === 0) {
    priceText = t('free');
  }

  // ===== Обложка курса =====
  // Если у курса есть поле cover — показываем картинку как фон.
  // Если нет — показываем заглушку с иконкой категории.
  //
  // Чтобы заменить обложку:
  // 1. Положите картинку в папку images/courses/
  // 2. Обновите поле cover у курса в файле js/data.js
  //    Например: cover: 'images/courses/my-course.jpg'
  // Рекомендуемый размер: 600 × 340 пикселей.

  var coverHtml = '';
  if (course.cover) {
    // Есть обложка — показываем картинку
    coverHtml =
      '<div class="card-cover has-image" style="background-image:url(\'' + course.cover + '\')">' +
        '<span>' + catIcon + ' ' + courseText.category + '</span>' +
      '</div>';
  } else {
    // Нет обложки — показываем заглушку
    coverHtml =
      '<div class="card-cover">' +
        '<span>' + catIcon + ' ' + courseText.category + '</span>' +
      '</div>';
  }

  // Собираем HTML карточки
  return '' +
    '<a href="course-details.html?id=' + course.id + '" class="card card-hover course-card">' +

      // Обложка курса (картинка или заглушка)
      coverHtml +

      // Тело карточки
      '<div class="card-body">' +

        // Уровень и длительность
        '<div class="card-meta">' +
          '<span class="badge ' + badgeClass + '">' + courseText.level + '</span>' +
          '<span class="card-meta-text">' + courseText.duration + '</span>' +
        '</div>' +

        // Название и описание
        '<h4 class="card-title">' + courseText.title + '</h4>' +
        '<p class="card-desc">' + courseText.shortDesc + '</p>' +

        // Рейтинг, студенты и цена
        '<div class="card-footer">' +
          '<div>' +
            renderStars(course.rating, 'stars-sm') +
            '<div class="students-count">' + course.students.toLocaleString() + ' ' + t('students') + '</div>' +
          '</div>' +
          '<span class="card-price">' + priceText + '</span>' +
        '</div>' +

      '</div>' +
    '</a>';
}


// ==============================================================
//   БЛОК ПРИЗЫВА К ДЕЙСТВИЮ (CTA)
//   Используется внизу многих публичных страниц
// ==============================================================

function renderCTA(title, subtitle) {

  // Значения по умолчанию (с переводом)
  if (!title) {
    title = t('ctaTitle');
  }
  if (!subtitle) {
    subtitle = t('ctaText');
  }

  return '' +
    '<section class="cta-section">' +
      '<div class="container">' +
        '<div class="cta-inner">' +
          '<h2>' + title + '</h2>' +
          '<p>' + subtitle + '</p>' +
          '<div class="cta-actions">' +
            '<a href="login.html" class="btn btn-primary btn-lg">' + t('ctaBtn1') + '</a>' +
            '<a href="courses.html" class="btn btn-outline btn-lg">' + t('ctaBtn2') + '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
}


// ==============================================================
//   ПОЛОСА ПРОГРЕССА
//   Используется на страницах курсов, уроков, статистики
// ==============================================================

// pct        — процент заполнения (0-100)
// colorClass — доп. класс цвета (например 'success' для зелёного)
//
// Единственный inline-стиль в проекте — width полосы.
// Это динамическое значение, CSS-классом не заменить.
function renderProgressBar(pct, colorClass) {
  if (!colorClass) {
    colorClass = '';
  }

  return '' +
    '<div class="progress-bar">' +
      '<div class="progress-track">' +
        '<div class="progress-fill ' + colorClass + '" style="width:' + pct + '%"></div>' +
      '</div>' +
      '<span class="progress-text">' + pct + '%</span>' +
    '</div>';
}


// ==============================================================
//   АВТОЗАПУСК
//   Рисуем шапку и подвал когда страница загрузилась
// ==============================================================

document.addEventListener('DOMContentLoaded', function () {

  // Переводим статичный текст, если на странице есть data-i18n
  applyPageTranslations();
  startDashboardTranslator();

  // Рисуем шапку, если есть контейнер header-root
  if (document.getElementById('header-root')) {
    renderHeader('header-root');
  }

  // Рисуем подвал, если есть контейнер footer-root
  if (document.getElementById('footer-root')) {
    renderFooter('footer-root');
  }
});
