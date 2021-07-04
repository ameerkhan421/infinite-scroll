 const imageContainer = document.getElementById('image-container');
 const loader = document.getElementById('loader'); 

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

 // Unsplash API
 const count = 30;
 const apiKey = "RkotSlVnb2g2NEtabFlZZFBlZVRSb0ZTemFUb2xRQllSVWlRMW54MWE5Yw==";
 
 const getSplashKey = () => {
     return atob(apiKey)
    }

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${getSplashKey()}&count=${count}`;

 
// Check if all image were loaded
function imageLoaded() { 
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        setTimeout(() => {
            loader.hidden = true;
        }, 1000);
    } 
}
// Helper Function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements For Links & Photos, Add to Dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run Function for each object in photoArray
    photosArray.forEach((photo) => {
        // Create <a> to link Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank', 
        });
        // Create <img> for photo
        const img = document.createElement('img');
       setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
       });
       // Event Listener, check when each image is loaded
       img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, 
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
} 

 // Get photos from Unsplash API
 async function getPhotos() {
     try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
     } catch (error) {
         // Catch Error Here
     }
 }

// Check to see if scrolling near bottom of page 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

 // On Load
 getPhotos();