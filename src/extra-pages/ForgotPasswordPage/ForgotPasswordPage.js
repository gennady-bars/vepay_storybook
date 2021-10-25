import React from "react";
import { Link, Redirect } from "react-router-dom";
import UserForm from "../../components/UserForm";

const ForgotPasswordPage = () => {
  const title = "Восстановление пароля";
  const links = (
    <>
      <span className={`text text_type_main-default`}>
        Вспомнили пароль?
        <Link to={{ pathname: "/login" }}>Войти</Link>
      </span>
    </>
  );

  if (localStorage.getItem("refreshToken")) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return <UserForm title={title} links={links} type="forgot-password" />;
};

export default ForgotPasswordPage;
