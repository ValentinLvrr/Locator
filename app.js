const API = 'https://ipapi.co/'
const DNS_RESOLVER = 'https://dns.google/resolve?name='
const regex = /[a-zA-Z]/;

async function ping_time(address) {
    let startTime = (new Date()).getTime();
    await fetch(address)
    let endTime = (new Date()).getTime();
    return endTime - startTime
}

async function resolve_dns(address) {
    let res = await fetch(DNS_RESOLVER + address)
    let data = await res.json()
    return data.Answer['0'].data
}

async function request(ip) {
    let res = await fetch(API + ip + "/json/")
    let data = await res.json()
    return data
}

async function getValue() {
    let value = document.getElementById("ip-input").value
    let data

    if (regex.test(value)) {
        data = await request(await resolve_dns(value))
    } else {
        data = await request(value)
    }

    document.getElementById("address").innerHTML = `Address : ${data.ip}`
    document.getElementById("country").innerHTML = `Country : ${data.country_name}`
    document.getElementById("region").innerHTML = `Region : ${data.region}`
    document.getElementById("city").innerHTML = `City : ${data.city}`
    document.getElementById("zip-code").innerHTML = `Zip-Code : ${data.postal}`
    document.getElementById("calling-code").innerHTML = `Calling Code : ${data.country_calling_code}`
    document.getElementById("currency").innerHTML = `Currency : ${data.currency_name} ( ${data.currency} )`
    document.getElementById("org").innerHTML = "Org : " + data['org']

    google_map = document.getElementById("openinmaps")
    google_map.innerHTML = "Open In Maps"
    google_map.href = "https://www.google.com/maps/place/" + data['latitude'] + "," + data['longitude']

    document.getElementById("ping").innerHTML = "Ping : " + await ping_time(value) + "ms"
}

(function onload() {
    getValue()
})()