package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	pb "hakaton/config_service/proto.botconstructor"
	"log"
	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	"github.com/jackc/pgx/v5"
)

var (
	port        = flag.Int("port", 0, "port=")
	databaseUrl = flag.String("DATABASE_URL", "", "DATABASE_URL=")
)

type server struct {
	pb.UnimplementedConfigServiceServer
	Conn *pgx.Conn
}

func main() {
	flag.Parse()
	if *port == 0 {
		flag.PrintDefaults()
		return
	}

	log.Printf("port: %d", *port)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	s := grpc.NewServer()
	reflection.Register(s)

	conn := connectToDatabase()
	pb.RegisterConfigServiceServer(s, &server{
		Conn: conn,
	})
	log.Printf("Server is listening on %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}

func (s *server) GetConfig(ctx context.Context, in *pb.GetConfigRequest) (*pb.GetConfigResponse, error) {
	data, err := loadConfig(s.Conn, in.BotId)
	if err != nil {
		log.Printf("Error loading config: %v", err)
	}

	if data == "" {
		return &pb.GetConfigResponse{}, nil
	}

	var configData ConfigData
	unmarshallError := json.Unmarshal([]byte(data), &configData)
	if unmarshallError != nil {
		log.Printf("Error unmarshalling config: %v", unmarshallError)
	}

	return &pb.GetConfigResponse{
		Config: &pb.Config{
			Id:      in.BotId,
			BotName: configData.BotName,
		},
	}, nil
}

func connectToDatabase() *pgx.Conn {
	connection, err := pgx.Connect(context.Background(), *databaseUrl)
	if err != nil {
		log.Fatal("Cannot connect to database: ", err)
	}

	defer connection.Close(context.Background())

	return connection
}

func loadConfig(conn *pgx.Conn, botId string) (string, error) {
	var data string
	row := conn.QueryRow(context.Background(), "select data from configuration where id=$1", botId)
	err := row.Scan(data)
	if err == pgx.ErrNoRows {
		return "", nil
	}

	if err != nil {
		log.Fatal("Cannot load config: ", err)
	}

	return data, nil
}

type ConfigData struct {
	Id      string `json:"id"`
	BotName string `json:"bot_name"`
}
