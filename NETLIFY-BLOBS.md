# LearnDot на Netlify Blobs

В этой версии проекта база данных максимально упрощена.

На Netlify хранятся только данные пользователей:

- имя;
- email;
- хэш пароля;
- роль;
- дата регистрации;
- статус.

Курсы, уроки, отзывы и остальной контент пока остаются в `js/data.js`.

## Как это работает

```text
login.html / register.html
        |
        v
/api/login или /api/register
        |
        v
Netlify Functions
        |
        v
Netlify Blobs
learndot-auth / users.json
```

## Файлы

- `netlify.toml` — настройки Netlify.
- `netlify/functions/login.js` — вход.
- `netlify/functions/register.js` — регистрация.
- `netlify/functions/users.js` — список пользователей для админки.
- `netlify/functions/lib/users.js` — общие функции для работы с Blobs.
- `package.json` — зависимости проекта.

## Демо-аккаунты

Если в Blobs ещё нет пользователей, они создаются автоматически:

```text
student@demo.com / password
teacher@demo.com / password
admin@demo.com / password
```

## Как запустить локально

Один раз установить зависимости:

```bash
npm install
```

Потом запустить:

```bash
npm run dev
```

Открывать сайт нужно по адресу, который покажет Netlify CLI.
Обычно это:

```text
http://localhost:8888
```

## Как загрузить на Netlify

1. Загрузить проект в GitHub.
2. На Netlify нажать `Add new site` -> `Import an existing project`.
3. Выбрать репозиторий.
4. В настройках оставить:

```text
Build command: оставить пустым
Publish directory: .
Functions directory: netlify/functions
```

Netlify сам выполнит установку зависимостей из `package.json`.

5. Нажать `Deploy`.

После деплоя Netlify сам подключит Functions и Blobs.
