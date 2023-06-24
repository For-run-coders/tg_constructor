package tg_http

import (
	"bytes"
	"encoding/json"
	"fmt"
	"hakaton/pulling_telegram_proxy/pkg/domain"
	"io"
	"log"
	"net/http"
)

type ProxyData struct {
	BotUrl  string
	Db      domain.UpdatesDb
	Timeout int
	Config  domain.BotConfig
}

func (p *ProxyData) GetUpdates() []domain.Update {
	offset, err := p.Db.Latest()
	if err != nil {
		log.Fatal(err)
	}

	completeUrl := fmt.Sprintf("%s/getUpdates?offset=%d&timeout=%d", p.BotUrl, offset, p.Timeout)
	resp, err := http.Get(completeUrl)
	if err != nil {
		log.Println("Error during getUpdates: ", err)
	}

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("Error during getUpdates read: ", err)
	}

	var update domain.GenericTelegramResponse[domain.Update]
	err = json.Unmarshal(body, &update)
	if err != nil {
		log.Println("Error during getUpdates unmarshal: ", err)
	}

	return update.Result
}

func (p *ProxyData) HandleMessage(message *domain.Message) {
	log.Printf("Handling message: %+v", message)

	if message.Text == "/start" {
		p.HandleStart(message)
	} else {
		log.Printf("Unhandled message: %+v", message.Text)
	}
}

func (p *ProxyData) HandleStart(message *domain.Message) {
	n := p.Config.BotName
	response := "Hello, " + message.Chat.FirstName + "! Did you really just decided to start " + n + "? 🤠"
	p.SendMessage(message, response)
}

func (p *ProxyData) SendMessage(message *domain.Message, response string) {
	log.Printf("Sending message: %s", response)
	sendMessage := domain.SendMessage{
		ChatId: message.Chat.Id,
		Text:   response,
	}
	data, err := json.Marshal(sendMessage)
	if err != nil {
		log.Printf("Failed to marshal response: %v", err)
		return
	}
	http.Post(p.BotUrl+"/sendMessage", "application/json", bytes.NewBuffer(data))
}
