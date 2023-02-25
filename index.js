//canvas setup
let c = $("canvas")[0].getContext("2d")
let canvas = $("canvas")[0]

let height = $(".header").outerHeight()
let w = innerWidth 
let h = innerHeight - height

canvas.style.width = w + "px"
canvas.style.height = h + "px"

canvas.width = w * devicePixelRatio 
canvas.height = h * devicePixelRatio 

//variables
let columns = 75
let size = canvas.width / columns
let rows = Math.floor(canvas.height / size)
let nodes = []
let currentcell = undefined
let runfloodfill = true
let current = undefined
let path = []
let mousedown = false
let dragstartnode = false
let dragendnode = false
let candrag = true
let mazedone = false;

createNodes()
renderCanvas()

let startnode = getNode(5,5)
startnode.type = "startnode"
let endnode = getNode(rows - 6 , columns - 6)
endnode.type = "endnode"


function createNodes(){

    var count = 0

    for(var i = 0 ; i < rows ; i++){

        for(var j = 0 ; j < columns ; j++){

            count++
            var newnode = new Node(size/2 + j * size , size/2 + i * size , size , i , j , count)
            nodes.push(newnode)
        
        }
    }
}

function getNode(row , column){

    for(var i = 0 ; i < nodes.length ; i++){

        if(nodes[i].row === row && nodes[i].column === column){

            return nodes[i]
        }
    }
}

function renderCanvas(){

    c.clearRect(0,0,canvas.width,canvas.height)

    //draw currentcell
    if(currentcell){

        c.save()
        c.translate(currentcell.x , currentcell.y)
        c.beginPath()
        c.fillStyle = "purple"
        c.rect(-size/2 , -size/2 , size , size)
        c.fill()
        c.closePath()
        c.restore()
    }

    //draw path
    if(path.length > 0){

        c.save()
        c.beginPath()
        c.strokeStyle = "dodgerblue"
        c.lineWidth = size / 6
        c.moveTo(path[0].x , path[0].y)
    
        for(var i = 0 ; i < path.length ; i++){
    
            c.lineTo(path[i].x , path[i].y)
        }
    
        c.stroke()
        c.closePath()
        c.restore()

    }

    //draw stack
    if(stack.length > 0){

        c.save()
        c.beginPath()
        c.fillStyle = "rgba(0,200,0,.2)"
    
        for(var i = 0 ; i < stack.length ; i++){
    
            c.rect(stack[i].x - size/2 , stack[i].y - size/2 , size , size)
        }
    
        c.fill()
        c.closePath()
        c.restore()
    }
   

    //render nodes
    nodes.forEach(node => { node.render() })

    requestAnimationFrame(renderCanvas)
}



$("canvas").on("mousedown" , function(event){

    mousedown = true

    var xcoord = event.clientX * devicePixelRatio
    var ycoord = (event.clientY - height) * devicePixelRatio

    for(var i = 0 ; i < nodes.length ; i++){

        if(nodes[i].isInside(xcoord , ycoord)){

            if(nodes[i] === startnode){

                dragstartnode = true
            }

            if(nodes[i] === endnode){

                dragendnode = true
            }

            return
        }
    }

})

$("canvas").on("mousemove" , function(event){

    var xcoord = event.clientX * devicePixelRatio
    var ycoord = (event.clientY - height) * devicePixelRatio

    if(candrag){

        if(mousedown){

            if(dragstartnode){
    
                for(var i = 0 ; i < nodes.length ; i++){
    
                    if(nodes[i].isInside(xcoord , ycoord) && nodes[i] !== endnode){
            
                        startnode.type = "node"
                        startnode = nodes[i]
                        startnode.type = "startnode"
                   
                        
            
                        return
                    }
                }
    
            }
    
            if(dragendnode){
    
                for(var i = 0 ; i < nodes.length ; i++){
    
                    if(nodes[i].isInside(xcoord , ycoord) && nodes[i] !== startnode){
            
                        endnode.type = "node"
                        endnode = nodes[i]
                        endnode.type = "endnode"
                        return
                    }
                }
    
            }
        }

    }
   
})

$("canvas").on("mouseup" , function(event){

    mousedown = false
    dragstartnode = false
    dragendnode = false

})

$("#mazegenerator").on("change" , function(){

    $("#resetbtn").css("display" , "none")

    switch(this.value){

        case "0": reset(); huntandkill(); candrag = false;  break;
        case "1": reset(); sidewinder(); candrag = false; break;
        case "2": reset(); prims(); candrag = false; break;
        case "3": reset(); kruskal(); candrag = false; break;
        case "4": reset(); recursivebacktracker(); candrag = false; break;
        case "5": reset(); kruskalcolorized(); candrag = false; break;
        case "6": reset(); randomwalker("rgba(30,144,255,.5)" , nodes[Math.floor(Math.random() * nodes.length)]); candrag = false; break;
    }

    $("#mazegenerator").prop("disabled" , "disabled")
})


$("#resetbtn").on("click" , function(event){

    reset()
    candrag = true
    $("#resetbtn").css("display" , "none")

})