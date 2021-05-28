////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena osiguravajuce kuce</b></p>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="kuca.naziv" required></div>
<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            kuca: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/osiguravajuceKuce/${this.$route.params['id']}`).then((response) => {
               this.kuca = response.data;
            });
        },
        update(){
            axios.put(`api/osiguravajuceKuce/${this.$route.params['id']}`, this.kuca).then((response) => {
                this.$router.push("/osiguravajuceKuce");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}