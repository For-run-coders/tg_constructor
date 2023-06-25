FROM golang:alpine AS builder

WORKDIR /build
COPY config_service/ .
COPY golang_commons/ ../golang_commons

RUN go mod download
RUN go vet -v

RUN CGO_ENABLED=0 go build -o config_service main.go

FROM gcr.io/distroless/static-debian11
WORKDIR /app

COPY --from=builder /build/config_service /app/config_service
CMD ["./config_service"]