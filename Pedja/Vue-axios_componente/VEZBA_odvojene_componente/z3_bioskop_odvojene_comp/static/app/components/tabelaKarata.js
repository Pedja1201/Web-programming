export default {
    props: ["bioskop"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Naziv projekcije</th>
        <th>Pocetak</th>
        <th>Kraj</th>
        <th>Broj sedista</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="karta in bioskop">
        <td>{{karta.id}}</td>
        <td>{{karta.naziv_projekcije}}</td>
        <td>{{karta.pocetak}}</td>
        <td>{{karta.kraj}}</td>
        <td>{{karta.br_sedista}}</td>
        <td><button v-on:click="$emit('uklanjanje', karta.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...karta})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}