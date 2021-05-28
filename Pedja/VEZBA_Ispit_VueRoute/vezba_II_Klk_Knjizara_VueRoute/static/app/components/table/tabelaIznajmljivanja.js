export default {
    props: ["iznajmljivanja", "naslov"],
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
        <th>Korisnik ID</th>
        <th>Knjiga ID</th>
        <th>Datum iznajmljivanja</th>
        <th>Rok vracanja</th>
        <th>Datum vracanja</th>
        <th>Cena</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="iznajmi in iznajmljivanja">
        <td>{{iznajmi.id}}</td>
        <td>{{iznajmi.korisnik_id}}</td>
        <td>{{iznajmi.knjiga_id}}</td>
        <td>{{iznajmi.datum_iznajmljivanja}}</td>
        <td>{{iznajmi.rok_vracanja}}</td>
        <td>{{iznajmi.datum_vracanja}}</td>
        <td>{{iznajmi.cena}}</td>
        <td><button v-on:click="$emit('uklanjanje', iznajmi.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...iznajmi})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
