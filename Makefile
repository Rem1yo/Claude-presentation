# === Управление Фронтендом (Сайт-презентация) ===
run:
	open index.html

save:
	git add -A
	git commit -m "$(msg)"
	git push

# === Управление Бэкендом (Payload CMS + PostgreSQL) ===
# Собрать и запустить бэкенд с базой данных в фоне
b-up:
	cd back && docker compose up -d --build

# Полностью остановить бэкенд и удалить контейнеры
b-down:
	cd back && docker compose down

# Смотреть логи бэкенда в реальном времени (для отладки)
b-logs:
	cd back && docker compose logs -f api

# Засидить локальную БД дефолтным контентом (запускать после b-up)
b-seed:
	docker exec back-api-1 node --import tsx/esm seed-content.mjs
