///Import tabela i formi

//Korisnik
import TabelaKorisnika from './components/table/tabelaKorisnika.js'
import KorisnikForma from './components/form/korisnikForma.js'

//Kupac
import TabelaKupca from './components/table/tabelaKupca.js'
import KupacForma from './components/form/kupacForma.js'

//Knjiga
import TabelaKnjiga from './components/table/tabelaKnjiga.js'
import KnjigaForma from './components/form/knjigaForma.js'


//Iznajmljivanje
import TabelaIznajmljivanja from './components/table/tabelaIznajmljivanja.js'
import IznajmljivanjeForma from './components/form/iznajmljivanjeForma.js'

//Porudzbina
import TabelaPorudzbine from './components/table/tabelaPorudzbine.js'
import PorudzbinaForma from './components/form/porudzbinaForma.js'

import TabelaBiblioteke from './components/table/tabelaBiblioteke.js'
import BibliotekaForma from './components/form/bibliotekaforma.js'



////Razdvojene componenete "main-js"
import Korisnici from './components/main-js/korisnici.js'
import KorisnikId from './components/main-js/korisnik_id.js'

import Kupci from './components/main-js/kupci.js'
import KupacId from './components/main-js/kupac_id.js'

import Knjige from './components/main-js/knjige.js'
import KnjigId from './components/main-js/knjiga_id.js'

import Iznajmljivanja from './components/main-js/iznajmljivanja.js'
import IznajmljivanjeId from './components/main-js/iznajmljivanje_id.js'

import Porudzbine from './components/main-js/porudzbine.js'
import PorudzbinaId from './components/main-js/porudzbina_id.js'

////Dodatni opis i informacije sajta
import Biblioteke from './components/main-js/bibliteke.js'
import BibliotekId from './components/main-js/biblioteka_id.js'


///review-stranice za pregled
import PregledBiblioteke from './components/review/viewBiblioteka.js'


///Rutiranje entiteta
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Korisnici},///Prikaz za stranice
        {path: "/:IDKorisnik", component: KorisnikId},//Pojedinacan prikaz

        {path: "/kupci", component: Kupci},///Prikaz za stranice
        {path: "/kupci/:IDKupac", component: KupacId},//Pojedinacan prikaz

        {path: "/knjige", component: Knjige},///Prikaz za stranice
        {path: "/knjige/:IDKnjiga", component: KnjigId},//Pojedinacan prikaz

        {path: "/iznajmljivanje", component: Iznajmljivanja},///Prikaz za stranice
        {path: "/iznajmljivanje/:IDIznajmljivanje", component: IznajmljivanjeId},//Pojedinacan prikaz

        {path: "/porudzbine", component: Porudzbine},///Prikaz za stranice
        {path: "/porudzbine/:IDPorudzbina", component: PorudzbinaId},//Pojedinacan prikaz

        ///Dodata tabela za odaber i podatke
        {path: "/biblioteke", component:Biblioteke },///Prikaz za stranice
        {path: "/biblioteke/:id", component: BibliotekId},//Pojedinacan prikaz


        ///review-stranice za pregled
        {path: "/pregledBiblioteke", component:PregledBiblioteke },///Prikaz za stranice

    ],
});

const app = Vue.createApp({});
app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-form', KorisnikForma);

app.component('tabela-kupca', TabelaKupca);
app.component('kupac-form', KupacForma);

app.component('tabela-knjiga', TabelaKnjiga);
app.component('knjiga-form', KnjigaForma);

app.component('tabela-iznajmljivanja', TabelaIznajmljivanja);
app.component('iznajmljivanje-form', IznajmljivanjeForma);

app.component('tabela-porudzbine', TabelaPorudzbine);
app.component('porudzbina-form', PorudzbinaForma);


app.component('tabela-biblioteke', TabelaBiblioteke);
app.component('biblioteka-form', BibliotekaForma);


app.use(router);
app.mount("#app");