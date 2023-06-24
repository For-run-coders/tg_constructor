INSERT INTO bot.configuration("name", data)
VALUES ('Test configuration', format('{"testConfig": {}}')::json);

INSERT INTO bot.bot ("name", configuration_id)
VALUES ('testBot', 1);

INSERT INTO bot.action ("name", description)
VALUES ('Start', 'Начало работы с ботом');

INSERT INTO bot.action ("name", description)
VALUES ('Button', 'Кнопка в меню бота');

INSERT INTO bot.action ("name", description)
VALUES ('Message', 'Отправка сообщения');

INSERT INTO bot.action_field ("name", description, "type", action_name)
VALUES ('Title', 'Заголовок кнопки', 'STRING', 'Button');

INSERT INTO bot.action_field ("name", description, "type", action_name)
VALUES ('Message', 'Ответ бота', 'STRING', 'Message');
