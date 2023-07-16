var game;

var tickrate = 30.0;
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


/**
 * Function that creates a new game object with an empty save file
 * @returns New blank game object
 */
function newGame()
{  
    return {
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
}



function game_loop()
{
    update_state();
}



function start_game_context()
{
    load_adventure_screen();    
    var loopTimer = setInterval(game_loop, 1000/tickrate);
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

    init_vue();  //with the game object created, a Vue environment can be created that uses the game object as its data

    start_game_context();
}



















