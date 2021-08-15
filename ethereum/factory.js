import web3 from './web3';

import Master from './build/CampaignFactory.json';

// const ADDRESS = "0x8c4508B686B2212b9cD36474e5BFA7C2C34Bf604"

const ADDRESS = "0x61FCA3a6cf096e6B5d7b4546107675f87254ed07"

const instance = new web3.eth.Contract (JSON.parse(Master.interface), ADDRESS )

export default instance