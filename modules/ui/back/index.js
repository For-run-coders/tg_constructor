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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
