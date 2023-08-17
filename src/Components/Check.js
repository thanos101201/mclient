import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
function Check() {
    const [ mails, setMails ] = useState([]);
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
                redirect_uri: "http://localhost:3000/check",
                grant_type: 'authorization_code'
                })
            tokenRequest.then((resp1) => {
                if(resp1.status === 200){
                    const acctk = resp1.data.access_token;
                    console.log(acctk);
                    axios.get('http://localhost:3001/professor/tracker', {
                        headers: {
                            acctk: acctk
                        }
                    }).then((resp2) => {
                        console.log(resp2);
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
    return (
        <div>Check</div>
    )
}

export default Check