import React, { useEffect, useState }  from 'react'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import {  Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import styles from './AcquirerAddition.module.scss'
import { connect } from 'react-redux'
import { createAcquirerThunk } from '../../../redux/actions/acquirerActions'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import { useAlert } from '../../../hooks/useAlert'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'

const AcquirerAddition = ({
    className, createAcquirerThunk, ...props
}) => {

    const { successAlertVisible, setSuccessAlertVisible, successMessage,
        failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()
    

    const {values, handleChange, errors, isValid, resetForm, setIsValid } = useFormAndValidation()

    const [checked, setChecked] = useState(true)
    useEffect(() => {
        setIsValid(false)
        // eslint-disable-next-line
    }, [])

    const onSubmit = (evt) => {
        evt.preventDefault()
        console.log(values);
        createAcquirerThunk({
            ...values,
            active: checked
        })
        .then((res) => {
            checkRes()(res)
            return res
          })
          .then(res => {
              if (res.ok) {
                  setTimeout(() => {
                    resetForm()
                  }, 1000)
              }
          })
          .then(() => console.log('AcquirerAddition'))
          .catch((err) => console.log(err))

    }

    const handleCheckBoxChange = (evt) => {
        setChecked(evt.target.checked)
    }

    const cls = [
        styles.AcquirerAddition,
        className
    ]

    return (
        <div className={cls.join(' ')}>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/acquirers' exact>Банки</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Добавление банка </BreadcrumbItem>
        </Breadcrumb>
           <center> <h1>Добавление банка</h1></center>
            <MyTableForm
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
                />
                <TableInput
                    name='alias'
                    label='alias'
                    required={true}
                    onChange={handleChange}
                    value={values.alias}
                    errorText={errors.alias}
                    // pattern={'[a-z0-9_]{2,50}'}
                    minLength={2}
                    maxLength={50}
                />
                <TableInput
                    name='active'
                    label='Активен'
                    onChange={handleCheckBoxChange}
                    type='checkbox'
                    checked={checked}
                    
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



export default connect(null, { createAcquirerThunk })(AcquirerAddition)