import egts from "k6/x/egts";

export let options = {
    vus: 2,
    iterations: 2,
};

// client testing tracks, where key is VU number
// point of track is array [lat, lon, sens_value, fuel_level]
// if sens_value or fuel_level equals 0 then sending simple packet whith coordinate section only 
const data = {
    1: [[55.55389399769574, 37.43236696287812, 1000, 1000], [55.55389399769574, 37.43236696287812, 1000, 1000]],
    2: [[55.55389399769574, 37.43236696287812, 1000, 1000], [55.55389399769574, 37.43236696287812, 200, 200]]
}

//for each VU open connection for emulating device
export default () => {
    let client = egts.newClient("127.0.0.1:6000", __VU);
    data[__VU].forEach((rec) => {
        egts.sendPacket(client, ...rec)
    })

    egts.closeConnection(client)
};

