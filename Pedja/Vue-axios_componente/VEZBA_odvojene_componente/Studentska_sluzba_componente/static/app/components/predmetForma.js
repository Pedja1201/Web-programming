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
    <label>Naziv: </label>
    <input type="text" v-model="noviPredmet.naziv" required></div>
<div>
    <label>Profesor: </label>
    <input type="text" v-model="noviPredmet.profesor" required></div>
<div>
    <label>ESPB: </label>
    <input type="number" v-model="noviPredmet.espb" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}