function huntandkill(){

    if(currentcell === undefined){

        currentcell = nodes[Math.floor(Math.random() * nodes.length)]

         //hide set on each node
         nodes.forEach(node => { node.displayset = false})
    }

    var nextcell = getunvisitedneighbours(currentcell.row , currentcell.column)

    if(nextcell){

        removeWalls(currentcell , nextcell)
        currentcell.visited = true 
        currentcell = nextcell
   
    }else{

        currentcell.visited = true
        currentcell = gotoNextnode()
       
        if(currentcell === undefined){

           //$("#mazegenerator").prop("disabled" , false)
            console.log("done")
            nodes.forEach(node => { node.visited = false})
            //solve maze
            runfloodfill = true
            path = []
            nodes.forEach(node => {node.value = 0})
            floodfill(startnode.row,startnode.column)
            return
        }
    }

    setTimeout(huntandkill , 10)
}

function gotoNextnode(){

    for(var i = 0 ; i < rows ; i++){

        for(var j = 0 ; j < columns ; j++){

            if(!getNode(i,j).visited){

                if(getNode(i - 1 , j) && getNode(i - 1 , j).visited){

                    return getNode(i - 1,j)
                }

                if(getNode(i + 1 , j) && getNode(i + 1 , j).visited){

                    return getNode(i + 1,j)
                }

                if(getNode(i , j + 1) && getNode(i , j + 1).visited){

                    return getNode(i,j+1)
                }

                if(getNode(i , j - 1) && getNode(i , j - 1).visited){

                    return getNode(i,j-1)
                }
            }
        }
    }

}