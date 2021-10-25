import React, { useEffect, useState } from 'react'
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
import { getAcquirerDetailsThunk, setAcquirerDetails, updateAcquirerThunk } from '../../../redux/actions/acquirerActions'
import styles from './AcquirersUpdate.module.scss'

const AcquirersUpdate = ({
  className, getAcquirerDetailsThunk, setAcquirerDetails, details,
  updateAcquirerThunk, ...props
}) => {

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()


  const {values, handleChange, errors, isValid, setValues } = useFormAndValidation()
  const [checked, setChecked] = useState(true)
  
  const {id} = useParams()
  const history = useHistory()

  useEffect(() => {
    getAcquirerDetailsThunk([id])
    .then(checkRes(false))
    return () => {
      setAcquirerDetails({
          uuid: '',
          active: true,
          alias: '',
          name: '',
        })
    }
    // eslint-disable-next-line 
  }, [])

useEffect(() => {
  setValues(details)
  setChecked(details?.active)
  // eslint-disable-next-line
}, [details])

const onSubmit = (evt) => {
  evt.preventDefault()
  updateAcquirerThunk({uuid: id, ...values, active: checked})
  .then((res) => {
    checkRes()(res)
    return res
  })
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

// const handleCheckBoxChange = (evt) => {
//   setChecked(evt.target.checked)
// }

    const cls = [
        styles.AcquirersUpdate,
        className
    ]
    if (!details) {
      return <h1>нет такого эквайера</h1>
  }

  if (!details.uuid) {
      return <Spinner/>
  }

    return (
        <div className={cls.join(' ')}>
         <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/acquirers' exact>Список банков</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/acquirers/${id}`} exact>Детали банка &nbsp; <strong>{details.name}</strong></BreadcrumbItem>
          <BreadcrumbItem active tag="span">Редактирование банка &nbsp; <strong>{details.name}</strong></BreadcrumbItem>
        </Breadcrumb>
            <h1>Редактирование информации эквайера </h1>
              <MyTableForm
                onSubmit={onSubmit}
                isValid={isValid}
                buttonText={'Сохранить'}
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
                    pattern={'[a-z0-9_]{2,50}'}
                    minLength={2}
                    maxLength={50}
                />
                {/* <TableInput
                    name='active'
                    label='Активен'
                    onChange={handleCheckBoxChange}
                    type='checkbox'
                    checked={checked}
                    
                /> */}

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
      details: state.acquirers.details,
  }
}


export default connect(mapStateToProps, {
   getAcquirerDetailsThunk, setAcquirerDetails, updateAcquirerThunk,
  })(AcquirersUpdate)