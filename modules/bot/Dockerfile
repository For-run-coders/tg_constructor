FROM golang:alpine AS builder

WORKDIR /build
COPY ./bot .
COPY golang_commons/ ../golang_commons

RUN go mod download
RUN go vet -v

RUN CGO_ENABLED=0 go build -o bot main.go

FROM gcr.io/distroless/static-debian11
WORKDIR /build

COPY --from=builder /build/bot /build/bot
CMD ["./bot"]