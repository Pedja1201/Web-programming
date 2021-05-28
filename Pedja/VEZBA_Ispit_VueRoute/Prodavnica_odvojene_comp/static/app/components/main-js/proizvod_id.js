////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena proizvoda</b></p>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="proizvod.naziv" required></div>
<div>
    <label>Opis: </label>
    <textarea v-model="proizvod.opis" required></textarea></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="proizvod.cena" required></div>
<div>
    <label>Dostupno: </label>
    <select v-model="proizvod.dostupno">
        <option value="1">DA</option>
        <option value="0">NE</option>
    </select>
</div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            proizvod: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/proizvodi/${this.$route.params['id']}`).then((response) => {
                this.proizvod = response.data;
            });
        },
        update(){
            axios.put(`api/proizvodi/${this.$route.params['id']}`, this.proizvod).then((response) => {
                this.$router.push("/proizvodi");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}