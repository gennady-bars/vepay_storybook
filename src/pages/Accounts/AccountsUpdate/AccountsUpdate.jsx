import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import Spinner from '../../../components/Spinner/Spinner'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import { useAlert } from '../../../hooks/useAlert'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import { getAccountDetailsThunk, updateAccountThunk } from '../../../redux/actions/accountActions'

import styles from './AccountsUpdate.module.scss'

const AccountsUpdate = ({
    className, details, getAccountDetailsThunk, updateAccountThunk, 
    ...props}) => {

    const { successAlertVisible, setSuccessAlertVisible, successMessage,
        failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()
    
    
    const {values, handleChange, errors, isValid, setValues, setIsValid } = useFormAndValidation()
    
    const {id} = useParams()
    const history = useHistory()

    useEffect(() => {
        setIsValid(false)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getAccountDetailsThunk([+id])
        .then(checkRes(false))
        .catch((err) => console.log(err))
        return () => {
        //   setShopDetails({
        //       uuid: '',
        //       partner_uuid: '',
        //       name: '',
        //     })
        }
        // eslint-disable-next-line 
      }, [])

    useEffect(() => {
        if (!details) return;

        let updateValues = details;
        // сервер ругается на `null` в parent_id и suspended_until, поэтому убираем их
        if (!details.parent_id) {
            const {parent_id, ...rest} = details
            updateValues = rest
        }
        if (!details.suspended_until) {
            const {suspended_until, ...rest} = details
            updateValues = rest
        }
        if (!details.parent_id && !details.suspended_until) {
            const {parent_id, suspended_until, ...rest} = details
            updateValues = rest
        }

        setValues(updateValues)
        // eslint-disable-next-line
      }, [details])

    const onSubmit = (evt) => {
        evt.preventDefault()
        updateAccountThunk(values)
        .then(checkRes())
        .then(res => {
            if (res.ok) {
                setTimeout(() => {
                  history.goBack()
                }, 1000)
            }
        })
        .catch((err) => console.log(err))
        console.log(values);
      }
      

    const cls = [
        styles.AccountsUpdate,
        className
    ]

    if (!details) {
        return <h1>нет такого аккаунта</h1>
    }
  
    if (!details.uuid) {
        return <Spinner/>
    }

    return (
        <div className={cls.join(' ')}>
             <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem tag={NavLink} to='/accounts' exact>Аккаунты</BreadcrumbItem>
                <BreadcrumbItem tag={NavLink} to={`/accounts/${id}`} exact>Детали аккаунта &nbsp; <strong>{details?.login}</strong></BreadcrumbItem>
                <BreadcrumbItem active tag="span">Редактирование аккаунта &nbsp; <strong>{details?.login}</strong></BreadcrumbItem>
            </Breadcrumb>
            <center><h1>Редактирование аккаунта   <strong>{details?.login}</strong></h1></center>

            <MyTableForm
                onSubmit={onSubmit}
                isValid={isValid}
                buttonText='Сохранить'
            >
                    <TableInput
                        type='email'
                         name='email'
                        label='email'
                        required={true}
                        onChange={handleChange}
                        value={values.email}
                        errorText={errors.email}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                         name='login'
                        label='Логин'
                        required={true}
                        onChange={handleChange}
                        value={values.login}
                        errorText={errors.login}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                         name='password'
                        label='Пароль'
                        onChange={handleChange}
                        value={values.password}
                        errorText={errors.password}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                         name='phone_number'
                        label='Телефон'
                        onChange={handleChange}
                        value={values.phone_number}
                        errorText={errors.phone_number}
                        minLength={5}
                        maxLength={199}
                    />
            </MyTableForm>


            <SuccessAlert
                visible={successAlertVisible}
                setVisible={setSuccessAlertVisible}
                message={successMessage}
            />

            <FailureAlert
                visible={failureAlertVisible}
                setVisible={setFailureAlertVisible}
                message={failureMessage}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      details: state.accounts.details,
    }
  }

  

export default connect(mapStateToProps, {
    getAccountDetailsThunk, updateAccountThunk, 
 })(AccountsUpdate)