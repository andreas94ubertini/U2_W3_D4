const authorizationKey = 'gB7d1qgEDWFLv9GUsXsH5cHXUh8lY3S4vkMSPjwLEgpFpS6B7DVw2H16'
const addressBarContent = new URLSearchParams(location.search)
const eventId = addressBarContent.get('id')
const getImgs = function (){
    let url = `https://api.pexels.com/v1/photos/${eventId}`
    fetch(url, {
        headers :{
            'Authorization': authorizationKey
        }
    })
        .then(res=>{
            if (res.ok){
                return res.json()
            }else{
                throw new Error
            }
        })
        .then(data =>{
            console.log(data)
            const newCol = document.createElement('div')
            newCol.innerHTML = `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${data.photographer}</h5>
                <p class="card-img"><img src="${data.src['original']}" alt="img" class="w-100 w-lg-25"></p>
                <div class="d-lg-flex justify-content-between">
                   <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                     Vedi immagine
                </button>

                <a href="${data.photographer_url}" class="btn btn-success">Vai all'artista</a>
                </div>
              </div>
            </div>
            `
            document.getElementById('row-detail').appendChild(newCol)
            document.getElementById('modal-body').innerHTML = `
            <img src="${data.src['original']}" alt="img">
            `
            // getLogoColor()
        })
        .catch(err =>{
            console.log(err)
        })
}

getImgs()

// function getLogoColor() {
// // Get all the logo images
//     let logos = document.querySelector('img');
//     console.log(logos)
//
// // Loop through the logo images
//
//
//             let canvas = document.createElement("canvas");
//             let context = canvas.getContext("2d");
//             let img = new Image();
//             img.src = logos.src;
//             canvas.width = img.width;
//             canvas.height = img.height;
//             context.drawImage(img, 0, 0, img.width, img.height);
//             console.log('ciao')
//
//             // Get the image data
//             let imageData = context.getImageData(0, 0, img.width, img.height);
//             let data = imageData.data;
//
//             // Initialize variables
//             let colorFrequency = {};
//             let dominantColor = '';
//             let maxFrequency = 0;
//
//             // Loop through the image data
//             for (let j = 0; j < data.length; j += 4) {
//                 let red = data[j];
//                 let green = data[j + 1];
//                 let blue = data[j + 2];
//
//                 // Convert the RGB values to a hex code
//                 let color = rgbToHex(red, green, blue);
//
//                 // Check if the color is already in the colorFrequency object
//                 if (colorFrequency[color]) {
//                     colorFrequency[color]++;
//                 } else {
//                     colorFrequency[color] = 1;
//                 }
//             }
//
//             // Get the dominant color from the color frequency object
//             for (let color in colorFrequency) {
//                 if (colorFrequency[color] > maxFrequency) {
//                     maxFrequency = colorFrequency[color];
//                     dominantColor = color;
//                 }
//             }
//
//             // Set the --logo-color variable
//             console.log(dominantColor, 'color')
//             const body = document.getElementsByTagName('main')
//             body.style.backgroundColor = dominantColor
//
// }
