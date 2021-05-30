const draggables = document.querySelectorAll('.draggable')


draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', (e) => {
    draggable.classList.add('dragging')
    e.dataTransfer.setData("text", e.target.id);
  })

  draggable.addEventListener('dragend', (e) => {
    draggable.classList.remove('dragging')
  })
  draggable.addEventListener('dragover', e => {
    e.preventDefault()
  })
  draggable.addEventListener('drop', e => {
    
    var data = e.dataTransfer.getData("text");
    logMessage("Movement detected from -"+data+" to "+e.target.id);
    
    if(!playMode){
      logMessage("Node movement is not allowed as node selection is not complete");
    }
    else{
      move(data, e.target.id);
    }

  })

  draggable.addEventListener('click', e => {
    
    
    selectNode(e);
  })
})



