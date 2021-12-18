import fs from 'fs';

export const updateFile = (filePath, data) => {
    fs.writeFile(filePath, JSON.stringify(data), error => {
        if(error) throw new Error(error.message);
    });
};

export const getDataFromFile = (filePath) =>{
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

