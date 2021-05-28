export default {
    props: ["proizvodi", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Naziv</th>
        <th>Opis</th>
        <th>Cena</th>
        <th>Dostupno</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="proizvod in proizvodi">
        <td>{{proizvod.id}}</td>
        <td>{{proizvod.naziv}}</td>
        <td>{{proizvod.opis}}</td>
        <td>{{proizvod.cena}}</td>
        <td>{{proizvod.dostupno}}</td>
        <td><button v-on:click="$emit('uklanjanje', proizvod.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...proizvod})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
