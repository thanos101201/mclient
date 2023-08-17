import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../App'
import { Card, CardBody, CardHeader, Label, Accordion, Button, AccordionBody, AccordionHeader, AccordionItem, CardFooter } from 'reactstrap';
import NavComp from './NavComp';
import { AiOutlineSend } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Professor() {
    const { profData, setProfData } = useContext(AppContext);
    const [ paper, stePaper] = useState([]);
    const { name } = useParams();
    useEffect(() => {
        axios.get('https://mserver-xi.vercel.app/professor').then((response) => {
            if(response.data.data.length > 0){
                let dt = response.data.data.filter((e) => {
                    if(e.prof_name === name){
                        return true;
                    }
                    return false;
                });
                setProfData(dt);
            }
            else{
                alert("No data is here");
                window.open("http://localhost:3000", "_self");
            }
        }).catch((er) => {
            alert(er.message);
        })
    }, []);
    const renderProfessor = () => {
        if(profData.length > 0){
            return(
                <Card>
                    <CardHeader>
                        <h2>{profData[0].prof_name}</h2>
                    </CardHeader>
                    <CardBody>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Label><h4>University : </h4></Label>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Label><h4>{profData[0].university_name}</h4></Label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Label><h4>Email : </h4></Label>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Label><h4>{profData[0].email}</h4></Label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Label><h4>Research Areas : </h4></Label>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Label><h4>{profData[0].researchArea}</h4></Label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Label><h4>Mail Send : </h4></Label>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Label><h4>{profData[0].send ? "True": "False"}</h4></Label>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button href={`/mail/${profData[0].prof_name}`} onClick={() => {
                            axios.get('https://mserver-xi.vercel.app/otp').then((response) => {
                                if(response.data.message === "Otp send"){
                                    console.log("Namaste here is it");
                                }
                            }).catch((er) => {
                                alert(er.message);
                            })
                        }}>
                            <AiOutlineSend />
                        </Button>
                    </CardFooter>
                </Card>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
    const renderPapers = () => {
        if(profData.length > 0){
            if(profData[0].paperAr.length > 0){
                return profData[0].paperAr.map((e1,k1) => {
                    return(
                        <AccordionItem key={k1}>
                            <a href={e1}><h3>{e1}</h3></a>
                        </AccordionItem>
                    );
                })
            }
            else{
                return(<div></div>);
            }
        }
        else{
            return(<div></div>);
        }
    }
    return (
    <>
        <NavComp />
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    {renderProfessor()}
                </div>
            </div>
            <div className='row p-3'>
                <div className='col-12'>
                    <Accordion>
                        {renderPapers()}
                    </Accordion>
                </div>
            </div>
        </div>
    </>
    )
}

export default Professor