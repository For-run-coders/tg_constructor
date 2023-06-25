package main

import (
	"context"
	"flag"
	"fmt"
	"net"
	"os"
	"strings"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	"hakaton/config_service/pkg/db"
	"hakaton/config_service/pkg/server"
	pb "hakaton/config_service/proto.botconstructor"
	commons_logging "hakaton/golang_commons"

	log "github.com/sirupsen/logrus"
)

var (
	port        = flag.Int("PORT", 0, "PORT=")
	databaseUrl = flag.String("DATABASE_URL", "", "DATABASE_URL=")
)

func main() {
	commons_logging.ConfigureLogger("config_service")
	SetFlagsFromEnvironment()
	flag.Parse()
	if *port == 0 {
		fmt.Printf("Port = %d", *port)
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

func SetFlagsFromEnvironment() (err error) {
	flag.VisitAll(func(f *flag.Flag) {
		name := strings.ToUpper(strings.Replace(f.Name, "-", "_", -1))
		if value, ok := os.LookupEnv(name); ok {
			err2 := flag.Set(f.Name, value)
			if err2 != nil {
				err = fmt.Errorf("failed setting flag from environment: %w", err2)
			}
		}
	})

	return
}
