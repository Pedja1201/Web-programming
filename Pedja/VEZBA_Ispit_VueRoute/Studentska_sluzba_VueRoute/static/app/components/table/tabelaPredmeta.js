export default {
    props: ["predmeti", "naslov"],
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
        <th>Profesor</th>
        <th>ESPB</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="predmet in predmeti">
        <td>{{predmet.id}}</td>
        <td>{{predmet.naziv}}</td>
        <td>{{predmet.profesor}}</td>
        <td>{{predmet.espb}}</td>
        <td><button v-on:click="$emit('uklanjanje', predmet.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...predmet})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
