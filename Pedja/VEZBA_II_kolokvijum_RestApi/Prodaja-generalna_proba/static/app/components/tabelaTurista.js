export default {
    props: ["turisti"],
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
        <th>Datum rodjenja</th>
        <th>Maticni broj</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="turista in turisti">
        <td>{{turista.id}}</td>
        <td>{{turista.ime}}</td>
        <td>{{turista.prezime}}</td>
        <td>{{turista.datum_rodjenja}}</td>
        <td>{{turista.maticni_broj}}</td>
        <td><button v-on:click="$emit('uklanjanje', turista.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...turista})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}