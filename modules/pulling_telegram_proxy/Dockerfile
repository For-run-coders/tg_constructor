FROM golang:alpine AS builder

WORKDIR /build
COPY . .

RUN go mod download
RUN go vet -v

RUN CGO_ENABLED=0 go build -o pulling_telegram_proxy main.go

FROM gcr.io/distroless/static-debian11
WORKDIR /build

COPY --from=builder /build/pulling_telegram_proxy /build/pulling_telegram_proxy
CMD ["./pulling_telegram_proxy"]