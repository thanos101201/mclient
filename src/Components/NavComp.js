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
                  axios.get('https://mserver-xi.vercel.app/professor/token').then((response) => {
                    window.open(response.data.url, "_self");
                  }).catch((er) => {
                    console.log(er.message);
                  })
                }}>
                    Check Mails
                </Button>
            </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Button href="/">
              Home
            </Button>
          </NavLink>
        </NavItem>
    </Nav>
  )
}

export default NavComp