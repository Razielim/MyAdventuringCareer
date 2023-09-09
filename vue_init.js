


function define_adventure_components()
{
    Vue.component('adv_enemy', {
        props: ['item'],
        template: `<button class="adv_enemy absolute std_btn no-pz" 
        :style="{ 'background-image': 'url('  + 'assets/adventure/' + item.bg_index + '.png' + ')' }">
        </button>`
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
            <img src="assets/iconpack/icon_pp.png" width="30" height="30" class="left_entries">
            <point_counter_requirement v-bind:item = "game.resources[0][0]"></point_counter_requirement></div>`
    });
    Vue.component('standard_button', {
        props: ['item'],
        template: `<button class="absolute no-pz" style="width:{{ item.width }}px;height:{{ item.height }}px>
        {{ item.text }}
        </button>`
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

    var app = new Vue({ //create a new Vue environment
        el:"#app",  //on this div
        data:{  //with these variables we will use within this div as Vue variables
            game  //base object that will hold game variables and context
        },
    });
}