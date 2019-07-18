const startDrag = require('./drag.js');
import './style.css';

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
      // e.stopPropagation();
      filesInput.value = null;
      filesInput.click();
    })

    function input(e) {
    document.getElementById('box_input').style.display ='none';
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
                      
                      var divprueba = document.createElement('div');

                      divprueba.innerHTML = `<div class="boton-borrar">
                      <button type="button" class="delete" name="button">X</button>
                      </div>`

                


                      var div = document.createElement("div");

                      div.setAttribute("id", `${n}${rand}`);
                      div.setAttribute("draggable", "true");
                      div.classList.add("dragItem")
            
                      div.innerHTML = `

                            <img class="images-loader" id="${file.name}" draggable="true" src="${picFile.result}" alt="${file.name}">
                            
                          `
                       divprueba.appendChild(div);

                       output.insertBefore(divprueba,null); 

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




