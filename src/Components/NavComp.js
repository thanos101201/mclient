import axios from 'axios';
import React from 'react'
import { Nav, NavLink, NavItem, Button } from 'reactstrap';
function NavComp() {
  return (
    <Nav>
        <NavItem>
            <NavLink>
                <Button href="/addprof">
                    Add Professor
                </Button>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink>
                <Button onClick={() => {
                  axios.get('http://localhost:3001/token').then((response) => {
                    window.open(response.data.url);
                  }).catch((er) => {
                    console.log(er.message);
                  })
                }}>
                    Check Mails
                </Button>
            </NavLink>
        </NavItem>
    </Nav>
  )
}

export default NavComp