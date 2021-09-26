export default {
    props: ["rezervacije"],
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
        <th>Hotel ID</th>
        <th>Datum rezervacije</th>
        <th>Rok</th>
        <th>Datum odlaska</th>
        <th>Cena</th>
        <th>Akcije</th>
    </tr>
</thead>



<tbody>
    <tr v-for="rezervacija in rezervacije">
        <td>{{rezervacija.id}}</td>
        <td>{{rezervacija.korisnik_id}}</td>
        <td>{{rezervacija.hotel_id}}</td>
        <td>{{rezervacija.datum_rezervacije}}</td>
        <td>{{rezervacija.rok}}</td>
        <td>{{rezervacija.datum_odlaska}}</td>
        <td>{{rezervacija.cena}}</td>
        <td><button v-on:click="$emit('uklanjanje', rezervacija.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...rezervacija})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
