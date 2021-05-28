export default {
    template:`
<div>
    <student-form v-bind:naslov="'Dodaj Studenta'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createStudent"></student-form>

    <tabela-studenata v-bind:naslov="'Tabela studenata'" v-bind:studenti="studenti" v-on:uklanjanje="removeStudent" v-on:izmena="setStudentZaIzmenu"></tabela-studenata>
</div>
    `,
    data(){
        return {
            studenti:[],
    
            studentZaIzmenu:{},
            
        }
    },
    methods:{
        setStudentZaIzmenu(student){ //skladistenje nakon izmene//
            this.$router.push(`/${student.brojIndeksa}`);
        },

        refreshStudent(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/studenti").then((response) => {
                this.studenti = response.data;
            });
        },

        //dodavanje//
        createStudent(student){
            axios.post("api/studenti", student).then((response) => {
                this.refreshStudent();
            });
        },

        //izmena//
        updateStudent(student){
            axios.put(`api/studenti/${student.brojIndeksa}`, student).then((response) => {
                this.refreshStudent();
            });
        },

        //brisanje//
        removeStudent(brojIndeksa){
            axios.delete(`api/studenti/${brojIndeksa}`).then((response) => {
                this.refreshStudent();
            });
        },
    },
    created(){
        this.refreshStudent();
    }
}