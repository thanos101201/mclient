import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import NavComp from './NavComp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
function Mail() {
    const { profData, setProfData } = useContext(AppContext);
    const [ subject, setSubject ] = useState("");
    const [ mailBody, setMailBody ] = useState("");
    const [ otp, setOtp ] = useState("");
    const { name } = useParams();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/professor`).then((response) => {
            if(response.data.data.length > 0){
                let dt = response.data.data.filter((e) => {
                    if(e.prof_name === name){
                        return true;
                    }
                    return false;
                });
                setProfData(dt);
            }
        })
    },[]);
    const sendMail = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/professor/mail`, {
            email: "pratikthakur2019@gmail.com",// profData[0].email,
            mailBody: mailBody,
            subject: subject,
            otp: otp
        }).then((response) => {
            if(response.data.message === "Mail send"){
                alert("Mail is send to the professor");
            }
            else{
                alert(response.data.message);
            }
        }).catch((er) => {
            alert(er.message);
        })
    }
    return (
        <>
        <NavComp />
        <div className='container'>
            <div className='row'>
                <div className='col-10'>
                    <Form className='shadow'>
                        <FormGroup className='p-3'>
                            <div className='col-12 col-md-3'>
                                <Label>
                                    <h3>Subject : </h3>
                                </Label>
                            </div>
                            <div className='col-12 col-md-8'>
                                <Input placeholder='Subject' onChange={(e) => setSubject(e.target.value)} />
                            </div>
                        </FormGroup>
                        <FormGroup className='p-3'>
                            <div className='col-12 col-md-3'>
                                <Label>
                                    <h3>Mail Body : </h3>
                                </Label>
                            </div>
                            <div className='col-12 col-md-8'>
                                <Input placeholder='Mail Body' onChange={(e) => setMailBody(e.target.value)} />
                            </div>
                        </FormGroup>
                        <FormGroup className='p-3'>
                            <div className='col-12 col-md-3'>
                                <Label>
                                    <h3>Otp : </h3>
                                </Label>
                            </div>
                            <div className='col-12 col-md-8'>
                                <Input placeholder='Otp' onChange={(e) => setOtp(e.target.value)} />
                            </div>
                        </FormGroup>
                        <FormGroup className='p-3'>
                            <div className='col-12'>
                                <Button onClick={() => {
                                    sendMail();
                                }}>
                                    Send
                                </Button>
                            </div>
                        </FormGroup>
                        <FormGroup className='p-3'>
                            <div className='col-12'>
                                <Button href="/">
                                    University
                                </Button>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Mail