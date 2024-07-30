import egts from "k6/x/egts";

export let options = {
    scenarios: {
        // scenario_1: {
        //     executor: 'shared-iterations',
        //     vus: 1,
        //     iterations: 4,
        // },
        scenario_2: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 1,
        },
    }
};

// client testing tracks, where key is VU number
// point of track is array [lat, lon, sens_value, fuel_level]
// if sens_value or fuel_level equals 0 then sending simple packet whith coordinate section only
const data = {
    0: [[1721753490, 55.55389399769574, 37.43236696287812, 1000, 1000], [1721753490, 55.55389399769574, 37.43236696287812, 1000, 1000]],
    1: [[1721753490, 55.55389399769574, 37.43236696287812, 1000, 1000], [1721753490, 55.55389399769574, 37.43236696287812, 200, 200]]
}

//for each VU open connection for emulating device
export default () => {
    let client = egts.newClient("46.243.177.242:8510", "666");
    data[__VU%2].forEach((rec) => {
        egts.sendPacket(client, ...rec)
    })

    client.close()
};

