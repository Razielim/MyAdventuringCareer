
var enemies_warehouse = [
    {id: 0, bg_index: 1, connectsTo: [101, 103, 105, 107]}, 
    {id: 101, bg_index: 2},
    {id: 103, bg_index: 3},
    {id: 105, bg_index: 4},
    {id: 107, bg_index: 13},
    {id: 202, bg_index: 5},
    {id: 303, bg_index: 6},
    {id: 404, bg_index: 7},
    {id: 505, bg_index: 8},
    {id: 606, bg_index: 9},
    {id: 707, bg_index: 10},
    {id: 808, bg_index: 11},
    {id: 909, bg_index: 12}
];

function findEnemyPlacementFromId(pId)
{
    if(pId == 0){
        return [9, 9]; //center
    }

    let tRing = Math.floor(pId/100);
    let tIndex = pId - (tRing * 100);
    let tX = 0, tY = 0, tAdj = (9 - tRing);

    //north
    if(tIndex <= (tRing * 2)) {
        tY = 9 - tRing;
        tX = tY + tIndex;
        return [tY, tX];
    }
    //east
    if(tIndex <= (tRing * 4)) {
        tX = 9 + tRing;
        tY = tAdj + (tIndex - (tRing * 2));
        return [tY, tX];
    }
    //south
    if(tIndex <= (tRing * 6)) {
        tY = 9 + tRing;
        tX = 18 - tAdj - (tIndex - (tRing * 4));
        return [tY, tX];
    }else{
        //west
        tX = 9 - tRing;
        tY = 18 - tAdj - (tIndex - (tRing * 6));
        return [tY, tX];
    }
}

function makeEnemyFromId(pId) {
    let enemy = enemies_warehouse[pId];
    if(enemy.id == 0){
        enemy.unlocked = true;
    }else{
        enemy.unlocked = true;
    }
    enemy.x_offset = 0;
    enemy.y_offset = 0;
    return enemy;
}

function getEnemyFromId(pId) {
    for(var i = 0; i < enemies.length; i++) {
        if(enemies[i].id == pId){
            return enemies[i];
        }
    }
}