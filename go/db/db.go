package db

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/hunger780/childhood/db/model"
	"github.com/zebresel-com/mongodm"
)

func Connect() {
	file, err := ioutil.ReadFile("locals.json")

	if err != nil {
		fmt.Printf("File error: %v\n", err)
		os.Exit(1)
	}

	var localMap map[string]map[string]string
	json.Unmarshal(file, &localMap)

	dbConfig := &mongodm.Config{
		DatabaseHosts:    []string{"cluster0.sy3jf.mongodb.net"},
		DatabaseName:     "DM_CHAT",
		DatabaseUser:     "rakesh",
		DatabasePassword: "10980000gG#",
		// The option `DatabaseSource` is the database used to establish
		// credentials and privileges with a MongoDB server. Defaults to the value
		// of `DatabaseName`, if that is set, or "admin" otherwise.
		DatabaseSource: "DM_CHAT",
		Locals:         localMap["en-US"],
	}

	connection, err := mongodm.Connect(dbConfig)

	if err != nil {
		fmt.Println("Database connection error: %v", err)
	}

	connection.Register(&model.User{}, "users")
}
