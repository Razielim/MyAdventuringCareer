//     [900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918], //top 9
//     [971, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 919], //top 8
//     [970, 863, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 817, 920], //top 7
//     [969, 862, 755, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 715, 818, 921], //top 6
//     [968, 861, 754, 647, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 613, 716, 819, 922], //top 5
//     [967, 860, 753, 646, 539, 400, 401, 402, 403, 404, 405, 406, 407, 408, 511, 614, 717, 820, 923], //top 4
//     [966, 859, 752, 645, 538, 431, 300, 301, 302, 303, 304, 305, 306, 409, 512, 615, 718, 821, 924], //top 3
//     [965, 858, 751, 644, 537, 430, 323, 200, 201, 202, 203, 204, 307, 410, 513, 616, 719, 822, 925], //top 2
//     [964, 857, 750, 643, 536, 429, 322, 215, 100, 101, 102, 205, 308, 411, 514, 617, 720, 823, 926], //top 1
//     [963, 856, 749, 642, 535, 428, 321, 214, 107,   0, 103, 206, 309, 412, 515, 618, 721, 824, 927], //center
//     [962, 855, 748, 641, 534, 427, 320, 213, 106, 105, 104, 207, 310, 413, 516, 619, 722, 825, 928], //bottom 1
//     [961, 854, 747, 640, 533, 426, 319, 212, 211, 210, 209, 208, 311, 414, 517, 620, 723, 826, 929], //bottom 2
//     [960, 853, 746, 639, 532, 425, 318, 317, 316, 315, 314, 313, 312, 415, 518, 621, 724, 827, 930], //bottom 3
//     [959, 852, 745, 638, 531, 424, 423, 422, 421, 420, 419, 418, 417, 416, 519, 622, 725, 828, 931], //bottom 4
//     [958, 851, 744, 637, 530, 529, 528, 527, 526, 525, 524, 523, 522, 521, 520, 623, 726, 829, 932], //bottom 5
//     [957, 850, 743, 636, 635, 634, 633, 632, 631, 630, 629, 628, 627, 626, 625, 624, 727, 830, 933], //bottom 6
//     [956, 849, 742, 741, 740, 739, 738, 737, 736, 735, 734, 733, 732, 731, 730, 729, 728, 831, 934], //bottom 7
//     [955, 848, 847, 846, 845, 844, 843, 842, 841, 840, 839, 838, 837, 836, 835, 834, 833, 832, 935], //bottom 8
//     [954, 953, 952, 951, 950, 949, 948, 947, 946, 945, 944, 943, 942, 941, 940, 939, 938, 937, 936]  //bottom 9


var enemies_warehouse = [
    {id: 0, bg_index: 1, connectsTo: [101, 103, 105, 107]}, 
    {id: 101, bg_index: 2, connectsTo: [202]},
    {id: 103, bg_index: 3},
    {id: 105, bg_index: 4},
    {id: 107, bg_index: 13},
    {id: 202, bg_index: 5, connectsTo: [303]},
    {id: 303, bg_index: 6, connectsTo: [404]},
    {id: 404, bg_index: 7, connectsTo: [505]},
    {id: 505, bg_index: 8, connectsTo: [606]},
    {id: 606, bg_index: 9, connectsTo: [707]},
    {id: 707, bg_index: 10, connectsTo: [808]},
    {id: 808, bg_index: 11, connectsTo: [909]},
    {id: 909, bg_index: 12}
];

function findEnemyPlacementFromId(pId)
{
    if(pId == 0){
        return [0, 0]; //center
    }

    let tRing = Math.floor(pId/100);
    let tIndex = pId - (tRing * 100);
    let tX = 0, tY = 0, tAdj = (9 - tRing);

    //north
    if(tIndex <= (tRing * 2)) {
        tY = 9 - tRing;
        tX = tY + tIndex;
        return [(tX - 9) * 100, (tY - 9) * 100];
    }
    //east
    if(tIndex <= (tRing * 4)) {
        tX = 9 + tRing;
        tY = tAdj + (tIndex - (tRing * 2));
        return [(tX - 9) * 100, (tY - 9) * 100];
    }
    //south
    if(tIndex <= (tRing * 6)) {
        tY = 9 + tRing;
        tX = 18 - tAdj - (tIndex - (tRing * 4));
        return [(tX - 9) * 100, (tY - 9) * 100];
    }else{
        //west
        tX = 9 - tRing;
        tY = 18 - tAdj - (tIndex - (tRing * 6));
        return [(tX - 9) * 100, (tY - 9) * 100];
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
    for(let i = 0; i < enemies.length; i++) {
        if(enemies[i].id == pId){
            return enemies[i];
        }
    }
}

function createEnemyPlacement() 
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

        let tX_Offset = tPlacement[0];
        let tY_Offset = tPlacement[1];

        enemy.x_offset += tX_Offset;
        enemy.y_offset += tY_Offset;
    });
}

function formAllLines()
{
    let tCenterX = mStartWidth/2, tCenterY = mStartHeight/2;
    let tMinSize = 10;
    let tMonsterImageSizeHalf = 32;

    enemies_warehouse.forEach((enemy) => 
    {
        if(!enemy.connectsTo) {
            return;
        }

        let tId = enemy.id;
        let tPlacement = findEnemyPlacementFromId(tId);
        let tX = tCenterX + tPlacement[0] + (tMonsterImageSizeHalf - tMinSize/2);
        let tY = tCenterY + tPlacement[1] + (tMonsterImageSizeHalf - tMinSize/2);

        enemy.connectsTo.forEach((enemyOtherId) => 
        { 
            let tCurX = tX;
            let tCurY = tY;
            let tPlacementOther = findEnemyPlacementFromId(enemyOtherId);
            let tWidth = tPlacementOther[0] - tPlacement[0];
            let tHeight = tPlacementOther[1] - tPlacement[1];

            if(tWidth < 0){
                tCurX += tWidth;
                tWidth *= -1;
            }
            if(tWidth != 0){
                tCurX += tMonsterImageSizeHalf * 1.1;
                tWidth -= tMonsterImageSizeHalf * 1.9;
            }

            if(tHeight < 0){
                tCurY += tHeight;
                tHeight *= -1;
            }
            if(tHeight != 0){
                tCurY += tMonsterImageSizeHalf * 1.1;
                tHeight -= tMonsterImageSizeHalf * 1.9;
            }

            tWidth = Math.max(tWidth, tMinSize);
            tHeight = Math.max(tHeight, tMinSize);

            let tLine = {
                startId: tId, endId: enemyOtherId, showing: true, x_start: tCurX, y_start: tCurY, width: tWidth, height: tHeight 
            };
            vueComponents.enemyConnectionLines.push(tLine);
        });
    });
}