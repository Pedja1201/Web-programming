export default {
    props: ["porudzbine", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table>
<thead>
    <tr>
        <th>ID-Porudzbina</th>
        <th>ID-Knjiga</th>
        <th>ID-Kupac</th>
        <th>Kolicina</th>
        <th>Nacin placanja</th>
        <th>Valuta</th>
        <th>Datum porudzbine</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="poruceno in porudzbine">
        <td>{{poruceno.IDPorudzbina}}</td>
        <td>{{poruceno.IDKnjiga}}</td>
        <td>{{poruceno.IDKupac}}</td>
        <td>{{poruceno.kolicina}}</td>
        <td>{{poruceno.nacinPlacanja}}</td>
        <td>{{poruceno.valuta}}</td>
        <td>{{poruceno.datumPorudzbine}}</td>
        <td><button v-on:click="$emit('uklanjanje', poruceno.IDPorudzbina)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...poruceno})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}