import { html } from "lit-html";
import { router } from "../router.js";

/**
 * Assignment Description Page
 */

// Template functions for better organization
const introSection = () => html`
    <section class="content-section">
        <h2>Na úvod</h2>
        <p>
            Tvojou úlohou je pripraviť <strong>plne responzívnu stránku podľa dizajnu</strong>.
            Všetky potrebné informácie o projekte (štruktúra, použité technológie, dostupné
            endpointy) nájdeš v <code>README.md</code>.
        </p>
        <p>
            Projekt je v stave, ako keby na ňom už niekto začal pracovať, a ty sa teraz musíš
            zorientovať v jeho/jej kóde aby si dokončil/a zadanú úlohu.
        </p>
    </section>
`;

const rulesSection = () => html`
    <section class="content-section">
        <h2>Zopár pravidiel</h2>
        <ul>
            <li>
                <strong>Prezri si existujúci kód</strong> a skús pokračovať v podobnom duchu
                (súborová štruktúra, názvy tried (BEM), ...)
            </li>
            <li>píš iba čisté scss/css (žiadny Tailwind, Bootstrap, ...)</li>
            <li>vanilla JavaScript only</li>
            <li>
                ak potrebuješ použiť externé js knižnice - neni problém, len nám pri odovzdaní napíš
                aj dôvod, prečo si sa ich rozhodol/rozhodla použiť
            </li>
            <li>fonty si stiahni do projektu a použi lokálne (nie priamo z google fonts)</li>
            <li>
                obrázky si exportuj z figmy a použi tie - z endpointov ti prídu iba placeholders
            </li>
        </ul>
    </section>
`;

const designSection = () => html`
    <section class="content-section">
        <h2>Design to Code</h2>

        <h3>Desktop</h3>
        <ul>
            <li>4 sekcie: hlavný banner, cta banner, produkty, a box kategórií</li>
            <li>modálne okno s formulárom</li>
            <li>posnaž sa o čo najvernejšie preklopenie dizajnu (almost pixel perfect)</li>
        </ul>

        <h3>Responzivita</h3>
        <ul>
            <li>navrhnutá je iba mobilná verzia hlavného banneru</li>
            <li>zvyšok je na tebe, chceme vidieť aké máš vizuálne cítenie</li>
            <li>záležať si daj hlavne s rozlíšeniami 375px a 1024px</li>
            <li>
                ostatné rozlíšenia nemusia byť dokonalé, ale nič nemôže byť rozbité (pretekanie
                contentu a tak)
            </li>
        </ul>
    </section>
`;

const optimizationsSection = () => html`
    <section class="content-section">
        <h2>Optimalizácie</h2>
        <h3>Dynamický obsah</h3>
        <p>
            nikdy sa nesmieš spoliehať na to, že ti prídu pekné dáta ako v dizajne. Treba
            zabezpečiť, aby sa nič nerozbilo, aj keď napr.:
        </p>
        <ul>
            <li>prídu oveľa dlhšie/kratšie texty než očakávaš</li>
            <li>dostaneš viac/menej položiek ako v dizajne</li>
            <li>neprídu žiadne dáta</li>
        </ul>

        <h3>Accessibility</h3>
        <p>
            nedávno vstúpil do platnosti
            <a
                href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0882"
                target="_blank"
                >European accessibility act</a
            >. Podľa neho musí byť stránka dostupná pre všetkých používateľov, aj pre ľudí so
            zrakovým, sluchovým či pohybovým znevýhodnením.
        </p>
        <p>
            Netreba aby si si teraz všetko naštudoval/a, ale bolo by fajn ak by stránka spĺňala
            aspoň tie najzákladnejšie accessibility pravidlá.
        </p>

        <h3>Podpora</h3>
        <p>
            Stránka musí vyzerať dobre na všetkých moderných prehliadačoch -
            <strong>Chrome, Firefox, Safari, a Edge</strong>.
        </p>
    </section>
`;

const functionalitySection = () => html`
    <section class="content-section">
        <h2>Funkcionalita</h2>
        <h3>Pridanie do košíka</h3>
        <ul>
            <li>
                po kliknutí na tlačidlo "Pridať do košíka" zobraz peknú success notifikáciu s textom
                koľko kusov produktu bolo pridaných do košíka
            </li>
            <li>
                ak sa používateľ bude snažiť pridať viac ako 10 kusov, zobraz warning s informáciou
                o prekročení max. množstva
            </li>
        </ul>

        <h3>Formulár v modálnom okne</h3>
        <ul>
            <li>po kliknutí na tlačidlo "Získať tajnú ponuku" zobraz modal okno s formulárom</li>
            <li>implementuj peknú validáciu - povinné polia, formát emailu a telefónu</li>
            <li>
                email treba overiť aj pomocou API endpointu
                <code>emailApi.js - validateEmail</code>. Request posielaj iba ak má email správny
                formát
            </li>
            <li>po úspešnom odoslaní formulára zobraz success správu</li>
        </ul>
    </section>
`;

const filesSection = () => html`
    <section class="content-section">
        <h2>Dôležité odkazy</h2>

        <h3>Dizajn</h3>
        <p>
            <strong>Figma:</strong>
            <a
                href="https://www.figma.com/design/L8iHTTSuVInkhYTRYfbLhP/FE-assignment?node-id=0-1&m=dev"
                target="_blank"
                rel="noopener noreferrer"
            >
                https://www.figma.com/design/L8iHTTSuVInkhYTRYfbLhP/FE-assignment
            </a>
            <br />
            Kompletný dizajn stránky.
        </p>

        <h3>Fonty</h3>
        <p>
            <strong>Wix Madefor Display:</strong>
            <a
                href="https://fonts.google.com/specimen/Wix+Madefor+Display"
                target="_blank"
                rel="noopener noreferrer"
            >
                https://fonts.google.com/specimen/Wix+Madefor+Display
            </a>
            <br />
            Použitý pre nadpisy a výrazné texty.
        </p>
        <p>
            <strong>DM Sans:</strong>
            <a
                href="https://fonts.google.com/specimen/DM+Sans"
                target="_blank"
                rel="noopener noreferrer"
            >
                https://fonts.google.com/specimen/DM+Sans
            </a>
            <br />
            Použitý pre bežný text a odseky.
        </p>

        <h3>Kontakt</h3>
        <p>
            <strong>E-mail:</strong>
            <a href="mailto:igor.sloboda@riesenia.com"> igor.sloboda@riesenia.com </a>
            <br />
            V prípade akýchkoľvek otázok alebo nejasností ohľadom zadania.
        </p>
    </section>
`;

const submissionSection = () => html`
    <section class="content-section">
        <h2>Odovzdanie</h2>
        <p>Riešenie hoď na github a zazdieľaj nám prístup na e-maily:</p>
        <ul>
            <li>igor.sloboda@riesenia.com</li>
            <li>tomas.saghy@riesenia.com</li>
        </ul>
    </section>
`;

const ctaSection = () => {
    const handleClick = (e) => {
        e.preventDefault();
        router.navigate("/solution");
    };

    return html`
        <div class="cta-section">
            <p>Pripravený/á?</p>
            <a href="/solution" class="btn btn-primary" @click=${handleClick}> Poďme na to!</a>
        </div>
    `;
};

// Main page template
export const renderAssignmentPage = () => {
    return html`
        <div class="l-container">
            <div class="l-assignment">
                <h1 class="l-assignment__title">Zadanie pre frontend developera</h1>

                ${introSection()} ${rulesSection()} ${designSection()} ${functionalitySection()}
                ${optimizationsSection()} ${filesSection()} ${submissionSection()} ${ctaSection()}
            </div>
        </div>
    `;
};
