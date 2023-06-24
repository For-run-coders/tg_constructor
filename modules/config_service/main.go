package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	"hakaton/config_service/pkg/db"
	"hakaton/config_service/pkg/server"
	pb "hakaton/config_service/proto.botconstructor"
)

var (
	port        = flag.Int("port", 0, "port=")
	databaseUrl = flag.String("DATABASE_URL", "", "DATABASE_URL=")
)

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

	conn := db.GetConnection(context.Background(), *databaseUrl)
	pb.RegisterConfigServiceServer(s, &server.Server{
		Conn: conn,
	})
	log.Printf("Server is listening on %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
