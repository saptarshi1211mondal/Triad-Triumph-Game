import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 3000;


const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("")))

let arr=[]
let playingArray=[];

io.on("connection",(socket)=>{
    socket.on("find",(e)=>{
        if(e.name!=null){
            arr.push(e.name);
            if(arr.length>=2){
                let p1obj={
                    p1name:arr[0],
                    p1value:"O",
                    p1move:"",
                    p1color:"G",
                    p1winning:[]
                }
                let p2obj={
                    p2name:arr[1],
                    p2value:"X",
                    p2move:"",
                    p2color:"",
                    p2winning:[]
                }
                let obj={
                    p1:p1obj,
                    p2:p2obj,
                    sum:1,
                }
                
                playingArray.push(obj);
                arr.splice(0,2);
                io.emit("find",{allPlayers:playingArray})
            }
        }
    })

    socket.on("playing",(e)=>{
        if(e.value=="O"){
            let objToChange=playingArray.find(obj=>obj.p1.p1name===e.name)
            objToChange.p1.p1move=e.id;
            objToChange.p1.p1=e.id;
            objToChange.sum++;
            objToChange.p1.p1color="";
            objToChange.p2.p2color="G";
        }
        else if(e.value=="X"){
            let objToChange=playingArray.find(obj=>obj.p2.p2name===e.name)
            objToChange.p2.p2move=e.id;
            objToChange.sum++;
            objToChange.p2.p2color="";
            objToChange.p1.p1color="G";
        }
        io.emit("playing",{allPlayers:playingArray})
    })

    socket.on("disconnected_single", (e)=>{
        arr = arr.filter(element => element !== e.name);
    })

    socket.on("disconnected", (e)=>{
        playingArray = playingArray.filter(obj => obj.p1.p1name !== e.name && obj.p2.p2name !== e.name);
        io.emit("playing",{allPlayers:playingArray})
    })

    socket.on("disconnected_home", (e)=>{
        playingArray = playingArray.filter(obj => obj.p1.p1name !== e.name && obj.p2.p2name !== e.name);
        io.emit("home",{allPlayers:playingArray})
    })

    socket.on("gameOver", (e) => {
        let game = playingArray.find(obj => obj.p1.p1name === e.name || obj.p2.p2name === e.name);
    
        if (game) {
            const isPlayer1Winner = game.p1.p1name === e.name;
            const winningPlayer = isPlayer1Winner ? game.p1 : game.p2;
            const losingPlayer = isPlayer1Winner ? game.p2 : game.p1;
            
            // Ensure `e.winningBoxes` is passed from the client when emitting `gameOver`.

            io.emit("updateColors", {
                winningBoxes: (e.winningBoxes && e.winningBoxes.length === 3) ? e.winningBoxes : [],
                winnerColor: "green",
                loserColor: "red",
                winnerName: winningPlayer.p1name || winningPlayer.p2name,
                loserName: losingPlayer.p1name || losingPlayer.p2name,
            });
        }
        // Remove finished game from playingArray
        io.emit("disableButtons");
        playingArray = playingArray.filter(obj => obj.p1.p1name !== e.name && obj.p2.p2name !== e.name);
    }); 
})


app.get("/",(req,res)=>{
    return res.sendFile("index.html")
})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})