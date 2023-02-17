const API = 'http://ip-api.com/json/'

async function ping_time(address) {
    let startTime = (new Date()).getTime();
    await fetch(address)
    let endTime = (new Date()).getTime();
    return endTime - startTime  
}

async function request(ip) {
    let response = await fetch(API + ip)
    let data = await response.json()
    console.log(data)
    return data
}

async function getValue() {
    let value
    value = document.getElementById("ip-input").value
    let data = await request(value)

    document.getElementById("address").innerHTML = "Address : " + data['query']
    document.getElementById("country").innerHTML = "Country : " + data['country']
    document.getElementById("region").innerHTML = "Region : " + data['region']
    document.getElementById("city").innerHTML = "City : " + data['city']
    document.getElementById("zip-code").innerHTML = "Zip-Code : " + data['zip']
    document.getElementById("lat").innerHTML = "Latitude : " + data['lat']
    document.getElementById("lon").innerHTML = "Longitude : " + data['lon']
    google_map = document.getElementById("openinmaps")
    google_map.innerHTML = "Open In Maps"
    google_map.href = "https://www.google.com/maps/place/"+data['lat']+"," +data['lon']


    let ping = await ping_time(value)
    document.getElementById("ping").innerHTML = "Ping : " + ping + "ms"
}

(function onload() {
    getValue()
})()