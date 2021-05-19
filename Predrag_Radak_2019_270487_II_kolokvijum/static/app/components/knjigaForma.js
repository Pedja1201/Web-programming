export default {
    props: ["knjiga", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaKnjiga: this.knjiga ? this.knjiga : {}
        }
    },


    watch: {
        knjiga: function(newValue, oldValue){
            this.novaKnjiga = {...this.knjiga};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaKnjiga})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Naslov: </label>
    <input type="text" v-model="novaKnjiga.naslov" required></div>
<div>
    <label>Autor: </label>
    <input type="text" v-model="novaKnjiga.autor" required></div>         

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}