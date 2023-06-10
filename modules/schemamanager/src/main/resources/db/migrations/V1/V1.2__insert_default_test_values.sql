INSERT INTO bot.action ("name", description, data)
VALUES ('Start', 'Начало работы с ботом',
        format('{"id": 1, "name": "start", "next_node_id": 3, "start": {}}')::json);

INSERT INTO bot.configuration("name", data)
VALUES ('Test configuration', format(
        '{"testConfig": {}}'
    )::json);

INSERT INTO bot.bot ("name", configuration_id)
VALUES ('testBot', 1);