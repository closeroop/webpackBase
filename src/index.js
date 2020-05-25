import _ from 'lodash'
import './test.scss' 
import { add } from './a'
import imgsrc from './f3731abe3ece93dd1ee5d5803fe3318c.jpg'

console.log(add(1, 2))

let app = document.getElementById("app")
let p = document.createElement("p")
let img = document.createElement("img")
img.src = imgsrc
console.log(JSON.stringify(img.src))
img.style.width = '200px'
app.appendChild(img)
p.innerHTML = add(1, 2) + ' webpack'
app.appendChild(p)

setTimeout(()=>{
  import('./b').then(res=>{
    console.log(res, 'b')
  })
}, 2000)
''.indexOf()