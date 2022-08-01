export default {
    template:`
<div  class="w-75 p-3">
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
            this.$router.push(`/studenti/${student.id}`);
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
            axios.put(`api/studenti/${student.id}`, student).then((response) => {
                this.refreshStudent();
            });
        },

        //brisanje//
        removeStudent(id){
            axios.delete(`api/studenti/${id}`).then((response) => {
                this.refreshStudent();
            });
        },
    },
    created(){
        this.refreshStudent();
    }
}