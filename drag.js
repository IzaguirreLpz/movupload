function startDrag(){

  var padre = document.querySelectorAll('.dragItem');

  [].forEach.call(padre,function(pa) {
    var paClone = pa.cloneNode(true)
    pa.parentNode.replaceChild(paClone,pa)

    paClone.addEventListener('dragover',events,false)
    paClone.addEventListener('drop', droping, false);
  });

  function events(e){
    e.preventDefault();
  }


  var imgs = document.querySelectorAll('.images-loader');
  console.log(imgs);

  [].forEach.call(imgs,function(img) {
  var imgClone = img.cloneNode(true);
  img.parentNode.replaceChild(imgClone,img);

  imgClone.addEventListener('dragstart',drag,false);
  imgClone.addEventListener('click',function(e){ 
  e.stopPropagation();
  })

  }); 

  


  function drag(ev) {

  ev.dataTransfer.setData("src", ev.target.id);
  }
 



  function droping(ev) {

    var src = document.getElementById(ev.dataTransfer.getData("src"));

    var srcParent = src.parentNode; //image-options-que se envia
     
    var tgt = ev.currentTarget.firstElementChild; //image option objetivo

    ev.currentTarget.replaceChild(src, tgt);
    
    srcParent.appendChild(tgt);

  }


  var btn_borrar = document.querySelectorAll('.delete');

  [].forEach.call(btn_borrar,function(btn){

    var btnClone =  btn.cloneNode(true);
    btn.parentNode.replaceChild(btnClone,btn);

    btnClone.addEventListener('click',borrarFoto,false)
  })

  function borrarFoto(ev) {
    ev.preventDefault();
    ev.stopPropagation();
   

    var e = ev.srcElement.parentNode.nextSibling.id
    var padre = document.getElementById(e).parentNode
    padre.parentNode.removeChild(padre);

  }


}



module.exports = startDrag;