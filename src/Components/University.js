import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../App'
import { Accordion, AccordionBody, AccordionItem, AccordionHeader, Button, Card, CardHeader, CardFooter } from 'reactstrap';
import NavComp from './NavComp';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
function University() {
    // const { profData, setProfData } = useContext(AppContext);
    const [profData, setProfData] = useState([]);
    const [ open, setOpen ] = useState('1');
    // const location = useLocation();
    const { name } =  useParams();
    useEffect(() => {
        console.log(name);
        axios.get(`${process.env.REACT_APP_SERVER_URL}/professor`).then((response) => {
            if(response.data.message === "Professor list is here"){
                if(response.data.data.length > 0){
                    let dt = response.data.data.filter((e) => {
                        if(e.university_name === name){
                            return true;
                        }
                        return false;
                    });

                    setProfData(dt);
                }
            }
            else{
                alert(response.data.message);
            }
        }).catch((er1) => {
            alert(er1.message);
        })

    }, []);
    const filterProfessor = (e) => {
        let dt = [];
        if(dt.length > 0){
            dt = profData.filter((e1) => {
                if(e1.prof_name === e){
                    dt.push(e1);
                }
            });
        }
        setProfData(dt);
    }

    const toggle = (e) => {
        if(open !== e){
            console.log(e);
            setOpen(e);
        }
        else{
            setOpen('');
        }
    } 

    const renderProfessor = () => {
        if(profData.length > 0){
            var id = 0;
            return profData.map((e1,k1) => {
                id = id + 1;
                return(
                    <div className='col-12 col-md-3 p-3'>
                        <Card>
                            <CardHeader>
                                <h3>{e1.prof_name}</h3>
                            </CardHeader>
                            <CardFooter>
                                <Button href={`/prof/${e1.prof_name}`}>Check</Button>
                            </CardFooter>
                        </Card>
                    </div>
                );
            });
        }
        else{
            return(
                <div></div>
            );
        }
    }
    return (
        <>
        <NavComp />
        <div className='container'>
            <div className='row mt-4'>
                {renderProfessor()}    
            </div>
        </div>
        </>
    )
}

export default University