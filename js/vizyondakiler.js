var url_string = window.location.href
var url = new URL(url_string);
searchParam = url.search

const cinemas = ["?CMXForumMersin", "?CMXMersinMarina", "?CinensMersin", "?PalmCinemarina"];


const xhr = new XMLHttpRequest()

xhr.open("GET", "./data/cinemas.json")

xhr.send()


xhr.onload = function() {
  if (xhr.status === 200) {
    //JSON daki dataların x ayrıştırması
    data = JSON.parse(xhr.responseText)
    
    parseData(data.cinemas)
    
  } else if (xhr.status === 404) {
    console.log("Kayıt bulunamadı!")
  }
}

//İstekte ağ düzeyinde bir hata oluştuğunda tetiklenir
xhr.onerror = function() {
  console.log("Ağ hatası oluştu!")
}

//istemci veri alırken periyodik olarak tetiklenir
//isteğin ilerlemesini izlemek için kullanılır
xhr.onprogress = function(e) {
  if (e.lengthComputable) {
    console.log(`${e.loaded} B of ${e.total} B loaded!`)
  } else {
    console.log(`${e.loaded} B loaded!`)
  }
}


function parseData(data){

    let element = document.getElementById("vizyondakiler")



    for(var i=0; i<data.length; i++){
        if(data[i].name == searchParam && cinemas.includes(data[i].name)){
            
            let vizyondakiler = data[i].vizyondakiler;
            for(let i=0; i<vizyondakiler.length; i++){
            element.innerHTML += `
            
            <div class="item  col-xs-4 col-lg-4">
                <div class="thumbnail">
                    <img class="group list-group-image" src="${vizyondakiler[i].image}" style="width: 400px; height: 576px;  border-radius: 12px;" alt="" />
                    <div class="caption">
                        <h4 class="group inner list-group-item-heading" style="text-align: center;">
                            ${vizyondakiler[i].name}</h4>
                            <p class="group inner list-group-item-heading"  style="text-align: center;   font-weight: bold;" >
                            \n(${vizyondakiler[i].type})</p>
                        <p class="group inner list-group-item-text" style="text-align: center;">
                        ${vizyondakiler[i].summary}</p>
                        <p class="group inner list-group-item-text" style="text-align: center;  font-weight: bold;">
                        Yönetmen: ${vizyondakiler[i].director}</p>
                            <a class="btn btn-success" style="margin-left: 105px;" href="./vizyondakiler.html?CMXForumMersin">Rezervasyon Yap </a>
                    </div>
                </div>
            </div>
            <br>
            `
            }
            
            break;
        }
        else{
            console.log("Sinema bulunamadı!")
        }
    }



}