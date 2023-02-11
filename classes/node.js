class Node{

    constructor(x , y , size , row , column , set){

        this.x = x;
        this.y = y;
        this.size = size;
        this.row = row
        this.column = column
        this.bottom = true 
        this.right = true
        this.left = true 
        this.top = true
        this.visited = false
        this.value = 0
        this.type = "node"
        this.set = set
        this.merged = false;
        this.displayset = false
    }

    render(){

        c.save()
        c.translate(this.x , this.y)
        c.strokeStyle = "rgba(40 , 95 , 87 , .5)"
        c.lineWidth = .5

        if(this.visited){

            c.beginPath()
            c.fillStyle = "rgba(101,158,149,.2)"
            c.rect(-this.size/2 , -this.size/2  , this.size  , this.size )
            c.fill()
            c.closePath()
        }

        if(this.merged){

            c.beginPath()
            c.fillStyle = "rgba(101,158,149,.2)"
            c.rect(-this.size/2 , -this.size/2  , this.size  , this.size )
            c.fill()
            c.closePath()
        }

        if(this.type === "startnode"){

            c.beginPath()
            c.fillStyle = "rgba(0,158,0,1)"
            c.rect(-this.size/2 , -this.size/2  , this.size  , this.size )
            c.fill()
            c.closePath()
        }

        if(this.type === "endnode"){

            c.beginPath()
            c.fillStyle = "rgba(158,0,0,1)"
            c.rect(-this.size/2 , -this.size/2  , this.size  , this.size )
            c.fill()
            c.closePath()
        }
    
        if(this.right){
           
            c.beginPath()
            c.moveTo(this.size/2 , -this.size/2)
            c.lineTo(this.size/2 , this.size/2)
            c.stroke()
            c.closePath()
        }

        if(this.bottom){
           
            c.beginPath()
            c.moveTo(this.size/2 , this.size/2)
            c.lineTo(-this.size/2 , this.size/2)
            c.stroke()
            c.closePath()
        }

        if(this.left){

            c.beginPath()
            c.moveTo(-this.size/2 , -this.size/2)
            c.lineTo(-this.size/2 , this.size/2)
            c.stroke()
            c.closePath()

        }

        if(this.top){

            c.beginPath()
            c.moveTo(-this.size/2 , -this.size/2)
            c.lineTo(this.size/2 , -this.size/2)
            c.stroke()
            c.closePath()
        }

        c.restore()

        if(this.value > 0){

            c.save()
            c.translate(this.x , this.y)
            c.beginPath()
            c.fillStyle = "rgba(84, 125, 95,.2)"
            c.rect(-this.size/2 , -this.size/2 , this.size , this.size)
            c.fill()
            c.closePath()
            c.restore()

        }

        if(this.set > 0 && this.displayset){
 
            c.save()
            c.translate(this.x , this.y)
            c.beginPath()
            c.fillStyle = "black"
            c.font = this.size/5 + "px Roboto"
            c.textAlign = "center"
            c.textBaseline = "middle"
            c.fillText(this.set , 0 ,0)
            c.closePath()
            c.restore()  

        }
       
    }

    isInside(x, y){

        if(x > this.x - this.size/2 && x < this.x + this.size/2 && y > this.y - this.size/2 && y < this.y + this.size/2){

            return true
        }
    }
}