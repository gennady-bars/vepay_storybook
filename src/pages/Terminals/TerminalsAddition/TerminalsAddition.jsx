import React, { useState, useEffect } from 'react'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import TableMultiselect from '../../../components/UI/MyTable/TableMultiselect/TableMultiselect'

import styles from './TerminalsAddition.module.scss'
import { useHistory, useParams } from 'react-router'
import { connect } from 'react-redux'
import { getAcquirersThunk } from '../../../redux/actions/acquirerActions'
import { createTerminalThunk } from '../../../redux/actions/terminalActions'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import { useAlert } from '../../../hooks/useAlert'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { activeOptions, currencyOptions, operationsOptions } from '../../../utils/constants'



const TerminalsAddition = ({
    className, getAcquirersThunk, acquirers, createTerminalThunk,
    ...props}) => {

    const {shopId} = useParams()
    const history = useHistory()

    const { successAlertVisible, setSuccessAlertVisible, successMessage,
        failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()
    

    const {values, handleChange, errors, isValid, setValues, setIsValid } = useFormAndValidation()
    
    const [bankOptions, setBankOptions] = useState([{name: 'Загружаются данные...', active: true}])

    const onSingleSelect = (selectedList, {jsonKey, value}) => {
        console.log(selectedList);
        setValues({
            ...values,
            [jsonKey]: value
        })
    }
    const onBankSelect = (selectedList, selectedItem) => {
        console.log(selectedList);
        setValues({
            ...values,
            acquirer_uuid: selectedItem.uuid
        })
    }
    const onMultiSelect = (selectedList, selectedItem) => {
        console.log(selectedList);
        setValues({
            ...values,
            [selectedItem.jsonKey]: selectedList.map(i => i.value)
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
        getAcquirersThunk()
        .then(checkRes(false))
        .catch((err) => console.log(err))

        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        if (acquirers) {
            setBankOptions(acquirers)
        }
    }, [acquirers])

    useEffect(() => {
        setIsValid(false)
        // eslint-disable-next-line
    }, [])

    const cls = [
        styles.TerminalsAddition,
        className
    ]

    const onSubmit = (evt) => {
        evt.preventDefault()
        const terminalData = {
            ...values,
            store_uuid: shopId
        }
        console.log(terminalData);

        createTerminalThunk(terminalData)
        .then((res) => {
          checkRes()(res);
          return res;
        })
        .then((res) => {
          if (res.ok) {
            setTimeout(() => {
            history.goBack()
            }, 3000);
          }
        })
        .catch((err) => console.log(err))
        .then(() => console.log("TerminalsAddition"));

    }

    return (
        <div className={cls.join(' ')}>
         <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/partners' exact>Список мерчантов</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/shops/${shopId}`} exact>Детали магазина</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Добавление услуги</BreadcrumbItem>
        </Breadcrumb>
            <center><h1>Добавление услуги</h1></center>
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
                         name='bank_account_number'
                        label='Номер банковского счета'
                        required={true}
                        onChange={handleChange}
                        value={values.bank_account_number}
                        errorText={errors.bank_account_number}
                        minLength={1}
                        maxLength={199}
                    />
                    
                    <TableMultiselect
                        label='Банк'
                        options={bankOptions}
                        displayValue="name"
                        onSelect={onBankSelect}
                        onRemove={onRemove}
                        placeholder='Выберите'
                        singleSelect
                    />
                     <TableMultiselect
                        label='Aктивен'
                        options={activeOptions}
                        displayValue="name"
                        onSelect={onSingleSelect}
                        onRemove={onRemove}
                        placeholder='Выберите'
                        singleSelect
                        selectedValues={[{name: 'Да', value: true, jsonKey: 'active'}]}
                    />
                    <TableMultiselect
                        label='Операции'
                        options={operationsOptions}
                        displayValue="name"
                        onSelect={onMultiSelect}
                        onRemove={onRemove}
                        placeholder='Выберите'
                    />
                    <TableMultiselect
                        label='Код валюты'
                        options={currencyOptions}
                        displayValue="name"
                        onSelect={onSingleSelect}
                        onRemove={onRemove}
                        placeholder='Выберите'
                        singleSelect
                    />
                    <TableInput
                         name='config_id'
                        label='id конфигурации'
                        required={true}
                        onChange={handleChange}
                        value={values.config_id}
                        errorText={errors.config_id}
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

const mapStateToProps = (state) => {
    return {
        acquirers: state.acquirers.acquirers,

    }
}



export default connect(mapStateToProps, {
     getAcquirersThunk, createTerminalThunk,
    })(TerminalsAddition)