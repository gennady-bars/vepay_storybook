import React, { useEffect } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink, useHistory } from 'react-router-dom'
import styles from './PartnerAddition.module.scss'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import { connect } from 'react-redux'
import { createPartnerThunk } from '../../../redux/actions/partnerActions'
import { useAlert } from '../../../hooks/useAlert'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import TableTextArea from '../../../components/UI/MyTable/TableTextArea/TableTextArea'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'


const PartnerAddition = ({className, createPartnerThunk, ...props}) => {

    const history = useHistory()

    const {values, handleChange, errors, isValid, setValues, setIsValid } = useFormAndValidation()
    const { successAlertVisible, setSuccessAlertVisible, successMessage,
        failureAlertVisible, setFailureAlertVisible, failureMessage,
        checkRes} = useAlert()
   
        const cls = [
        styles.PartnerAddition,
        className
    ]

    useEffect(() => {
        setIsValid(false)
        // eslint-disable-next-line
    }, [])

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
        console.log(values);
        createPartnerThunk(values)
        .then((res) => {
            checkRes()(res)
            if (res.ok) {
                setTimeout(() => {
                    history.push(`/partners/${res.data?.uuid}`)
                }, 1000)
            }
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={cls.join(' ')}>
          <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/partners' exact>Мерчанты</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Добавление мерчанта </BreadcrumbItem>
        </Breadcrumb>
            <center><h1>Добавить мерчанта</h1></center>
                <MyTableForm 
                    className={styles.MyTable} 
                    onSubmit={onSubmit}
                    isValid={isValid}
                >
                    <TableInput
                         name='inn'
                        label='ИНН'
                        onChange={handleChange}
                        value={values.inn}
                        errorText={errors.inn}
                        minLength={10}
                        maxLength={12}
                        title='ИНН состоит из 10-12 цифр'
                        DivTableTDcls={styles.DivTableTDcls}
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
                        title='максимум 199 символов'
                    />
                    <TableInput
                         name='email'
                         label='Email'
                         type='email'
                        required={true}
                        onChange={handleChange}
                        value={values.email}
                        errorText={errors.email}
                        minLength={4}
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

// const mapStateToProps = (state) => {
//     return {

//     }
// }



export default connect(null, { createPartnerThunk })(PartnerAddition)