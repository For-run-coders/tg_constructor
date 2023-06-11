package domain

type Update struct {
	UpdateId int     `json:"update_id"`
	Message  Message `json:"message"`
}

type Message struct {
	MessageId int    `json:"message_id"`
	Chat      Chat   `json:"chat"`
	Text      string `json:"text"`
	Date      int64  `json:"date"`
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

type UpdatesDb interface {
	Latest() (int, error)
	Store(id int, timestamp int64) error
}

type TelegramProxy interface {
	GetUpdates() []Update
	HandleMessage(Message)
	HandleStart(Message)
	SendMessage(Message, string)
}
