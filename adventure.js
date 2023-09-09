
var adventure_resources = [{id: 0, text: "", count: 0, required: 0}];

var updateMap = true;


function updateEnemyPlacement() 
{
    let tCenterX = mStartWidth/2, tCenterY = mStartHeight/2;
    enemies.forEach((enemy) => {
        enemy.x_offset = tCenterX;
        enemy.y_offset = tCenterY;

        let id = enemy.id;
        if(id == 0) {
            return;
        }
        if(id >= 100 && id <= 199){
            //Ring 1
            enemy.x_offset += 100;
            enemy.y_offset += 100;
            return;
        }
        if(id >= 200 && id <= 299){
            //Ring 2
            enemy.x_offset += 200;
            enemy.y_offset += 200;
            return;
        }
        if(id >= 300 && id <= 399){
            //Ring 3
            enemy.x_offset += 300;
            enemy.y_offset += 300;
            return;
        }
        if(id >= 400 && id <= 499){
            //Ring 4
            enemy.x_offset += 400;
            enemy.y_offset += 400;
            return;
        }
        if(id >= 500 && id <= 599){
            //Ring 5
            enemy.x_offset += 500;
            enemy.y_offset += 500;
            return;
        }
        if(id >= 600 && id <= 699){
            //Ring 6
            enemy.x_offset += 600;
            enemy.y_offset += 600;
            return;
        }
    });
}

//called 60 times a second
function update_adventure()
{
    if(updateMap) {
        updateMap = false;
        updateEnemyPlacement();
        
        // vueApp.vueCanvas.clearRect(0, 0, vueApp.vueCanvas.width, vueApp.vueCanvas.height);
        // vueApp.vueCanvas.rect(20, 20, 50, 100);
        // vueApp.vueCanvas.stroke();
    }
}

function load_adventure_screen()
{
    game.topscreen = screens.ADVENTURE;
}