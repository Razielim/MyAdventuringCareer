var vueApp;

let tickrate = 60.0;
let curVersion = "0.1";
var screens = {
    ADVENTURE: "adventure"
}

var general_resources = [{id: 0, text: "Progress Points", count: 0, required: 1000}];
var enemies = [];
var character = { name: "Adventurer", stats: [
    { showing: true, id: 0, name: "Attack", value: 50}, 
    { showing: true, id: 1, name: "Defense", value: 100}, 
    { showing: true, id: 2, name: "Attack Speed", value: 2.0}
]};

var vueComponents = { enemyConnectionLines: [] };

/**
 * Function that creates a new game object with an empty save file
 * @returns New blank game object
 */
function newGame()
{  
    return {
        topscreen: screens.ADVENTURE,
        version: curVersion,
        enemies: enemies,
        character: character,
        vueComponents: vueComponents,
        resources: [general_resources, adventure_resources]
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


















