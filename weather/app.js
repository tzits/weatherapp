const findWeather = async () => {
        let zipCode = input.value
        zipCode = zipCode.replace(/\s/g, "+")

        if (zipCode) {
            let result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode},US&key=${gmKey}`) 
            let data = await result.json()
            let {lat, lng} = data.results[0].geometry.location
            const api = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lng}&api=yes`
            const getData = async(api) => {
                const response = await fetch(api)
                const data = await response.json()
                const {temp_c, temp_f, feelslike_c, feelslike_f, condition} = data.current
                    let {text, icon} = condition

                    let tz = `${data.location.name}, ${data.location.region}`

                    setConditions(temp_f, text, tz, feelslike_f, icon)

                    degreeSection.addEventListener('click', () => {
                        if (degreeSpan.textContent === 'F') {
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

    let long, lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let myIcon = document.querySelector('.icon')
    let degreeSection = document.querySelector('.degree-section')
    let degreeSpan = document.querySelector('.cf')
    let realFeel = document.querySelector('.realfeel')
    let submit = document.querySelector('.submit')
    let input = document.querySelector('.zip')

    submit.addEventListener('click', findWeather)

    const changeUnits = (unit, temp, feel) => {
        degreeSpan.textContent = unit;
        temperatureDegree.textContent = temp;
        realFeel.textContent = `feels like ${feel}`
    }

    const setConditions = (temp, text, tz, feel, icon) => {
        temperatureDegree.textContent = temp;
        degreeSpan.textContent = 'F'
        temperatureDescription.textContent = text;
        locationTimezone.textContent = tz;
        realFeel.textContent = `feels like ${feel}`
        icon = 'https:' + icon
        myIcon.src = icon;
        myIcon.setAttribute("style", "height: 100px; width: 100px")
    }


