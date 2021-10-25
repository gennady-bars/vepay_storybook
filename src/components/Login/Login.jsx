import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, UncontrolledAlert } from "reactstrap";
import { logInThunk } from "../../redux/actions/loginActions";
import Spinner from "../Spinner/Spinner";

import styles from "./Login.module.scss";

const Login = ({logInThunk, loading, errors, isAdmin}) => {

  const [controls, setControls] = useState({
    email: '',
    password: '',
    login: ''
  })
  // const [touched, setTouched] = useState({
  //   email: false,
  //   password: false,
  //   login: false
  // })

  const onControlChange = (e) => {
    const control = e.target
    setControls((controls) => {
      return {
        ...controls,
        [control.name]: control.value
      }
    })
    // setTouched((touched) => {
    //   return {
    //     ...touched,
    //     [control.name]: true
    //   }
    // })
  }

  let errorMessage = 'Попробуйте еще раз позже';
  // if (!isAdmin) {
  //   errorMessage = 'Недостаточно прав'
  // }
  if (errors) {
    errors.forEach((err) => {
      if (/Accounts service error/g.test(err)) {
        errorMessage = 'Ошибка сервиса'
      } else if (/Credentials incorrect/g.test(err)) {
        errorMessage = 'Неверный логин или пароль'
      } else if (/Недостаточно прав/g.test(err)) {
        errorMessage = 'Недостаточно прав'
      } else if (/Сервер временно недоступен/g.test(err)) {
        errorMessage = 'Сервер временно недоступен'
      }
    })
  }
  

  const {email, password, login} = controls

  // console.log(controls, touched);

  if (loading) {
    return <Spinner className={styles.spinner}/>
  }

  return (
    <div className={styles.Login}>
      <div className={styles.formWrapper}>
        <Form>
          <center>Vepay admin</center>
         {errors && (
          <UncontrolledAlert color={'danger'}>
            {errorMessage}
          </UncontrolledAlert>
         )}
          <FormGroup>
            <Label for="login">Login</Label>
            <Input
              //  invalid={touched.login && !login}
              type="text"
              name="login"
              id="login"
              placeholder="login"
              value={login}
              onChange={onControlChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              //  invalid={touched.email && !email}
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={onControlChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Пароль</Label>
            <Input
            // invalid={touched.password && !password}
              type="password"
              name="password"
              id="password"
              placeholder="пароль"
              value={password}
              onChange={onControlChange}
            />
          </FormGroup>
          <Button 
           disabled={!((email || login) && password)}
           onClick={() => logInThunk(controls)}
          >Войти</Button>
        </Form>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    errors: state.login.errors,
    isAdmin: state.login.isAdmin,
     
  }
}

export default connect(mapStateToProps, {logInThunk})(Login);
