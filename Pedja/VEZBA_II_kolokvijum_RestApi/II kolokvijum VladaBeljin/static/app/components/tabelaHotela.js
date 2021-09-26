export default {
    props: ["hoteli"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Naziv</th>
        <th>Adresa</th>
        <th>Akcije</th>
    </tr>
</thead>




<tbody>
    <tr v-for="hotel in hoteli">
        <td>{{hotel.id}}</td>
        <td>{{hotel.naziv}}</td>
        <td>{{hotel.adresa}}</td>
        <td><button v-on:click="$emit('uklanjanje', hotel.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...hotel})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
