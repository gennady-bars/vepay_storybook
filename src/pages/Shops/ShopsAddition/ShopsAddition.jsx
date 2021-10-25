import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import { useFormAndValidation } from '../../../hooks/useFormValiation'

import styles from './ShopsAddition.module.scss'

import { connect } from 'react-redux'
import { createShopThunk } from '../../../redux/actions/shopActions'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { useAlert } from '../../../hooks/useAlert'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'

const ShopsAddition = ({className, createShopThunk, ...props}) => {

    const {partnerId} = useParams()

    const { successAlertVisible, setSuccessAlertVisible, successMessage,
        failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()
    

    const {values, handleChange, errors, isValid, resetForm, setIsValid, setValues } = useFormAndValidation()
    
    useEffect(() => {
        setIsValid(false)
        // eslint-disable-next-line
    }, [])

    const cls = [
        styles.ShopsAddition,
        className
    ]

    const handleBankDetailsChange = (evt) => {
        const {name, value} = evt.target
        let bank_details = {};
        if (values.bank_details) {
          bank_details = {
            ...values.bank_details,
            [name]: value
          }
        } else {
          bank_details = {
            [name]: value
          }
        }
        setValues({
          ...values,
          bank_details
        })
        setIsValid(evt.target.closest('form').checkValidity());
      }

      const handleSettingsChange = (evt) => {
        const {name, value} = evt.target
        let settings = {};
        if (values.settings) {
          settings = {
            ...values.settings,
            [name]: value
          }
        } else {
          settings = {
            [name]: value
          }
        }
        setValues({
          ...values,
          settings
        })
        setIsValid(evt.target.closest('form').checkValidity());
      }

    const onSubmit = (evt) => {
        evt.preventDefault()
        const shopData = {
            ...values,
            partner_uuid: partnerId
        }
        console.log(shopData);

        createShopThunk(shopData)
        .then((res) => {
            checkRes()(res)
            return res
        })
        .then(res => {
            if (res.ok) {
                setTimeout(() => {
                    resetForm()
                }, 3000)
            }
        })
        .catch((err) => console.log(err))

    }

    return (
        <div className={cls.join(' ')}>
         <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/partners' exact>Список мерчантов</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/partners/${partnerId}`} exact>Детали мерчанта</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Добавление магазина</BreadcrumbItem>
        </Breadcrumb>

            <center><h1>Добавление магазина</h1></center>
            <MyTableForm
                onSubmit={onSubmit}
                isValid={isValid}
            >
                    <TableInput
                        // column
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
                        // column
                         name='site'
                        label='Сайт'
                        required={true}
                        onChange={handleChange}
                        value={values.site}
                        errorText={errors.site}
                        minLength={1}
                        maxLength={199}
                    />
                    
                    <br />
                    <hr />
                    <center><h2>Реквизиты</h2></center>
                    <TableInput
                        column
                         name='legal_entity'
                        label='Юридическое лицо'
                        onChange={handleBankDetailsChange}
                        value={values.bank_details?.legal_entity}
                        errorText={errors.bank_details?.legal_entity}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                        column
                         name='inn'
                        label='ИНН'
                        onChange={handleBankDetailsChange}
                        value={values.bank_details?.inn}
                        errorText={errors.bank_details?.inn}
                        minLength={10}
                        maxLength={12}
                        title='ИНН состоит из 10-12 цифр'
                    />
                    <TableInput
                        column
                         name='kpp'
                        label='КПП'
                        onChange={handleBankDetailsChange}
                        value={values.bank_details?.kpp}
                        errorText={errors.bank_details?.kpp}
                        // minLength={10}
                        // maxLength={12}
                    />
                    <TableInput
                        column
                         name='ogrn'
                        label='ОГРН'
                        onChange={handleBankDetailsChange}
                        value={values.bank_details?.ogrn}
                        errorText={errors.bank_details?.ogrn}
                        // minLength={10}
                        // maxLength={12}
                    />
                    <TableInput
                        column
                         name='legal_address'
                        label='Юридический адрес'
                        onChange={handleBankDetailsChange}
                        value={values.bank_details?.legal_address}
                        errorText={errors.bank_details?.legal_address}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                        column
                         name='contract_number'
                        label='Номер договора'
                        onChange={handleBankDetailsChange}
                        value={values.bank_details?.contract_number}
                        errorText={errors.bank_details?.contract_number}
                        minLength={1}
                        maxLength={199}
                    />
                    <br />
                    <hr />
                    <center><h2>Дополнительные настройки</h2></center>


                    <TableInput
                        column
                         name='callback_url'
                        label='Callback url'
                        onChange={handleSettingsChange}
                        value={values.settings?.callback_url}
                        errorText={errors.settings?.callback_url}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                        column
                         name='callback_key'
                        label='Callback key'
                        onChange={handleSettingsChange}
                        value={values.settings?.callback_key}
                        errorText={errors.settings?.callback_key}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                        column
                         name='successful_payment_redirect_url'
                        label='Адрес редиректа при успешной оплате'
                        onChange={handleSettingsChange}
                        value={values.settings?.successful_payment_redirect_url}
                        errorText={errors.settings?.successful_payment_redirect_url}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                        column
                         name='failure_payment_redirect_url'
                        label='Адрес редиректа при неуспешной оплате'
                        onChange={handleSettingsChange}
                        value={values.settings?.failure_payment_redirect_url}
                        errorText={errors.settings?.failure_payment_redirect_url}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                        column
                         name='email_for_reports'
                        label='Email для отправки реестра'
                        onChange={handleSettingsChange}
                        value={values.settings?.email_for_reports}
                        errorText={errors.settings?.email_for_reports}
                        minLength={1}
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



export default connect(null, { createShopThunk })(ShopsAddition)