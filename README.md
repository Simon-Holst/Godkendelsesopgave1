# StudieGig (godkendelsesopgave 2)

StudieGig er en demo-app til kurset "Innovation og ny teknologi" (CBS). Appen viser idéen om en tosidet platform, der matcher studerende med korte, fleksible opgaver fra virksomheder på tværs af fagområder (marketing, dataanalyse, IT, admin), så de kan opbygge CV-relevant erfaring i stedet for et almindeligt studiejob.

Version 1 (godkendelsesopgave 1) viste kun studenter-siden med statiske mock-data. Version 2 bygger videre på feedbacken:

- **Begge sider af platformen** i én app: skift mellem "Studerende" og "Virksomhed" under Profil.
- **Data huskes** efter appen lukkes (AsyncStorage): opgaver, ansøgninger, rolle og filter.
- **Virksomheder** kan oprette opgaver med gennemsigtigt prisoverslag og vælge mellem ansøgere.
- **Studerende** kan følge status på deres ansøgninger og filtrere opgaver efter lokation og radius.

## Kør appen

```bash
npm install
npx expo login
npx expo start
```

Scan QR-koden med Expo Go (iOS/Android), eller kør i simulator via `i` / `a` i terminalen.

## Hvem har kodet hvad

| Del | Filer | Kodet af |
|---|---|---|
| Version 1 (godkendelsesopgave 1) | Opgaveliste, Opgavedetalje, Profil | Simon Holst |
| Fase 1: fundament (datamodel, AsyncStorage, context, rollebaseret navigation, rolleskift) | `data/`, `context/AppContext.js`, `App.js`, `styles/GlobalStyle.js`, eksisterende screens | Simon Holst |
| Modul A: Opret opgave (virksomhed) | `screens/OpretOpgaveScreen.js`, `styles/OpretOpgaveStyle.js` | [navn] |
| Modul B: Mine opgaver og ansøgere (virksomhed) | `screens/MineOpgaverScreen.js`, `styles/MineOpgaverStyle.js` | [navn] |
| Modul C: Mine ansøgninger (studerende) | `screens/MineAnsoegningerScreen.js`, `styles/MineAnsoegningerStyle.js` | [navn] |
| Modul D: Filter, lokation og radius (studerende) | `screens/FilterScreen.js`, `styles/FilterStyle.js`, `utils/` | [navn] |

## Link til demovideo

Godkendelsesopgave 2: [SÆT LINK IND HER]

Godkendelsesopgave 1: (https://youtube.com/shorts/VwBviYJ8sMU?feature=share)
