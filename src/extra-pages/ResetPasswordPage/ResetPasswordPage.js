import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import UserForm from "../../components/UserForm";

const ResetPasswordPage = () => {
  const forgotSuccess = useSelector((store) => store.user.forgotSuccess);
  const userToken = localStorage.getItem("refreshToken");

  const title = "Восстановление пароля";
  const links = (
    <>
      <span className={`text text_type_main-default`}>
        Вспомнили пароль?
        <Link to={{ pathname: "/login" }}>Войти</Link>
      </span>
    </>
  );

  if (userToken) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  if (!userToken && !forgotSuccess) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  return <UserForm title={title} links={links} type="reset-password" />;
};

export default ResetPasswordPage;
