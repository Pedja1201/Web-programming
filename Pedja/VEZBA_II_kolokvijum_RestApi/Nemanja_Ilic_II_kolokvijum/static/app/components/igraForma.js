export default {
    props: ["igra", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaIgra: this.igra ? this.igra : {}
        }
    },


    watch: {
        igra: function(newValue, oldValue){
            this.novaIgra = {...this.igra};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaIgra})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="novaIgra.naziv" required></div>
<div>
    <label>Zanr: </label>
    <input type="text" v-model="novaIgra.zanr" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}