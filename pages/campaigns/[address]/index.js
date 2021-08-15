import React, { Component} from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../components/ContributeForm'
// import {Link} from '../../routes'
import Link from 'next/link' 

class CampaignShow extends Component {


    renderCards(){

        const {balance, manager, minimumContribution, requestCounts,approversCounts} = this.props
        const items = [{
            header:manager,
            meta:"Address of Manager",
            description:'Manager created this campaign and can create requests to withdraw money',
            style:{overflowWrap: 'break-word'}
        },{
            header:minimumContribution,
            meta:`Minimum Contribution in "WEI"`,
            description:'You must contribute above wei to become an approver',
        },{
            header:requestCounts,
            meta:`Number of Requests`,
            description:''
        },{
            header:approversCounts,
            meta:`Number of Approvers`,
            description:''
        },{
            header:web3.utils.fromWei(balance, 'ether'),
            meta:`Balance stored in this Campaign`,
            description:''
        }]
        return <Card.Group items={items}/>
    }
    render() {
        return(
            <Layout>
                <h3>Compaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link href = {`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                        
                    </Grid.Row>
                </Grid>                
            </Layout>
        )
    }
}


CampaignShow.getInitialProps=async(props)=>{
        const campaign=Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call()
        // console.log(summary)
        return {
            address: props.query.address,
            minimumContribution:summary[0],
            balance:summary[1],
            requestCounts:summary[2],
            approversCounts:summary[3],
            manager:summary[4]

        };
    }

export default CampaignShow
