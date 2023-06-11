package db

import (
	"hakaton/pulling_telegram_proxy/pkg/domain"

	"github.com/hashicorp/go-memdb"
)

type inMemStore struct {
	db *memdb.MemDB
}

func NewInMem() domain.UpdatesDb {
	schema := &memdb.DBSchema{
		Tables: map[string]*memdb.TableSchema{
			"updates": {
				Name: "updates",
				Indexes: map[string]*memdb.IndexSchema{
					"id": {
						Name:    "id",
						Unique:  true,
						Indexer: &memdb.IntFieldIndex{Field: "Id"},
					},
					"timestamp": {
						Name:    "timestamp",
						Unique:  false,
						Indexer: &memdb.IntFieldIndex{Field: "Timestamp"},
					},
				},
			},
		},
	}

	db, err := memdb.NewMemDB(schema)
	if err != nil {
		panic(err)
	}

	store := inMemStore{
		db: db,
	}
	return store
}

func (in inMemStore) Latest() (int, error) {
	txn := in.db.Txn(false)
	defer txn.Abort()
	raw, err := txn.Last("updates", "id")
	if raw == nil {
		return 0, nil
	}
	return raw.(*update).Id, err
}

func (in inMemStore) Store(id int, timestamp int64) error {
	txn := in.db.Txn(true)
	err := txn.Insert("updates", &update{
		Id:        id,
		Timestamp: timestamp,
	})
	if err != nil {
		txn.Abort()
		return err
	}
	txn.Commit()
	return nil
}

type update struct {
	Id        int
	Timestamp int64
}
