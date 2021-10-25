import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import { useAlert } from '../../../hooks/useAlert'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import { createRoleThunk } from '../../../redux/actions/roleActions'

import styles from './RoleAddition.module.scss'

const RoleAddition = ({
    className, createRoleThunk, 
    ...props}) => {

    const history = useHistory()


    const {values, handleChange, errors, isValid, setIsValid } = useFormAndValidation()
    const { successAlertVisible, setSuccessAlertVisible, successMessage,
        failureAlertVisible, setFailureAlertVisible, failureMessage,
        checkRes} = useAlert()

    const cls = [
        styles.RoleAddition,
        className
    ]

    useEffect(() => {
        setIsValid(false)
        // eslint-disable-next-line
    }, [])

    const onSubmit = (evt) => {
        evt.preventDefault()
        console.log(values);
        createRoleThunk(values)
        .then((res) => {
            checkRes()(res)
            if (res.ok) {
                setTimeout(() => {
                    history.push(`/roles`)
                }, 1000)
            }
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={cls.join(' ')}>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/roles' exact>Роли</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Добавление роли</BreadcrumbItem>
        </Breadcrumb>
            <center><h1>Добавление роли</h1></center>

            <MyTableForm 
                className={styles.MyTable} 
                onSubmit={onSubmit}
                isValid={isValid}
            >
                
                <TableInput
                    name='name'
                    label='Наименование'
                    required={true}
                    onChange={handleChange}
                    value={values.name}
                    errorText={errors.name}
                    minLength={1}
                    maxLength={199}
                    title='максимум 199 символов'
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



export default connect(null, { createRoleThunk })(RoleAddition)