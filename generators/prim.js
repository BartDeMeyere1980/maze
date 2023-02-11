let stack = []

function prims(){

    if(currentcell === undefined){

        currentcell = nodes[Math.floor(Math.random() * nodes.length)]
        
         //hide set on each node
         nodes.forEach(node => { node.displayset = false})
    }

    var nextcell =  getunvisitedneighbours(currentcell.row , currentcell.column);

    if(nextcell){

        nextcell.visited = true
        removeWalls(currentcell,nextcell)
        stack.push(nextcell)

    }else{

        if(stack.length > 0){

            var index = Math.floor(Math.random() * stack.length)
            currentcell = stack[index]
            stack.splice(index,1)

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

    setTimeout(prims,10)
}