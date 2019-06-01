const moment = require('moment');
// const download = require('image-downloader');
const fs = require('fs');
const axios = require('axios');
const Path = require('path');

async function downloadImage(url, dest) {

    let index = url.lastIndexOf("/");
    let fileName = url.substr(index);
    fileName = fileName.substr(1);

    const path = Path.resolve(__dirname, dest, fileName);
    console.log(path)
    const writer = fs.createWriteStream(path);
    const response = await axios({
        url,
        method: 'GET',
        responseType : 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);

    });

}

const ParseTexte = (data, dest) => {
    return new Promise((resolve, reject) => {

        let date = moment(data.lastModified).format('DD/MM/YYYY');

        let text = '';

        text += `
        --------------------------------------------
        session : ${data.titre}
        auteur : ${data.auteur}
        description : ${data.description}
        localisation : ${data.localisation}
        editeur : ${data.institution}
        date : ${date}
        --------------------------------------------
        `;

        let chapitres = '';
        
        data.chapitres.forEach((item) => {
            
            chapitres += `
            --------------------------------------------------
            chapitre : ${item.titre}
            auteur : ${item.auteur}
            description : ${item.description}
            --------------------------------------------------
            `

            item.documents.forEach((item) => {
                let regex = /(https?:\/\/[^\s)]+)/g;
                if (!item.image) {
                    if (item.contenu.match(regex)) {
                        chapitres += `
                        ${item.contenu}
                        `;
                        // downloadImage(item.contenu.match(regex)[0], dest)
                        // .then((result) => console.log('download', item.image))
                        // .catch((error) => console.log('error', item.image, 'status', error.response.status));                                               
                    }
                    chapitres += `
                    ${item.contenu}
                    `;
                } else {
                    chapitres += `
                    ${item.image}
                    ${item.contenu}
                    `;
                    // downloadImage(item.image, dest)
                    //     .then((result) => console.log('download', item.image))
                    //     .catch((error) => console.log('error', item.image, 'status', error.response.status));
                }
               
            });
        });

        text += chapitres;

        if (!text) reject('no text');
        resolve(text);
        

    });
};

module.exports = {
    ParseTexte
}