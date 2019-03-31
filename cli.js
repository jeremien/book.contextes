const axios = require('axios');
const fs = require('fs');
const moment = require('moment');

const { writeFile } = require('./utils/writeData');
const { ParseTexte } = require('./utils/parseData');

async function getContextes ( titreSession = 'test' ) {

    try {

        const contextesDocuments = axios.post('http://contextes.io/methods/documents.get.documents', { session : titreSession });
        const [ documents ] = await Promise.all( [contextesDocuments] );
        // const { _id, chapitres, ...session } = documents.data[0];
        
        return documents.data[0];

    } catch (err) {
        console.log(err);
    }

}

async function main (titreSession) {

    const currentPath = process.cwd();
    const root_folder = `${currentPath}/data/${titreSession}`;

    try {

        if (!fs.existsSync(root_folder)) {
            fs.mkdirSync(root_folder);
        }

        const data = await getContextes(titreSession);

        // // export json
        const data_json = JSON.stringify(data);
        const write_json = await writeFile(`${root_folder}/${titreSession}.json`, data_json);

        // // export text
        const data_text = await ParseTexte(data, root_folder);
        const write_text = await writeFile(`${root_folder}/${titreSession}.txt`, data_text);

    } catch (err) {
        console.log(err);
    }
};

const args = process.argv.slice(2);

main(args[0]);