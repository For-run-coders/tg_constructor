const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;
const bp = require('body-parser');
const postgres = require('postgres');

const sql = postgres('postgres://postgres:password@localhost:5432/postgres');


app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(cors());
app.post('/create-bot', async (req, res) => {
    const actions = req.body.actions;
    await sql`
        insert into bot.configuration("name", data) values ('test', format(${JSON.stringify(actions)})::json)
    `;
});
app.get('/actions', async (req, res) => {
    const resultActions = await sql`select name, description from bot.action`;
    const resultActionFields = await sql`select name, description, type, action_name from bot.action_field`;
    const result = [];
    resultActions.forEach(action => {
        result.push({
            name: action.name,
            description: action.description,
            fields: resultActionFields.filter(field => field['action_name'] === action.name).map(field => ({
                name: field.name,
                description: field.description,
                type: field.type
            }))
        });
    });
    res.send(result);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
