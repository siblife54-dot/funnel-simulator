# Funnel Simulator

Интерактивный клиентский симулятор маркетинговой автоворонки.

## Локальный запуск

```bash
npm install
npm run dev
```

## GitHub Pages

Публикация выполняется workflow `Deploy to GitHub Pages`. В настройках репозитория
откройте **Settings → Pages → Build and deployment** и выберите **Source: GitHub Actions**.
После push в `main` или `work` workflow соберёт приложение и опубликует каталог `dist`.

Конфигурация Vite использует базовый путь `/funnel-simulator/`, соответствующий адресу
`https://<username>.github.io/funnel-simulator/`.
