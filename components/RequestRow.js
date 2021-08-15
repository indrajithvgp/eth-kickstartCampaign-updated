import React, { Component } from 'react'
import {Table, Button} from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'
import {withRouter} from 'next/router'

class RequestRow extends Component {

    onApprove=async()=>{
        const accounts = await web3.eth.getAccounts()
        const campaign = Campaign(this.props.address)
        await campaign.methods.approveRequest(this.props.id).send({from:accounts[0]})
        this.props.router.push(`/compaigns/${this.props.address}/requests`)
    }

    onFinalize=async()=>{
        const accounts = await web3.eth.getAccounts()
        const campaign = Campaign(this.props.address)
        await campaign.methods.pushRequest(this.props.id).send({from:accounts[0]})
        this.props.router.push(`/compaigns/${this.props.address}/requests`) 
    }


    render() {
        const {Row, Cell} = Table
        const {id,request, approversCount}= this.props

        return (
            <Row disabled={request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{`${web3.utils.fromWei(request.value, 'ether')} ETH`}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount} </Cell>

                <Cell>{ request.complete ? null: (
                    <Button  color='green'  onClick={this.onApprove}>Approve</Button>)
                }</Cell>
                <Cell>{request.complete ?null:(
                    <Button color='orange'  onClick={this.onFinalize}>Finalize</Button>)
                }</Cell>

                
                
            </Row>
        )
    }
}


export default withRouter(RequestRow)