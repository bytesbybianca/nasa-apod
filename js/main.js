let date
let randomDate

// when user clicks button, get APOD of today or specified date
document.querySelector('button').addEventListener('click', function () {
    date = document.querySelector('input').value
    logDate(date)
})

// get random date
function getRandomDate(date1, date2){
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || '01-01-1970'
    var date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()
    let splitDate
    let formattedDate
    if( date1>date2){
        let randoDate = new Date(randomValueBetween(date2,date1)).toLocaleDateString()
        splitDate = randoDate.split('/')
        formattedDate = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`

    } else{
        let randoDate = new Date(randomValueBetween(date1, date2)).toLocaleDateString()
        splitDate = randoDate.split('/')
        formattedDate = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`

    } return formattedDate
}

// get today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = `${yyyy}-${mm}-${dd}`;

// when user clicks on Get random, get random APOD
document.querySelector('.random').addEventListener('click', function () {
    randomDate = getRandomDate('1995-06-16', today)
    logDate(randomDate)
    // show random date
    document.querySelector('.randomInfo').innerText = randomDate
    // clear user input date
    document.querySelector('input').value = ''
})

function logDate(date) {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${nasa_apod_api_key}&date=${date}`
    
    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

    // when user selects date, hide random date
    document.querySelector('button').addEventListener('click', function () {
        document.querySelector('.randomInfo').innerText = ''
    })

    // if provided with image, display as background
    if (data.media_type === 'image') {
    document.querySelector('.background').style.backgroundImage = `url('${data.url}')`;

    document.querySelector('iframe').classList.add('hidden')

    // if provided with video,
    } else if (data.media_type === 'video') {
        // embed video
        document.querySelector('iframe').classList.remove('hidden')
        document.querySelector('iframe').src = data.url
        document.querySelector('.background').style.backgroundImage = `url('')`;        
    }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}