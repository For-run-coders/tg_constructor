package db_test

import (
	"hakaton/pulling_telegram_proxy/pkg/db"
	"testing"
	"time"
)

func TestInmem(t *testing.T) {
	db := db.NewInMem()
	db.Store(12, time.Now().UnixMilli())
	i, err := db.Latest()
	if i != 12 || err != nil {
		t.Errorf("Latest() = %d, %v, want %d, nil", i, err, 12)
	}
	db.Store(13, time.Now().UnixMilli())
	i, err = db.Latest()
	if i != 13 || err != nil {
		t.Errorf("Latest() = %d, %v, want %d, nil", i, err, 13)
	}
}
