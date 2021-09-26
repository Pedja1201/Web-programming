//Korisnik
import TabelaKorisnika from './components/tabelaKorisnika.js'
import KorisnikForma from './components/korisnikForma.js'

import TabelaStudenata from './components/tabelaStudenta.js'
import StudentForma from './components/studentForma.js'

import TabelaPredmeta from './components/tabelaPredmeta.js'
import PredmetForma from './components/predmetForma.js'

import TabelaPolaganja from './components/tabelaPolaganja.js'
import PolaganjeForma from './components/polaganjeForma.js'

import TabelaProfesora from './components/tabelaProfesora.js'
import ProfesorForma from './components/profesorForma.js'


///Razdvojene componente
import Korisnici from './components/main-js/korisnici.js'
import KorisnikId from './components/main-js/korisnik_id.js'

import Studenti from './components/main-js/studenti.js'
import StudentId from './components/main-js/student_id.js'

import Predmeti from './components/main-js/predmeti.js'
import PredmetId from './components/main-js/predmet_id.js'

import Polaganja from './components/main-js/polaganja.js'
import PolaganjeId from './components/main-js/polaganje_id.js'

import Profesori from './components/main-js/profesori.js'
import ProfesorId from './components/main-js/profesor_id.js'

////Logovanje
import Login from './components/login/login.js'
import Logout from './components/login/logout.js'


///Rutiranje entiteta
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Login},///Prikaz za stranice
        {path: "/logout", component: Logout},///Prikaz za stranice

        {path: "/korisnici", component: Korisnici},///Prikaz za stranice
        {path: "/korisnici/:id", component: KorisnikId},//Pojedinacan prikaz

        {path: "/studenti", component: Studenti},///Prikaz za kupce
        {path: "/studenti/:id", component: StudentId},//Pojedinacan prikaz

        {path: "/predmeti", component: Predmeti},///Prikaz za kupce
        {path: "/predmeti/:id", component: PredmetId},//Pojedinacan prikaz

        {path: "/profesori", component: Profesori},///Prikaz za kupce
        {path: "/profesori/:id", component: ProfesorId},//Pojedinacan prikaz

        {path: "/polaganja", component: Polaganja},///Prikaz za kupce
        {path: "/polaganja/:id", component: PolaganjeId},//Pojedinacan prikaz

    ],
});

const app = Vue.createApp({});
app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-form', KorisnikForma);


app.component('tabela-studenata', TabelaStudenata);
app.component('student-form', StudentForma);

app.component('tabela-predmeta', TabelaPredmeta);
app.component('predmet-form', PredmetForma);

app.component('tabela-polaganja', TabelaPolaganja);
app.component('polaganje-form', PolaganjeForma);

app.component('tabela-profesora', TabelaProfesora);
app.component('profesor-form', ProfesorForma);

app.use(router);
app.mount("#app");