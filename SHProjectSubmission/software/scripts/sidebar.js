/*
THE CODE IN THIS FILE CORRESPONDS TO DRAWING THE SIDEBAR
*/
//draw's the visualisation's sidebar
function initializeSidebar() {
    var heading = document.createElement("h2"); //create html elements that will comprise the sidebar
    heading.innerHTML = "Musa Collection";
    var lineBreak = document.createElement("br");
    var paragraph2 = document.createElement("p");
    var infoDiv = document.getElementById("sidebar-header");
    var homeBtn = document.createElement("BUTTON");
    var t = document.createTextNode("HOME");
    homeBtn.appendChild(t); //the new elements the the correct div
    homeBtn.addEventListener("click", redrawGraph);
    infoDiv.appendChild(heading);
    infoDiv.appendChild(lineBreak);
    infoDiv.appendChild(lineBreak);
    infoDiv.appendChild(paragraph2);
    infoDiv.appendChild(homeBtn);
}

