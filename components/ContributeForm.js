import React, { Component} from 'react'
import {Form, Input, Message, Button} from "semantic-ui-react"
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import {withRouter} from 'next/router'

class ContributeForm extends Component {

    state={value:'', eMessage:"", loading:false}

    onSubmit = async(e)=>{
        e.preventDefault()
        this.setState({loading:true, eMessage:''})
        const campaign = Campaign(this.props.address)
        try{
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({from:accounts[0], value:web3.utils.toWei(this.state.value)})
            
            this.props.router.replace(`/campaigns/${this.props.address}`)
        }catch(e){
            this.setState({eMessage:e.message})
        }
        this.setState({loading:false, value:''})
    }

    render(){
        return (
            <Form onSubmit={this.onSubmit} error={this.state.eMessage}>
                <Form.Field>
                <label>Amount to contribute</label>
                <Input label='ether' type="text" value={this.state.value} onChange= {e=>this.setState({value:e.target.value})} labelPosition='right'/>
                </Form.Field>
                <Message error header= 'Oops!' content={this.state.eMessage}/>
                <Button loading={this.state.loading} primary>Contribute !</Button>
                
            </Form>
        )
    }
    
}

export default withRouter(ContributeForm)
