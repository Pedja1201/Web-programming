export default {
    props: ["transakcije"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Datum</th>
        <th>Kolicina</th>
        <th>Artikl ID</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="transakcija in transakcije">
        <td>{{transakcija.id}}</td>
        <td>{{transakcija.datum}}</td>
        <td>{{transakcija.kolicina}}</td>
        <td>{{transakcija.artikl_id}}</td>
        <td><button v-on:click="$emit('uklanjanje', transakcija.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...transakcija})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
