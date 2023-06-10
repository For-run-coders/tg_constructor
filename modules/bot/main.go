package main

import (
	"fmt"
	proto_botconstructor "hakaton/tg_bot_constructor/proto.botconstructor"
)

func main() {
	fmt.Println("HELLO THIS IS BOT")
	config := proto_botconstructor.Config{
		BotName: "hakaton",
	}
	fmt.Printf("Config: %+v\n", config.BotName)
}
