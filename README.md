# RIS Recepti Projekt

Projekt RIS Recipe Project je spletna aplikacija za upravljanje in prikaz receptov. 
Sestavljen je iz Spring Boot zalednega dela (backend) in React uporabniškega vmesnika (frontend).

**Vizija:**
>Vaša digitalna kuharska knjiga za vaše najljubše recepte – vse na enem mestu,
vedno pri roki za ustvarjanje, urejanje in uporabo.

## Člani ekipe
- Iva Janeva
- Nađa Tomović
- Veljko Stojanović
## Struktura projekta
```
── ris-recipe-project/
   ├── vaja1Ris/                 # Backend – Spring Boot projekt
   │   ├── src/main/java/...     # Java izvorna koda (controllerji, modeli, DAO)
   │   ├── src/main/resources/   # Konfiguracijske datoteke in HTML/JS/CSS
   │   ├── pom.xml               # Maven konfiguracija
   │
   ├── frontend/                 # Frontend – React aplikacija
   │   ├── src/                  # Komponente in glavni React elementi
   │   ├── public/               # HTML in favicon
   │   ├── package.json          # Odvisnosti in skripte za zagon
   │
   └── README.md
   ```


## Razvojno okolje in tehnologije
- **Frontend:** React.js 18.2.0, uporabniški vmesnik
- **Backend:** Java 17+, Spring Boot 3.2.0, REST API za delo z recepti
- **Baza podatkov:** MySQL 8.0.32, data.sql - začetni podatki ob zagonu
- **Docker:** Docker 24.0.5 in Docker Compose 2.21.0 za enostavno namestitev in zagon aplikacije
- **Maven:** Maven 3.9.1 za upravljanje backend odvisnosti
- **Node.js & npm:** Node.js v18.17.1, npm 9.6.7 za upravljanje frontend odvisnosti
- **Git/GitHub:** za nadzor verzij 

## Standardi kodiranja
- **Java:** Backend sledi standardom Spring Boot REST konvencij.
- **React/JS:** Frontend uporablja komponente v Reactu z razdelitvijo po funkcionalnostih.
- **SQL:** standardne SQL izjave za ustvarjanje in vstavljanje podatkov
- Imena spremenljivk in metod so v camelCase, razredi v PascalCase.
  Koda je urejena in berljiva, vsak razred ali komponenta ima jasno odgovornost.

## Navodila za namestitev

### Predpogoji
- Java JDK 17+
- Docker in Docker Compose
- Node.js(v18 ali novejši) in npm
- Maven

### Namestitev backend-a
1. Odprite terminal v `vaja1Ris/` mapi.
2. Zaženite ukaz:
   ```bash
   mvn spring-boot:run
   ```
3. Zaženite aplikacijo preko Dockerja:
   ```bash
   docker-compose up --build
   ```
## Zagon frontend-a

1. Odprite terminal v `frontend/` mapi projekta.

2. Namestite potrebne odvisnosti:
   ```bash
   npm install 
   ```
3. Zaženite aplikacijo v razvojni obliki:
   ```bash
   npm start
   ```
4. Odprite brskalnik in pojdite na: http://localhost:3000

### Dostop do aplikacije:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8083
- **MySQL baza:** localhost:3309

## Navodila za razvijalce / Git

Če želite prispevati k projektu ali delati lokalno kopijo:

1. Klonirajte repozitorij:
   ```bash
   git clone <https://github.com/ivajaneva/ris-recipe-project>
   ```
2. Pojdite v mapo projekta:
   ```bash   
   cd ris-recipe-project
   ```
3. Dodajte spremembe in naredite commit
   ```bash   
   git add .
   git commit -m "Opis sprememb"
   ```
4. Potisnite spremembe v GitHub:
   ```bash   
   git push origin main
   ```


 

