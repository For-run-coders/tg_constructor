package server_test

import (
	"context"
	"fmt"
	"hakaton/config_service/pkg/db"
	"hakaton/config_service/pkg/server"
	"net"
	"testing"

	"github.com/docker/go-connections/nat"
	"github.com/jackc/pgx/v5"
	"github.com/stretchr/testify/require"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
	"github.com/testcontainers/testcontainers-go/wait"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/test/bufconn"

	pb "hakaton/config_service/proto.botconstructor"

	log "github.com/sirupsen/logrus"
)

func TestWithPostgres(t *testing.T) {
	ctx := context.Background()

	cont, err := postgres.RunContainer(ctx,
		postgres.WithUsername("testing"),
		postgres.WithPassword("testing"),
		postgres.WithInitScripts("test_init_script.sql"),
		testcontainers.WithImage("postgres:latest"),
		testcontainers.WithWaitStrategy(wait.ForExposedPort()),
	)
	require.NoError(t, err)
	require.NotNil(t, cont)

	defer func() {
		if err := cont.Terminate(ctx); err != nil {
			t.Fatalf("Error during container termination: %s", err.Error())
		}
	}()

	mappedPort, err := cont.MappedPort(ctx, nat.Port("5432/tcp"))
	if err != nil {
		t.Fatalf("Error during container connection string: %s", err.Error())
	}

	hostIP, err := cont.Host(ctx)
	if err != nil {
		t.Fatalf("Error during container host: %s", err.Error())
	}

	uri := fmt.Sprintf("postgres://testing:testing@%s:%s/postgres", hostIP, mappedPort.Port())
	log.Printf("Postgres connection string: %s", uri)

	conn := db.GetConnection(ctx, uri)

	defer conn.Close(ctx)

	csc, closer := serverWithClient(ctx, conn)
	defer closer()

	resp, err := csc.GetConfig(ctx, &pb.GetConfigRequest{
		BotId: "test_bot_id",
	})
	require.Nil(t, err)
	require.NotNil(t, resp)
}

func serverWithClient(ctx context.Context, conn *pgx.Conn) (pb.ConfigServiceClient, func()) {
	buffer := 101024 * 1024
	lis := bufconn.Listen(buffer)

	baseServer := grpc.NewServer()

	pb.RegisterConfigServiceServer(baseServer, &server.Server{
		Conn: conn,
	})

	go func() {
		if err := baseServer.Serve(lis); err != nil {
			log.Printf("error serving server: %v", err)
		}
	}()

	dialContext, err := grpc.DialContext(ctx, "", grpc.WithContextDialer(
		func(ctx context.Context, s string) (net.Conn, error) {
			return lis.Dial()
		}), grpc.WithTransportCredentials(insecure.NewCredentials()))

	if err != nil {
		log.Fatalf("Failed to dial: %v", err)
	}

	closer := func() {
		err := lis.Close()
		if err != nil {
			log.Printf("error closing listener: %v", err)
		}
		baseServer.Stop()
	}

	client := pb.NewConfigServiceClient(dialContext)
	return client, closer
}
