package db

import (
	"context"
	"hakaton/config_service/pkg/domain"
	"log"

	"github.com/jackc/pgx/v5"
)

func GetConnection(ctx context.Context, url string) *pgx.Conn {
	config, err := pgx.ParseConfig(url)
	if err != nil {
		log.Fatal("Failed to parse config: ", err)
	}

	connection, err := pgx.ConnectConfig(ctx, config)
	if err != nil {
		log.Fatal("Cannot connect to database: ", err)
	}

	return connection
}

func LoadConfig(ctx context.Context, conn *pgx.Conn, botId string) (*domain.ConfigData, error) {
	var data domain.ConfigData
	row := conn.QueryRow(ctx, "select data from bot.configuration where name=$1", botId)
	err := row.Scan(&data)
	if err == pgx.ErrNoRows {
		return nil, nil
	}

	if err != nil {
		log.Fatal("Cannot load config: ", err)
	}

	log.Printf("Loaded config: %v", data)

	return &data, nil
}
