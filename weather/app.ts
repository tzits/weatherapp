window.addEventListener('load', () => {
    let long: number, lat: number;
    let key = 'apikey'
    let temperatureDescription = document.querySelector('.temperature-description') as HTMLDivElement
    let temperatureDegree = document.querySelector('.temperature-degree') as HTMLHeadingElement
    let locationTimezone = document.querySelector('.location-timezone') as HTMLHeadingElement
    let myIcon = document.querySelector('.icon') as HTMLImageElement
    let degreeSection = document.querySelector('.degree-section') as HTMLDivElement
    let degreeSpan = document.querySelector('.cf') as HTMLSpanElement
    let realFeel = document.querySelector('.realfeel') as HTMLHeadingElement

    const changeUnits = (unit: string, temp: string, feel: string) => {
        degreeSpan.textContent  = unit;
        temperatureDegree.textContent = temp;
        realFeel.textContent = `feels like ${feel}`
    }

    const setConditions = (temp: string, text: string, tz: string, feel: string, icon: string) => {
        temperatureDegree.textContent = temp;
        temperatureDescription.textContent = text;
        locationTimezone.textContent = `Timezone = ${tz}`;
        realFeel.textContent = `feels like ${feel}`
        icon = 'https:' + icon
        myIcon.src = icon;
        myIcon.setAttribute("style", "height: 100px; width: 100px")
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            const api: string = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${long}&api=yes`
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const {temp_c, temp_f, feelslike_c, feelslike_f, condition} = data.current
                    let {text, icon} = condition

                    setConditions(temp_f, text, data.location.tz_id, feelslike_f, icon)

                    degreeSection.addEventListener('click', () => {
                        if (degreeSpan.textContent === 'F') {
                            changeUnits('C', temp_c, feelslike_c)
                        } else {
                            changeUnits('F', temp_f, feelslike_f)

                        }
                    })

                })
        })
    } else {
        alert('not gonna work')
    }

})

