const fs = require('fs');

const writeFile = (file, data, opts = 'utf8') => {
    return promise = new Promise((resolve, reject) => {
            fs.writeFile(file, data, opts, (err) => {
                if (err) reject(err);
                resolve(`file ${file} created`);
            });
    });
};

module.exports = {
    writeFile
}