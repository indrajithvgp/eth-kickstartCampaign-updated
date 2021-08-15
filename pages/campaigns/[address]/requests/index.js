import React from 'react'
import {Button, Table} from 'semantic-ui-react'
// import {Link} from '../../../routes'
import Link from 'next/link' 
import Layout from '../../../../components/Layout'
import Campaign from '../../../../ethereum/campaign'
import RequestRow from '../../../../components/RequestRow'


class RequestIndex extends React.Component {


    renderRows=()=>{
        return this.props.requests.map((request, index)=>{
            return (
                <RequestRow id={index} key={index} request={request} address={this.props.address} 
                approversCount={this.props.approversCount}  />
            )
        })
    }

    render() {
        const {Header, Row, HeaderCell, Body} = Table
        return (
            <Layout>
                <h3>Requests</h3>
                <Link href={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button style={{margin: "10px" }} floated = "right" color='teal'>Add Request</Button>  
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                    
                </Table>
            </Layout>
        )
    }
    
}

RequestIndex.getInitialProps=async(props)=>{
        const {address} = props.query
        const campaign = Campaign(address)
        // console.log(campaign)
        const requestCount = await campaign.methods.getRequestsCount().call()
        const approversCount = await campaign.methods.approversCount().call()

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) =>{
                return campaign.methods.requests(index).call()
            })
        )

        // console.log(requests)
        // console.log(requestCount)
        return {address, requests, requestCount, approversCount}

    }



export default RequestIndex
