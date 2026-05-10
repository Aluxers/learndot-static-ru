/* =========================
   Моковые данные платформы
   Все курсы, преподаватели, отзывы,
   FAQ, блог, данные кабинетов.
   ========================= */

window.DATA = {};











/* ===== Курсы ===== */

DATA.courses = [


  { 
    id:'ux-ui-design', 
    cover:'images/courses/ux-ui-design.png', 
    title:'UX/UI Дизайн с нуля', 
    category:'Дизайн', 
    level:'Начальный', 
    duration:'10 недель', 
    lessons:42, 
    price:40000, 
    rating:4.8, 
    students:1240, 
    teacherId:'anna-kim', 
    shortDesc:'Изучите принципы проектирования интерфейсов от основ до профессионального портфолио.', 
    description:'Полный курс по UX/UI дизайну: исследования, прототипирование, визуальный дизайн и тестирование.', 
    outcomes:['Методы UX-исследований','Прототипы в Figma','Адаптивные интерфейсы','Профессиональное портфолио','Юзабилити-тестирование'], 

    modules:[
      {title:'Введение в UX/UI',lessons:5},
      {title:'Исследования и персоны',lessons:6},
      {title:'Информационная архитектура',lessons:4},
      {title:'Прототипирование',lessons:7},
      {title:'Визуальный дизайн',lessons:6},
      {title:'Дизайн-системы',lessons:5},
      {title:'Юзабилити-тестирование',lessons:4},
      {title:'Портфолио',lessons:5}] 
    },


  { 
    id:'figma-beginners', 
    cover:'images/courses/figma.png', 
    title:'Figma для начинающих', 
    category:'Дизайн', 
    level:'Начальный', 
    duration:'4 недели', 
    lessons:20, 
    price:15000, 
    rating:4.9, 
    students:2100, 
    teacherId:'anna-kim', 
    shortDesc:'Освойте Figma от основ до сложных компонентов и прототипов.', 
    description:'Индустриальный стандарт UI-дизайна. Автолейаут, варианты, интерактивные прототипы.', 
    outcomes:['Интерфейс Figma','Автолейаут и ограничения','Библиотеки компонентов','Интерактивные прототипы','Командная работа'], 

    modules:[
      {title:'Основы Figma',lessons:5},
      {title:'Фигуры, текст, изображения',lessons:4},
      {title:'Автолейаут',lessons:4},
      {title:'Компоненты и варианты',lessons:4},
      {title:'Прототипы',lessons:3}] 
    },


  { 
    id:'web-design-basics', 
    cover:'images/courses/web-design.png', 
    title:'Основы веб-дизайна', 
    category:'Дизайн', 
    level:'Начальный', 
    duration:'6 недель', 
    lessons:28, 
    price:20000, 
    rating:4.7, 
    students:890, 
    teacherId:'elena-ross', 
    shortDesc:'Научитесь создавать красивые сайты с современными приёмами верстки.', 
    description:'Основы веб-дизайна: типографика, цветовая теория, адаптивный дизайн.', 
    outcomes:['Типографика и цвет','Адаптивные макеты','Многостраничный дизайн','Передача макетов разработчику','Сетки и отступы'], 

    modules:[
      {title:'Принципы дизайна',lessons:5},
      {title:'Типографика и цвет',lessons:5},
      {title:'Сетки',lessons:6},
      {title:'Адаптивность',lessons:5},
      {title:'Проект сайта',lessons:7}] 
    },


  { 
    id:'graphic-design', 
    cover:'images/courses/graphic-design.png', 
    title:'Основы графического дизайна', 
    category:'Дизайн', 
    level:'Начальный', 
    duration:'8 недель', 
    lessons:34, 
    price:25000, 
    rating:4.6, 
    students:670, 
    teacherId:'elena-ross', 
    shortDesc:'Постройте фундамент в графическом дизайне и визуальных коммуникациях.', 
    description:'Композиция, иерархия, цвет, типографика и брендинг на реальных проектах.', 
    outcomes:['Композиция и баланс','Логотипы и фирстиль','Цветовые палитры','Инструменты дизайна','Портфолио'], 
    modules:[
      {title:'Основы визуального дизайна',lessons:5},
      {title:'Типографика',lessons:5},
      {title:'Цвет',lessons:4},
      {title:'Логотип и бренд',lessons:7},
      {title:'Печать и цифра',lessons:6},
      {title:'Проект портфолио',lessons:7}] 
    },


  { 
    id:'motion-design', 
    cover:'images/courses/motion-design.png', 
    title:'Основы моушн-дизайна', 
    category:'Дизайн', 
    level:'Средний', 
    duration:'6 недель', 
    lessons:24, 
    price:30000, 
    rating:4.5, 
    students:430, 
    teacherId:'anna-kim', 
    shortDesc:'Изучите принципы анимации и создавайте моушн-графику.', 
    description:'12 принципов анимации, ключевые кадры, UI-анимации и видеографика.', 
    outcomes:['12 принципов анимации','UI микро-взаимодействия','Анимированный контент','Тайминг и easing','Экспорт для веба'], 
    modules:[
      {title:'Принципы анимации',lessons:5},
      {title:'Ключевые кадры',lessons:4},
      {title:'UI анимация',lessons:5},
      {title:'Моушн-графика',lessons:5},
      {title:'Финальный проект',lessons:5}] 
    },
    

  { 
    id:'html-css', 
    cover:'images/courses/html-css.png', 
    title:'HTML/CSS с нуля', 
    category:'IT', 
    level:'Начальный', 
    duration:'6 недель', 
    lessons:32, 
    price:0, 
    rating:4.8, 
    students:3200, 
    teacherId:'mark-johnson', 
    shortDesc:'Начните путь в веб-разработке с прочных основ HTML и CSS.', 
    description:'Семантическая разметка, Flexbox, Grid, адаптивность, лучшие практики.', 
    outcomes:['Семантический HTML','Flexbox и Grid','Адаптивные сайты','CSS-переменные','Деплой первого сайта'], 
    modules:[
      {title:'Основы HTML',lessons:6},
      {title:'CSS основы',lessons:6},
      {title:'Flexbox и Grid',lessons:6},
      {title:'Адаптивность',lessons:5},
      {title:'Формы и медиа',lessons:4},
      {title:'Финальный проект',lessons:5}] 
    },

    
  { 
    id:'javascript-beginners', 
    cover:'images/courses/javascript.png', 
    title:'JavaScript для начинающих', 
    category:'IT', 
    level:'Начальный', 
    duration:'8 недель', 
    lessons:40, 
    price:25000, 
    rating:4.7, 
    students:2800,
    teacherId:'mark-johnson', 
    shortDesc:'JavaScript с нуля — переменные, функции, DOM, события, асинхронность.', 
    description:'Пошаговое введение в JavaScript: основы языка, DOM, события, API.', 
    outcomes:['Переменные и управление','Функции, массивы, объекты','Работа с DOM','API-запросы','Интерактивные мини-проекты'], 
    modules:[
      {title:'Основы JS',lessons:7},
      {title:'Функции',lessons:6},
      {title:'Массивы и объекты',lessons:6},
      {title:'DOM',lessons:7},
      {title:'События и формы',lessons:5},
      {title:'Асинхронность',lessons:5},
      {title:'Проекты',lessons:4}] 
    },


  { 
    id:'frontend-development', 
    cover:'images/courses/frontend.png', 
    title:'Основы фронтенд-разработки', 
    category:'IT', 
    level:'Средний', 
    duration:'10 недель', 
    lessons:48, 
    price:80000, 
    rating:4.9, 
    students:1560, 
    teacherId:'david-chen', 
    shortDesc:'Создавайте современные веб-приложения на React.', 
    description:'React, компонентная архитектура, управление состоянием, роутинг, работа с API.', 
    outcomes:['SPA на React','Хуки и контекст','Клиентский роутинг','REST API','Git-воркфлоу'], 
    modules:[
      {title:'Современный JS',lessons:6},
      {title:'Основы React',lessons:8},
      {title:'State и Props',lessons:6},
      {title:'Роутинг',lessons:5},
      {title:'API',lessons:6},
      {title:'Стили в React',lessons:5},
      {title:'Тестирование',lessons:4},
      {title:'Дипломный проект',lessons:8}] 
    },


  { 
    id:'python-basics', 
    cover:'images/courses/python.png', 
    title:'Основы Python', 
    category:'IT', 
    level:'Начальный', 
    duration:'8 недель', 
    lessons:36, 
    price:20000, 
    rating:4.8, 
    students:1900, 
    teacherId:'david-chen', 
    shortDesc:'Изучите Python — самый универсальный язык для начинающих.', 
    description:'Синтаксис, структуры данных, функции, файлы, популярные библиотеки.', 
    outcomes:['Чистый Python-код','Списки и словари','CLI-приложения','Библиотеки Python','Решение задач'], 
    modules:[
      {title:'Установка и синтаксис',lessons:5},
      {title:'Переменные и типы',lessons:5},
      {title:'Условия и циклы',lessons:5},
      {title:'Функции',lessons:6},
      {title:'Структуры данных',lessons:5},
      {title:'Файлы',lessons:4},
      {title:'Библиотеки и проекты',lessons:6}] 
    },


  { 
    id:'backend-intro', 
    cover:'images/courses/backend.png', 
    title:'Введение в бэкенд', 
    category:'IT', 
    level:'Средний', 
    duration:'8 недель', 
    lessons:36, 
    price:40000, 
    rating:4.6, 
    students:720, 
    teacherId:'david-chen', 
    shortDesc:'Серверная разработка на Node.js, Express и базах данных.', 
    description:'REST API, базы данных, аутентификация, деплой.', 
    outcomes:['REST API на Node.js','SQL и NoSQL','Аутентификация','Архитектура сервера','Деплой'], 
    modules:[
      {title:'Как работает веб',lessons:4},
      {title:'Node.js',lessons:6},
      {title:'Express и API',lessons:6},
      {title:'SQL',lessons:6},
      {title:'MongoDB',lessons:5},
      {title:'Безопасность',lessons:5},
      {title:'Деплой',lessons:4}] 
    },


  { 
    id:'git-collaboration', 
    cover:'images/courses/git.png', 
    title:'Git и командная работа', 
    category:'IT', 
    level:'Начальный', 
    duration:'3 недели', 
    lessons:14, 
    price:0, 
    rating:4.7, 
    students:4100, 
    teacherId:'mark-johnson', 
    shortDesc:'Освойте Git и профессиональные командные процессы.', 
    description:'Команды Git, ветвление, pull request-ы, разрешение конфликтов.', 
    outcomes:['Git уверенно','Ветки и мёрджи','Pull request-ы','Решение конфликтов','Профессиональные воркфлоу'], 
    modules:[
      {title:'Основы Git',lessons:4},
      {title:'Ветвление',lessons:4},
      {title:'GitHub и PR',lessons:3},
      {title:'Командные процессы',lessons:3}] 
    },

  /* ===== AI-курсы по дизайну ===== */

  { 
    id:'ai-design-basics', 
    cover:'images/courses/ai-design-basics.png', 
    title:'AI в дизайне: основы', 
    category:'Дизайн', 
    level:'Начальный', 
    duration:'4 недели', 
    lessons:18, 
    price:20000, 
    rating:4.8, 
    students:860, 
    teacherId:'anna-kim', 
    shortDesc:'Научитесь использовать ИИ-инструменты для ускорения дизайн-процесса.', 
    description:'Курс по использованию AI в дизайне: генерация изображений, автоматизация рутины, умные инструменты.', 
    outcomes:['Генерация изображений через AI','Автоматизация дизайн-задач','AI-инструменты в Figma','Этика использования AI','Промпт-инженеринг для дизайнеров'], 
    modules:[
      {title:'Введение в AI для дизайна',lessons:4},
      {title:'Генеративные инструменты',lessons:5},
      {title:'AI в Figma',lessons:4},
      {title:'Практические проекты',lessons:5}] 
    },
  { 
    id:'midjourney-course', 
    cover:'images/courses/midjourney.png', 
    title:'Midjourney и генерация изображений', 
    category:'Дизайн', 
    level:'Начальный', 
    duration:'3 недели', 
    lessons:14, 
    price:15000, 
    rating:4.7, 
    students:1200, 
    teacherId:'elena-ross', 
    shortDesc:'Создавайте профессиональные изображения с помощью Midjourney и других AI-генераторов.', 
    description:'Промпт-инженеринг, стили, параметры, коммерческое использование AI-изображений.', 
    outcomes:['Промпты для Midjourney','Стили и параметры','Коммерческое использование','Обработка результатов','AI для маркетинга'], 
    modules:[
      {title:'Основы Midjourney',lessons:4},
      {title:'Промпт-инженеринг',lessons:4},
      {title:'Стили и эстетика',lessons:3},
      {title:'Коммерческие проекты',lessons:3}] 
    },
  { 
    id:'ai-ux-research', 
    cover:'images/courses/ai-ux-research.png', 
    title:'AI для UX-исследований', 
    category:'Дизайн', 
    level:'Средний', 
    duration:'5 недель', 
    lessons:22, 
    price:40000, 
    rating:4.9, 
    students:540, 
    teacherId:'anna-kim', 
    shortDesc:'Используйте AI для анализа пользователей, создания персон и тестирования интерфейсов.', 
    description:'AI-инструменты для UX-исследований: анализ данных, генерация персон, A/B тестирование.', 
    outcomes:['AI-анализ пользовательских данных','Генерация персон через AI','Автоматизация юзабилити-тестов','AI-ассистент для интервью','Прогнозирование поведения'], 
    modules:[
      {title:'AI в UX-исследованиях',lessons:5},
      {title:'Анализ данных',lessons:5},
      {title:'Персоны и сценарии',lessons:4},
      {title:'Тестирование с AI',lessons:4},
      {title:'Дипломный проект',lessons:4}] 
    }

];




















/* ===== Преподаватели ===== */

DATA.teachers = [

   {
    id: 'anna-kim',
    avatar: 'images/avatars/anna-kim.png',
    name: 'Анна Ким', 
    role:'Старший UX/UI дизайнер', 
    specialization:'UX/UI, Figma, Моушн-дизайн', 
    bio:'Анна — продуктовый дизайнер с 8+ годами опыта в топовых IT-компаниях.', 
    courses:['ux-ui-design','figma-beginners','motion-design'], 
    rating:4.9, 
    students:3770 
  },


  { 
    id:'mark-johnson', 
    avatar: 'images/avatars/mark-johnson.png',
    name:'Марк Джонсон', 
    role:'Fullstack-разработчик', 
    specialization:'HTML/CSS, JavaScript, Git', 
    bio:'Марк разрабатывает для веба более 10 лет и преподаёт 6 лет.', 
    courses:['html-css','javascript-beginners','git-collaboration'], 
    rating:4.8, 
    students:10100 
  },


  { 
    id:'elena-ross', 
    avatar: 'images/avatars/elena-ross.png',
    name:'Елена Росс', 
    role:'Креативный директор', 
    specialization:'Веб-дизайн, Графический дизайн, Брендинг', 
    bio:'Елена руководит дизайн-студией и работает с брендами от стартапов до крупных компаний.', 
    courses:['web-design-basics','graphic-design'], 
    rating:4.7, 
    students:1560 
  },


  { 
    id:'david-chen', 
    avatar: 'images/avatars/david-chen.png',
    name:'Давид Чен', 
    role:'Инженер-программист', 
    specialization:'React, Python, Node.js, Бэкенд', 
    bio:'Давид — инженер с опытом в стартапах, специализируется на фронтенде и бэкенде.', 
    courses:['frontend-development','python-basics','backend-intro'], 
    rating:4.8, 
    students:4180 
  }

];


















/* ===== Отзывы студентов ===== */

DATA.reviews = [

  { 
    id:1, 
    avatar: 'images/avatars/sofia.png',
    name:'София Мартинес', 
    course:'UX/UI Дизайн с нуля', 
    courseId:'ux-ui-design', 
    rating:5, 
    text:'Этот курс полностью изменил мою карьеру. Анна объясняет сложные вещи просто.', 
    date:'2025-12-15' 
  },


  { 
    id:2, 
    avatar: 'images/avatars/james.png',
    name:'Джеймс Ли', 
    course:'JavaScript для начинающих', 
    courseId:'javascript-beginners', 
    rating:5, 
    text:'Лучший курс по JavaScript. Раздел по async/await наконец-то всё прояснил.', 
    date:'2025-11-28' 
  },


  { 
    id:3, 
    avatar: 'images/avatars/aisha.png',
    name:'Аиша Патель', 
    course:'Figma для начинающих', 
    courseId:'figma-beginners', 
    rating:5, 
    text:'Короткий, сфокусированный и практичный. Урок по компонентам стоит своих денег.', 
    date:'2025-11-10' 
  },


  { 
    id:4, 
    avatar: 'images/avatars/nikita.png',
    name:'Никита Волков', 
    course:'HTML/CSS с нуля', 
    courseId:'html-css', 
    rating:4, 
    text:'Отличный стартовый курс. Разделы Flexbox и Grid особенно хороши.', 
    date:'2025-10-22' 
  },


  { 
    id:5, 
    avatar: 'images/avatars/maria.png',
    name:'Мария Сантос', 
    course:'Основы фронтенд-разработки', 
    courseId:'frontend-development', 
    rating:5, 
    text:'Давид потрясающий преподаватель. Дипломный проект дал больше, чем месяцы самообучения.', 
    date:'2025-10-05' 
  },


  { 
    id:6, 
    avatar: 'images/avatars/tom.png',
    name:'Том Бейкер', 
    course:'Основы Python', 
    courseId:'python-basics', 
    rating:5, text:'Давид сделал Python понятным. Теперь я автоматизирую задачи на работе.', 
    date:'2025-09-18' 
  },


  { id:7, avatar: 'images/avatars/lena.png', name:'Лена Кравец', course:'Основы веб-дизайна', courseId:'web-design-basics', rating:4, text:'У Елены отличный глаз на дизайн. Модуль по адаптивности — лучший.', date:'2025-09-01' },
  { id:8, avatar: 'images/avatars/aleks.png', name:'Алекс Тёрнер', course:'Git и командная работа', courseId:'git-collaboration', rating:5, text:'Наконец-то понимаю Git! Обязательный курс для всех разработчиков.', date:'2025-08-20' },
  { id:9, avatar: 'images/avatars/pria.png', name:'Прия Шарма', course:'Основы графического дизайна', courseId:'graphic-design', rating:4, text:'Хорошо структурированное введение. Проект по брендингу — лучшая часть.', date:'2025-08-05' },
  { id:10, avatar: 'images/avatars/rayan.png', name:'Райан Купер', course:'Введение в бэкенд', courseId:'backend-intro', rating:4, text:'Крепкие основы бэкенда. Разделы по базам данных отличные.', date:'2025-07-15' },
  { id:11, avatar: 'images/avatars/emma.png', name:'Эмма Уотсон', course:'Основы моушн-дизайна', courseId:'motion-design', rating:5, text:'Принципы анимации объяснены красиво, проекты увлекательные.', date:'2025-07-02' },
  { id:12, avatar: 'images/avatars/oleg.png',name:'Олег Петров', course:'UX/UI Дизайн с нуля', courseId:'ux-ui-design', rating:5, text:'Комплексный и хорошо поданный. Проект портфолио помог найти клиентов.', date:'2025-06-20' }
];

/* ===== FAQ ===== */
// Частые вопросы (FAQ)
DATA.faq = [
  { id:1, category:'Общие', question:'Что такое LearnDot?', answer:'LearnDot — онлайн-платформа для обучения дизайну и IT с курсами от профессионалов индустрии.' },
  { id:2, category:'Общие', question:'Для кого предназначены курсы?', answer:'Для начинающих, которые хотят войти в IT или дизайн, а также для тех, кто хочет повысить квалификацию.' },
  { id:3, category:'Курсы', question:'Как устроены курсы?', answer:'Каждый курс разделён на модули с видеоуроками, текстами и практическими заданиями.' },
  { id:4, category:'Курсы', question:'Есть бесплатные курсы?', answer:'Да! HTML/CSS с нуля и Git — полностью бесплатные без скрытых платежей.' },
  { id:5, category:'Курсы', question:'Сколько длится доступ?', answer:'После покупки — бессрочный доступ ко всем материалам, включая обновления.' },
  { id:6, category:'Доступ', question:'Можно учиться с телефона?', answer:'Да, платформа полностью адаптивна и работает на всех устройствах.' },
  { id:7, category:'Доступ', question:'Нужно специальное ПО?', answer:'Для большинства курсов хватит браузера. Особые требования указаны в описании.' },
  { id:8, category:'Оплата', question:'Какие способы оплаты?', answer:'Visa, Mastercard, American Express, PayPal и банковский перевод.' },
  { id:9, category:'Оплата', question:'Есть возврат средств?', answer:'Да, гарантия возврата в течение 14 дней, если пройдено менее 30% курса.' },
  { id:10, category:'Оплата', question:'Есть командные скидки?', answer:'Да! Тариф Pro Team для групп от 5 человек. Свяжитесь для расчёта.' },
  { id:11, category:'Сертификаты', question:'Выдаётся сертификат?', answer:'Да, после прохождения всех уроков и заданий вы получаете цифровой сертификат.' },
  { id:12, category:'Сертификаты', question:'Признаются ли сертификаты?', answer:'Наши сертификаты подтверждают навыки и ценятся многими IT-компаниями.' }
];






/* ===== Блог ===== */
// Статьи блога
// Поле cover — путь к файлу обложки статьи (для карточек)
DATA.blog = [
  { id:'getting-started-ux', cover:'images/blog/ux-roadmap.jpg', title:'Как войти в UX-дизайн: полный план на 2026 год', category:'Дизайн', excerpt:'Войти в UX может быть непросто. Этот план покрывает все навыки и шаги.', date:'2026-03-28', readTime:'8 мин', author:'Анна Ким', fullText:'<p>UX-дизайн — одна из самых востребованных профессий в IT. Если вы хотите войти в эту сферу, вам понадобится чёткий план обучения.</p><p><strong>Шаг 1: Изучите основы.</strong> Начните с понимания пользовательского опыта. Пройдите вводный курс по UX.</p><p><strong>Шаг 2: Освойте инструменты.</strong> Figma — основной инструмент UI-дизайнера. Научитесь создавать макеты и прототипы.</p><p><strong>Шаг 3: Практикуйтесь.</strong> Создайте 2-3 учебных проекта для портфолио.</p><p><strong>Шаг 4: Постройте портфолио.</strong> Оформите кейсы: проблема → исследование → решение → результат.</p><p>Путь в UX требует времени, но каждый шаг приближает к цели. Начните сегодня!</p>' },
  { id:'css-grid-guide', cover:'images/blog/css-grid.jpg', title:'CSS Grid на практике: макеты, которые работают', category:'IT', excerpt:'Выйдите за рамки базовых уроков. Реальные паттерны для рабочих сайтов.', date:'2026-03-22', readTime:'6 мин', author:'Марк Джонсон', fullText:'<p>CSS Grid изменил подход к созданию макетов. Больше не нужны хаки с float.</p><p><strong>Базовая сетка.</strong> Начните с <code>display: grid</code> и <code>grid-template-columns</code>.</p><p><strong>Именованные области.</strong> С помощью <code>grid-template-areas</code> создавайте читаемые макеты.</p><p><strong>Вложенные гриды.</strong> Grid внутри grid — это нормально. Используйте subgrid.</p><p>CSS Grid — мощный инструмент. Освойте его, и любой макет станет простым.</p>' },
  { id:'figma-tips', cover:'images/blog/figma-tips.jpg', title:'10 советов по Figma, которые ускорят вашу работу', category:'Дизайн', excerpt:'После лет ежедневной работы — горячие клавиши и приёмы, экономящие часы.', date:'2026-03-15', readTime:'5 мин', author:'Анна Ким', fullText:'<p>Figma — основной инструмент UI-дизайнера. Вот приёмы, которые ускорят работу.</p><p><strong>1. Auto Layout</strong> — используйте для всех компонентов.</p><p><strong>2. Горячие клавиши</strong> — Ctrl+D, Ctrl+G, Shift+A.</p><p><strong>3. Компоненты с вариантами</strong> — один компонент кнопки с вариантами: primary, secondary.</p><p><strong>4. Стили</strong> — цвета, шрифты и эффекты как стили.</p><p><strong>5. Плагины</strong> — Unsplash, Content Reel, Iconify.</p>' },
  { id:'js-mistakes', cover:'images/blog/js-mistakes.jpg', title:'7 частых ошибок начинающих JavaScript-разработчиков', category:'IT', excerpt:'Изучать JS непросто. Вот самые частые баги и как их избежать.', date:'2026-03-10', readTime:'7 мин', author:'Марк Джонсон', fullText:'<p>JavaScript — гибкий, но коварный язык. Вот ошибки новичков.</p><p><strong>1. == vs ===.</strong> Всегда используйте строгое сравнение.</p><p><strong>2. Забытый var/let/const.</strong> Без объявления переменная глобальная.</p><p><strong>3. Callback hell.</strong> Используйте async/await.</p><p><strong>4. Мутация объектов.</strong> Объекты передаются по ссылке.</p><p><strong>5. Нет обработки ошибок.</strong> Используйте try/catch.</p>' },
  { id:'design-system', cover:'images/blog/design-system.jpg', title:'Ваша первая дизайн-система: практический гайд', category:'Дизайн', excerpt:'Дизайн-системы экономят команде сотни часов. Как начать с нуля.', date:'2026-03-05', readTime:'10 мин', author:'Елена Росс', fullText:'<p>Дизайн-система — набор правил и компонентов для консистентности продукта.</p><p><strong>Зачем?</strong> Без неё каждый дизайнер создаёт свои версии кнопок.</p><p><strong>С чего начать.</strong> Цветовая палитра, типографика, сетка 8px, базовые компоненты.</p><p><strong>Инструменты.</strong> Figma для токенов, Storybook для кода.</p><p>Начните с малого: 5 цветов, 2 шрифта, 10 компонентов.</p>' },
  { id:'react-hooks', cover:'images/blog/react-hooks.jpg', title:'React Hooks: useState, useEffect и не только', category:'IT', excerpt:'Понятный гайд по важнейшим хукам React с реальными примерами кода.', date:'2026-02-28', readTime:'9 мин', author:'Давид Чен', fullText:'<p>Хуки — основа современного React.</p><p><strong>useState</strong> — хранит состояние компонента.</p><p><strong>useEffect</strong> — побочные эффекты: запросы к API, таймеры.</p><p><strong>useContext</strong> — передача данных без props-дриллинга.</p><p><strong>useRef</strong> — мутируемая ссылка без ре-рендера.</p><p>Освойте эти 4 хука для любых React-приложений.</p>' },
  { id:'freelance', cover:'images/blog/freelance.jpg', title:'Как начать фриланс дизайнером в 2026', category:'Дизайн', excerpt:'От определения расценок до поиска клиентов — практический гайд.', date:'2026-02-20', readTime:'8 мин', author:'Елена Росс', fullText:'<p>Фриланс — свобода выбора проектов и графика.</p><p><strong>Портфолио.</strong> 3-5 кейсов: задача → исследование → решение → результат.</p><p><strong>Ценообразование.</strong> Расходы + налоги + прибыль.</p><p><strong>Клиенты.</strong> Upwork, Behance, LinkedIn. Лучший источник — рекомендации.</p><p><strong>Контракты.</strong> Всегда заключайте договор.</p>' },
  { id:'python-auto', cover:'images/blog/python-auto.jpg', title:'Автоматизация рутины на Python: 5 реальных примеров', category:'IT', excerpt:'Python идеален для автоматизации. Скрипты для файлов, email, отчётов.', date:'2026-02-15', readTime:'7 мин', author:'Давид Чен', fullText:'<p>Python идеален для автоматизации.</p><p><strong>1. Переименование файлов</strong> — модуль os.</p><p><strong>2. Парсинг</strong> — requests + BeautifulSoup.</p><p><strong>3. Email</strong> — smtplib.</p><p><strong>4. Excel</strong> — openpyxl.</p><p><strong>5. Бот в Telegram</strong> — python-telegram-bot.</p>' },
  { id:'color-theory', cover:'images/blog/color-theory.jpg', title:'Теория цвета для веб-дизайнеров', category:'Дизайн', excerpt:'Контраст, доступность, культурный контекст и влияние на поведение.', date:'2026-02-08', readTime:'6 мин', author:'Елена Росс', fullText:'<p>Цвет — мощный инструмент дизайнера.</p><p><strong>Цветовой круг.</strong> Комплементарные — контраст. Аналогичные — гармония.</p><p><strong>Контраст.</strong> Минимум 4.5:1 по WCAG.</p><p><strong>Психология.</strong> Синий — доверие. Красный — энергия. Зелёный — рост.</p><p><strong>Палитра.</strong> 60% основного, 30% вторичного, 10% акцентного.</p>' }
];





/* ===== Данные студента ===== */
// Записи студента на курсы
DATA.enrollments = [
  { courseId:'ux-ui-design', enrolledDate:'2025-10-01', progress:72, status:'in-progress' },
  { courseId:'figma-beginners', enrolledDate:'2025-11-15', progress:100, status:'completed' },
  { courseId:'html-css', enrolledDate:'2026-01-10', progress:45, status:'in-progress' },
  { courseId:'javascript-beginners', enrolledDate:'2026-02-20', progress:18, status:'in-progress' }
];







// Задания студента
DATA.assignments = [
  { id:'a1', courseId:'ux-ui-design', title:'Создать персону пользователя', module:'Исследования', dueDate:'2026-03-15', status:'graded', grade:92, teacherComment:'Отличная персона с подробными болями пользователя.', submittedDate:'2026-03-13' },
  { id:'a2', courseId:'ux-ui-design', title:'Вайрфрейм мобильного экрана', module:'Прототипирование', dueDate:'2026-04-01', status:'submitted', grade:null, teacherComment:null, submittedDate:'2026-03-30' },
  { id:'a3', courseId:'ux-ui-design', title:'Мини дизайн-система', module:'Дизайн-системы', dueDate:'2026-04-20', status:'pending', grade:null, teacherComment:null, submittedDate:null },
  { id:'a4', courseId:'html-css', title:'Адаптивная лендинг-страница', module:'Адаптивность', dueDate:'2026-04-10', status:'pending', grade:null, teacherComment:null, submittedDate:null },
  { id:'a5', courseId:'javascript-beginners', title:'Интерактивный To-Do список', module:'DOM', dueDate:'2026-04-25', status:'pending', grade:null, teacherComment:null, submittedDate:null }
];






// Уведомления студента
DATA.notifications = [
  { id:'n1', type:'course', title:'Новый урок доступен', message:'Модуль 6: «Создание компонентов» добавлен в курс UX/UI Дизайн.', date:'2026-04-02', read:false },
  { id:'n2', type:'assignment', title:'Задание оценено', message:'Ваше задание «Создать персону» получило 92/100.', date:'2026-04-01', read:false },
  { id:'n3', type:'system', title:'Новая функция: тёмная тема', message:'Переключайтесь между светлой и тёмной темой в настройках.', date:'2026-03-28', read:true },
  { id:'n4', type:'course', title:'Курс пройден!', message:'Поздравляем! Вы прошли «Figma для начинающих».', date:'2026-03-20', read:true },
  { id:'n5', type:'assignment', title:'Скоро дедлайн', message:'«Мини дизайн-система» — дедлайн 20 апреля.', date:'2026-03-18', read:true },
  { id:'n6', type:'payment', title:'Оплата подтверждена', message:'Оплата 25 000 ₸ за «JavaScript для начинающих» подтверждена.', date:'2026-02-20', read:true },
  { id:'n7', type:'system', title:'Добро пожаловать в LearnDot!', message:'Ваш аккаунт создан. Начните изучать курсы.', date:'2025-10-01', read:true }
];






// История оплат студента
DATA.payments = [
  { id:'p1', courseId:'ux-ui-design', courseName:'UX/UI Дизайн с нуля', date:'2025-10-01', amount:40000, method:'Visa •••• 4242', status:'completed' },
  { id:'p2', courseId:'figma-beginners', courseName:'Figma для начинающих', date:'2025-11-15', amount:15000, method:'Visa •••• 4242', status:'completed' },
  { id:'p3', courseId:'html-css', courseName:'HTML/CSS с нуля', date:'2026-01-10', amount:0, method:'Бесплатно', status:'completed' },
  { id:'p4', courseId:'javascript-beginners', courseName:'JavaScript для начинающих', date:'2026-02-20', amount:25000, method:'PayPal', status:'completed' }
];





// Сертификаты студента
DATA.certificates = [
  { id:'cert-1', courseId:'figma-beginners', courseName:'Figma для начинающих', issueDate:'2026-03-20', studentName:'Анна Студент', instructor:'Анна Ким', certificateNumber:'LH-2026-FIG-00142' }
];






// Тесты (квизы)
DATA.quizzes = [
  { id:'quiz-1', courseId:'ux-ui-design', title:'Модуль 1: Введение в UX/UI', totalQuestions:5, passingScore:60, status:'passed', score:80,
    questions:[
      { id:'q1', text:'Что означает UX?', options:['Пользовательский опыт','Пользовательское расширение','Универсальный обмен','Единое выражение'], correct:0 },
      { id:'q2', text:'Какой этап является ключевым в дизайн-мышлении?', options:['Компиляция','Эмпатия','Отладка','Рендеринг'], correct:1 },
      { id:'q3', text:'UI дизайн фокусируется на:', options:['Архитектуре сервера','Визуальном интерфейсе','Базах данных','Сетевой безопасности'], correct:1 },
      { id:'q4', text:'Цель исследования пользователей?', options:['Писать код быстрее','Понять потребности','Создать логотип','Оптимизировать сервер'], correct:1 },
      { id:'q5', text:'Самый популярный инструмент UI дизайна в 2026?', options:['Word','Figma','Excel','Блокнот'], correct:1 }
    ]
  },
  { id:'quiz-2', courseId:'ux-ui-design', title:'Модуль 5: Визуальный дизайн', totalQuestions:5, passingScore:60, status:'not-started', score:null,
    questions:[
      { id:'q11', text:'Какая цветовая модель для экранов?', options:['CMYK','RGB','Pantone','RAL'], correct:1 },
      { id:'q12', text:'Что такое визуальная иерархия?', options:['Структура папок','Расстановка по важности','База данных','JS-фреймворк'], correct:1 },
      { id:'q13', text:'Минимальный размер текста для веба?', options:['8px','10px','16px','32px'], correct:2 },
      { id:'q14', text:'Сетка 8px означает кратность:', options:['4','6','8','12'], correct:2 },
      { id:'q15', text:'Шрифты без засечек обычно:', options:['Плохо читаются','Современные и чистые','Только для печати','Декоративные'], correct:1 }
    ]
  }
];






/* ===== Данные преподавателя ===== */
// Курсы преподавателя
DATA.teacherCourses = [
  { courseId:'html-css', title:'HTML/CSS с нуля', students:3200, activeStudents:420, avgProgress:58, lessonsCount:32, modulesCount:6, rating:4.8, status:'published', lastUpdated:'2026-03-15' },
  { courseId:'javascript-beginners', title:'JavaScript для начинающих', students:2800, activeStudents:390, avgProgress:42, lessonsCount:40, modulesCount:7, rating:4.7, status:'published', lastUpdated:'2026-03-22' },
  { courseId:'git-collaboration', title:'Git и командная работа', students:4100, activeStudents:510, avgProgress:71, lessonsCount:14, modulesCount:4, rating:4.7, status:'published', lastUpdated:'2026-02-28' }
];







// Работы студентов на проверку
DATA.submissions = [
  { id:'s1', studentName:'Анна Студент', courseName:'HTML/CSS с нуля', assignmentTitle:'Адаптивная лендинг-страница', submittedDate:'2026-04-02', status:'pending', feedback:'', grade:null },
  { id:'s2', studentName:'София Мартинес', courseName:'HTML/CSS с нуля', assignmentTitle:'Задание по сетке', submittedDate:'2026-04-01', status:'pending', feedback:'', grade:null },
  { id:'s3', studentName:'Джеймс Ли', courseName:'JavaScript для начинающих', assignmentTitle:'Задание по функциям', submittedDate:'2026-03-30', status:'pending', feedback:'', grade:null },
  { id:'s4', studentName:'Никита Волков', courseName:'HTML/CSS с нуля', assignmentTitle:'Адаптивная лендинг-страница', submittedDate:'2026-03-28', status:'reviewed', feedback:'Хорошая адаптивная верстка. Улучшите доступность мобильного меню.', grade:85 },
  { id:'s5', studentName:'Аиша Патель', courseName:'JavaScript для начинающих', assignmentTitle:'Задание по функциям', submittedDate:'2026-03-27', status:'reviewed', feedback:'Отличное использование функций высшего порядка.', grade:95 }
];




/* ===== Данные админа ===== */
// Все пользователи платформы (для админки)
DATA.allUsers = [
  { id:'u1', avatar: 'images/avatars/anna.png', name:'Анна Студент', email:'student@demo.com', role:'student', status:'active', joinDate:'2025-10-01', courses:4 },
  { id:'u2', avatar: 'images/avatars/mark.png', name:'Марк Преподаватель', email:'teacher@demo.com', role:'teacher', status:'active', joinDate:'2025-06-15', courses:3 },
  { id:'u3', avatar: 'images/avatars/david.png', name:'Давид Админ', email:'admin@demo.com', role:'admin', status:'active', joinDate:'2025-01-10', courses:0 },
  { id:'u4', avatar: 'images/avatars/sofia.png', name:'София Мартинес', email:'sofia@example.com', role:'student', status:'active', joinDate:'2025-11-20', courses:3 },
  { id:'u5', avatar: 'images/avatars/james.png', name:'Джеймс Ли', email:'james@example.com', role:'student', status:'active', joinDate:'2025-12-01', courses:2 },
  { id:'u6', avatar: 'images/avatars/aisha.png', name:'Аиша Патель', email:'aisha@example.com', role:'student', status:'active', joinDate:'2026-01-05', courses:2 },
  { id:'u7', avatar: 'images/avatars/nikita.png', name:'Никита Волков', email:'nikita@example.com', role:'student', status:'inactive', joinDate:'2025-09-18', courses:1 },
  { id:'u8', avatar: 'images/avatars/annak.png', name:'Анна Ким', email:'anna.kim@example.com', role:'teacher', status:'active', joinDate:'2025-03-20', courses:3 },
  { id:'u9', avatar: 'images/avatars/elena.png', name:'Елена Росс', email:'elena@example.com', role:'teacher', status:'active', joinDate:'2025-05-12', courses:2 },
  { id:'u10', avatar: 'images/avatars/david.png', name:'Давид Чен', email:'david.c@example.com', role:'teacher', status:'active', joinDate:'2025-04-08', courses:3 },
  { id:'u11', avatar: 'images/avatars/tom.png', name:'Том Бейкер', email:'tom@example.com', role:'student', status:'active', joinDate:'2025-10-15', courses:3 },
  { id:'u12', avatar: 'images/avatars/maria.png', name:'Мария Сантос', email:'maria@example.com', role:'student', status:'active', joinDate:'2026-01-20', courses:1 },
  { id:'u13', avatar: 'images/avatars/rayan.png', name:'Райан Купер', email:'ryan@example.com', role:'student', status:'active', joinDate:'2025-11-10', courses:2 },
  { id:'u14', avatar: 'images/avatars/lena.png', name:'Лена Кравец', email:'lena@example.com', role:'student', status:'inactive', joinDate:'2025-08-22', courses:1 },
  { id:'u15', avatar: 'images/avatars/pria.png', name:'Прия Шарма', email:'priya@example.com', role:'student', status:'active', joinDate:'2026-02-14', courses:1 }
];

// Все платежи платформы (для админки)
DATA.allPayments = [
  { id:'ap1', user:'Анна Студент', course:'UX/UI Дизайн с нуля', amount:40000, date:'2025-10-01', status:'completed', method:'Visa' },
  { id:'ap2', user:'София Мартинес', course:'UX/UI Дизайн с нуля', amount:40000, date:'2025-11-20', status:'completed', method:'PayPal' },
  { id:'ap3', user:'Джеймс Ли', course:'JavaScript для начинающих', amount:25000, date:'2025-12-01', status:'completed', method:'Visa' },
  { id:'ap4', user:'Том Бейкер', course:'Основы Python', amount:20000, date:'2025-10-15', status:'completed', method:'Mastercard' },
  { id:'ap5', user:'Аиша Патель', course:'Figma для начинающих', amount:15000, date:'2026-01-05', status:'completed', method:'PayPal' },
  { id:'ap6', user:'Мария Сантос', course:'Основы фронтенд-разработки', amount:80000, date:'2026-01-20', status:'completed', method:'Visa' },
  { id:'ap7', user:'Алекс Тёрнер', course:'Основы моушн-дизайна', amount:30000, date:'2025-12-28', status:'refunded', method:'Visa' },
  { id:'ap8', user:'Райан Купер', course:'Введение в бэкенд', amount:40000, date:'2025-11-10', status:'completed', method:'Visa' }
];

// Отзывы для модерации (админка)
DATA.adminReviews = [
  { id:'r1', student:'София Мартинес', course:'UX/UI Дизайн с нуля', rating:5, text:'Этот курс полностью изменил мою карьеру.', date:'2025-12-15', status:'approved' },
  { id:'r2', student:'Джеймс Ли', course:'JavaScript для начинающих', rating:5, text:'Лучший курс по JavaScript.', date:'2025-11-28', status:'approved' },
  { id:'r3', student:'Том Бейкер', course:'Основы Python', rating:5, text:'Давид сделал Python понятным.', date:'2025-09-18', status:'pending' },
  { id:'r4', student:'Лена Кравец', course:'Основы веб-дизайна', rating:4, text:'У Елены отличный глаз на дизайн.', date:'2025-09-01', status:'pending' },
  { id:'r5', student:'Эмма Уотсон', course:'Основы моушн-дизайна', rating:5, text:'Принципы анимации объяснены красиво.', date:'2025-07-02', status:'pending' }
];

// Аналитика платформы
DATA.analytics = {
  revenue: { total:14320, thisMonth:2180, growth:11.8 },
  users: { total:15, students:10, teachers:4, admins:1, newThisMonth:3 },
  courses: { total:11, avgRating:4.74 },
  enrollments: { total:19610, thisMonth:1420, growth:20.3 },
  topCourses: [
    { title:'Git и командная работа', students:4100, revenue:0, rating:4.7 },
    { title:'HTML/CSS с нуля', students:3200, revenue:0, rating:4.8 },
    { title:'JavaScript для начинающих', students:2800, revenue:5320, rating:4.7 },
    { title:'Figma для начинающих', students:2100, revenue:3890, rating:4.9 },
    { title:'Основы Python', students:1900, revenue:2940, rating:4.8 }
  ],
  monthlyRevenue: [{month:'Окт',amount:1240},{month:'Ноя',amount:1580},{month:'Дек',amount:1720},{month:'Янв',amount:1890},{month:'Фев',amount:1950},{month:'Мар',amount:2180}],
  monthlyUsers: [{month:'Окт',count:42},{month:'Ноя',count:58},{month:'Дек',count:71},{month:'Янв',count:89},{month:'Фев',count:104},{month:'Мар',count:128}]
};


// ==========================================================
//   ДАННЫЕ УРОКОВ ДЛЯ СТРАНИЦЫ ПРОСМОТРА
//
//   videoId — ID видео на YouTube (часть ссылки после v=)
//   Чтобы заменить видео — обновите videoId
//   Если videoId пустой — показывается заглушка
//
//   type: 'video' / 'text' / 'practice'
//   content — HTML-текст урока
//   practice — задание для практики (HTML)
// ==========================================================

DATA.lessonsByModule = {
  'ux-ui-design': [
    { mod: 'Введение в UX/UI', lessons: [
      { id: 'l1', title: 'Что такое UX?', type: 'video', dur: '12 мин', videoUrl: 'https://www.youtube.com/watch?v=L9CLXSm2v7M',
        content: '<p>UX (User Experience) — это то, как пользователь воспринимает взаимодействие с продуктом. Хороший UX делает продукт интуитивным и приятным.</p><p>В этом уроке вы узнаете основные принципы UX-дизайна и почему он важен для любого цифрового продукта.</p>',
        practice: '<p><strong>Задание:</strong> Откройте любое приложение на телефоне и запишите 3 момента, которые вам понравились в интерфейсе, и 3 момента, которые вас раздражают.</p>' },
      { id: 'l2', title: 'Что такое UI?', type: 'video', dur: '10 мин', videoUrl: 'https://www.youtube.com/watch?v=fHevFA0makQ',
        content: '<p>UI (User Interface) — это визуальная часть продукта: кнопки, цвета, шрифты, иконки. UI-дизайнер создаёт то, что пользователь видит и с чем взаимодействует.</p>',
        practice: '<p><strong>Задание:</strong> Сравните интерфейсы двух похожих приложений (например, два мессенджера). Какие визуальные решения вам кажутся лучше и почему?</p>' },
      { id: 'l3', title: 'UX vs UI — в чём разница', type: 'video', dur: '8 мин', videoUrl: 'https://www.youtube.com/watch?v=fHevFA0makQ',
        content: '<p>UX и UI часто путают, но это разные дисциплины.</p><p><strong>UX</strong> отвечает за логику и удобство: как расположить элементы, какой путь пользователя, как решить задачу.</p><p><strong>UI</strong> отвечает за визуал: какие цвета, шрифты, отступы, анимации.</p><p>Аналогия: UX — это архитектор здания (планировка, удобство). UI — это дизайнер интерьера (красота, стиль).</p>',
        practice: '<p><strong>Задание:</strong> Нарисуйте на бумаге схему экрана приложения для заказа еды. Не думайте о цветах — только о расположении элементов. Это UX-мышление.</p>' },
      { id: 'l4', title: 'Дизайн-мышление', type: 'video', dur: '15 мин', videoUrl: 'https://www.youtube.com/watch?v=arRHYaMxnrk',
        content: '<p>Дизайн-мышление — это подход к решению проблем через эмпатию к пользователю. 5 этапов: Эмпатия → Определение → Идеация → Прототип → Тестирование.</p>',
        practice: '<p><strong>Задание:</strong> Выберите проблему из повседневной жизни (например, очередь в столовой) и пройдите 5 этапов дизайн-мышления для её решения.</p>' }
    ]},
    { mod: 'Исследования и персоны', lessons: [
      { id: 'l5', title: 'Зачем нужны исследования', type: 'video', dur: '11 мин', videoUrl: 'https://www.youtube.com/watch?v=arRHYaMxnrk',
        content: '<p>UX-исследования помогают понять реальных пользователей: их потребности, боли и поведение. Без исследований дизайнер проектирует «вслепую».</p>',
        practice: '<p><strong>Задание:</strong> Проведите 5-минутное интервью с другом о его опыте использования любого приложения. Запишите ключевые моменты.</p>' },
      { id: 'l6', title: 'Интервью с пользователями', type: 'video', dur: '14 мин', videoUrl: 'https://www.youtube.com/watch?v=arRHYaMxnrk',
        content: '<p>Интервью — главный метод качественных исследований. Задавайте открытые вопросы: «Расскажите о...», «Как вы обычно...», «Что было сложнее всего?»</p>',
        practice: '' },
      { id: 'l7', title: 'Создание персон', type: 'video', dur: '13 мин', videoUrl: 'https://www.youtube.com/watch?v=arRHYaMxnrk',
        content: '<p>Персона — это собирательный образ целевого пользователя. Включает: имя, возраст, цели, боли, контекст использования продукта.</p>',
        practice: '<p><strong>Задание:</strong> Создайте персону для приложения по изучению языков. Имя, возраст, цели, проблемы, мотивация.</p>' }
    ]},
    { mod: 'Прототипирование', lessons: [
      { id: 'l8', title: 'Вайрфреймы', type: 'video', dur: '14 мин', videoUrl: 'https://www.youtube.com/watch?v=HsH4K3IsZNw',
        content: '<p>Вайрфрейм — это черно-белая схема экрана без визуального дизайна. Показывает расположение элементов и логику.</p>',
        practice: '<p><strong>Задание:</strong> Создайте вайрфрейм главного экрана мобильного приложения для фитнеса (на бумаге или в Figma).</p>' },
      { id: 'l9', title: 'Прототипы в Figma', type: 'video', dur: '18 мин', videoUrl: 'https://www.youtube.com/watch?v=IF3cOKX3YKI',
        content: '<p>Прототип — интерактивная модель продукта. В Figma вы можете связать экраны кликабельными ссылками и протестировать пользовательский путь.</p>',
        practice: '<p><strong>Задание:</strong> Создайте в Figma прототип из 3 экранов: главная → каталог → карточка товара. Добавьте переходы по клику.</p>' },
      { id: 'l10', title: 'Юзабилити-тестирование', type: 'video', dur: '11 мин', videoUrl: 'https://www.youtube.com/watch?v=arRHYaMxnrk',
        content: '<p>Тестирование показывает, где пользователи сталкиваются с трудностями. Попросите 3-5 людей выполнить задачу в вашем прототипе и наблюдайте.</p>',
        practice: '' }
    ]}
  ],
  'html-css': [
    { mod: 'Основы HTML', lessons: [
      { id: 'h1', title: 'Что такое HTML', type: 'video', dur: '10 мин', videoUrl: 'https://www.youtube.com/watch?v=B5RhnA-EUsU',
        content: '<p>HTML (HyperText Markup Language) — язык разметки веб-страниц. Каждый сайт в интернете использует HTML для структуры контента.</p>',
        practice: '<p><strong>Задание:</strong> Создайте файл index.html с заголовком, абзацем и ссылкой. Откройте в браузере.</p>' },
      { id: 'h2', title: 'Теги и атрибуты', type: 'video', dur: '12 мин', videoUrl: 'https://www.youtube.com/watch?v=EFVJoW2Anco',
        content: '<p>Теги — строительные блоки HTML. Атрибуты добавляют свойства тегам. Например: &lt;a href="url"&gt; — тег ссылки с атрибутом href.</p>',
        practice: '<p><strong>Задание:</strong> Создайте страницу с 5 разными тегами: h1, p, a, img, ul/li.</p>' }
    ]}
  ]
};
