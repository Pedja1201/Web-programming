export default {
    props: ["hotel", "dugme"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviHotel: this.hotel ? this.hotel : {}
        }
    },


    watch: {
        hotel: function(newValue, oldValue){
            this.noviHotel = {...this.hotel};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviHotel})">
<div>
    <label>Naziv: </label>
    <input type="text" v-model="noviHotel.naziv" required></div>
<div>
    <label>Adresa: </label>
    <input type="text" v-model="noviHotel.adresa" required></div>         

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}