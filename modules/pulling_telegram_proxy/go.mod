module hakaton/pulling_telegram_proxy

go 1.20

require (
	github.com/hashicorp/go-memdb v1.3.4
	github.com/jackc/pgx/v5 v5.3.1
	github.com/sirupsen/logrus v1.9.3
	google.golang.org/grpc v1.56.1
	google.golang.org/protobuf v1.30.0
	hakaton/golang_commons v0.0.0-00010101000000-000000000000
)

require (
	github.com/golang/protobuf v1.5.3 // indirect
	github.com/hashicorp/go-immutable-radix v1.3.1 // indirect
	github.com/hashicorp/golang-lru v0.5.4 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20221227161230-091c0ba34f0a // indirect
	golang.org/x/crypto v0.9.0 // indirect
	golang.org/x/net v0.10.0 // indirect
	golang.org/x/sys v0.8.0 // indirect
	golang.org/x/text v0.9.0 // indirect
	google.golang.org/genproto v0.0.0-20230410155749-daa745c078e1 // indirect
)

replace hakaton/golang_commons => ../golang_commons
