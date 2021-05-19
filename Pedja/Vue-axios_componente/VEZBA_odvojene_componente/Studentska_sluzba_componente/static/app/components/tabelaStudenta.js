export default {
    props: ["studenti"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>Broj indeksa</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>E-mail</th>
        <th>Lozinka</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="student in studenti">
        <td>{{student.brojIndeksa}}</td>
        <td>{{student.ime}}</td>
        <td>{{student.prezime}}</td>
        <td>{{student.email}}</td>
        <td>{{student.lozinka}}</td>
        <td><button v-on:click="$emit('uklanjanje', student.brojIndeksa)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...student})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
