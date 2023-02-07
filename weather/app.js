window.addEventListener('load', () => {
    let long, lat;

    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let myIcon = document.querySelector('.icon')
    let degreeSection = document.querySelector('.degree-section')
    let degreeSpan = document.querySelector('.cf')
    let realFeel = document.querySelector('.realfeel')


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            const api = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${long}&api=yes`
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const {temp_c, temp_f, feelslike_c, feelslike_f, condition} = data.current
                    let {text, icon} = condition

                    temperatureDegree.textContent = temp_f;
                    temperatureDescription.textContent = text;
                    locationTimezone.textContent = `Timezone = ${data.location.tz_id}`
                    realFeel.textContent = `feels like ${feelslike_f}`

                    icon = 'https:' + icon
                    myIcon.src = icon
                    myIcon.setAttribute("style", "height: 100px; width: 100px")

                    degreeSection.addEventListener('click', () => {
                        if (degreeSpan.textContent === 'F') {
                            degreeSpan.textContent = 'C'
                            temperatureDegree.textContent = temp_c
                            realFeel.textContent = `feels like ${feelslike_c}`
                        } else {
                            degreeSpan.textContent = 'F'
                            temperatureDegree.textContent = temp_f
                            realFeel.textContent = `feels like ${feelslike_f}`

                        }
                    })

                })
        })
    } else {
        alert('not gonna work')
    }

})