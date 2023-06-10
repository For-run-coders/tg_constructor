package main

import (
	"context"
	"fmt"
	proto_botconstructor "hakaton/tg_bot_constructor/proto.botconstructor"
	"log"
	"net/http"
	"os"
	"strconv"
	"sync"
)

var botMeta BotMeta

func main() {
	fmt.Println("HELLO THIS IS BOT")
	botMeta = BotMeta{
		Name: "hakaton",
	}
	config := proto_botconstructor.Config{
		BotName: "hakaton",
	}
	fmt.Printf("Config: %+v\n", config.BotName)

	port, e := os.LookupEnv("SERVER_PORT")
	if !e {
		port = "8080"
	}

	intPort, err := strconv.Atoi(port)
	if err != nil {
		log.Fatalf("Failed to convert port to int port=%d", intPort)
	}

	log.Printf("Starting on port %s", port)

	httpServerExitDonw := &sync.WaitGroup{}
	httpServerExitDonw.Add(1)
	server := startServer(intPort, httpServerExitDonw)

	httpServerExitDonw.Wait()

	server.Shutdown(context.TODO())

	log.Println("Done, exiting")
}

func startServer(port int, wg *sync.WaitGroup) *http.Server {
	server := &http.Server{Addr: fmt.Sprintf(":%d", port)}

	http.HandleFunc("/hello", handleRoot)
	registerShutdown(wg)

	go func() {
		if err := server.ListenAndServe(); err != http.ErrServerClosed {
			// unexpected error. port in use?
			log.Fatalf("ListenAndServe(): %v", err)
		}
	}()
	return server
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, this is %s", botMeta.Name)
}

func registerShutdown(wg *sync.WaitGroup) {
	http.HandleFunc("/shutdown", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Shutting down %s", botMeta.Name)
		log.Println("Shuttig down")
		go func() {
			wg.Done()
		}()
	})
}

type BotMeta struct {
	Name string
}
