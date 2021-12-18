export default {
    props: ["korpe"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Korisnik ID</th>
        <th>Video igra ID</th>
        <th>Datum kupovine</th>
        <th>Cena</th>
        <th>Ocena</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="korpa in korpe">
        <td>{{korpa.id}}</td>
        <td>{{korpa.korisnik_id}}</td>
        <td>{{korpa.video_igra_id}}</td>
        <td>{{korpa.datum_kupovine}}</td>
        <td>{{korpa.cena}}</td>
        <td>{{korpa.ocena}}</td>
        <td><button v-on:click="$emit('uklanjanje', korpa.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...korpa})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
