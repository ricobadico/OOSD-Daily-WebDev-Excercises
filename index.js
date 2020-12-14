//Makes array of images visible on rollover
function showImage(targetNode){
    innerImage = targetNode.querySelector("img"); //since rollover is on entire container, need to get img within
    innerImage.style.display = "block"; //set display from default none

    innerImage.animate([ 
        { // from
            opacity: 0,
        }, 
        { // to
            opacity: 1,
        }
        ], 1000);
}

function hideImage(targetNode){
    innerImage = targetNode.querySelector("img"); //since rollover is on entire container, need to get img within
    innerImage.style.display = "none"; //set display from default none
}

// Loader function - once everything above has loaded, this function calls a 3 second timer then adds load class to body, triggering animations 
setTimeout(function(){
    const body = document.getElementsByTagName('body')[0];
        body.classList.add("loaded");
}, 3000)
setTimeout(function(){ //A second timer brings the window back to the top just before the page reveals, to counter random scroll flailing
    window.scrollTo(0,0);
},8400);

// Pulls weblink from separate array to open a new window
function openLink(array, arrayIndex){
    let newWindow = window.open(array[arrayIndex]);
    setTimeout(() => {newWindow.close()}, 5000);
}