export default {
    props: ["mesto", "dugme", "naslov"],
    emits: ["sacuvaj"],
    data(){
        return{
            novoRadnoMesto: this.mesto ? this.mesto : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     radnoMestoZaIzmenu: {
    //         get : function(){
    //             return {...this.mesto};
    //         },
    //         set: function(novi){
    //             this.novoRadnoMesto = {...novi};
    //         }
    //     }
    // },

    watch: {
        mesto: function(newValue, oldValue){
            this.novoRadnoMesto = {...this.mesto};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novoRadnoMesto})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="novoRadnoMesto.naziv" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}