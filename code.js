const api_key = "HgLRb9Mzo88KWu2fAm4zUkQhKJLNJ0GUqNzkAn99";
const searchBtn = document.getElementById("search");
const d = new Date();
const currDate = d.toISOString().substring(0,10);
const imageContainer = document.getElementById("current-image-container");
const heading = document.getElementById("heading");
const list = document.getElementById("list");
fetchURL(currDate);
let searches =[];

if(localStorage.getItem("Searches"))
{
    searches = JSON.parse(localStorage.getItem("Searches"));
    addInList();
}


searchBtn.addEventListener("click",(e)=>{
     e.preventDefault();
     const date = document.getElementById("search-input").value;
      
     const data={
        date: date,
     };

     searches.push(data);
     localStorage.setItem("Searches",JSON.stringify(searches));

     addInList();

     fetchURL(date);
});


function addInList(){
     list.innerHTML ='';
     const searchArray = JSON.parse(localStorage.getItem("Searches"));

     searchArray.forEach(element => {
        const listItem = document.createElement("li");
        const a = document.createElement("a");
        const date = element.date;
        a.innerText = element.date;
        a.href ="#";
        a.onclick = function() {
            fetchURL(date);
        };
        listItem.appendChild(a);
        list.appendChild(listItem);
     });
}



async function fetchURL(date){
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key} `;
    try{
    const response = await fetch(url,{method:"GET"});
    const result = await response.json();
    showOnUI(result);
    }
    catch(e){
        console.log(e);
    }

}

function showOnUI(data){
    imageContainer.innerHTML ='';
    heading.innerText='';
    const date = data.date;
    const title = data.title;
    const url = data.hdurl;
    const explanation = data.explanation;
 
    heading.innerText = `Nasa Picture of the ${date}`;

    imageContainer.innerHTML =
    ` <h2 style="text-decoration: underline;">${title}</h2>
    <img src="${url}" width="700" height="800" alt="pic">
    <p>${explanation}</p>`;
   
}






// {
//     "date": "2023-09-03",
//     "explanation": "Periodic comet 73P/Schwassmann-Wachmann 3 has broken up at least twice. A cosmic souffle of ice and dust left over from the early solar system, this comet was first seen to split into several large pieces during the close-in part of its orbit in 1995.  However, in the 2006 passage, it disintegrated into dozens of fragments that stretched several degrees across the sky. Since comets are relatively fragile, stresses from heat, gravity and outgassing, for example, could be responsible for their tendency to break up in such a spectacular fashion when they near the hot Sun. The Hubble Space Telescope recorded, in 2006, the featured sharp view of prolific Fragment B, itself trailing a multitude of smaller pieces, each with its own cometary coma and tail. The picture spans over 3,000 kilometers at the comet's distance of 32 million kilometers from planet Earth.",
//     "hdurl": "https://apod.nasa.gov/apod/image/2309/fragb73p_hst_960.jpg",
//     "media_type": "image",
//     "service_version": "v1",
//     "title": "Comet Schwassmann-Wachmann 3 Fragments",
//     "url": "https://apod.nasa.gov/apod/image/2309/fragb73p_hst_960.jpg"
// }