
const axios = require('axios');
const { writeFile } = require('./utils/writeHtml');

async function getContextes() {

    try {

        const contextesSessions = axios('http://contextes.io/publications/sessions');
        const contextesDocuments = axios('http://contextes.io/publications/documents');

        const [ sessions, documents ] = await Promise.all( [contextesSessions, contextesDocuments] );
        // console.log(sessions.data.sessions[0].titre) 
        // console.log(documents.data.documents) 

        let cover = `<section id="cover">
        <h1>${sessions.data.sessions[0].titre}</h1>
        <h2 id="author">${sessions.data.sessions[0].auteur}</h2>
        <p id="booktitle">${sessions.data.sessions[0].titre}</p>
        </section>`

        let copyright = `<section id="copyright">
            <p>Made with paged.js</p>
            <p>Source: Project Gutenberg</p>
            </section>
        `

        let halftitle = `<section id="halftitle">
            <hgroup>
            <h1>${sessions.data.sessions[0].titre}</h1>
            <h2>${sessions.data.sessions[0].auteur}</h2>
            </hgroup>
            <p class="printer">
                Cleveland
            <br /> The Imperial Press
            <br /> 1903
            </p>
            </section>`

        let chapitre = `<section id="titre-chapitre" class="chapter" data-chapter="1"><h1>titre chapitre 1</h1>`;

        if (documents.data.documents) {
            documents.data.documents.forEach((item) => {
                chapitre += "<p>" + item.contenu + "</p>";
            });
        }
        
        chapitre += "</section>";

        let colophon = ` <section id="colophon">
            <h1>Colophon</h1>
            <h2>Made with paged.js</h2>
            </section>`

        return {
            cover : cover,
            copyright : copyright,
            halftitle : halftitle,
            section : chapitre,
            colophon : colophon
        };

    } catch (err) {
        console.error(err);
    }


}

(async () => {

    try {

        const body = await getContextes();

        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>book</title>
                <link rel="stylesheet" href="style.css">
                <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>

            </head>
            <body>
            ${body.cover}
            ${body.copyright}
            ${body.halftitle}
            ${body.section}
            ${body.colophon}
            </body>
            </html>
         `
        const res = await writeFile('./src/index.html', html);

    } catch(err) {

        console.error(err);
    
    }

})();