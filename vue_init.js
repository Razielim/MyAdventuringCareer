


function define_adventure_components()
{
    Vue.component('adv_enemy', {
        props: ['item', 'x_offset', 'y_offset'],
        template: `<button v-on:click="clickedEnemy(item)" class="adv_enemy absolute std_btn" 
        :style="{ 'background-image': 'url('  + 'assets/adventure_enemies/' + item.id + '.png' + ')',  
                 'left': item.x_offset + 'px', 'top': + item.y_offset + 'px'}">
        </button>`
    });
    Vue.component('enemy_connection_line', {
        props: ['item'],
        template: `<div class="line absolute"
        :style="{ 'left': item.x_start + 'px', 'top': + item.y_start + 'px', 
                'height': item.height + 'px', 'width': item.width + 'px'}">
        </div>`
    });
    Vue.component('char_stat_entry', {
        props: ['item'],
        template: `<div id="char_stat_entry" class="text-dark p-1">
            <div class="stat_icon"  :style="{ 'background-image': 'url('  + 'assets/iconpack/' + item.id + '.png' + ')', 'float':'left' }"></div>
            <div class="p-1 d-flex">{{ item.name }}: {{ item.value }}</div>
        </div>`
    });
    Vue.component('char_stats_tab', {
        props: ['char'],
        template: `<div id="char_stats_tab" class="absolute bg-light text-dark p-3 border rounded">
            <div>{{  char.name }}</div>
            <table>
                <tr class="blank_row"><td></td></tr>
                <tr v-for="stat in char.stats">
                    <td>
                        <char_stat_entry v-if="stat.showing" v-bind:item="stat"></char_stat_entry>
                    </td>
                </tr>
            </table>
        </div>`
    });
}


function define_misc_components()
{
    Vue.component('point_counter_standard', {
        props: ['item'],
        template: `<div>{{  Math.round(item.count) }}</div>`
    });
    Vue.component('point_counter_requirement', {
        props: ['item'],
        template: `<div>{{  Math.round(item.count) }}/{{  Math.round(item.required) }}</div>`
    });
    Vue.component('top_pane_holder', {
        template: `<div><div class="left_entries"><div>Stage 1: Learn Adventuring!</div> <div>Clear Reward: First Skill Point</div>
            </div><div class="right_entries centered_vertically tooltippable">
                <span class="tooltiptext" style="width: 120px;">Progress Points</span>
            <img src="assets/iconpack/icon_pp.png" width="32" height="32" class="left_entries">
            <point_counter_requirement v-bind:item = "game.resources[0][0]"></point_counter_requirement></div>`
    });
}


function define_Vue_components()
{
    define_adventure_components();
    //etc.
    define_misc_components();
}


function init_vue()  //this function is called as part of an onload() function (load_game()) for the html body
{
    define_Vue_components(); //calls definitions for special Vue components to be used in the html to be made

    return new Vue({ //create a new Vue environment
        el:"#app",  //on this div
        data:{  //with these variables we will use within this div as Vue variables
            game  //base object that will hold game variables and context
        }
    });
}