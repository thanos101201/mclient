import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button, Badge } from 'reactstrap';
import axios from 'axios';
import NavComp from './NavComp';
import 'bootstrap/dist/css/bootstrap.min.css';
function AddProf() {
    const [prof_name, setProfName] = useState("");
    const [university_name, setUniversityName] = useState("");
    const [paperAr, setPaperAr] = useState([]);
    const [researchArea, setResearchArea] = useState("");
    const [email, setEmail] = useState("");
    const[paper, setPaper] = useState("");
    const renderPaper = () => {
        if(paperAr.length > 0){
            return paperAr.map((e1,k1) => {
                return(
                    <Badge>
                        <h5>{e1}</h5>
                        <Button onClick={() => {
                            let g = paperAr.filter((d) => {
                                if(paperAr.indexOf(d) === paperAr.indexOf(e1)){
                                    return false;
                                }
                                return true;
                            });
                            setPaperAr(g);
                        }}>X</Button>
                    </Badge>
                );
            })
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
            <div className='row'>
                <div className='col-10'>
                    <Form>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-10 col-md-3'>
                                    <Label><h4>Professor Name : </h4></Label>
                                </div>
                                <div className='col-10 col-md-8'>
                                    <Input placeholder='Professor Name' onChange={(e) => setProfName(e.target.value)} />
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-10 col-md-3'>
                                    <Label><h4>University Name : </h4></Label>
                                </div>
                                <div className='col-10 col-md-8'>
                                    <Input placeholder='University Name' onChange={(e) => setUniversityName(e.target.value)} />
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-10 col-md-3'>
                                    <Label><h4>Research Areas : </h4></Label>
                                </div>
                                <div className='col-10 col-md-8'>
                                    <Input placeholder='Research Areas' onChange={(e) => setResearchArea(e.target.value)} />
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-10 col-md-3'>
                                    <Label><h4>Email : </h4></Label>
                                </div>
                                <div className='col-10 col-md-8'>
                                    <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-10 col-md-3'>
                                    <Label><h4>Paper links : </h4></Label>
                                </div>
                                <div className='col-10 col-md-8'>
                                    <Input placeholder='Paper Link' onChange={(e) => setPaper(e.target.value)} />
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-10'>
                                    <Button onClick={() => {
                                        let g = [...paperAr,paper];
                                        setPaperAr(g);
                                    }}>Add</Button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-10'>
                                    {renderPaper()}
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-10'>
                                    <Button onClick={() => {
                                        axios.post(`${process.env.REACT_APP_SERVER_URL}/professor`, {
                                            prof_name: prof_name,
                                            email: email,
                                            university_name: university_name,
                                            paperAr: paperAr,
                                            researchArea: researchArea
                                        }).then((response) => {
                                            if(response.data.message === "Data added"){
                                                window.open(`${process.env.REACT_APP_CLIENT_URL}`,"_self");
                                            }
                                        }) .catch((er) => {
                                            alert(er.message);
                                        })
                                    }}>Add Professor</Button>
                                </div>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
        </>
    );
}

export default AddProf