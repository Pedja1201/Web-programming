export default {
    props: ["radnik", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviRadnik: this.radnik ? this.radnik : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     radnikZaIzmenu: {
    //         get : function(){
    //             return {...this.radnik};
    //         },
    //         set: function(novi){
    //             this.noviRadnik = {...novi};
    //         }
    //     }
    // },

    watch: {
        radnik: function(newValue, oldValue){
            this.noviRadnik = {...this.radnik};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviRadnik})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Ime: </label>
    <input type="text" v-model="noviRadnik.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="noviRadnik.prezime" required></div>
<div>
    <label>E-mail: </label>
    <input type="email" v-model="noviRadnik.email" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}