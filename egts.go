package egts

import (
	"go.k6.io/k6/js/modules"
)

func init() {
	modules.Register("k6/x/egts", new(Egts))
}

type Egts struct{}

func (*Egts) NewClient(clientID uint32) *EgtsClient {
	return NewClient(clientID)
}
