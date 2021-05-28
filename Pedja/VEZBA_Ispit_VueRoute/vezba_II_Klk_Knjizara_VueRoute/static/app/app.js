
import TabelaKorisnika from './components/table/tabelaKorisnika.js'
import KorisnikForma from './components/form/korisnikForma.js'

import TabelaKnjige from './components/table/tabelaKnjiga.js'
import KnjigaForma from './components/form/knjigaForma.js'

import TabelaIznajmljivanja from './components/table/tabelaIznajmljivanja.js'
import IznajmljivanjeForma from './components/form/iznajmljivanjeForma.js'

///Razdvajanje componenti
import Korisnici from './components/main-js/korisnici.js'
import KorisnikId from './components/main-js/korisnik_id.js'

import Knjiga from './components/main-js/knjiga.js'
import KnjigaId from './components/main-js/knjiga_id.js'

import Iznajmljivanja from './components/main-js/iznajmljivanja.js'
import IznajmljivanjeId from './components/main-js/iznajmljivanje_id.js'

///Rutiranje entiteta
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Korisnici},///Prikaz za kupce
        {path: "/:id", component: KorisnikId},//Pojedinacan prikaz

        {path: "/knjige", component: Knjiga},///Prikaz za kupce
        {path: "/knjige/:id", component: KnjigaId},//Pojedinacan prikaz

        {path: "/iznajmljivanja", component: Iznajmljivanja},///Prikaz za kupce
        {path: "/iznajmljivanja/:id", component: IznajmljivanjeId},//Pojedinacan prikaz
    ],
});

const app = Vue.createApp({});

app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-forma', KorisnikForma);

app.component('tabela-knjiga', TabelaKnjige);
app.component('knjiga-forma', KnjigaForma);

app.component('tabela-iznajmljivanja', TabelaIznajmljivanja);
app.component('iznajmljivanje-forma', IznajmljivanjeForma);


app.use(router);
app.mount("#app");