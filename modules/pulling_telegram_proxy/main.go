package main

import (
	"flag"
	database "hakaton/pulling_telegram_proxy/pkg/db"
	"hakaton/pulling_telegram_proxy/pkg/domain"
	"hakaton/pulling_telegram_proxy/pkg/tg_http"
	"log"
)

const telegramApiUrl = "https://api.telegram.org/"

var (
	botToken *string = flag.String("BOT_TOKEN", "", "-BOT_TOKEN=<token> (telegram bot token)")
	timeout  *int    = flag.Int("TIMEOUT", 5, "-TIMEOUT=<timeout> (in seconds)")
	botUrl   string
	db       domain.UpdatesDb
)

func main() {
	flag.Parse()

	if *botToken == "" {
		flag.PrintDefaults()
		log.Fatal("BOT_TOKEN is empty")
	}

	db = database.NewInMem()

	botUrl = telegramApiUrl + *botToken

	proxy := tg_http.ProxyData{
		BotUrl:  botUrl,
		Db:      db,
		Timeout: *timeout,
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
