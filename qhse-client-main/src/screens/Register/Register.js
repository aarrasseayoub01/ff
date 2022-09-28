import React, { useRef, useContext } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'react-bootstrap';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const rePassword = useRef();
    const navigate = useNavigate();

    const userRegister= async (e)=>{
        e.preventDefault();
        
        if(email.current.value!=="" && username.current.value!=="" ) {
            if(password.current.value==rePassword.current.value){
                const user = {name:username.current.value, email:email.current.value,password:password.current.value}
                try{
                    await axios.post("http://localhost:5000/api/user/register",user);

                    navigate("/login");
                }catch(err){
                    console.log(err);
                    window.alert("User exists already!")      
                }
            }
        } else {
            window.alert("Please fill all the cases!")
        }
    }
   
    return(
        <main className="jumbotron vertical-center" >
            <div className="container p-5 rounded">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="row col-12 col-sm-12 col-md-5 col-lg-5 d-flex b justify-content-center align-items-center">
                        <img className="col-12" src="https://media.istockphoto.com/photos/imge-of-mint-picture-id619514634?k=20&m=619514634&s=612x612&w=0&h=0qd6aFtslmii-nfCiBxxIBQmAOqVVwm_iRq_vwYLAWw=" height="328" width="189"></img>
                        <h1 className="col-12 text-center text-prime">Améliorez votre Efficacité et Productivité</h1>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 register-a"> 
                    <h1 className="text-prime pb-5 pt-5">Commençons.</h1>
                        <form className="form-group ">
                            <input className="form-control m-2" placeholder="Username" ref={username}/>
                            <input className="form-control m-2" placeholder="Email Address" ref={email} />
                            <input className="form-control m-2" type="password" placeholder="Password" ref={password} />
                            <input className="form-control m-2" type="password" placeholder="Vérifier Password" ref={rePassword} />
                            <div className="d-flex justify-content-end m-2">
                            <Button className="bg-prime" onClick={userRegister} >S'inscrire</Button>
                            </div>
                        </form>
                        <h5 className="login-suggest text-dark mx-4 mt-3">Avez vous déjà un compte ?<span className=""><Link className="text-decoration-none" to="../Login"> Connexion</Link></span></h5>
                    </div>
                </div>
            </div>
        </main>
    )
}