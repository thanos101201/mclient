import React, { useState, useEffect, useContext } from 'react'
import { Accordion, AccordionBody, AccordionItem, AccordionHeader, Button, Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import { AppContext } from '../App';
import NavComp from './NavComp';
import axios from 'axios';
import { useParams  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function Home() {
    const { profData, setProfData } = useContext(AppContext);
    const [ open, setOpen ] = useState('');
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/professor`).then((response) => {
            if(response.data.message === "Professor list is here"){
                setProfData(response.data.data);
            }
            else{
                alert(response.data.message);
            }
        }).catch((er1) => {
            alert(er1.message);
        })
    },[]);
    const filterProf = async (e) => {
        let dt = [];
        if(profData.length > 0){
            dt = profData.filter((l) => {
                if(l.university_name === e){
                    return true;
                }
                return false;
            }) 
        }
        await setProfData(dt);
    }
    const toggle = (e) => {
        if(e !== open){
            setOpen(e);
        }
        else{
            setOpen('');
        }
    }
    const renderProf = () => {
        if(profData.length > 0){
            let dt = [];
            profData.map((e) => {
                // console.log(dt.indexOf(e.university_name))
                if(dt.indexOf(e.university_name) === -1){
                    dt.push(e.university_name);
                    // console.log(e.university_name);
                }
            });
            if(dt.length > 0){
                let i = 0;
                return dt.map((e1,k1) => {
                    i = i + 1;
                    console.log(i);
                    return(
                        <div className='col-10 col-md-3'>
                            <Card className='shadow' key={k1}>
                                <CardHeader>
                                    <h3>{e1}</h3>
                                </CardHeader>
                                <CardFooter>
                                    <Button href={`/univ/${e1}`}>Check</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    );
                });
            }
            else{
                return <div></div>
            }
        }
        else{
            console.log("Nam")
            return(
                <div>
                    <h1>No Professor</h1>
                </div>
            );
        }
    }
  return (
    <>
        <NavComp />
        <div className='container'>
            <div className='row'>
                {renderProf()}
            </div>
        </div>
    </>
  )
}

export default Home