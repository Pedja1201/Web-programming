export default {
    props: ["iznajmljivanje", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table>
<thead>
    <tr>
        <th>ID-Iznajmljivanje</th>
        <th>ID-Kupac</th>
        <th>ID-Knjiga</th>
        <th>Kolicina</th>
        <th>Nacin placanja</th>
        <th>Valuta</th>
        <th>Period iznajmljivanja</th>
        <th>Datum porudzbine</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="iznajmiti in iznajmljivanje">
        <td>{{iznajmiti.IDIznajmljivanje}}</td>
        <td>{{iznajmiti.IDKupac}}</td>
        <td>{{iznajmiti.IDKnjiga}}</td>
        <td>{{iznajmiti.kolicina}}</td>
        <td>{{iznajmiti.nacinPlacanja}}</td>
        <td>{{iznajmiti.valuta}}</td>
        <td>{{iznajmiti.periodIznajmljivanja}}</td>
        <td>{{iznajmiti.datumPorudzbine}}</td>
        <td><button v-on:click="$emit('uklanjanje', iznajmiti.IDIznajmljivanje)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...iznajmiti})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}