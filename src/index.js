import './scss/main.scss';

// Inputs BEFORE logging in
const loggedInOptions = document.querySelector(".logged-in-options");
const usernameInput = document.querySelector(".username");
const folderIdInput = document.querySelector(".folder-id");
const userMsg = document.querySelector(".user-msg");
const loginBtn = document.querySelector(".login");

// Options AFTER logging in
const loggedOutOptions = document.querySelector(".logged-out-options");
const logoutBtn = document.querySelector(".logout");
const downloadBtn = document.querySelector(".download-images");
const imageSize = document.querySelector("#image-size");
const loggedInUsername = document.querySelector(".logged-in-username");
const showCaption = document.getElementById("show-caption");

console.log(showCaption.checked);

// Containers
const loginDownloadContainer = document.querySelector(".login-download-container");
const imageContainer = document.querySelector(".image-container");

let albumCovers = [];
let albumData = [];
let username = '';
let folderId = '';

let imageSizeRange = { 
    "tiny" : {min : 75, max : 150},
    "small" : {min : 125, max : 250},
    "medium" : {min : 250, max : 500},
    "large" : {min : 400, max : 800},
    "huge" : {min : 700, max : 1400},
}

const token = "ofXwtIhxmQZTDufjImxFCCHkeucHvlUoXRirlyvQ";

// Login event listeners
usernameInput.addEventListener("change", () => {
    username = usernameInput.value.trim(); 
})

loginBtn.addEventListener("click",validateForm);

loginDownloadContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})

folderIdInput.addEventListener("change", () => {
    folderId = folderIdInput.value.trim();
})

// Logged in event listeners
imageSize.addEventListener("change", ()=> {
    imageContainer.innerHTML = '';
    applyImageSize();
})

showCaption.addEventListener("click", displayImages);

logoutBtn.addEventListener("click", () => {
    location.reload();
    // NEED TO UPDATE WHEN ADDING LOCAL STORAGE
})

// Form validation
function validateForm() {
    if (username === '') {
        userMsg.textContent = "please enter username";
    } else {
        gatherImagesandData(); 
    }
}

// store collection covers in an array
async function gatherImagesandData() {
    if (!folderId) {
        folderId = 0;
    }
    const response = await fetch(`https://api.discogs.com/users/${username}/collection/folders/${folderId}/releases?token=${token}`);
    const data = await response.json();
    
    console.log(data);
    console.log(response);

    if (response.status === 404) {
        userMsg.textContent = "username not found";
    } else {
        loggedOutOptions.classList.add("hidden");
        loggedInOptions.classList.remove("hidden");


        loggedInUsername.textContent = `${username}`; 

        userMsg.textContent = "";

        loginDownloadContainer.classList.add("thin");

        console.log(data.releases.length);

        for (let i = 0; i < data.releases.length; i++) {
            albumCovers.push(data.releases[i].basic_information.cover_image);
            albumData.push(data.releases[i].basic_information);
        }
    
        // Apply preliminary image size and then display images
        applyImageSize();
        console.log(albumData);
        
        downloadBtn.addEventListener("click", download);
    }
}

function displayImages () {
    imageContainer.innerHTML = '';
    let i = 0;
    albumCovers.forEach((cover) => {
        const albumContainer = document.createElement("div");
        albumContainer.classList.add("album-container");

        // Display image
        const image = document.createElement("div");
        image.classList.add("cover-img");
        image.style.background = `url("${cover}") no-repeat center center/cover`;
        albumContainer.appendChild(image);

        // Display caption if option checked
        if (showCaption.checked) {
            const caption = document.createElement("div");
            caption.classList.add("album-caption");
    
            const albumName = document.createElement("p");
            albumName.textContent = `"${albumData[i].title}"`
            caption.appendChild(albumName);
    
            const artistName = document.createElement("p");
            artistName.textContent = `${albumData[i].artists[0].name}`
            caption.appendChild(artistName);
    
            albumContainer.appendChild(caption);
            
            i++;
        }

        imageContainer.appendChild (albumContainer); 
    })
}

function applyImageSize() {
    imageContainer.style["grid-template-columns"] = `repeat(auto-fill, minmax(${imageSizeRange[imageSize.value].min}px, 1fr))`;

    document.querySelectorAll(".cover-img").forEach((cover) => {
        cover.style["max-width"] = `${imageSizeRange[imageSize.value].min}px`;
    })

    displayImages(albumCovers);
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



