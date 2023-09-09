
var enemies_warehouse = [
    {id: 0, bg_index: 1}, 
    {id: 100, bg_index: 2},
    {id: 101, bg_index: 3},
    {id: 102, bg_index: 4},
    {id: 200, bg_index: 5},
    {id: 300, bg_index: 6},
    {id: 400, bg_index: 7},
    {id: 500, bg_index: 8},
    {id: 600, bg_index: 9}
];


function makeEnemyFromId(pId){
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