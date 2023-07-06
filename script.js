const authorizationKey = 'gB7d1qgEDWFLv9GUsXsH5cHXUh8lY3S4vkMSPjwLEgpFpS6B7DVw2H16'
let firstQuery = 'Tigers'
let secondQuery = 'Nature'
const getImgs = function (query){
    let url = `https://api.pexels.com/v1/search?query=[${query}]`
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
            document.getElementById('photos-row').innerHTML = ''
            let photos = data.photos
            photos.forEach((photo)=>{
                console.log(photo)
                let newCol = document.createElement('div')
                newCol.classList.add('col-md-4')
                newCol.innerHTML =
                    `
                    <div class="card mb-4 shadow-sm">
                        <img src= "${photo.src['original']}" alt="img">
                        <div class="card-body">
                            <h5 class="card-title">Lorem Ipsum</h5>
                            <p class="card-text">
                                This is a wider card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit
                                longer.
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a href="./details.html?id=${photo.id}" class="btn btn-sm btn-outline-secondary view">
                                        View
                                    </a>
                                    <button type="button" class="btn btn-sm btn-outline-secondary hide">
                                        Hide
                                    </button>
                                </div>
                                <small class="text-muted">${photo.id}</small>
                            </div>
                        </div>
                    </div>
                    `
                document.getElementById('photos-row').appendChild(newCol)
            })
            const hideBtns = document.querySelectorAll('.hide')
            hideBtns.forEach(btn =>{
                btn.addEventListener('click', function (e){
                    const toHide = e.target.parentElement.parentElement.parentElement.parentElement
                    toHide.classList.add('d-none')
                })
            })
            const viewBtns = document.querySelectorAll('.view')
        })
        .catch(err =>{
            console.log(err)
        })
}
const searchImgs = function (){
    let searchQuery = document.getElementById('search-value').value
    getImgs(searchQuery)
}
document.getElementById('primary-btn').addEventListener('click', function (){
    getImgs(firstQuery)
})
document.getElementById('secondary-btn').addEventListener('click', function (){
    getImgs(secondQuery)
})
document.getElementById('search').addEventListener('click', function (e){
    e.preventDefault()
    searchImgs()
})
