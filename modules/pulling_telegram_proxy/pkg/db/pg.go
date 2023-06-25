package db

import (
	"context"
	"flag"
	"hakaton/pulling_telegram_proxy/pkg/domain"

	"github.com/jackc/pgx/v5"

	log "github.com/sirupsen/logrus"
)

var (
	databaseUrl = flag.String("DATABASE_URL", "", "DATABASE_URL=")
)

type pgDb struct {
	Conn *pgx.Conn
}

func NewPg() domain.UpdatesDb {
	connection, err := pgx.Connect(context.Background(), *databaseUrl)
	if err != nil {
		log.Fatal("Cannot connect to database: ", err)
	}

	defer connection.Close(context.Background())
	return &pgDb{
		Conn: connection,
	}
}

func (db *pgDb) Store(id int, timestamp int64) error {
	tx, err := db.Conn.BeginTx(context.Background(), pgx.TxOptions{})
	if err != nil {
		return err
	}

	_, err = tx.Exec(context.Background(), "insert into updates (id, timestamp) values (, )", id, timestamp)
	if err != nil {
		tx.Rollback(context.Background())
		return err
	}
	tx.Commit(context.Background())

	return nil
}

func (db *pgDb) Latest() (int, error) {
	row := db.Conn.QueryRow(context.Background(), "select id from updates ordery by id desc limit 1")
	var id int
	err := row.Scan(&id)
	return id, err
}
