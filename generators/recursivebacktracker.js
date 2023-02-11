function recursivebacktracker(){

    if(currentcell === undefined){


        currentcell = nodes[Math.floor(Math.random() * nodes.length)]
        currentcell.visited = true
        stack.push(currentcell)

         //hide set on each node
         nodes.forEach(node => { node.displayset = false})
    }


    var nextcell = GetAdjacentCells(currentcell.row , currentcell.column)

    if(nextcell){

        removeWalls(currentcell , nextcell)
        nextcell.visited = true
        stack.push(nextcell)
        currentcell = nextcell

    }else{

        if(stack.length > 0){

            currentcell = stack.pop()
        }else{

            console.log("done")
            currentcell = undefined
            nodes.forEach(node => node.visited = false)

             //solve maze
            runfloodfill = true
            path = []
            nodes.forEach(node => {node.value = 0})
            floodfill(startnode.row,startnode.column)
            return;

        }
    }

    setTimeout(recursivebacktracker , 1)
}

function GetAdjacentCells(row , column){

    var possibilities = []

    if(getNode(row + 1 , column)){

        if(!getNode(row + 1 , column).visited){

            possibilities.push(getNode(row + 1 , column))
        }
    }

    if(getNode(row - 1 , column)){

        if(!getNode(row - 1 , column).visited){

            possibilities.push(getNode(row - 1 , column))
        }
    }

    if(getNode(row , column + 1)){

        if(!getNode(row , column + 1).visited){

            possibilities.push(getNode(row  , column + 1))
        }
    }

    if(getNode(row , column - 1)){

        if(!getNode(row , column - 1).visited){

            possibilities.push(getNode(row  , column - 1))
        }
    }


    return possibilities[Math.floor(Math.random() * possibilities.length)] 
}