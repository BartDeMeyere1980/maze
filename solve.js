function floodfill(row , column){

    if(getNode(row , column) === endnode){

        runfloodfill = false 
        solve()
        return
    }


    function run(){

         //check right
        if(getNode(row , column + 1) && !getNode(row , column).right){

            if(getNode(row , column + 1).value === 0){

                getNode(row , column + 1).value = getNode(row , column).value + 1

                    if(runfloodfill){

                        floodfill(row , column + 1)
                    }
                
            }
    
        }

        //check left
        if(getNode(row , column - 1) && !getNode(row , column - 1).right){

            if(getNode(row , column - 1).value === 0){

                getNode(row , column - 1).value = getNode(row , column).value + 1

                    if(runfloodfill){

                        floodfill(row , column - 1)

                    }
                    
            }
    
        }

        //check bottom
        if(getNode(row + 1 , column) && !getNode(row , column).bottom){

            if(getNode(row + 1, column).value === 0){

                getNode(row + 1, column).value = getNode(row , column).value + 1

                    if(runfloodfill){

                        floodfill(row + 1 , column)

                    }
              
            }
    
        }

        //check top
        if(getNode(row - 1 , column) && !getNode(row - 1 , column).bottom){

            if(getNode(row - 1, column).value === 0){

                getNode(row - 1, column).value = getNode(row , column).value + 1

                    if(runfloodfill){

                        floodfill(row - 1 , column)
                    }
                
            }
    
        }

    }
   
    setTimeout(run , 10)
    
}


function getpreviousnode(row , column){

    //check right
    if(getNode(row , column + 1) && !getNode(row , column).right){

        if(getNode(row , column + 1).value === getNode(row , column).value - 1){

            return getNode(row , column + 1)
        }
    }

    //check left
    if(getNode(row , column - 1) && !getNode(row , column - 1).right){

        if(getNode(row , column - 1).value === getNode(row , column).value - 1){

            return getNode(row , column - 1)
        }
    }

    //check bottom
    if(getNode(row + 1, column) && !getNode(row , column).bottom){

        if(getNode(row + 1 , column).value === getNode(row , column).value - 1){

            return getNode(row + 1 , column)
        }
    }

    //check top
    if(getNode(row - 1, column) && !getNode(row - 1 , column).bottom){

        if(getNode(row - 1 , column).value === getNode(row , column).value - 1){

            return getNode(row - 1 , column)
        }
    }
}


function solve(){

    if(current === undefined){

        current = endnode;
        path.push(current)
    }

    var nextcell = getpreviousnode(current.row , current.column)

    if(nextcell){

        path.push(nextcell)
        current = nextcell

    }else{

        path.push(startnode)
        console.log("maze is solved!")
        $("#mazegenerator").prop("disabled" , false)
        $("#resetbtn").css("display" , "block")
        current = undefined
        return
    }

    setTimeout(solve,10)
}