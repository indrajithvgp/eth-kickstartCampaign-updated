import React from 'react';
import  {Menu} from 'semantic-ui-react';
import Link from 'next/link'



const Header= ()=>{
    return(
        <Menu style={{marginTop:"60px"}}>
        <Link href="/"><a className="item">Nouveau Mercado</a></Link>

        <Menu.Menu position='right'>
        <Link href="/"><a className="item">Campaigns</a></Link>
        
        <Link href="/campaigns/new"><a className="item">+</a></Link> 
        </Menu.Menu>
      </Menu>
    );
}

export default Header