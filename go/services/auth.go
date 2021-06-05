package services

import (
	
	// import the jwt-go library
	  "github.com/dgrijalva/jwt-go"
	  
  )

// Create the JWT key used to create the signature
var jwtKey = []byte("my_secret_key")

// Create a struct to read the username and password from the request body
type Credentials struct {	
	Userid string `json:"userid"`
	Password string `json:"password"`
}

// Create a struct that will be encoded to a JWT.
// We add jwt.StandardClaims as an embedded type, to provide fields like expiry time
type Claims struct {
	Username string `json:"userid"`
	jwt.StandardClaims
}

