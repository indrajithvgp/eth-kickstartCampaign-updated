const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname,'contracts', 'Kickstarter.sol');
const source = fs.readFileSync(contractPath, 'utf8')
const output = solc.compile(source).contracts

fs.ensureDirSync(buildPath)

for(let contract in output) {
    // console.log(contract)
    let name = contract.replace(':','');
    fs.outputJsonSync(
        path.resolve(buildPath, name + '.json'),
        output[contract]
    )
}
