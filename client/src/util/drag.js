export default (document, dom) => {

   dom.onmousedown = function(e) {
    
    let name = e.target.getAttribute('name')
    if(name === 'addition' || name === 'account')
      return

    let x = dom.offsetLeft
    let y = dom.offsetTop 
    let startX = e.clientX
    let startY = e.clientY

    document.onmousemove = function(e) {
      dom.style.left = e.clientX - startX + x + 'px'
      dom.style.top = e.clientY - startY + y + 'px'
    }

    document.onmouseup = function() {
      document.onmousemove = null
    }
  }
}


  // dom.addEventListener('mousedown', (e) => {
  //   let x = dom.offsetLeft
  //   let y = dom.offsetTop 
  //   let startX = e.clientX
  //   let startY = e.clientY
  //   console.log(document)
  //   document.addEventListener('mousemove', callback)

  //   document.addEventListener('mouseup', () => {
  //     document.removeEventListener('mousemove', callback)
  //   })

  //   const callback = (e) => {
  //     dom.style.left = e.clientX - startX + x + 'px'
  //     dom.style.top = e.clientY - startY + y + 'px'
  //   }
  // })