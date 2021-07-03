 const imageContainer = document.getElementById('image-container');
 const loader = document.getElementById('loader'); 

let photosArray = [];

 // Unsplash API
 const count = 10;
 const apiKey = "RkotSlVnb2g2NEtabFlZZFBlZVRSb0ZTemFUb2xRQllSVWlRMW54MWE5Yw==";
 
 const getSplashKey = () => {
     return atob(apiKey)
    }

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${getSplashKey()}&count=${count}`;

// Helper Function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements For Links & Photos, Add to Dom
function displayPhotos() {
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

 // On Load
 getPhotos();