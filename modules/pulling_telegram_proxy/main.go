package main

import (
	"flag"
	"fmt"
	"hakaton/pulling_telegram_proxy/pkg/config"
	database "hakaton/pulling_telegram_proxy/pkg/db"
	"hakaton/pulling_telegram_proxy/pkg/domain"
	"hakaton/pulling_telegram_proxy/pkg/tg_http"
	"log"
	"os"
	"strings"
)

const telegramApiUrl = "https://api.telegram.org/"

var (
	botToken             *string = flag.String("BOT_TOKEN", "", "-BOT_TOKEN=<token> (telegram bot token)")
	timeout              *int    = flag.Int("TIMEOUT", 5, "-TIMEOUT=<timeout> (in seconds)")
	configServiceAddress *string = flag.String("CONFIG_SERVICE_ADDRESS", "", "-CONFIG_SERVICE_ADDRESS=<config_service_address>")
	botName              *string = flag.String("BOT_NAME", "", "-BOT_NAME=<bot_name>")
	botUrl               string
	db                   domain.UpdatesDb
)

func main() {
	SetFlagsFromEnvironment()
	flag.Parse()
	validateFlags()

	db = database.NewInMem()

	botUrl = telegramApiUrl + *botToken

	configClient := config.InitClient(configServiceAddress)
	config := configClient.GetConfig(botName)
	log.Printf("Bot started with config: %+v", config)

	proxy := tg_http.ProxyData{
		BotUrl:  botUrl,
		Db:      db,
		Timeout: *timeout,
		Config: domain.BotConfig{
			BotName: config.Id,
		},
	}
	log.Print("Started, fetching updates...")
	for {
		updates := proxy.GetUpdates()
		if len(updates) == 0 {
			log.Println("No updates ")
			continue
		}
		log.Printf("Received such updates: %+v", updates)

		for _, update := range updates {
			proxy.HandleMessage(&update.Message)
		}
		lastUpdate := updates[len(updates)-1]
		db.Store(lastUpdate.UpdateId+1, lastUpdate.Message.Date)
	}
}

func validateFlags() {
	if *botToken == "" {
		flag.PrintDefaults()
		log.Fatal("BOT_TOKEN is empty")
	}
	if *configServiceAddress == "" {
		flag.PrintDefaults()
		log.Fatal("CONFIG_SERVICE_ADDRESS is empty")
	}
	if *botName == "" {
		flag.PrintDefaults()
		log.Fatal("BOT_NAME is empty")
	}
}

func SetFlagsFromEnvironment() (err error) {
	flag.VisitAll(func(f *flag.Flag) {
		name := strings.ToUpper(strings.Replace(f.Name, "-", "_", -1))
		if value, ok := os.LookupEnv(name); ok {
			err2 := flag.Set(f.Name, value)
			if err2 != nil {
				err = fmt.Errorf("failed setting flag from environment: %w", err2)
			}
		}
	})

	return
}
