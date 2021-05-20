export default {
    props: ["auto", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviAuto: this.auto ? this.auto : {}
        }
    },


    watch: {
        auto: function(newValue, oldValue){
            this.noviAuto = {...this.auto};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviAuto})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Registarski broj: </label>
    <input type="text" v-model="noviAuto.registarski_broj" required></div>
<div>
    <label>Marka: </label>
    <input type="text" v-model="noviAuto.marka" required></div>
<div>
    <label>Model: </label>
    <input type="text" v-model="noviAuto.model" required></div>
<div>
    <label>Zapremina motora: </label>
    <input type="number" v-model="noviAuto.zapremina_motora" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}