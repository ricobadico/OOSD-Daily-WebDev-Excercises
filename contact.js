// This lets a fadeout transition occur and finish before a callback function begins (showContact in this case). This allows all the changing to happen without any jumpy updates
function fadeThenDo(targetNode, callback){

    // Grab all needed data
    // Grab corresponding ID, from calling element, stored in a custom data-id attribute. Note that html "name-format" becomes js "nameFormat"
    const targetID = targetNode.dataset.contactId; 
    //runs a function that grabs the appropriate contact data based on the ID above
    let contactData = findDetailMatch(contactDataArray, targetID); 
    // Point to the container that will hold the contact details stored in contact data
    const detailsContainer = document.getElementById("contactDetailsContainer");

    //we only want the function to run if the data being called up is different than what's already displayed
    if(contactData.id != detailsContainer.dataset.currentID) { 
        
        //Fade items out for prettier transiton, toggling fadein/fadeout animation classes
        for(childNode of detailsContainer.children){
            childNode.classList.remove("fadein"); 
            childNode.classList.add("fadeout");
        }
        
        // Give the fade out a moment to finish, then call the callback and start changing data
        setTimeout(callback, 300, contactData);
    }
}

// This function displays the relevant contact information based on the moused over contact
function showContact(contactData){

    // Point to the <ul> that will hold the written contact details
    const contactDetailsTextContainer = document.getElementById("contactDetailsTextContainer");
    // Point to the <img> that will hold the contact image
    const contactImage = document.getElementById("contactImage");

    // Set container's currentID attribute to the contact being written (this stops the function from firing multiple times, see line 13)
    document.getElementById("contactDetailsContainer").dataset.currentID = contactData.id;

    // Wipe ul's list items to get a blank slate (this allows for different numbers of <li>s based on data pulled)
    contactDetailsTextContainer.textContent = "";

    // Create new written detail elements based on given data
    for(let [key, value] of Object.entries(contactData)){ // this lets us iterate through the object

        //ignore id and image, not used for the written details
        if(key != "id" && key != "image") { 
            let elemNode = document.createElement("li");
            let textNode = document.createTextNode(`${key.toUpperCase()}: ${value}`); 
            elemNode.appendChild(textNode);
            contactDetailsTextContainer.appendChild(elemNode);
        }
    }

    // Updates the image, then waits until it is fully loaded to fade back in
    updateImage(contactImage, contactData.image)
    .then(() => {
        for(childNode of document.getElementById("contactDetailsContainer").children){
            childNode.classList.remove("fadeout");
            childNode.classList.add("fadein");
            }
    });
}

// Async helper function; this allows for the image to be fully loaded before the thread running it continues
async function updateImage(targetImg, newSrc){
    return new Promise((resolve, reject) => {
        targetImg.setAttribute("src", newSrc);
        targetImg.onload = () => resolve();
        targetImg.addEventListener('error', () => {
        reject(new Error(`Failed to load image's URL: ${newSrc}`));
          });
       });
}

// Helper function that searches through each element of an array for one with a corresponding id value
function findDetailMatch(searchArray, searchID) {
    for(entry of searchArray){ 
        if(entry.id == searchID){
            return entry; // give back that entry
        }
    }
    return false; // return false if no such entry found
}