
const axios = require('axios');
const { writeFile } = require('./utils/writeData');
const { makeCover, makeCopyright, makeHalftitle, makeTOC, makeIntroduction, makeChapitres, makeColophon } = require('./utils/makeHtml');

async function getContextes( titreSession = 'test' ) {

    try {

        const contextesDocuments = axios.post('http://contextes.io/methods/documents.get.documents', { session : titreSession });

        const [ documents ] = await Promise.all( [contextesDocuments] );

        // console.log(documents.data[0])

        const { _id, chapitres, ...session } = documents.data[0];

        const cover = makeCover(session);
        const copyright = makeCopyright(session);
        const halftitle = makeHalftitle(session);
        const toc = makeTOC(session, chapitres);
        const introduction = makeIntroduction(session);
        const chapitres_html = makeChapitres(chapitres);
        const colophon = makeColophon(session);
       
        return {
            cover : cover,
            copyright : copyright,
            halftitle : halftitle,
            toc : toc,
            introduction : introduction,
            section : chapitres_html,
            colophon : colophon
        };

    } catch (err) {
        console.error(err);
    }


}

(async () => {

    try {

        const body = await getContextes('supra');

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
            ${body.toc}
            ${body.introduction}
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