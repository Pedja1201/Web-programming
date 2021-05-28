////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena knjige</b></p>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="knjiga.naziv" required></div>
<div>
    <label>Autor: </label>
    <input type="text" v-model="knjiga.autor" required></div>
<div>
    <label>Kategorija: </label> 
    <input type="text" v-model="knjiga.kategorija" required></div>
<div>
    <label>Cena: </label> 
    <input type="number" v-model="knjiga.cena" required></div>
<div>
    <label>Stanje: </label> 
    <select v-model="knjiga.stanje" required>
        <option value="DA">Da</option>
        <option value="NE">Ne</option>
    </select>
<div>
    <label>Link: </label> 
    <input type="text" v-model="knjiga.link" required></div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            knjiga: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/knjige/${this.$route.params['IDKnjiga']}`).then((response) => {
                this.knjiga = response.data;
            });
        },
        update(){
            axios.put(`api/knjige/${this.$route.params['IDKnjiga']}`, this.knjiga).then((response) => {
                this.$router.push("/knjige");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}