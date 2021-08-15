const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const master = require('./build/CampaignFactory.json')


const provider = new HDWalletProvider(
  'dutch program illegal seat million novel onion leader actress change cave above',
  'https://rinkeby.infura.io/v3/3fd3162e4e5a48c1868f2ef66bcde9ec'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const contract = await new web3.eth.Contract(JSON.parse(master.interface))
    .deploy({ data: master.bytecode,})
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', contract.options.address);
};

deploy();