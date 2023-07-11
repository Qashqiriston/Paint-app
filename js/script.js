const canvas = document.querySelector('canvas'),
  toolBtns = document.querySelectorAll('.tool'),
  fillColor = document.querySelector('#fill-color')

let ctx = canvas.getContext('2d'),
   isDrawing = false,
   brushWith = 3,
   selectedTool = 'brush',
   prevMouseX,
   prevMouseY,
   snapshot

window.addEventListener('load', ()=>{
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
})
const startDrow = e =>{
  isDrawing = true
  prevMouseX = e.offsetX
  prevMouseY = e.offsetY
  ctx.beginPath()
  ctx.lineWidth = brushWith
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

drawRectangle = e =>{
  if(!fillColor.checked){
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY )
  }else{
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY )
  }
}

const drawCircle = e => {
  ctx.beginPath()
  const radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 2)
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
  fillColor.checked ? ctx.fill() :  ctx.stroke()
}

const drawing = e =>{
  if(!isDrawing) return
  ctx.putImageData(snapshot, 0 , 0)
  switch(selectedTool){
    case 'brush':
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
      break
      case "rectangle":
        drawRectangle(e)
      break
      case 'circle':
        drawCircle(e)
      default: break
    }
  }
const stopDrow = ()=>{
  isDrawing = false
}

toolBtns.forEach(btn=>{
  btn.addEventListener('click',() =>{
    document.querySelector('.options .active').classList.remove('active')
    btn.classList.add('active')
    selectedTool = btn.id
    console.log(selectedTool);
  })
})

canvas.addEventListener('mousedown', startDrow)
canvas.addEventListener('mousemove' , drawing)
canvas.addEventListener('mouseup' , stopDrow)