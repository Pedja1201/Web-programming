export default {
    props: ["porudzbine", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-success table-striped">
<thead>
    <tr>
        <th>ID-Porudžbina</th>
        <th>ID-Knjiga</th>
        <th>ID-Kupac</th>
        <th>Količina</th>
        <th>Način plaćanja</th>
        <th>Valuta</th>
        <th>Datum porudžbine</th>
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
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', poruceno.IDPorudzbina)">Ukloni</button>
            <button class="btn btn-info" v-on:click="$emit('izmena', {...poruceno})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}