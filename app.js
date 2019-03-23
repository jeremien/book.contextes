
const axios = require('axios');
const { writeFile } = require('./utils/writeHtml');
const { makeCover, makeCopyright, makeHalftitle, makeChapitres, makeColophon } = require('./utils/makeHtml');

async function getContextes( titreSession = 'test' ) {

    try {

        const contextesDocuments = axios.post('http://contextes.io/methods/documents.get.documents', { session : titreSession });

        const [ documents ] = await Promise.all( [contextesDocuments] );

        const { _id, chapitres, ...session } = documents.data[0];

        const cover = makeCover(session);
        const copyright = makeCopyright(session);
        const halftitle = makeHalftitle(session);
        const chapitres_html = makeChapitres(chapitres);
        const colophon = makeColophon(session);
       
        return {
            cover : cover,
            copyright : copyright,
            halftitle : halftitle,
            section : chapitres_html,
            colophon : colophon
        };

    } catch (err) {
        console.error(err);
    }


}

(async () => {

    try {

        const body = await getContextes('test');

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