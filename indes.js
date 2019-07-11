const startDrag = require('./drag.js');

window.onload = async function () {
  var drop = document.querySelector('.drop');
  // var form = document.querySelector('.box');
  //Check File API support
  if (window.File && window.FileList && window.FileReader) {

    var filesInput = document.createElement('input');

    filesInput.setAttribute('type', 'file');
    filesInput.setAttribute('multiple', true);
    filesInput.setAttribute('id', 'files');
    filesInput.setAttribute('accept', 'image/*');
    filesInput.style.display = 'none';

    drop.appendChild(filesInput);

    filesInput.addEventListener("change",input);

    drop.addEventListener('dragover',function(e){
      e.preventDefault();
      e.stopPropagation();
      drop.classList.add('dragover');
    })

    drop.addEventListener('dragleave',function(e){
      e.preventDefault();
      e.stopPropagation();
      drop.classList.remove('dragover');
    })

    drop.addEventListener('drop',function(e){
      e.preventDefault();
      e.stopPropagation();
      drop.classList.remove('dragover');
      input(e)
    })

    drop.addEventListener('click',function(e){
      filesInput.value = null;
      filesInput.click();
    })

    function input(e) {
     document.getElementById('box_input').style.display = 'none';

      var files = event.target.files; //FileList object
      var output = document.getElementById("form");

      var files;
      if(e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if(e.target) {
        files = e.target.files;
      }
 
       [].forEach.call(files,function(file){

                    if(!file.type.match('image')){
                      return;
                    }

                    var picReader = new FileReader();

                   picReader.addEventListener("load", async function (event) { 
                      var d = new Date();
                      var n = d.getMilliseconds();
                      var rand = Math.round(Math.random() * 1000);
                      var picFile = event.target;
                      var div = document.createElement("div");

                      div.setAttribute("id", `${n}${rand}`);
                      // div.setAttribute("draggable", "true");
                      div.classList.add("dragItem")
                      div.innerHTML = `<div class="preview-images">

                            <img id=${file.name} draggable="true" src="${picFile.result}" alt=""/>
                            </div>
                          `
      
                            // <div class="boton-borrar">
                            //   <button type="button" onclick="borrarFoto(this)" class="delete" name="button">X</button>
                            // </div>

                       output.insertBefore(div,null); 
                       await startDrag();

                    }); 

                    //Read the image
                   picReader.readAsDataURL(file);    

             })


    }



  } else {
    console.log("Your browser does not support File API");
  }

} //fin onload




function borrarFoto(id) {
  console.log(id);
  var x = id.parentNode.parentNode.parentNode.id
  //  var x = document.getElementById(id).parentElement.id;
  var div = document.getElementById(x);
  console.log(x);
  div.parentNode.removeChild(div);
}