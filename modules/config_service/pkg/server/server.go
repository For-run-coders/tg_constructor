package server

import (
	"context"
	"hakaton/config_service/pkg/db"

	pb "hakaton/config_service/proto.botconstructor"
	"log"

	"github.com/jackc/pgx/v5"
)

type Server struct {
	pb.UnimplementedConfigServiceServer
	Conn *pgx.Conn
}

func (s *Server) GetConfig(ctx context.Context, in *pb.GetConfigRequest) (*pb.GetConfigResponse, error) {
	data, err := db.LoadConfig(ctx, s.Conn, in.BotId)
	if err != nil {
		log.Printf("Error loading config: %v", err)
	}

	if data == nil {
		return &pb.GetConfigResponse{}, nil
	}

	return &pb.GetConfigResponse{
		Config: &pb.Config{
			Id:      in.BotId,
			BotName: data.BotName,
		},
	}, nil
}
