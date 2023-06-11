FROM golang:alpine AS builder

WORKDIR /build
COPY . .

RUN go mod download
RUN go vet -v

RUN CGO_ENABLED=0 go build -o config_service main.go

FROM gcr.io/distroless/static-debian11
WORKDIR /build

COPY --from=builder /build/config_service /build/config_service
CMD ["./config_service"]