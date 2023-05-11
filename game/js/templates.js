function htmlTemplate() {
    return `
    <div id="main-buttons">
        <div id="buttons">
            <button onclick="startGame()">Start</button>
            <button onclick="togglePopup()"> Keys </button>
        </div>

        <div id="ingameButtons" class="ingameButtons d-none">
            <div class="ingameBtn" id="background-sound"><button onclick="muteSound()"> <img
                        src="./img/soundon.png"></button></div>
        </div>
    </div>

    <div class="canvas-container">
        <canvas id="canvas" width="720" height="480">
           
        </canvas>

        <div id="buttons-for-mobile" >
            
            <div class="walk">
                <button id="buttonleft" onclick="mobileTouchControls()"> <img src="./img/leftarrow.png">
                </button>
                <button id="buttonright" onclick="mobileTouchControls()"> <img src="./img/rightarrow.png">
                </button>
            </div>

            <div class="jump-throw">
                <button id="jump" onclick="mobileTouchControls()"> <img src="./img/space.png"> </button>
                <button id="throw" onclick="mobileTouchControls()"> <img src="./img/bottle.png"> </button>
            </div>
        </div>
    </div>

    <div class="start-screen" id="start-screen">
        <img src="./img/9_intro_outro_screens/start/startscreen_2.png">
    </div>
    
    <div id="endScreen" class="end-screen d-none">
        <img src="./img/9_intro_outro_screens/game_over/game over.png">
        <div id="stats">
        </div>
    </div>

    
    <div id="deadScreen" class="end-screen d-none">
        <img src="img/9_intro_outro_screens/game_over/oh no you lost!.png">
        <p id="restart" class="colloumn">
            <span class="ingameBtnEnd" onclick="startGame()">Neustart</span>
            <span class="ingameBtnEnd2" onclick="reload()">Back To Menu</span>
        </p>
    </div>

    <div id="control" class="control d-none">
        <div class="infoControl d-none" id="infoControl">
            <div class="openControl d-none" id="openControl">
                <div id="keys">

                    <div class="colloumn">
                        <span class="colloumn"> <img src="./img/arrows.png"> <b> WALK </b></span>
                    </div>

                    <div class="colloumn">
                        <span class="colloumn"> <img src="./img/letter-d.png"> <b> THROW </b></span>
                    </div>

                    <div class="colloumn">
                        <span class="colloumn"> <img src="./img/space.png"> <b> JUMP </b></span>
                    </div>

                </div>
                <div class="close" onclick="togglePopupClose()" style="cursor: pointer"><span
                        style="font-size: 24px"> <img src="./img/close.png"> </span>
                </div>
            </div>
        </div>

}`;
}