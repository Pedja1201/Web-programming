////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena nastavnika</b></p>
<div>
    <label>Licni ID: </label>
    <input type="number" v-model="nastavnik.licni_id" required></div>
<div>
    <label>Ime: </label>
    <input type="text" v-model="nastavnik.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="nastavnik.prezime" required></div>
<div>
    <label>E-mail: </label>
    <input type="email" v-model="nastavnik.email" required></div>
<div>
    <label>Broj telefona: </label>
    <input type="text" v-model="nastavnik.br_telefona" maxlength="15" required></div>
<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            nastavnik: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/nastavnici/${this.$route.params['licni_id']}`).then((response) => {
                this.nastavnik = response.data;
            });
        },
        update(){
            axios.put(`api/nastavnici/${this.$route.params['licni_id']}`, this.nastavnik).then((response) => {
                this.$router.push("/");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}