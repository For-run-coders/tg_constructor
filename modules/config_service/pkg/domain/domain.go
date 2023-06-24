package domain

import "encoding/json"

type ConfigData struct {
	Id      string       `json:"id"`
	BotName string       `json:"bot_name"`
	Nodes   []ConfigNode `json:"nodes"`
}

type ConfigNode struct {
	Id         string          `json:"id"`
	Name       string          `json:"name"`
	NextNodeId string          `json:"next_node_id"`
	Data       json.RawMessage `json:"data"`
}
