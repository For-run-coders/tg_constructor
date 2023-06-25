package main

import (
	"context"
	"fmt"
	pb "hakaton/tg_bot_constructor/proto.botconstructor"
	"net/http"
	"os"
	"strconv"
	"sync"

	log "github.com/sirupsen/logrus"

	commons_logging "hakaton/golang_commons"
)

var botMeta BotMeta

func main() {
	commons_logging.ConfigureLogger("bot")
	log.Info("HELLO THIS IS BOT")
	botMeta = BotMeta{
		Name: "hakaton",
	}
	config := pb.Config{
		BotName: "hakaton",
	}
	log.Infof("Config: %+v", config.BotName)

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
	log.Info("In root")
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
