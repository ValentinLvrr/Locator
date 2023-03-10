const API = 'https://ipapi.co/'
const DNS_RESOLVER = 'https://dns.google/resolve?name='
const regex = /[a-zA-Z]/;
const h2List = document.querySelectorAll('h2')
const card_opacity = document.getElementById('card')

const ping_time = async (address) => {
  let startTime = (new Date()).getTime();
  await fetch(address)
  let endTime = (new Date()).getTime();
  return endTime - startTime
}

const resolve_dns = async (address) => {
  let res = await fetch(DNS_RESOLVER + address)
  let data = await res.json()
  return data.Answer['0'].data
}

const request_api = async (ip) => {
  let res = await fetch(API + ip + "/json/")
  let data = await res.json()
  return data
}

const main = async () => {
  card.style.opacity = "0"
  let value = document.getElementById("ip-input").value
  if (regex.test(value)) {
    var data = await request_api(await resolve_dns(value))
  } else {
    var data = await request_api(value)
  }

  document.getElementById("address").innerHTML = `Address : ${data.ip}`
  document.getElementById("country").innerHTML = `Country : ${data.country_name}`
  document.getElementById("region").innerHTML = `Region : ${data.region}`
  document.getElementById("city").innerHTML = `City : ${data.city}`
  document.getElementById("zip-code").innerHTML = `Zip-Code : ${data.postal}`
  document.getElementById("calling-code").innerHTML = `Calling Code : ${data.country_calling_code}`
  document.getElementById("currency").innerHTML = `Currency : ${data.currency_name} ( ${data.currency} )`
  document.getElementById("org").innerHTML = "Org : " + data['org']
  document.getElementById("openinmaps").innerHTML = "Open In Maps"
  document.getElementById("openinmaps").href = "https://www.google.com/maps/place/" + data['latitude'] + "," + data['longitude']
  document.getElementById("ping").innerHTML = "Ping : " + await ping_time(value) + "ms"
  
  card.style.opacity = "1"
}

h2List.forEach((h2, index) => {
  if (index < h2List.length - 1) {
    h2.addEventListener('click', function (event) {
      let content = event.target.innerHTML
      let splited = content.split(': ')
      let toCopy = splited[1]

      navigator.clipboard.writeText(toCopy)
        .then(() => {
          event.target.innerHTML = `${splited[0]}: Copied !`
        })
        .catch(err => {
          event.target.innerHTML = "Could not copy text"
          console.log(err)
        })

      setTimeout(() => { event.target.innerHTML = content }, 750)
    });
  }
});

main()