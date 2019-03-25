const MarkdownIt = require('markdown-it');

md = new MarkdownIt();

const makeCover = (data) => {

    let cover = `<section id="cover">
            <h1>${data.titre}</h1>
            <h2 id="author">${data.auteur}</h2>
            <p id="booktitle">${data.titre}</p>
            </section>`

    return cover;
}

const makeCopyright = (data) => {

    let copyright = `<section id="copyright">
            <p>Made with paged.js</p>
            <p>Source: Project Gutenberg</p>
            </section>
        `
    return copyright;
}

const makeHalftitle = (data) => {

    let halftitle = `<section id="halftitle">
            <hgroup>
            <h1>${data.titre}</h1>
            <h2>${data.auteur}</h2>
            </hgroup>
            <p class="printer">
                ${data.localisation}
            <br /> The Imperial Press
            <br /> 1903
            </p>
            </section>`
    
    return halftitle;

}

const makeChapitres = (data) => {

    let html = [];

    data.forEach( (element, index) => {

        let { titre, description, documents } = element;

        let chapitre = `<section id="${titre}" class="chapter" data-chapter="${index + 1}"><h1>${titre}</h1><p>${description}</p>`;

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
            <h1>Colophon</h1>
            <h2>Made with paged.js</h2>
            </section>`
    
    return colophon;
}

module.exports = {
    makeCover,
    makeCopyright,
    makeHalftitle,
    makeChapitres,
    makeColophon
}