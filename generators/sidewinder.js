
var temp_row = 0
var temp_col = 0
var set = []

function sidewinder(){

    if(currentcell === undefined){

        currentcell = getNode(temp_row,temp_col)

         //hide set on each node
         nodes.forEach(node => { node.displayset = false})
    }

    if(temp_row === 0){

        if(getNode(temp_row , temp_col + 1)){

            getNode(temp_row , temp_col).right = false
            getNode(temp_row , temp_col + 1).left = false
        }
    }

    var random = Math.floor(Math.random() * 2)

    if(temp_row > 0){

        set.push(currentcell)

        if(random === 0){
    
            if(temp_col === columns - 1){

                getNode(temp_row - 1 , temp_col).bottom = false
                getNode(temp_row , temp_col).top = false

            }else{

                getNode(temp_row , temp_col).right = false
                getNode(temp_row , temp_col+1).left= false

            }
            
        }else{
    
            var node = set[Math.floor(Math.random() * set.length)];
    
            if(getNode(node.row - 1 , node.column)){
    
                getNode(node.row - 1 , node.column).bottom = false
                getNode(node.row , node.column).top = false
            }

            set = []
        }

    }


    if(temp_col < columns - 1){

        temp_col++

    }else{

        if(temp_row < rows - 1){

            temp_col = 0
            temp_row++
            set = []
        }
    }

    currentcell = getNode(temp_row , temp_col)

    if(temp_row === rows - 1 && temp_col === columns -1 ){

        getNode(temp_row - 1 , temp_col).bottom = false
        getNode(temp_row , temp_col).top = false

        console.log("done")
        //$("#mazegenerator").prop("disabled" , false)
        mazedone = true
        currentcell = undefined
        temp_row = 0
        temp_col = 0
        set = []
        //solve maze
        runfloodfill = true
        path = []
        nodes.forEach(node => {node.value = 0})
        floodfill(startnode.row,startnode.column)
        return
    }

    setTimeout(sidewinder,1)
}