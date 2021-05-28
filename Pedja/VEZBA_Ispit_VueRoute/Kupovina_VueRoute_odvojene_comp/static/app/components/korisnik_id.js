////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena Korisnika</b></p>
    <div>
        <label>Ime:</label>
        <input type="text" v-model="korisnik.ime" required>
    </div>
    <div>
        <label>Prezime:</label>
        <input type="text" v-model="korisnik.prezime" required>
    </div>
    <div>
        <label>Zanimanje:</label>
        <input type="text" v-model="korisnik.zanimanje" required>
    </div>
    <div>
        <label>ID-Nike:</label>
        <select v-model="korisnik.nike_id" required>
            <option v-for="nike in nikeShop" :value="nike.id">{{nike.odeca}},{{nike.obuca}}-{{nike.velicina}}</option>
        </select>
    </div>
    <div>
        <label>Auto-tablice:</label>
        <select v-model="korisnik.auto_tablice" required>
            <option v-for="auto in automobil" :value="auto.tablice">{{auto.marka}},{{auto.model}}-{{auto.godiste}}</option>
        </select>
    </div>

    <div>
        <input type="submit" v-bind:value="'Izmeni'">
    </div>
</form>
    `,
    data(){
        return {
            korisnik:{},
            nikeShop:{},
            automobil:{}
           
        }
    },
    methods:{
        refresh(){
            axios.get(`api/korisnici/${this.$route.params['id']}`).then((response) => {
                this.korisnik = response.data;
            });
            ///Select opcija-novoo!!
            axios.get("api/nike").then((response) => {
                this.nikeShop = response.data;
            });
            axios.get("api/auto").then((response) => {
                this.automobil = response.data;
            });
        },
        update(){
            axios.put(`api/korisnici/${this.$route.params['id']}`, this.korisnik).then((response) => {
                this.$router.push("/korisnici");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}