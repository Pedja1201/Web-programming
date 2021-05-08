export default {
    props: ["predmeti"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Ime predmeta</th>
        <th>Razred</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="predmet in predmeti">
        <td>{{predmet.id}}</td>
        <td>{{predmet.ime_predmeta}}</td>
        <td>{{predmet.razred}}</td>
        <td><button v-on:click="$emit('uklanjanje', predmet.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...predmet})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}