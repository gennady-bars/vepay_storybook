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
import { getRoleDetailsThunk, updateRoleThunk } from '../../../redux/actions/roleActions'

import styles from './RoleUpdate.module.scss'

const RoleUpdate = ({
  className, details, getRoleDetailsThunk, updateRoleThunk,
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
    getRoleDetailsThunk([+id])
    .then(checkRes(false))
    return () => {
  
    }
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    if (!details) return;

    setValues(details)
    // eslint-disable-next-line
  }, [details])

  const onSubmit = (evt) => {
    evt.preventDefault()
    updateRoleThunk(values)
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
        styles.RoleUpdate,
        className
    ]

    if (!details) {
      return (
        <h1>Нет такой роли</h1>
      )
    }
  
    if (!details.id) {
        return <Spinner/>
    }

    return (
        <div className={cls.join(' ')}>
            <Breadcrumb tag="nav" listTag="div">
              <BreadcrumbItem tag={NavLink} to='/roles' exact>Роли</BreadcrumbItem>
              <BreadcrumbItem tag={NavLink} to={`/roles/${id}`} exact>Роль &nbsp; <strong>{details?.name}</strong></BreadcrumbItem>
              <BreadcrumbItem active tag="span">Обновление роли  &nbsp; <strong>{details?.name}</strong></BreadcrumbItem>
            </Breadcrumb>

            <center><h1>Обновление роли <strong>{details?.name}</strong></h1></center>

          <MyTableForm
            onSubmit={onSubmit}
            isValid={isValid}
            buttonText='Сохранить'
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

const mapStateToProps = (state) => {
  return {
      details: state.roles.details,
  }
}



export default connect(mapStateToProps, { getRoleDetailsThunk, updateRoleThunk })(RoleUpdate)