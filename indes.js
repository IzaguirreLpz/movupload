window.onload = function(){

//Check File API support
if(window.File && window.FileList && window.FileReader)
{
  var filesInput = document.getElementById("files");

  filesInput.addEventListener("change",function(event){

      var files = event.target.files; //FileList object
      var output = document.getElementById("result");

      for(var i = 0; i< files.length; i++)
      {
          var file = files[i];

          var divid = files[i].name;

          //Only pics
          if(!file.type.match('image'))
            continue;

          var picReader = new FileReader();

          picReader.addEventListener("load",function(event){
            var d = new Date();
            var n = d.getMilliseconds();
            var rand = Math.round(Math.random()*1000);
              var picFile = event.target;
              var div = document.createElement("div");
              div.setAttribute("id", `${n}${rand}`);
              div.setAttribute("draggable", "true");
              div.classList.add("dragItem")
              div.innerHTML = `<div class="image-options" >
                <div class="boton-borrar">
                  <button type="button" onclick="borrarFoto(this)" class="delete" name="button">X</button>
                </div>
                <img class="images-loader" src="${picFile.result}" alt="">
              </div>`

              output.insertBefore(div,null);





          });

           //Read the image
          picReader.readAsDataURL(file);
          // console.log(files.length+ ' ' + i);
      }



  });

}
else
{
  console.log("Your browser does not support File API");
}


}

//
// window.addEventListener('change',function(){
//   setTimeout(function(){
//     console.log('se disparo');
//     startDrag();
//   },1500)
// })

function borrarFoto(id) {
  console.log(id);
  var x = id.parentNode.parentNode.parentNode.id
//  var x = document.getElementById(id).parentElement.id;
  var div = document.getElementById(x);
  console.log(x);
  div.parentNode.removeChild(div);
}
