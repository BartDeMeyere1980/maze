function getunvisitedneighbours(row , column){

    var neighbours = []

    for(var i = -1 ; i <= 1 ; i++){

        for(var j = -1 ; j <= 1 ; j++){

            if((i === -1 && j === 0)||(i === 0 && j === -1) || (i === 0 && j === 1) || (i === 1 && j === 0)){

                if(getNode(row + i , column + j) && !getNode(row + i , column + j).visited){

                    neighbours.push(getNode(row + i , column + j))

                }
            }
        
        }

    }

    return neighbours[Math.floor(neighbours.length * Math.random())]

}


function removeWalls(currentnode , nextnode){


    if(nextnode.column === currentnode.column + 1){

        currentnode.right = false
        nextnode.left = false
    }

    if(nextnode.column === currentnode.column - 1){

        nextnode.right = false
        currentnode.left = false
    }

    if(nextnode.row === currentnode.row + 1){

        currentnode.bottom = false
        nextnode.top = false
    }

    if(nextnode.row === currentnode.row - 1){

        nextnode.bottom = false
        currentnode.top = false
    }

}

function reset(){

    path = []
  
    //reset nodes
    nodes.forEach(node => {

        node.bottom = true 
        node.right = true
        node.top = true 
        node.left = true
        node.visited = false
        node.value = 0
    })

    mazedone = false

}

