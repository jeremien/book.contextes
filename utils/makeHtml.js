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

const makeTOC = (session, chapitres) => {

    let toc =  `<section id="toc">
                <h1>Table of content</h1>
                    <ul>
                        <li id="toc-introduction"><a href="#introduction">Introduction</a></li>
                        <li class="chap"><a href="#art-in-printing">Art in Printing</a></li>
                    </ul>
                </section>`

    return toc;

}

const makeIntroduction = (session) => {

    let intro = `<section id="introduction">
                    <h1>Introduction</h1>
                    <p>
                    <span class="smcap">Because</span> it is difficult to perfectly transfer a thought from one mind to another
                    it is essential that the
                    principal medium through which such transference is accomplished may be as perfect as it is possible to make
                    it.</p>
                </section>`

    return intro;
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
    makeTOC,
    makeIntroduction,
    makeChapitres,
    makeColophon
}