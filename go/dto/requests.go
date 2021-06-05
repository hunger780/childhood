package dto
type User struct {
    Id      string    `json:"id"`
	Userid   string `json:"userid"`
    FirstName   string `json:"firstName"`
    LastName    string `json:"lastName"`
    Dob string `json:"dob"`
	Password string `json:"password"`
}
