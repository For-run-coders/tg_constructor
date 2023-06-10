protoc -I modules/protocol/ \
    --go_out=modules/config_service/ \
    --go-grpc_out=modules/config_service/ \
    modules/protocol/protocol.proto \
    modules/protocol/grpc_config_server.proto
