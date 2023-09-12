
var adventure_resources = [{id: 0, text: "", count: 0, required: 0}];

//called 60 times a second
function update_adventure()
{
    //
}

function load_adventure_screen()
{
    game.topscreen = screens.ADVENTURE;
}

function clickedEnemy(pEnemy)
{
    unlockEnemyFromKill(pEnemy.id);
}