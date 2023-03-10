function kruskal(){

    if(currentcell === undefined){

        currentcell = nodes[Math.floor(Math.random() * nodes.length)]

        //nodes.forEach(node => { node.displayset = true })
    }

    //when done
    if(mazeComplete()){

        console.log("done")
        nodes.forEach((node,index) => { 

            node.merged = false
            node.set = index + 1
            node.displaycolor = false
        
        })
        
        currentcell = undefined
        //solve maze
        runfloodfill = true
        path = []
        nodes.forEach(node => {node.value = 0})
        floodfill(startnode.row,startnode.column)
        return

    }

    var nextcell = getAdjacentnodes(currentcell.row , currentcell.column)

    if(nextcell){

        removeWalls(currentcell , nextcell)

        nextcell.merged = true 
        currentcell.merged = true

        set1 = currentcell.set 
        set2 = nextcell.set

        nodes.forEach(node => {

            if(node.set === set2){

                node.set = set1
            }
        })

        nodes.forEach(node => {

            if(node.set === set1){

                node.set = set2
            }
        })

    }
    
    currentcell = nodes[Math.floor(Math.random() * nodes.length)]

    setTimeout(kruskal , 10)
}

function mazeComplete(){

    var value = getNode(0,0).set

    for(var i = 0 ; i < nodes.length ; i++){

        if(nodes[i].set !== value){

            return false
        }
    }

    return true
}

function getAdjacentnodes(row , column){

    var adjacentnodes = []

    if(getNode(row - 1 , column)){

        if(getNode(row - 1 , column).set !== currentcell.set){

            adjacentnodes.push(getNode(row - 1 , column))
        }
    }

    if(getNode(row + 1 , column)){

        if(getNode(row + 1 , column).set !== currentcell.set){

            adjacentnodes.push(getNode(row + 1 , column))
        }
    }

    if(getNode(row , column - 1)){

        if(getNode(row , column - 1).set !== currentcell.set ){

            adjacentnodes.push(getNode(row , column - 1))
        }
    }

    if(getNode(row , column + 1)){

        if(getNode(row , column + 1).set !== currentcell.set){

            adjacentnodes.push(getNode(row , column + 1))
        }
    }

    
    return adjacentnodes[Math.floor(Math.random() * adjacentnodes.length)]
}