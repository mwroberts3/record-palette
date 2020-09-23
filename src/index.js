import './scss/main.scss';
// import './axios.min.js';

const token = "ofXwtIhxmQZTDufjImxFCCHkeucHvlUoXRirlyvQ";

const usernameInput = document.querySelector(".username");

const downloadBtn = document.querySelector(".download-images");


let albumCovers = [];
let username = '';

// Accept user inputs
usernameInput.addEventListener("change", () => {
    username = usernameInput.value.trim(); 

    downloadBtn.addEventListener("click", gatherImages);
})


// store collection covers in an array
async function gatherImages() {
    const response = await fetch(`https://api.discogs.com/users/${username}/collection/folders/0/releases?token=${token}`);
    const data = await response.json(); 
 
    for (let i = 0; i < data.releases.length; i++) {
        albumCovers.push(data.releases[i].basic_information.cover_image);
    }

    download();

    // displayImages(albumCovers);
    
}

function download(){ 
    let downloaded = 0;
        const downloadTimer = setInterval(()=> {
            axios({ 
                url: albumCovers[downloaded], 
                method:'GET', 
                responseType: 'blob' 
        }) 
        .then((response) => { 
               const url = window.URL 
               .createObjectURL(new Blob([response.data])); 
                      const link = document.createElement('a'); 
                      link.href = url; 
                      link.setAttribute('download', 'test.jpg'); 
                      document.body.appendChild(link); 
                      link.click(); 
        })

        downloaded++;
        if (downloaded > albumCovers.length) {
            clearInterval(downloadTimer);
        }
        }, 100) 
  } 

// function displayImages (albumCovers) {
//     albumCovers.forEach((cover) => {
//         const image = document.createElement("div");
//         image.innerHTML = `
//         <img src="${cover}">
//         `
//     imageContainer.appendChild (image);
//     })
// }

