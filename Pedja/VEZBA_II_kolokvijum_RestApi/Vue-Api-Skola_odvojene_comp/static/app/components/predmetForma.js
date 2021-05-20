export default {
    props: ["predmet", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviPredmet: this.predmet ? this.predmet : {}
        }
    },

    watch: {
        predmet: function(newValue, oldValue){
            this.noviPredmet = {...this.predmet};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviPredmet})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>ID: </label>
    <input type="text" v-model="noviPredmet.id" required></div>
<div>
<div>
    <label>Ime predmeta: </label>
    <input type="text" v-model="noviPredmet.ime_predmeta" required></div>
<div>
    <label>Rezred: </label>
    <input type="text" v-model="noviPredmet.razred" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}