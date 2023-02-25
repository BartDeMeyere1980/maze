function randomwalker(color , startnode){

    function runwalker(){

        if(gridcomplete()){

            console.log("random walks done")
            return
        }

        if(startnode === undefined){

            startnode = pickrandomnode()
            startnode.fillcolor = color
        }
    
        var nextnode = Getnextnode(startnode.row , startnode.column)
    
        if(nextnode){
    
            nextnode.fillcolor = color 
            startnode = nextnode
    
        }else{

            //console.log("random walker done")
            startnode = pickrandomnode()
            color = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) +  "," + .5 + ")"
            startnode.fillcolor = color
            //return
        }

        setTimeout(runwalker,1)

    }
  
    runwalker()
   
}

function pickrandomnode(){

    do{

        node = nodes[Math.floor(Math.random() * nodes.length)]

    }while(node.fillcolor !== undefined)

    return node
}

function gridcomplete(){

    for(var i = 0 ; i < nodes.length ; i++){

        if(nodes[i].fillcolor === undefined){

            return false
        }
    }

    return true
}

function Getnextnode(row , column){

    var possibilities = []

            
        if(getNode(row - 1 , column) && getNode(row - 1 , column).fillcolor === undefined){

            possibilities.push(getNode(row - 1 , column))
        }

  
        if(getNode(row + 1 , column)&& getNode(row + 1 , column).fillcolor === undefined){

            possibilities.push(getNode(row + 1 , column))
        }
        
    
        if(getNode(row , column - 1)&& getNode(row, column - 1).fillcolor === undefined){

            possibilities.push(getNode(row , column - 1))
        }

            
        if(getNode(row , column + 1) && getNode(row , column + 1).fillcolor === undefined){

            possibilities.push(getNode(row , column + 1))
        }
        
        console.log(possibilities)

        return possibilities[Math.floor(Math.random() * possibilities.length)] 
}