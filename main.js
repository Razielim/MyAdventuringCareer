var vueApp;

var tickrate = 60.0;
var curVersion = "0.1";
var screens = {
    ADVENTURE: "adventure"
}

var overlays = {
    NONE: "none",
    HELP: "help",
    SHOP: "shop"
}

var general_actions = [{id: 0, text: "Settings", unlocked: true}];
var general_resources = [{id: 0, text: "Progress Points", count: 0, required: 1000}];
var general_upgrades = [{id: 0, text: "NYI", unlocked: false, active: false}];
var enemies = [];

var mStartWidth = window.innerWidth, mStartHeight = window.innerHeight;
var mInterfaceOffsetX = -mStartWidth/2, mInterfaceOffsetY = -mStartHeight/2;
var mInterfaceXMax = mStartWidth/2, mInterfaceYMax = mStartHeight/2;
var mInterfaceX = mInterfaceOffsetX, mInterfaceY = mInterfaceOffsetY, mDiffX = 0, mDiffY = 0, mLastX = -1, mLastY = -1;
var mMouseClickX, mMouseClickY, mMouseLastX, mMouseLastY;
var mMouseDown = false;

function updateScreenPos(pX, pY)
{
    var tElements = document.getElementsByClassName("posmove");
    Array.prototype.forEach.call(tElements, function(tElement) {
        tElement.style.left = (mStartWidth / 2 + pX) + "px";
        tElement.style.top = (mStartHeight / 2 + pY) + "px";
    });
}

function mouseUpdate() 
{
    var tX = mInterfaceX + mDiffX;
    var tY = mInterfaceY + mDiffY;
    if(tX == mLastX && tY == mLastY){
        return;
    }

    updateScreenPos(tX, tY);
    mLastX = tX; mLastY = tY;
}

function mouseDown(pEvent) 
{
    if (pEvent.button !== 0) { 
        return; 
    }

    mMouseClickX = [pEvent.pageX];
    mMouseClickY = [pEvent.pageY];
    mMouseDown = true;
}
  
function mouseUp(pEvent) 
{
    mMouseDown = false;
    mInterfaceX += mDiffX;
    mInterfaceY += mDiffY;
    mDiffX = 0; mDiffY = 0;
}

function mouseMove(pEvent) 
{
    let tMouseCurX = pEvent.pageX, tMouseCurY = pEvent.pageY;
    if (mMouseDown) 
    {
      mDiffX = tMouseCurX - mMouseClickX;
      mDiffY = tMouseCurY - mMouseClickY;

      if(mInterfaceX + mDiffX > mInterfaceXMax + mInterfaceOffsetX || mInterfaceX + mDiffX < -mInterfaceXMax + mInterfaceOffsetX){
        mDiffX = mMouseLastX - mMouseClickX;
      }else{
        mMouseLastX = tMouseCurX;
      }
      if(mInterfaceY + mDiffY > mInterfaceYMax + mInterfaceOffsetY || mInterfaceY + mDiffY < -mInterfaceYMax  + mInterfaceOffsetY){
        mDiffY = mMouseLastY - mMouseClickY;
      }else{
        mMouseLastY = tMouseCurY;
      }
    }
}

/**
 * Function that creates a new game object with an empty save file
 * @returns New blank game object
 */
function newGame()
{  
    return {
        topscreen: screens.ADVENTURE,
        //subscreen: screens.EDUCATION.ACTIONS,
        version: curVersion,
        overlay: overlays.NONE,
        enemies: enemies,
        resources: [general_resources, adventure_resources]
        //upgrades: [general_upgrades, education_upgrades, education_spark_upgrades]
    }
}

/**
 * Saves a game onto a save file
 */
function save_game()
{
    localStorage.setItem("myadventuringcareer", btoa(JSON.stringify(game)));
}

/**
 * Loads a saved game from a given save and return the loaded game object
 * This function may be extended if variables of the game object change between versions and have to be converted or added
 * @returns Loaded game object
 */
function loadSaveGame(save)
{
    game = newGame();
    version = save.version;
    if(version != curVersion)
    {
        game = save; //update this in the future with additions/conversions if versions change variables
    }else{
        game = save;
    }
    game.version = curVersion;
    console.log(version + " old version");
    console.log(curVersion + " new version");
    return game; 
}




function update_state()
{
    update_adventure();
    mouseUpdate();
}



function game_loop()
{
    if(!vueApp){
        return;
    }

    update_state();
}



function start_game_context()
{
    load_adventure_screen();    
    setInterval(game_loop, 1000/tickrate);
}


function init_enemies()
{
    for(var i = 0; i < enemies_warehouse.length; i++){
        enemies.push(makeEnemyFromId(i));
    }
}


/**
 * First called function on html body's onload() that creates a game context either from a savefile or from a fresh save
 */
function load_game()
{
    try{
        let save = JSON.parse(atob(localStorage.getItem("myadventuringcareer")));
        if(save == null || save == undefined){
            game = newGame();
        }else{
            game = newGame(); //For testing: start newGames always
            //game = loadSaveGame(save);
            //console.log(game);
        }
    }catch(tEx)
    {
        //console.log(tEx);
        game = newGame();
    }
    
    vueApp = init_vue();  //with the game object created, a Vue environment can be created that uses the game object as its data
    
    init_enemies();

    start_game_context();
}



document.body.addEventListener('mousedown', (tEvent) => { mouseDown(tEvent) });
document.body.addEventListener('mouseup', (tEvent) => { mouseUp(tEvent) });
document.onmousemove = mouseMove;


















