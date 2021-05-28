export default {
    props: ["angazovanje", "naslov"],
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
        <th>ID-Radnik</th>
        <th>ID-Radno mesto</th>
        <th>Pocetak</th>
        <th>Kraj</th>
        <th>Plata</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="angaz in angazovanje">
        <td>{{angaz.id}}</td>
        <td>{{angaz.radnik_id}}</td>
        <td>{{angaz.radno_mesto_id}}</td>
        <td>{{angaz.pocetak}}</td>
        <td>{{angaz.kraj}}</td>
        <td>{{angaz.plata}}</td>
        <td><button v-on:click="$emit('uklanjanje', angaz.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...angaz})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
