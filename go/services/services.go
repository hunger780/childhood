package services

import (
	"encoding/json"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/hunger780/childhood/db/controller"
	"github.com/hunger780/childhood/dto"
	"io/ioutil"
	"net/http"
	"time"
)

var users []dto.User

func Signup(w http.ResponseWriter, r *http.Request) {
	// get the body of our POST request
	// unmarshal this into a new Article struct
	// append this to our Articles array.
	reqBody, _ := ioutil.ReadAll(r.Body)
	var user dto.User
	json.Unmarshal(reqBody, &user)
	// update our global Articles array to include
	// our new Article

	dbUser := db.InsertUser(MapUserToDBUser(user))
	//Connect()
	json.NewEncoder(w).Encode(user)
}

func Signin(w http.ResponseWriter, r *http.Request) {

	var creds Credentials
	//var currentUser dto.User
	//var retErr string
	// Get the JSON body and decode into credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	/*
		// Get the expected password from our in memory map
		currentUser,retErr  = getUserForUserID(creds.Userid)
		if retErr=="User not found" {
			w.WriteHeader(http.StatusBadRequest)
			return
		} else if creds.Password != currentUser.password {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

	*/
	// If a password exists for the given user
	// AND, if it is the same as the password we received, the we can move ahead
	// if NOT, then we return an "Unauthorized" status

	// Declare the expiration time of the token
	// here, we have kept it as 5 minutes
	expirationTime := time.Now().Add(5 * time.Minute)
	// Create the JWT claims, which includes the username and expiry time
	claims := &Claims{
		Username: creds.Userid,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Finally, we set the client cookie for "token" as the JWT we just generated
	// we also set an expiry time which is the same as the token itself
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})

}

func ReturnAllUsers(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: returnUsers")
	json.NewEncoder(w).Encode(users)
}
