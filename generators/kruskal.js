function kruskal(){

    if(currentcell === undefined){

        currentcell = nodes[Math.floor(Math.random() * nodes.length)]

        nodes.forEach(node => { node.displayset = true})
    }

    //when done
    if(mazeComplete()){

        console.log("done")
        return
    }

    var nextcell = getAdjacentnodes(currentcell.row , currentcell.column)

    if(nextcell){

        removeWalls(currentcell , nextcell)

        nextcell.merged = true 
        currentcell.merged = true

        nodes.forEach(node => {

            if(node.set === currentcell.set){

                node.set = nextcell.set
            }
         })

        nodes.forEach(node => {

            if(node.set === nextcell.set){

                //node.set = currentcell.set
            }

         })
    }

    
    currentcell = nodes[Math.floor(Math.random() * nodes.length)]

    setTimeout(kruskal , 5)
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
