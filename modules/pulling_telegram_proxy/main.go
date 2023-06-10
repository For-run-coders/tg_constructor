package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"io"
	"log"
	"net/http"
	"strconv"
)

const telegramApiUrl = "https://api.telegram.org/"

var (
	botToken *string = flag.String("BOT_TOKEN", "", "-BOT_TOKEN=<token>")
	updateId *int    = flag.Int("UPDATE_ID", 0, "-UPDATE_ID=<update_id>")
	botUrl   string
)

func main() {
	flag.Parse()

	if *botToken == "" {
		flag.PrintDefaults()
		log.Fatal("BOT_TOKEN is empty")
	}
	if *updateId == 0 {
		flag.PrintDefaults()
		log.Fatal("UPDATE_ID is empty")
	}

	botUrl = telegramApiUrl + *botToken

	updates := getUpdates()
	log.Printf("Received such updates: %+v", updates)
	for _, update := range updates {
		handleMessage(&update.Message)
	}
	if len(updates) == 0 {
		return
	}
	lastUpdate := updates[len(updates)-1].UpdateId + 1
	updateId = &lastUpdate
	getUpdates()
}

func getUpdates() []Update {
	completeUrl := botUrl + "/getUpdates?offset=" + strconv.Itoa((*updateId + 1))
	resp, err := http.Get(completeUrl)
	if err != nil {
		log.Println("Error during getUpdates: ", err)
	}

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("Error during getUpdates read: ", err)
	}

	var update GenericTelegramResponse[Update]
	err = json.Unmarshal(body, &update)
	if err != nil {
		log.Println("Error during getUpdates unmarshal: ", err)
	}

	return update.Result
}

func handleMessage(message *Message) {
	log.Printf("Handling message: %+v", message)

	if message.Text == "/start" {
		handleStart(message)
	} else {
		log.Printf("Unhandled message: %+v", message.Text)
	}
}

func handleStart(message *Message) {
	response := "Hello, " + message.Chat.FirstName + "! Did you really just decided to start this bot? WOOW"
	sendMessage(message, response)
}

func sendMessage(message *Message, response string) {
	log.Printf("Sending message: %s", response)
	sendMessage := SendMessage{
		ChatId: message.Chat.Id,
		Text:   response,
	}
	data, err := json.Marshal(sendMessage)
	if err != nil {
		log.Printf("Failed to marshal response: %v", err)
		return
	}
	http.Post(botUrl+"/sendMessage", "application/json", bytes.NewBuffer(data))
}

type Update struct {
	UpdateId int     `json:"update_id"`
	Message  Message `json:"message"`
}

type Message struct {
	MessageId int    `json:"message_id"`
	Chat      Chat   `json:"chat"`
	Text      string `json:"text"`
}

type Chat struct {
	Id        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type GenericTelegramResponse[Body any] struct {
	Ok     bool   `json:"ok"`
	Result []Body `json:"result"`
}

type SendMessage struct {
	ChatId int    `json:"chat_id"`
	Text   string `json:"text"`
}
