FROM golang:alpine AS builder

WORKDIR /build
COPY ./pulling_telegram_proxy .
COPY golang_commons/ ../golang_commons

RUN go mod download
RUN go vet -v

RUN CGO_ENABLED=0 go build -o pulling_telegram_proxy main.go

FROM gcr.io/distroless/static-debian11
WORKDIR /app

COPY --from=builder /build/pulling_telegram_proxy /app/pulling_telegram_proxy
CMD ["./pulling_telegram_proxy"]