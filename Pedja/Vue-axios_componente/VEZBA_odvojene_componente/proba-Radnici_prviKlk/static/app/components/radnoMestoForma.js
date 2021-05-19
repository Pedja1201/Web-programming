export default {
    props: ["mesto", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novoMesto: this.mesto ? this.mesto : {}
        }
    },


    watch: {
        mesto: function(newValue, oldValue){
            this.novoMesto = {...this.mesto};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novoMesto})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Naaziv: </label>
    <input type="text" v-model="novoMesto.naziv" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}