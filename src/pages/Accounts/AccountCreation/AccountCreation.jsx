import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import TableMultiselect from '../../../components/UI/MyTable/TableMultiselect/TableMultiselect'
import { useAlert } from '../../../hooks/useAlert'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import { createAccountThunk } from '../../../redux/actions/accountActions'
import { getRolesThunk } from '../../../redux/actions/roleActions'

import styles from './AccountCreation.module.scss'

const AccountCreation = ({
  createAccountThunk, roles, getRolesThunk, 
}) => {

    const history = useHistory()

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()

  const {values, handleChange, errors, isValid, setIsValid, setValues } = useFormAndValidation()
 
  const [rolesOptions, setRolesOptions] = useState()
  const onSingleSelect = (selectedList, {jsonKey, value}) => {
    console.log(selectedList);
    setValues({
        ...values,
        [jsonKey]: value
    })
}

const onRemove = (selectedList, removedItem) => {
    console.log(selectedList);
    setValues({
        ...values,
        [removedItem.jsonKey]: selectedList.map(i => i.value)
    })
}

useEffect(() => {
    getRolesThunk()
    .then(checkRes(false))
    .catch((err) => console.log(err))

    // eslint-disable-next-line
}, [])

useEffect(() => {
    if (roles) {
        setRolesOptions(roles)
    }
}, [roles])
 
 
  useEffect(() => {
    setIsValid(false)
    // eslint-disable-next-line
}, [])

  const onSubmit = (evt) => {
    evt.preventDefault()
   
    console.log(values);

    createAccountThunk(values)
    .then(checkRes())
    .then(res => {
        if (res.ok) {
            setTimeout(() => {
                // history.push(`/accounts/${res.data.id}`)
                history.push(`/accounts`)
            }, 3000)
        }
    })
    .catch((err) => console.log(err))

}

    return (
        <div className={styles.AccountCreation}>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/accounts' exact>Аккаунты</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Создание аккаунта</BreadcrumbItem>
        </Breadcrumb>
            <center><h1>Создание аккаунта</h1></center>
            <MyTableForm
                onSubmit={onSubmit}
                isValid={isValid}
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
                        required={true}
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
                    <TableMultiselect
                        label='Роли'
                        options={rolesOptions}
                        displayValue="name"
                        onSelect={onSingleSelect}
                        onRemove={onRemove}
                        placeholder='Выберите'
                        singleSelect
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
        roles: state.roles.roles,

    }
}



export default connect(mapStateToProps, { 
    createAccountThunk, getRolesThunk 
})(AccountCreation)