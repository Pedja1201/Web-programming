export default {
    props: ["studenti", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-success table-striped">
<thead>
    <tr>
        <th>ID</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>E-mail</th>
        <th>Lozinka</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="student in studenti">
        <td>{{student.id}}</td>
        <td>{{student.ime}}</td>
        <td>{{student.prezime}}</td>
        <td>{{student.email}}</td>
        <td>{{student.lozinka}}</td>
        <td><button class="btn btn-light me-3" v-on:click="$emit('uklanjanje', student.id)">Ukloni</button>
            <button class="btn btn-light" v-on:click="$emit('izmena', {...student})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
