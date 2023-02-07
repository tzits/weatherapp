const findWeather = async () => {
    //not sure about this
    let zipCode: string = input!.innerHTML

    if (zipCode.length == 5) {
        let result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode},US&key=${gmKey}`) 
        let data = await result.json()
        let {lat, lng} = data.results[0].geometry.location
        const api = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lng}&api=yes`
        const getData = async(api: string) => {
            const response = await fetch(api)
            const data = await response.json()
            const {temp_c, temp_f, feelslike_c, feelslike_f, condition} = data.current
                let {text, icon} = condition

                let tz = `${data.location.name}, ${data.location.region}`

                setConditions(temp_f, text, tz, feelslike_f, icon)

                degreeSection!.addEventListener('click', () => {
                    if (degreeSpan!.textContent === 'F') {
                        changeUnits('C', temp_c, feelslike_c)
                    } else {
                        changeUnits('F', temp_f, feelslike_f)
                    }
                })
        }
        getData(api)
    }
    else {
        alert('Invalid ZipCode')
    }
}

let long: number, lat: number;

let temperatureDescription = document.querySelector('.temperature-description')! as HTMLDivElement
let temperatureDegree = document.querySelector('.temperature-degree')! as HTMLHeadingElement
let locationTimezone = document.querySelector('.location-timezone')! as HTMLHeadingElement
let myIcon = document.querySelector('.icon')! as HTMLImageElement
let degreeSection = document.querySelector('.degree-section')! as HTMLDivElement
let degreeSpan = document.querySelector('.cf')! as HTMLSpanElement
let realFeel = document.querySelector('.realfeel')! as HTMLHeadingElement
let submit = document.querySelector('.submit')! as HTMLButtonElement
let input = (<HTMLInputElement>document.querySelector('.zip'))

submit!.addEventListener('click', findWeather)

const changeUnits = (unit: string, temp: string, feel: string) => {
    degreeSpan!.textContent = unit;
    temperatureDegree!.textContent = temp;
    realFeel!.textContent = `feels like ${feel}`
}

const setConditions = (temp: string , text: string, tz: string, feel: string, icon: string) => {
    temperatureDegree!.textContent = temp;
    temperatureDescription!.textContent = text;
    locationTimezone!.textContent = tz;
    realFeel!.textContent = `feels like ${feel}`
    icon = 'https:' + icon
    myIcon!.src = icon;
    myIcon!.setAttribute("style", "height: 100px; width: 100px")
}


