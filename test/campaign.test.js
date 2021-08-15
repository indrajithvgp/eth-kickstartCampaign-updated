const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');

const web3 =  new Web3(ganache.provider());

const compiledMaster = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign=  require('../ethereum/build/Campaign.json')

let accounts, factory, campaignAddress, campaign;

beforeEach("Kickstarter Project", async() => {
    accounts = await new web3.eth.getAccounts()
//create master contract
    factory = await new web3.eth.Contract(JSON.parse(compiledMaster.interface))
    .deploy({data:compiledMaster.bytecode})
    .send({from:accounts[0], gas:'1000000'})
//enable child function
    await factory.methods.createChildCampaign('100').send({from:accounts[0], gas:'1000000'});
//get deplyed address of child contracts
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
//create new child contract
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress)

})

describe('Testing Kickstarter Project...',()=>{
    it('...deploys a master and child contract', ()=>{
        // console.log(accounts)
        // console.log(factory)
        // console.log(compaign)
        // console.log(compaignAddress);
        assert.ok(factory.options.address)
        assert.ok(campaign.options.address)
    })

    it('...marks caller as compaign manager', async()=>{
        const manager = await campaign.methods.manager().call()
        assert.equal(accounts[0], manager)
    })

    it('...allows individual to contribute and approvers added', async()=>{
        await campaign.methods.contribute().send({from:accounts[1], value: '200'})
        const isTrue = await campaign.methods.approvers(accounts[1]).call()
        // console.log(isTrue)
        assert(isTrue)
    })

    it('...check of minimum contribution', async()=>{
        try{
            await campaign.methods.contribute().send({from:accounts[1], value: '99'})
            assert(false)
        }catch(err){
            // console.log(err.results)
            assert(err)
        }
    })

    it("...check manager has access to make request", async()=>{

        await campaign.methods.createRequest('Buy sensors', '100', accounts[1])
        .send({from:accounts[0], gas:'1000000'})
        const request = await campaign.methods.requests(0).call()
        // console.log(request)
        assert.equal(100, request.value)

    })

    it("...processes request", async()=>{
        await campaign.methods.contribute().send({from:accounts[0], value: web3.utils.toWei('10','ether')})

        await campaign.methods.createRequest('A', web3.utils.toWei('5','ether'), accounts[1])
        .send({from:accounts[0], gas:'1000000'})

        await campaign.methods.approveRequest(0).send({from:accounts[0], gas:'1000000'})

        const res = await campaign.methods.requests(0).call()

        // console.log(res)

        await campaign.methods.pushRequest(0).send({from:accounts[0], gas:'1000000'})

        let bal = await web3.eth.getBalance(accounts[1])

        bal = web3.utils.fromWei(bal, 'ether')

        // console.log(parseFloat(bal))

        assert(parseFloat(bal) > 104)
    })

})