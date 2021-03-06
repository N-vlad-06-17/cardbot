# Frontend часть Бота Вконтакте

В данном репозитории располагается React-приложение Вк бота для предоставлении скидочных карт.

Сам проект является рабочим и располагается по адресу **https://cardbot.ru/**

### О проекте

Cardbot - это некоммерческий проект, написанный студентом из Москвы.

Проект состоит из 2 частей. Первая - это Backend часть, которая отвечает за работу с Вконтакте, анализ сообщений и обработку\хранение карт.
Данная часть приложения написана на PHP + MYSQL.
Конкретные задачи:
 - Общение с API вконтакте
 - Сохранение данных в БД для последующего использования в диалогах
 - Анализ входящих сообщений и генерация ответов, основанных на данных из БД
 - Предоставление REST API для Frontend части приложения
 - Предобработка поступающих на сайт файлов
 - Сохранение и предоставление файлов пользователям во Frontend часть и Вк диалоги
 
Вторая часть проекта - это Frontend часть, которая отвечает за регистрацию пользователей и добавление собственных карт боту.
Данная часть написана на фреймворке React JS с использованием хуков.
Конкретные задачи:
- Предоставление интерфейса пользователям для регистрации и управлением данными своего аккаунта
- Предоставление интфейса пользователям для работы с личными картами ( добаваление, удаление, просмотр )
- Предоставление информации о проекте
