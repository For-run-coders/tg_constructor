package config

import (
	"context"
	"log"

	pb "hakaton/pulling_telegram_proxy/proto.botconstructor"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type ConfigServiceClient struct {
	Client pb.ConfigServiceClient
}

func InitClient(configServiceAddress *string) *ConfigServiceClient {
	client, err := grpc.Dial(*configServiceAddress,
		grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Failed to connect to config service: %s, %v", *configServiceAddress, err)
	}

	return &ConfigServiceClient{
		Client: pb.NewConfigServiceClient(client),
	}
}

func (c *ConfigServiceClient) GetConfig(botName *string) *pb.Config {
	resp, err := c.Client.GetConfig(context.Background(), &pb.GetConfigRequest{
		BotId: *botName,
	})

	if err != nil {
		log.Printf("Failed to get config: %v %v", *botName, err)
	}

	return resp.Config
}
