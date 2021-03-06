// import './scss/main.scss';

// Inputs BEFORE logging in
const loggedInOptions = document.querySelector(".logged-in-options");
const usernameInput = document.querySelector(".username");
const folderIdInput = document.querySelector(".folder-id"); 
const userMsg = document.querySelector(".user-msg");

// Options AFTER logging in
const loggedOutOptions = document.querySelector(".logged-out-options");
const logoutBtn = document.querySelector(".logout");
const downloadBtn = document.querySelector(".download-images");
const imageSize = document.querySelector("#image-size");
const loggedInUsername = document.querySelector(".logged-in-username");
const showCaption = document.getElementById("show-caption");
const sortBy = document.getElementById("sort-by");

// Containers
const loginDownloadContainer = document.querySelector(".login-download-container");
const imageContainer = document.querySelector(".image-container");

let albumData = [];
let albumCovers = [];
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

// Check local storage for saved settings
if (localStorage.getItem("username")) {
    loggedOutOptions.innerHTML = '';
    loggedOutOptions.classList.add("user-msg");
    loggedOutOptions.textContent = '...loading collection';
    username = localStorage.getItem("username");

    if (localStorage.getItem("imageSize")){
        imageSize.value = localStorage.getItem("imageSize");
    }

    if (localStorage.getItem("sortBy")){
        sortBy.value = localStorage.getItem("sortBy");
    }

    if (localStorage.getItem("captions") === "checked") {
        showCaption.checked = true;
    }

    gatherImagesandData();
}

// BEFORE login event listeners
usernameInput.addEventListener("change", () => {
    username = usernameInput.value.trim(); 
})

loginDownloadContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})

folderIdInput.addEventListener("change", () => {
    folderId = folderIdInput.value.trim();
})

// AFTER login event listeners
imageSize.addEventListener("change", ()=> {
    imageContainer.innerHTML = '';
    applyImageSize();
})

showCaption.addEventListener("click", displayImages);

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("username");
    location.reload();
})

sortBy.addEventListener("change", () => {
    sortAlbums();
})

imageContainer.addEventListener("click", generatePopups);

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

    if (response.status === 404) {
        userMsg.textContent = "username not found";
    } else {
        localStorage.setItem("username", username);
        loggedOutOptions.classList.add("hidden");
        loggedInOptions.classList.remove("hidden");
        logoutBtn.classList.add("logged-in-btn");

        loggedInUsername.innerHTML = `<a href="https://www.discogs.com/user/${username}">${username}</a>`; 

        userMsg.textContent = "";

        loginDownloadContainer.classList.add("thin");

        console.log(data.releases.length);

        for (let i = 0; i < data.releases.length; i++) {
            albumCovers.push(data.releases[i].basic_information.cover_image);
            albumData.push(data.releases[i]);
        }
    
        // Apply preliminary image size and then display images
        applyImageSize();
        console.log(albumData);
        
        downloadBtn.addEventListener("click", download);
    }
}

function applyImageSize() {
    let mobileWidth = window.matchMedia("(max-width: 420px)");
    let tabletWidth = window.matchMedia("(max-width: 740px)");

    imageContainer.style["grid-template-columns"] = `repeat(auto-fill, minmax(${imageSizeRange[imageSize.value].min}px, 1fr))`;

    if (mobileWidth.matches && imageSize.value === "large" || mobileWidth.matches && imageSize.value === "huge") {
        imageContainer.style["grid-template-columns"] = `1fr`;
    }

    if (tabletWidth.matches && imageSize.value === "huge") {
        imageContainer.style["grid-template-columns"] = `1fr`;
    }

    console.log(document.querySelectorAll(".cover-img"));


    imageContainer.classList.forEach((clas) => {
        if (clas !== "image-container") {
            imageContainer.classList.remove(clas);
        }
    })
    imageContainer.classList.add(`${imageSize.value}`);

    localStorage.setItem("imageSize", imageSize.value);

    sortAlbums();
}

function sortAlbums() {
    // sort by artist name ascending
    if (sortBy.value === "artist") {
        albumData.sort((a, b) => {
            if (a.basic_information.artists[0].name > b.basic_information.artists[0].name) {
                return 1;
            } else if (b.basic_information.artists[0].name > a.basic_information.artists[0].name) {
                return -1;
            } else {
                return 0;
            }
        })

        displayImages();
    }

    // sort by album name ascending
    if (sortBy.value === "album") {
        albumData.sort((a, b) => {
            if (a.basic_information.title > b.basic_information.title) {
                return 1;
            } else if (b.basic_information.title > a.basic_information.title) {
                return -1;
            } else {
                return 0;
            }
        })

        displayImages();
    }

    // sort by date added ascending
    if (sortBy.value === "date-added") {
        albumData.sort((a, b) => {
            if (a.date_added > b.date_added) {
                return 1;
            } else if (b.date_added > a.date_added) {
                return -1;
            } else {
                return 0;
            }
        })

        displayImages();
    }

    // sort by color
    if (sortBy.value === "color") {
       sortByColor(); 
    }

    localStorage.setItem("sortBy", sortBy.value);
    
   
}

function sortByColor() {
    const fastAvgColor = new FastAverageColor();
    
    for(let i = 0; i < albumData.length; i++) {
        fastAvgColor.getColorAsync(albumData[i].basic_information.cover_image).then(color => {
                albumData[i].color_value = rgbAverage(color);
    }).then(() => {
        if (i === albumData.length - 1) {
            albumData.sort((a, b) => {
                if (a.color_value > b.color_value) {
                    return 1;
                } else if (b.color_value > a.color_value) {
                    return -1;
                } else {
                    return 0;
                }
            })

            console.log(albumData);
            displayImages();
    }}); 
    }
};

function rgbAverage(color) {
    let colorAvg = (color.value[0] + color.value[1] + color.value[2]) / 3;

    return +colorAvg.toFixed(2);
}

function displayImages () {
    imageContainer.innerHTML = '';
    let i = 0;
    albumData.forEach((album) => {
        const albumContainer = document.createElement("div");
        albumContainer.classList.add("album-container");

        // Display image
        const image = document.createElement("div");
        image.classList.add("cover-img");
        image.style.background = `url("${album.basic_information.cover_image}") no-repeat center center/cover`;
        albumContainer.appendChild(image);

        // Display caption if option checked
        if (showCaption.checked) {
            const caption = document.createElement("div");
            caption.classList.add("album-caption");
    
            const albumName = document.createElement("p");
            albumName.textContent = `"${albumData[i].basic_information.title}"`
            caption.appendChild(albumName);
    
            const artistName = document.createElement("p");
            artistName.textContent = `${albumData[i].basic_information.artists[0].name}`
            caption.appendChild(artistName);
    
            albumContainer.appendChild(caption);
            
            localStorage.setItem("captions", "checked");
            
            i++;
        } else if (!showCaption.checked) {
            localStorage.setItem("captions", "not checked");
        }
        
        imageContainer.appendChild (albumContainer); 
    })

    // fade-in for album thumbnails display
    imageContainer.classList.add("fade-in");
    
    let j = 0;
    imageContainer.childNodes.forEach((child) => {
        child.setAttribute("id", `${j}`)
        j++;
    });
}

function generatePopups(e) {
    let albumPopup = document.createElement("div");
    albumPopup.classList.add("album-popup");

    let selectedAlbum = "";

    if (e.target.classList.contains("cover-img") || albumPopup.innerHTML === "" && e.target.classList.contains("album-caption")) {

        selectedAlbum = albumData[e.target.parentElement.id].basic_information;

        albumPopup.innerHTML = `
        <div>
            <div>
                <img src="${selectedAlbum.cover_image}" />
            </div>
            <div>
                <div>
                    <span><strong>Title:</strong> ${selectedAlbum.title} 
                    <strong>Artist:</strong> ${selectedAlbum.artists[0].name} 
                    <strong>Date Added:</strong> ${albumData[e.target.parentElement.id].date_added.substring(0,10)}
                    </span>
                </div>
                <div>
                    <span>
                    <strong>Format:</strong> ${selectedAlbum.formats[0].name}
                    <strong>Label:</strong> ${selectedAlbum.labels[0].name}
                    <strong>Catalog No.:</strong> ${selectedAlbum.labels[0].catno}
                    </span>
                </div>
                <div>
                    <span><strong>Genres:</strong> ${selectedAlbum.genres}</span>
                </div>
                <div>
                    <span><strong>Styles:</strong> ${selectedAlbum.styles}</span>
                </div>
            </div>
        </div>
        `;

        imageContainer.appendChild(albumPopup);
        console.log(document.querySelectorAll(".album-popup").length);

        setTimeout(() => {
            albumPopup.classList.add("fade-in");
        }, 1);        
    }
    
    albumPopup.addEventListener("click" , () => {
        imageContainer.removeChild(albumPopup);
        albumPopup.innerHTML = "";
    });
}

async function download(){ 
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
                      link.setAttribute('download', `cover.jpg`); 
                      document.body.appendChild(link); 
                      link.click(); 

                      downloaded++;
                      console.log(albumData.length, downloaded);
                      if (downloaded > albumData.length) {
                          clearInterval(downloadTimer);
                      }
        })
        }, 750) 
  } 





