import React, {Component} from 'react'
import {Form,FormGroup,Label,Input,Button} from'reactstrap'
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid = formErrors =>{
  let valid = true;

  Object.values(formErrors).forEach(val =>{
  val.lenght > 0 && (valid = false);
});

return valid;

}
 export class RegisterForm extends Component {
  constructor(props){
    super(props);
    
    this.state ={
      name: null,
      email: null,
      password: null,
      confirmPassword:null,
      formErrors:{
        name: "",
        email: "",
        password: "",
        confirmPassword:""
      }
    };
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleSubmit = e =>{
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
        alert("Passwords don't match");
    } else {
      if (formValid(this.state.formErrors)) {
        console.log(`
        --submiting--
         name: ${this.state.name}
         Email: ${this.state.email}
         password: ${this.state.password}
         confirmPassword: ${this.state.confirmPassword}
         `);
      } else {
        console.error("form invalid - display error message")
      }
    }
}
   
 
  
  handleChange = e => {
    e.preventDefault();
    const {name,value} = e.target;
   
    let formErrors =this.state.formErrors;

 

    switch(name) {
      case 'name':
        formErrors.name= 
          value.length < 3 
          ? "minimum 3 characters required"
          : "";
        break;
      case 'email':
        formErrors.email= 
        emailRegex.test(value) 
        ? ""
        :"invalid email address";
        break;
      case 'password':
        formErrors.password=
        value.length < 6 
        ? "minimum 6 characters required "
        :"";
        break;
      case 'confirmPassword':
        formErrors.confirmPassword=
        value.length < 6 
        ? "minimum 6 characters required "
        :"";
      break;
      
        default:
        break;
    }

    this.setState({formErrors,[name]:value},()=>console.log(this.state))
  }

  
  render(){
  const { formErrors } =this.state;

    return (
    <div className="col-md-6">
      
        <h1>Registrar</h1>
        <hr className="my-3"/>
        <Form onSubmit={this.handleSubmit} noValidate>
          <FormGroup>
          <div className="name">
            <Label For="name">Nombre completo</Label>
            <Input type ="text" 
             className={formErrors.name.length > 0 ?"error":null} 
             placeholder="Nombre Compeleto" 
             name="name" 
             noValidate
             onChange={this.handleChange}
             />
           {formErrors.name.length >0 && (
             <span className="errorMessage">{formErrors.name}</span>
           )}
          </div>
          </FormGroup>
         
          
          <FormGroup>
          
            <Label For="email">Email </Label>
            <Input type ="text" 
             className={formErrors.email.length > 0 ?"error":null}
             placeholder="Ingrese su correo" 
            
             name="email" 
             noValidate
             onChange={this.handleChange}
             />
                {formErrors.email.length >0 && (
             <span className="errorMessage">{formErrors.email}</span>
           )}
         
          </FormGroup>
          
          <FormGroup>
          <div className="password">
            <Label For="password">Contraseña</Label>
            <Input  
             className={formErrors.password.length > 0 ?"error":null}
             placeholder="Ingrese su contraseña" 
             type="password" 
             name="password" 
             noValidate
             onChange={this.handleChange}
             />
                {formErrors.password.length >0 && (
             <span className="errorMessage">{formErrors.password}</span>
           )}
          </div>
          </FormGroup>
          <FormGroup>
          <div className="confirmPassword">
            <Label For="Confirmar password">Confirmar Contraseña</Label>
            <Input  
             className={formErrors.confirmPassword.length > 0 ?"error":null}
             placeholder="Ingrese su contraseña" 
             type="Password" 
             name="confirmPassword" 
             noValidate
             onChange={this.handleChange}
             />
                {formErrors.confirmPassword.length >0 && (
             <span className="errorMessage">{formErrors.confirmPassword}</span>
           )}
          </div>
          </FormGroup>
           <FormGroup>
           <div class="d-flex justify-content-center">
           <Button color="link" href="/login">¿tienes una cuenta?</Button>
           </div>   
          <div class="d-flex justify-content-center">
          <Button type="submit" class="btn btn-default" size="lg" style={{backgroundColor:'#048c73',borderRadius:'15px',border:'none'}} >Create Account</Button>
          </div>
            
           
            </FormGroup>       
          
          
        </Form>
      
    </div>
    )}
}