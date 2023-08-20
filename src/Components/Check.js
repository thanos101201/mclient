import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import NavComp from './NavComp';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
function Check() {
    const [ mails, setMails ] = useState([]);
    const [open, setOpen] = useState("");
    const toggle = (e) => {
        if(open === e){
            setOpen("");
        }
        else{
            setOpen(e);
        }
    }
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        console.log("code :- "+code);
        if(code !== undefined){
            const tokenRequest = axios.post('https://oauth2.googleapis.com/token', {
                code: code,
                client_id: "203748571834-tdvt7eqamd9j051jbdtddvumhelh541u.apps.googleusercontent.com",
                client_secret: "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",
                redirect_uri: "https://mclient.vercel.app/check",
                grant_type: 'authorization_code'
                })
            tokenRequest.then((resp1) => {
                if(resp1.status === 200){
                    const acctk = resp1.data.access_token;
                    console.log(acctk);
                    let g = [];
                    axios.get('https://mserver-xi.vercel.app/professor/tracker', {
                        headers: {
                            acctk: acctk
                        }
                    }).then(async (resp2) => {
                        console.log(resp2);
                        if(resp2.data.length > 0){
                            resp2.data.map((e1) => {
                                let em = e1.payload.headers.filter((el) => {
                                    if(el.name === "From"){
                                        return true;
                                    }
                                    else{
                                        return false;
                                    }
                                });
                                let emar = em[0].value.split('<');
                                let emr = emar[emar.length - 1].split('>');
                                let subr = e1.payload.headers.filter((e) => {
                                    if(e.name === "Subject"){
                                        return true;
                                    }
                                })
                                let obj = {
                                    email : emr[0],
                                    subject : subr[0]
                                }
                                g.push(obj);
                            })
                        }
                        console.log(g);
                        setMails(g);
                    }).catch((er2) => {
                        alert(er2.message);
                    })
                }
                else{
                    console.log("in the else")
                }
            }).catch((er1) => {
                alert(er1.messagge);
            })
        }
        else{

        }
    },[]);

    const renderMails = () => {
        if(mails.length > 0){
            let cnt = 0;
            return mails.map((e1,k1) => {
                cnt = cnt + 1;
                return (<AccordionItem key={k1}>
                    <AccordionHeader targetId={`${cnt}`}>{e1.email}</AccordionHeader>
                    <AccordionBody accordionId={`${cnt}`}>{e1.subject.value}</AccordionBody>
                </AccordionItem>)
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
                        <Accordion toggle={toggle} open={open}>
                            {renderMails()}
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Check