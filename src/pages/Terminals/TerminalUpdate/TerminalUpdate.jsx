import React, { useState, useEffect } from 'react'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import TableMultiselect from '../../../components/UI/MyTable/TableMultiselect/TableMultiselect'

import { useHistory, useParams } from 'react-router'
import { connect } from 'react-redux'
import { getTerminalDetailsThunk, setTerminalDetails, updateTerminalThunk } from '../../../redux/actions/terminalActions'



import styles from './TerminalUpdate.module.scss'
import { activeOptions, currencyOptions, operationsOptions } from '../../../utils/constants'
import Spinner from '../../../components/Spinner/Spinner'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import { useAlert } from '../../../hooks/useAlert'

const TerminalUpdate = ({
  className, getTerminalDetailsThunk, details, acquirers, 
  setTerminalDetails, updateTerminalThunk,
  ...props}) => {

  const {id} = useParams()
  const history = useHistory()

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()


  const {values, handleChange, errors, isValid, setValues } = useFormAndValidation()
  const [activePreselect, setActivePreselect] = useState([{name: 'загружается...'}])
  const [operationsPreselect, setOperationsPreselect] = useState([{name: 'загружается...'}])
  const [currencyPreselect, setcurrencyPreselect] = useState([{name: 'загружается...'}])
 
useEffect(() => {
  const {acquirer_uuid, store_uuid, ...rest} = details
  setValues(rest)
  // eslint-disable-next-line
}, [details])

useEffect(() => {
  if (details) {

    const isActive = activeOptions.find(i => i.value === details.active)

    if (isActive) {
      setActivePreselect([isActive])
    }

    const preselectedOperations = operationsOptions.filter(i => {
        return details.operations.includes(i.value)
    } )

    if (preselectedOperations.length) {
      setOperationsPreselect(preselectedOperations)
    }

    const preselectedCurrency = currencyOptions.find(i => {
      return details.currency_num === i.value
  } )

    if (preselectedCurrency) {
      setcurrencyPreselect([preselectedCurrency])
    }

  }
  // eslint-disable-next-line
}, [details])


useEffect(() => {

  getTerminalDetailsThunk([id])
  .then(checkRes(false))

  return () => {
    setTerminalDetails({
        uuid: '',
        acquirer_uuid: '',
        name: '',
        config: {},
        currency_num: '',
        config_id: '',
        operations: [],
        store_uuid: ''
      })
  }
  // eslint-disable-next-line 
}, [])

  const onSingleSelect = (selectedList, {jsonKey, value}) => {
      console.log(selectedList);
      setValues({
          ...values,
          [jsonKey]: value
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

    const cls = [
        styles.TerminalUpdate,
        className
    ]

    const onSubmit = (evt) => {
      evt.preventDefault()
      const terminalData = {
          ...values,
          uuid: id
      }
      console.log(terminalData);

      updateTerminalThunk(terminalData)
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
      .then(() => console.log('TerminalsAddition'))
      .catch((err) => console.log(err))
  }

  
    if (!details) {
      return <h1>нет такого услуги</h1>
    }

    if (!details.uuid) {
        return <Spinner/>
    }

    return (
        <div className={cls.join(' ')}>
         <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/partners' exact>Список мерчантов</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/shops/${details.store_uuid}`} exact>Детали магазина</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/terminals/${id}`} exact>Детали услуги</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Обновление услуги &nbsp; <strong> {details.name}</strong> </BreadcrumbItem>
        </Breadcrumb>
            <center><h1>Обновление услуги</h1></center>
            <MyTableForm
                onSubmit={onSubmit}
                isValid={isValid}
                buttonText='Сохранить'
            >
                    <TableInput
                         name='name'
                        label='Наименование'
                        onChange={handleChange}
                        value={values.name}
                        errorText={errors.name}
                        minLength={1}
                        maxLength={199}
                    />
                     <TableMultiselect
                        label='Aктивен'
                        options={activeOptions}
                        displayValue="name"
                        onSelect={onSingleSelect}
                        onRemove={onRemove}
                        placeholder='Выберите'
                        singleSelect
                        selectedValues={activePreselect}
                    />
                    <TableMultiselect
                        label='Операции'
                        options={operationsOptions}
                        displayValue="name"
                        onSelect={onMultiSelect}
                        onRemove={onRemove}
                        placeholder='Выберите'
                        selectedValues={operationsPreselect}
                    />
                    <TableMultiselect
                        label='Код валюты'
                        options={currencyOptions}
                        displayValue="name"
                        onSelect={onSingleSelect}
                        onRemove={onRemove}
                        placeholder='Выберите'
                        singleSelect
                        selectedValues={currencyPreselect}
                    />
                    <TableInput
                         name='config_id'
                        label='id конфигурации'
                        onChange={handleChange}
                        value={values.config_id}
                        errorText={errors.config_id}
                        minLength={1}
                        maxLength={200}
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
    details: state.terminals.details,
    // acquirers: state.acquirers.acquirers,
  }
  }

  

export default connect(mapStateToProps, {
   getTerminalDetailsThunk, setTerminalDetails, updateTerminalThunk
  }) (TerminalUpdate)