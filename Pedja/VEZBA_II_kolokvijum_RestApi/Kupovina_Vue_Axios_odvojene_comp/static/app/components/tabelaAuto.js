export default {
    props: ["automobil"],
    emits: ["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>Tablice</th>
        <th>Marka</th>
        <th>Model</th>
        <th>Godiste</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="auto in automobil">
        <td>{{auto.tablice}}</td>
        <td>{{auto.marka}}</td>
        <td>{{auto.model}}</td>
        <td>{{auto.godiste}}</td>
        <td><button v-on:click="$emit('uklanjanje', auto.tablice)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...auto})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}

