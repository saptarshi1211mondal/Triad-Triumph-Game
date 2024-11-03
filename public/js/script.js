let boxex=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let resetHome=document.querySelector("#reset-home");
let newGameBtn=document.querySelector("#new_game-btn");
let container=document.querySelector(".container");
let msgContainer=document.querySelector(".msg-main-container");
let msg=document.querySelector("#msg");
let game=document.querySelector(".game");
var videoElement = document.querySelector('.video');
var sourceElement = document.querySelector('#videoSource');
let playerContainer=document.querySelector(".player-container");
let playerNameContainer=document.querySelector(".player-name-container");
let btnCon=document.querySelector(".button-container");
let displayNameContainer=document.querySelector(".vsTwo");
let spinner=document.querySelector(".spinnerClass")
let copyright=document.querySelector(".copyrights")


// ALL GAME AUDIO  E:\Tic Tac Toe Project\public\sounds
const audioClickElement = new Audio('public/sounds/button_sound.mp3');
const audioSearchElement = new Audio('public/sounds/searching_sound.mp3');
const audioWinningElement = new Audio('public/sounds/winning_green_sound.mp3');
const audioLoosingElement = new Audio('public/sounds/loosing_red_sound.mp3');

let turnO= true;
let type;
let ans="D";
let onlineSecondaryCheck="o";
let alertName=''
var countClick=0;
let value;
let sum=1;

const winningPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function computerTurn() {
    audioClickElement.play();
    computerWinning();
    turnO = true;
    countClick += 1;
    checkWinner(countClick);
}

function final(x){
    c=0
    for(let box of boxex){
        if (c==x){
            computerButton=box;
            break;
        }else{
            c+=1;
        }
    }
    computerButton.innerText ="X";
    computerButton.style.color = '#fcf300';
    computerButton.disabled = true;
    return true;
}

function checkingComputerWinning(){
    k=false
    for(pattern of winningPattern){
        let pos1Val=boxex[pattern[0]].innerText;
        let pos2Val=boxex[pattern[1]].innerText;
        let pos3Val=boxex[pattern[2]].innerText;

        if (pos1Val==="" && pos2Val==="X" && pos3Val==="X"){
            k= final(pattern[0])
            return k

        }else if (pos1Val==="X" && pos2Val==="" && pos3Val==="X"){
            k= final(pattern[1])
            return k
        }
        else if (pos1Val==="X" && pos2Val==="X" && pos3Val===""){
            k=final(pattern[2])
            return k
        } 
    }
    return k
}

function checkingOpponentWinning(){
    k=false
    for(pattern of winningPattern){
        let pos1Val=boxex[pattern[0]].innerText;
        let pos2Val=boxex[pattern[1]].innerText;
        let pos3Val=boxex[pattern[2]].innerText;

        if (pos1Val==="" && pos2Val==="O" && pos3Val==="O"){
            k= final(pattern[0])
            return k

        }else if (pos1Val==="O" && pos2Val==="" && pos3Val==="O"){
            k= final(pattern[1])
            return k
        }
        else if (pos1Val==="O" && pos2Val==="O" && pos3Val===""){
            k= final(pattern[2])
            return k
        }
    }
    return k
}

function randomMove(){
    const availableButtons = Array.from(boxex).filter((btn) => btn.innerText ==="");
    const computerWinIndex= Math.floor(Math.random() * availableButtons.length);
    computerButton=availableButtons[computerWinIndex];
    computerButton.innerText ="X";
    computerButton.style.color = '#fcf300';
    computerButton.disabled = true;
}

function computerWinning(){
    document.getElementById("user").style.backgroundColor='#affc41';
    document.getElementById("user").style.color = 'black';
    document.getElementById("opponent").style.color = 'white';
    document.getElementById("opponent").style.backgroundColor='#5f0f40';

    s=checkingComputerWinning();
    if (s==false){
        s=checkingOpponentWinning();
    }
    if(s==false){
        randomMove();
    }
}

const enableBoxes=()=>{
    for(let box of boxex){
        box.disabled=false;
        box.removeEventListener('click',function(){
        });
        box.innerHTML="";
    }
}

const disableBoxes=()=>{
    for(let box of boxex){
        box.disabled=true;
    }
}

var checkResult=false;
const showWinner=(winner)=>{
    let p;
    if (playerName) {
        p = playerName.toUpperCase();
    } else {
        p = ""; 
    }
    setTimeout(() => {

        checkResult=true;
        if(winner=="O" || (type==="o" && winner!=="e" && winner!=="D")){
            if(type==='m'){
                msg.innerText=`CONGRATULATIONS, WINNER PLAYER 1`;
                sourceElement.src = 'public/videos/y.mp4';
            }
            else if(type==="s"){
                msg.innerText=`CONGRATULATIONS, YOU WINS`;
                sourceElement.src = 'public/videos/y.mp4';
            }else{
                msg.innerText=`WINNER ${p} `;
                sourceElement.src = 'public/videos/y.mp4';
                onlineSecondaryCheck="p";
            }
            videoElement.load();
            videoElement.play();
        }

        else if(winner=="X" || (type==="o" && winner==="e" && winner!=="D")){
            if(type==='m'){
                msg.innerText=`CONGRATULATIONS, WINNER PLAYER 2`;
                sourceElement.src = 'public/videos/y.mp4';
            }
            else if(type==="s"){
                msg.innerText=`YOU LOST, WINNER AI`;
                sourceElement.src = 'public/videos/bhai.mp4';
            }else{
                msg.innerText=`YOU LOST, WINNER ${p}`;
                sourceElement.src = 'public/videos/bhai.mp4';
                onlineSecondaryCheck="p";
                
            }
            videoElement.load();
            videoElement.play();
        }

        else{
            if(type==='o'){
                onlineSecondaryCheck="p";
            }
            msg.innerText="IT'S A DRAW";
            sourceElement.src = 'public/videos/bhai.mp4';
            videoElement.load();
            videoElement.play();
        }

        displayNameContainer.classList.add("hide");
        resetBtn.classList.remove("hide");
        container.classList.toggle("hide")
        msgContainer.classList.toggle("hide")
        disableBoxes();

    },2000);
}

let check=false;
const checkWinner=(countClick) =>{
    for(pattern of winningPattern){
        let pos1Val=boxex[pattern[0]].innerText;
        let pos2Val=boxex[pattern[1]].innerText;
        let pos3Val=boxex[pattern[2]].innerText;

        if (type==="s" && pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val==pos2Val && pos2Val==pos3Val){

                if(pos1Val=="O"){
                    audioWinningElement.play()
                    boxex[pattern[0]].style.backgroundColor="green"
                    boxex[pattern[1]].style.backgroundColor="green";
                    boxex[pattern[2]].style.backgroundColor="green";
                }else{
                    audioLoosingElement.play();
                    boxex[pattern[0]].style.backgroundColor="red"
                    boxex[pattern[1]].style.backgroundColor="red";
                    boxex[pattern[2]].style.backgroundColor="red";
                }
                check=true;
                ans=pos1Val;
                break;
            }
        }
        else if (type==="m" && pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val==pos2Val && pos2Val==pos3Val){

                if(pos1Val=="O" || pos1Val=="X"){
                    audioWinningElement.play();
                    boxex[pattern[0]].style.backgroundColor="green"
                    boxex[pattern[1]].style.backgroundColor="green";
                    boxex[pattern[2]].style.backgroundColor="green";
                }
                check=true;
                ans=pos1Val;
                break;
            }

        }
        else if(type==="o" && pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                audioWinningElement.play();
                boxex[pattern[0]].style.backgroundColor="green"
                boxex[pattern[1]].style.backgroundColor="green";
                boxex[pattern[2]].style.backgroundColor="green";
                socket.emit("gameOver",{winningBoxes:[boxex[pattern[0]].id, boxex[pattern[1]].id, boxex[pattern[2]].id], name:playerName})
                check=true; 
                ans=pos1Val;
                break;
            }
            else if (countClick===5){
                socket.emit("gameOver",{winningBoxes:[], name:playerName})
                break;
            }
        }
    }

    if (check===true){
        showWinner(ans);
        return true;
    }
    else if(countClick==9){
        showWinner(ans);
        return true;
    }else{
        return false;
    }
}

const resetGame=()=>{
    check=false;
    for(let box of boxex){
        box.style.backgroundColor= "#1d3557";
    }
    if(checkResult==true){
        countClick=0;
        turnO=true;
        enableBoxes();
        resetBtn.classList.remove("hide");
        container.classList.toggle("hide")
        msgContainer.classList.toggle("hide")
        checkResult=false;

    }else{
        countClick=0;
        turnO=true;
        enableBoxes();
    }  
}

const homeMenu=()=>{
    onlineSecondaryCheck='o';
    videoElement.pause();
    displayNameContainer.classList.add("hide");
    playerContainer.classList.remove("hide");
    container.classList.add("hide")
    msgContainer.classList.add("hide")
    btnCon.classList.add("hide")
    document.getElementById("user").style.color = 'black';
    document.getElementById("opponent").style.color = 'white';
    document.getElementById("user").style.backgroundColor='#affc41';
    document.getElementById("opponent").style.backgroundColor='';
}

newGameBtn.addEventListener("click",function(){
    ans="D";
    videoElement.pause();
    if(onlineSecondaryCheck==="p"){
        videoElement.pause();
        for(let box of boxex){
            box.style.backgroundColor= "#1d3557";
        }
        onlineSecondaryCheck="o";
        countClick=0;
        sum=1
        turnO= true;
        check=false;
        displayNameContainer.classList.add("hide");
        playerNameContainer.classList.remove("hide");
        container.classList.add("hide")
        msgContainer.classList.add("hide")
        btnCon.classList.add("hide")
        enableBoxes();
    }
    else if(type==="o"){
        videoElement.pause();
        for(let box of boxex){
            box.style.backgroundColor= "#1d3557";
        }
        countClick=0;
        sum=1
        turnO= true;
        check=false;
        displayNameContainer.classList.add("hide");
        playerNameContainer.classList.remove("hide");
        container.classList.add("hide")
        msgContainer.classList.add("hide")
        btnCon.classList.add("hide")
        enableBoxes();
        alertName=playerName
        socket.emit("disconnected", { name: playerName });
    }
    else{
        document.getElementById("user").style.color = 'black';
        document.getElementById("opponent").style.color = 'white';
        document.getElementById("user").style.backgroundColor='#affc41';
        document.getElementById("opponent").style.backgroundColor='';
        displayNameContainer.classList.remove("hide");
        resetGame();
    }
});

// HOME BUTTON 
resetBtn.addEventListener("click",function(){
    displayNameContainer.classList.remove("hide");
    
    // if anyone leave in middle game - > disconnect from both end and notify opponent
    if(type==='o' && onlineSecondaryCheck!=="p"){
        playerNameContainer.classList.add("hide");
        alertName=playerName;
        socket.emit("disconnected_home", { name: playerName });
        onlineSecondaryCheck="o"
    }else if(type==='o' && onlineSecondaryCheck==="p"){
        playerNameContainer.classList.add("hide");
        onlineSecondaryCheck="o"
    }
    resetGame();
    homeMenu();
});

resetHome.addEventListener("click",function(){
    videoElement.pause();
    playerNameContainer.classList.add("hide");
    spinner.classList.add("hide");
    document.getElementById('idInput').value = '';
    resetGame();
    homeMenu();
    socket.emit("disconnected_single", { name: playerName });
});



const buttons = document.querySelectorAll('.box');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(type==="s"){
            audioClickElement.play();
            if (turnO && button.textContent === '') {
                button.innerText ="O";
                button.style.color = 'white';
                turnO = false;
                button.disabled = true;
                countClick += 1;
                document.getElementById("user").style.backgroundColor='#5f0f40';
                document.getElementById("user").style.color = 'white';
                document.getElementById("opponent").style.color = 'black';
                document.getElementById("opponent").style.backgroundColor='#affc41';
                if(checkWinner(countClick, type)==false){
                    setTimeout(computerTurn, 1000);
                }
            }
        }

        else if (type=="m"){
            audioClickElement.play();
            if (turnO && button.textContent === '') {
                button.innerText ="O";
                button.style.color = 'white';
                turnO = false;
                button.disabled = true;
                countClick += 1;
                document.getElementById("user").style.backgroundColor='#5f0f40';
                document.getElementById("user").style.color = 'white';
                document.getElementById("opponent").style.color = 'black';
                document.getElementById("opponent").style.backgroundColor='#affc41';
                checkWinner(countClick, type)
            }
            else{
                button.innerText ="X";
                button.style.color = 'yellow';
                turnO = true;
                button.disabled = true;
                countClick += 1;
                document.getElementById("user").style.backgroundColor='#affc41';
                document.getElementById("user").style.color = 'black';
                document.getElementById("opponent").style.color = 'white';
                document.getElementById("opponent").style.backgroundColor='#5f0f40';
                checkWinner(countClick, type)
            }  
        }
        else if (type=="o"){
            if(sum%2 != 0 && value=="O"){
                audioClickElement.play();
                button.innerText=value;
                button.disabled = true;
                countClick += 1;
                socket.emit("playing",{value:value, id:button.id, name:playerName})
                checkWinner(countClick, type)
            }
            else if(sum%2 == 0 && value=="X"){
                audioClickElement.play();
                button.innerText=value;
                button.disabled = true;
                countClick += 1;
                socket.emit("playing",{value:value, id:button.id, name:playerName})
                checkWinner(countClick, type);
            }
            else{
                let whoseTurn;
                if(value=='X'){
                    whoseTurn='O';
                }else{
                    whoseTurn='X';
                }
                alert(`Not Your Turn, It's ${whoseTurn} Turn`)
            }
        }
    });
});


// single player function call
let singleBtn=document.querySelector("#single");
singleBtn.addEventListener("click",()=>{
    copyright.classList.add("hide");
    playerContainer.classList.add("hide");
    msgContainer.classList.add("hide");
    document.getElementById("user").innerText='YOU';
    document.getElementById("opponent").innerText='AI';
    document.getElementById("user").style.backgroundColor='#affc41';
    displayNameContainer.classList.remove("hide");
    container.classList.remove("hide");
    btnCon.classList.remove("hide");
    type="s";
})


// multi player function call
let multiBtn=document.querySelector("#multi");
multiBtn.addEventListener("click",()=>{
    copyright.classList.add("hide");
    playerContainer.classList.add("hide");
    msgContainer.classList.add("hide");
    document.getElementById("user").style.backgroundColor='#affc41';
    document.getElementById("user").innerText='PLAYER 1';
    document.getElementById("opponent").innerText='PLAYER 2';
    displayNameContainer.classList.remove("hide");
    container.classList.remove("hide")
    btnCon.classList.remove("hide")
    type="m";
})



// online player function call
let onlineBtn=document.querySelector("#online");
onlineBtn.addEventListener("click",()=>{
    copyright.classList.add("hide");
    playerContainer.classList.add("hide");
    playerNameContainer.classList.remove("hide");
    type="o";
})

const socket=io();
let playerName;
let searchPlayer=document.querySelector("#get");
searchPlayer.addEventListener("click",()=>{
    playerName=document.querySelector("#idInput").value;
    if (playerName == null || playerName == '') {
        alert("Please Enter a Name Before Searching");
    }else{
        spinner.classList.remove("hide");
        setTimeout(() => {
            socket.emit("find", { name: playerName });
        }, 1000); 
    }
})

function displayPlayerNameColorBox(e){
    let allPlayersArray=e.allPlayers;
    const foundObj=allPlayersArray.find(obj=>obj.p1.p1name==`${playerName}` || obj.p2.p2name==`${playerName}`)

    // changing color
    if ((foundObj.p1.p1name === `${playerName}` && foundObj.p1.p1color ==="G") || (foundObj.p2.p2name === `${playerName}` && foundObj.p2.p2color ==="G")){
        document.getElementById("user").style.backgroundColor='#affc41';
        document.getElementById("user").style.color = 'black';
        document.getElementById("opponent").style.color = 'white';
        document.getElementById("opponent").style.backgroundColor='#5f0f40';
    }
    else{
        document.getElementById("user").style.backgroundColor='#5f0f40';
        document.getElementById("user").style.color = 'white';
        document.getElementById("opponent").style.color = 'black';
        document.getElementById("opponent").style.backgroundColor='#affc41';
    }
}

socket.on("find",(e)=>{
    audioSearchElement.play();
    let allPlayersArray=e.allPlayers;
    let opponent
    const foundObj=allPlayersArray.find(obj=>obj.p1.p1name==`${playerName}` || obj.p2.p2name==`${playerName}`)

    if(foundObj.p1.p1name===playerName || foundObj.p2.p2name===playerName){
        spinner.classList.add("hide")
        playerNameContainer.classList.add("hide");
        displayNameContainer.classList.remove("hide");
        msgContainer.classList.add("hide");
        container.classList.remove("hide")
        btnCon.classList.remove("hide")
        displayPlayerNameColorBox(e);
        foundObj.p1.p1name==`${playerName}` ?  opponent=foundObj.p2.p2name : opponent=foundObj.p1.p1name
        foundObj.p1.p1name==`${playerName}` ? value=foundObj.p1.p1value : value=foundObj.p2.p2value
        document.getElementById("user").innerText=playerName;
        document.getElementById("opponent").innerText=opponent;
    }
})

socket.on("home",(e)=>{
    const foundObj=(e.allPlayers).find(obj=>obj.p1.p1name==`${playerName}` || obj.p2.p2name==`${playerName}`)
    if(typeof(foundObj)==='undefined' && typeof(foundObj)==='undefined'){
        for(let box of boxex){
            box.style.backgroundColor= "#1d3557";
        }
        countClick=0;
        sum=1
        turnO= true;
        check=false;
        displayNameContainer.classList.add("hide");
        playerNameContainer.classList.add("hide");
        playerContainer.classList.remove("hide");
        container.classList.add("hide")
        msgContainer.classList.add("hide")
        btnCon.classList.add("hide")
        enableBoxes();
        
        if(alertName!=playerName){
            alert("Game Aborted: Your opponent has disconnected. Returning to the main menu.");
        }
        alertName=""
    }
})

socket.on("playing",(e)=>{
    const foundObj=(e.allPlayers).find(obj=>obj.p1.p1name==`${playerName}` || obj.p2.p2name==`${playerName}`)
    if(typeof(foundObj)==='undefined' && typeof(foundObj)==='undefined'){
        for(let box of boxex){
            box.style.backgroundColor= "#1d3557";
        }
        countClick=0;
        sum=1
        turnO= true;
        check=false;
        displayNameContainer.classList.add("hide");
        playerNameContainer.classList.remove("hide");
        container.classList.add("hide")
        msgContainer.classList.add("hide")
        btnCon.classList.add("hide")
        enableBoxes();
        if(alertName!=playerName){
            alert("Game Aborted: Your opponent has disconnected. Returning to the main menu.");
        }
        alertName="";

    }
    else{
        p1id=foundObj.p1.p1move
        p2id=foundObj.p2.p2move
        displayPlayerNameColorBox(e);
        if(p1id!=''){
            document.getElementById(`${p1id}`).innerText="O"
            document.getElementById(`${p1id}`).style.color = 'white';
            document.getElementById(`${p1id}`).disabled=true;
        }
        if(p2id!=''){
            document.getElementById(`${p2id}`).innerText="X"
            document.getElementById(`${p2id}`).style.color = 'yellow';
            document.getElementById(`${p2id}`).disabled=true;
        }
        sum=foundObj.sum;
    }
})

socket.on("updateColors", (data) => {
    const isWinner = playerName === data.winnerName;

    // Check if winningBoxes is defined and an array
    if (Array.isArray(data.winningBoxes)) {
        data.winningBoxes.forEach(id => {
            const box = document.getElementById(id);
            if (box) {
                box.style.backgroundColor = isWinner ? data.winnerColor : data.loserColor;
            }
        });

        if(data.winningBoxes.length===0){
            showWinner("D");
        }
        else if(!isWinner){
            audioLoosingElement.play();

            playerName=data.winnerName;
            showWinner("e");
        }
    }

});

socket.on("disableButtons", () => {
    document.querySelectorAll(".box").forEach(button => {
        button.disabled = true;
    });
});







