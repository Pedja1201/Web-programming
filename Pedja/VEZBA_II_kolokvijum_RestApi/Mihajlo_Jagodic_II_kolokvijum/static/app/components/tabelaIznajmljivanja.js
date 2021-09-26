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
    <tr v-for="iznajmljivanje in iznajmljivanja">
        <td>{{iznajmljivanje.id}}</td>
        <td>{{iznajmljivanje.korisnik_id}}</td>
        <td>{{iznajmljivanje.knjiga_id}}</td>
        <td>{{iznajmljivanje.datum_iznajmljivanja}}</td>
        <td>{{iznajmljivanje.rok_vracanja}}</td>
        <td>{{iznajmljivanje.datum_vracanja}}</td>
        <td>{{iznajmljivanje.cena}}</td>
        <td><button v-on:click="$emit('uklanjanje', iznajmljivanje.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...iznajmljivanje})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
