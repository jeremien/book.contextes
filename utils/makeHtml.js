const MarkdownIt = require('markdown-it');
const moment = require('moment');

md = new MarkdownIt();

const makeCover = (data) => {

    let cover = `<section id="cover">
            <h1>${data.titre}</h1>
            <h2 id="author">${data.auteur}</h2>
            </section>`;

    return cover;
}

const makeCopyright = (data) => {

    let copyright = `<section id="copyright">
            </section>
        `;
    return copyright;
}

const makeHalftitle = (data) => {

    // console.log(data)

    let date = moment(data.lastModified).format('DD/MM/YYYY')

    let halftitle = `<section id="halftitle">
            <hgroup>
            <h1>${data.titre}</h1>
            <h2>${data.auteur}</h2>
            </hgroup>
            <p class="printer">
                <p>${data.institution}</p>
                <p>${data.localisation}</p>
                <p>${date}</p>
            </p>
            </section>`;
    
    return halftitle;

}

const makeTOC = (session, chapitres) => {

    // console.log(session, chapitres)

    // let toc =  `<section id="toc">
    //             <h1>Sommaire</h1>
    //                 <ul>
    //                     <li id="toc-introduction"><a href="#introduction">Introduction</a></li>
    //                     <li class="chap"><a href="#art-in-printing">Art in Printing</a></li>
    //                 </ul>
    //             </section>`;

    let toc = `<section id="toc">
                <h1>Sommaire</h1>
                    <ul>
                        <li id="toc-introduction"><a href="#introduction">Introduction</a></li>`;
    
    chapitres.forEach((item) => {
        console.log(item.titre)
        toc += `<li class="chap"><a href="#${item.titre}">${item.titre}</a></li>`;
    });

    toc += `</ul></section>`;

    return toc;

}

const makeIntroduction = (session) => {

    // console.log(session)

    let intro = `<section id="introduction">
                    <h1>Introduction</h1>
                    <p>${session.description}</p>
                </section>`;

    return intro;
}

const makeChapitres = (data) => {

    let html = [];

    data.forEach( (element, index) => {

        let { titre, description, documents } = element;

        let chapitre = `<section id="${titre}" class="chapter" data-chapter="${index + 1}"><h1>${titre}</h1>`;

        if (documents.length !== 0) {
            documents.forEach( (element) => {
                if (element.image) {
                    let html = md.render(element.contenu);
                    chapitre += `<p><img src="${element.image}" /><br>${html}</p>`;
                } else {
                    let html = md.render(element.contenu);
                    chapitre += `<p>${html}</p>`;
                }
            });
        }

        chapitre += `</section>`;

        html.push(chapitre);

    });

    return html.join(' ');

}

const makeColophon = (data) => {
    let colophon = ` <section id="colophon">
            
            </section>`;
    
    return colophon;
}

module.exports = {
    makeCover,
    makeCopyright,
    makeHalftitle,
    makeTOC,
    makeIntroduction,
    makeChapitres,
    makeColophon
}