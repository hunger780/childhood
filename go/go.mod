module github.com/hunger780/childhood

go 1.15

require (
	github.com/gorilla/mux v1.8.0
	github.com/hunger780/childhood/db v0.0.0-20210214190846-9529dfc9d2c2
	github.com/hunger780/childhood/services v0.0.0
)

replace github.com/hunger780/childhood/services => ./services
