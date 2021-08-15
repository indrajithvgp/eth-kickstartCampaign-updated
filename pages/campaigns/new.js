import React, { Component} from 'react';
import Layout from "../../components/Layout"
import {Form, Button, Input, Message} from 'semantic-ui-react'
import instance from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
// import {Router} from '../../routes'
import { withRouter } from 'next/router'

class CampaignNew extends Component {

    state = {   
        minimumContribution:'',
        eMessage:'',
        loading:false
    }   

    onSubmit = async (e)=>{
        e.preventDefault();
        this.setState({loading:true, eMessage:''})
        try{
            const accounts = await new web3.eth.getAccounts()
            await instance.methods.createChildCampaign(this.state.minimumContribution).send({
            from:accounts[0]
        })
        this.props.router.push('/') 
        }catch(err){
            this.setState({eMessage:err.message})
        }
        this.setState({loading:false})
    }

    render(){
        return(
            <Layout>
            <Form onSubmit={this.onSubmit} error={this.state.eMessage}>
            <Form.Field>
            <label>Minimum Contribution</label>

            <Input label='wei' placeholder='Enter Amount' value={this.state.minimumContribution} onChange={event => 
                this.setState({minimumContribution:event.target.value})} labelPosition='right'/>
            </Form.Field>
            <Message error header= 'Oops!' content={this.state.eMessage}/>
            <Button loading={this.state.loading} primary>Create</Button>
            
            </Form>
            
            </Layout>
        );
    }
}

export default withRouter(CampaignNew);