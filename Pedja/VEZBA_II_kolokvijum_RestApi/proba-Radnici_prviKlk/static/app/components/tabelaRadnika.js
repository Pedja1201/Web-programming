export default {
    props: ["radnici"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>E-mail ID</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="radnik in radnici">
        <td>{{radnik.id}}</td>
        <td>{{radnik.ime}}</td>
        <td>{{radnik.prezime}}</td>
        <td>{{radnik.email}}</td>
        <td><button v-on:click="$emit('uklanjanje', radnik.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...radnik})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
