package commons

import (
	"os"

	log "github.com/sirupsen/logrus"
)

func ConfigureLogger(name string) {
	logDir := "log/" + name
	log.Infof("Initializing logging at %s", logDir)
	dir, err2 := os.Getwd()
	if err2 != nil {
		log.Fatal(err2)
	}
	log.Infof("Working directory: %s", dir)
	err := os.MkdirAll(logDir, os.ModePerm)
	if err != nil {
		log.Error("Failed to create log directory")
	}

	f, err := os.OpenFile(logDir+"/main.log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Error("faield to create log file, using system output")
	} else {
		log.SetOutput(f)
	}
	f.WriteString("\n")
	log.Info("Logging initialized")
}
