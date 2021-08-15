import React,{Component} from 'react'
import {Form, Button, Message, Input} from 'semantic-ui-react'
import Campaign from '../../../../ethereum/campaign'
import web3 from '../../../../ethereum/web3'
// import {Link, Router} from '../../../routes'
import {withRouter} from 'next/router' 
import Layout from '../../../../components/Layout'
import Link from 'next/link'


class RequestNew extends Component {

    state = {value:'', description:'', recipient:'', loading:false, eMessage:''}

    onSubmit = async(e)=>{
        e.preventDefault()
        const campaign = Campaign(this.props.address);
        const {description, value, recipient} = this.state;
        this.setState({loading:true, eMessage:''})
        try{
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({from:accounts[0]})
            this.props.router.push(`/campaigns/${this.props.address}/requests`)
        }catch(err){
            console.log(this.state.eMessage)
            console.log(err)
            this.setState({eMessage:err.message})
        }

        this.setState({loading:false})
    }

    render() {
        console.log(this.props.router)
        return (
            <Layout>
            <Link href={`/campaigns/${this.props.address}/requests`}>
                <a>
                    <Button primary>Back</Button>
                </a>
            </Link>
            <h2>Create a Request</h2>
            <Form onSubmit={this.onSubmit} error={!!this.state.eMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input value={this.state.description} onChange={e=>this.setState({description:e.target.value})}/>
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input value={this.state.value} onChange={e=>this.setState({value:e.target.value})}/>
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input value={this.state.recipient} onChange={e=>this.setState({recipient:e.target.value})}/>
                </Form.Field>
                <Message error header = "Oops!" content={this.state.eMessage}/>
                <Button loading={this.state.loading} primary>Create!</Button>
            </Form>
            </Layout>
        )
    }
}

RequestNew.getInitialProps=async(props)=> {
        const {address} = props.query
        return {address}

    }


export default withRouter(RequestNew)
