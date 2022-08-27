const editJsonFile = require("edit-json-file");
const addressesFile = `${__dirname}/../addresses.json`;

const update = async function update(name, value) {
    console.log(`[update] Name: ${name}, value: ${value}`);
    let file = editJsonFile(addressesFile);
    file.set(name, value);
    file.save();
    file = editJsonFile(addressesFile, {
        autosave: true,
    });
};

const getValue = async function getValue(name) {
    let file = editJsonFile(addressesFile);
    const value = file.get(name);
    console.log(`[getValue] Name: ${name}, value: ${value}`);
    return value;
};

module.exports = {
    update: update,
    getValue: getValue,
};
