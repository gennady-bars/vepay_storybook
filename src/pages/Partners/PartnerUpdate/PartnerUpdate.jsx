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
import TableTextArea from '../../../components/UI/MyTable/TableTextArea/TableTextArea'
import { useAlert } from '../../../hooks/useAlert'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import { getPartnerDetailsThunk, setPartnerDetails, updatePartnerThunk } from '../../../redux/actions/partnerActions'

import styles from './PartnerUpdate.module.scss'

const PartnerUpdate = ({
  className, getPartnerDetailsThunk, setPartnerDetails, updatePartnerThunk,
  details, ...props
}) => {

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()



  const {values, handleChange, errors, isValid, setValues, setIsValid } = useFormAndValidation()
  const {id} = useParams()
  const history = useHistory()

  useEffect(() => {
    getPartnerDetailsThunk([id])
    .then(checkRes(false))
    .catch((err) => console.log(err))
    return () => {
        setPartnerDetails({
            uuid: '',
            inn: '',
            name: ''
        })
    }
    // eslint-disable-next-line 
  }, [])

    useEffect(() => {
      setIsValid(false)
      // eslint-disable-next-line
  }, [])
    useEffect(() => {
      setValues(details)
      // eslint-disable-next-line
  }, [details])

  const handleContactsChange = (evt) => {
    const {name, value} = evt.target
    let contacts = {};
    if (values.contacts) {
      contacts = {
        ...values.contacts,
        [name]: value
      }
    } else {
      contacts = {
        [name]: value
      }
    }
    setValues({
      ...values,
      contacts
    })

    setIsValid(evt.target.closest('form').checkValidity());

  }



  const onSubmit = (evt) => {
    evt.preventDefault()
    updatePartnerThunk({uuid: id, ...values})
    .then((res) => {
      checkRes()(res)
      return res
    })
    .then(res => {
        if (res.ok) {
            setTimeout(() => {
                history.goBack()
            }, 3000)
        }
    })
    .catch((err) => console.log(err))
    console.log(values);
  }

    const cls = [
        styles.PartnerUpdate,
        className
    ]

    if (!details) {
      return <h1>нет такого мерчанта</h1>
  }

  if (!details.uuid) {
      return <Spinner/>
  }

    return (
        <div className={cls.join(' ')}>
         <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/partners' exact>Список мерчантов</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/partners/${id}`} exact>Детали мерчанта</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Редактирование мерчанта</BreadcrumbItem>
        </Breadcrumb>
            <center><h1>Редактирование информации мерчанта </h1></center>
              <MyTableForm 
                className={styles.MyTable} 
                onSubmit={onSubmit}
                isValid={isValid}
                buttonText={'Сохранить'}
              >
                <TableInput
                    name='inn'
                    label='ИНН'
                    onChange={handleChange}
                    value={values.inn}
                    errorText={errors.inn}
                    minLength={10}
                    maxLength={12}
                    
                />
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
                    name='email'
                    label='Email'
                    type='email'
                    required={true}
                    onChange={handleChange}
                    value={values.email}
                    errorText={errors.email}
                    minLength={1}
                    maxLength={199}
                />
                <TableInput
                      name='contact_name'
                      label='ФИО контактного лица'
                    onChange={handleContactsChange}
                    value={values.contacts?.contact_name}
                    errorText={errors.contacts?.contact_name}
                    minLength={1}
                    maxLength={199}
                />
                <TableInput
                         name='contact_person_position'
                         label='Должность контактного лица'
                        onChange={handleContactsChange}
                        value={values.contacts?.contact_person_position}
                        errorText={errors.contacts?.contact_person_position}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                         name='contact_email'
                         label='E-mail контактного лица'
                        onChange={handleContactsChange}
                        value={values.contacts?.contact_email}
                        errorText={errors.contacts?.contact_email}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                         name='contact_phone'
                         label='Телефон контактного лица'
                        onChange={handleContactsChange}
                        value={values.contacts?.contact_phone}
                        errorText={errors.contacts?.contact_phone}
                        minLength={1}
                        maxLength={199}
                    />
                   <TableTextArea
                        name='other_contact_info'
                        label='Дополнительные данные'
                        cols="23" 
                        rows="5"
                        onChange={handleContactsChange}
                        value={values.contacts?.other_contact_info}
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
      details: state.partners.details,
  }
}


export default connect(
  mapStateToProps, {getPartnerDetailsThunk, setPartnerDetails, updatePartnerThunk})(PartnerUpdate)