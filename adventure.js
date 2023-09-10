
var adventure_resources = [{id: 0, text: "", count: 0, required: 0}];

var updateMap = true, updateMapConnections = true;

function updateEnemyPlacement() 
{
    let tCenterX = mStartWidth/2, tCenterY = mStartHeight/2;

    enemies.forEach((enemy) => {
        enemy.x_offset = tCenterX;
        enemy.y_offset = tCenterY;

        let tId = enemy.id;
        if(tId == 0) {
            return;
        }

        let tPlacement = findEnemyPlacementFromId(tId);

        let tX_Offset = (tPlacement[1] - 9) * 100;
        let tY_Offset = (tPlacement[0] - 9) * 100;
        
        enemy.x_offset += tX_Offset;
        enemy.y_offset += tY_Offset;
    });

    updateMapConnections = true;
}

function updateCanvas()
{
    vueApp.vueCanvas.clearRect(0, 0, vueApp.vueCanvas.width, vueApp.vueCanvas.height);
    
    let tCenterX = mStartWidth/2, tCenterY = mStartHeight/2;

    enemies.forEach((enemy) => {
        if(!enemy.unlocked){
            return;
        }
        let connectedToEnemies = enemy.connectsTo;
        if(!connectedToEnemies) {
            return;
        }

        let tId = enemy.id;
        let tPlacement = findEnemyPlacementFromId(tId);

        let tX_Offset = (tPlacement[1] - 9) * 100;
        let tY_Offset = (tPlacement[0] - 9) * 100;
        let tXEnemy = tCenterX + tX_Offset;
        let tYEnemy = tCenterY + tY_Offset;
        
        connectedToEnemies.forEach((connectedEnemyId) => {
            let tPlacementOther = findEnemyPlacementFromId(connectedEnemyId);

            let tX_OffsetOther = (tPlacementOther[1] - 9) * 100;
            let tY_OffsetOther = (tPlacementOther[0] - 9) * 100;
            let tXEnemyOther = tCenterX + tX_OffsetOther;
            let tYEnemyOther = tCenterY + tY_OffsetOther;
            
            //Problem: Canvas is stretched and its coordinates do not line up anymore

            //console.log(tXEnemy + " " + tYEnemy + " " + tXEnemyOther + " " + tYEnemyOther);

            //vueApp.vueCanvas.moveTo(tXEnemy, tYEnemy);
            //vueApp.vueCanvas.lineTo(tXEnemyOther, tYEnemyOther);
        });
    });
    vueApp.vueCanvas.stroke();
}

//called 60 times a second
function update_adventure()
{
    if(updateMap) {
        updateMap = false;
        updateEnemyPlacement();
    }
    if(updateMapConnections){
        updateMapConnections = false;
        updateCanvas();
    }
}

function load_adventure_screen()
{
    game.topscreen = screens.ADVENTURE;
}