function startDrag(){
 


  var padre = document.querySelectorAll('.dragItem');

  [].forEach.call(padre, function(pa) {
    pa.addEventListener('dragover',events,false)
    pa.addEventListener('drop', droping, false);
  });

  function events(e){
    e.preventDefault();
  }


  var imgs = document.querySelectorAll('.images-loader');

  [].forEach.call(imgs, function(img) {

  img.addEventListener('dragstart', drag);
  }); 

  function drag(ev) {
  console.log('Dragstart.....');
   ev.dataTransfer.setData("src", ev.target.id);

 
  }
 
  function droping(ev) {
    console.log('Cayo algo');
    var src = document.getElementById(ev.dataTransfer.getData("src"));
    //  console.log(src); // img tag

    var srcParent = src.parentNode; //image-options-que se envia
     
   var tgt = ev.currentTarget.firstElementChild; //image option objetivo
 

    ev.currentTarget.replaceChild(src, tgt);
    
    srcParent.appendChild(tgt);

  }



}



module.exports = startDrag;