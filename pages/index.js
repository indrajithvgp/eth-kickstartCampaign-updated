import React, { Component }from "react";
import '../ethereum/factory';
import instance from "../ethereum/factory";
import {Card, Button} from 'semantic-ui-react'
import Layout from "../components/Layout"
import Link from 'next/link'

class CampaignIndex extends Component {

    renderCampaigns(){
        const items = this.props.campaigns.map((address)=>{
            return {
                header: address,
                description: <Link href={`/campaigns/${address}`}><a>View Campaign</a></Link>,
                fluid: true
            }
        })

        return <Card.Group items={items}/>
    }

    render() {
        return(
            <Layout>
            <div>
            
            <h3>Open Campaigns</h3>
            <Link href='/campaigns/new'>
                <a>
                    <Button floated='right' content="Create Campaign" icon="add circle" primary/>
                </a>
            </Link>
            
            
            {this.renderCampaigns()}
            
            </div></Layout>
            
        );
    }
}

CampaignIndex.getInitialProps =async()=> {
        const campaigns = await instance.methods.getDeployedCampaigns().call()
        return {campaigns}
    }

export default CampaignIndex;