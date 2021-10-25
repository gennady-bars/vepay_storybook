import React, { useState, useEffect } from 'react'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import TableMultiselect from '../../../components/UI/MyTable/TableMultiselect/TableMultiselect'

import { useHistory, useParams } from 'react-router'
import { connect } from 'react-redux'
import { getAcquirersThunk } from '../../../redux/actions/acquirerActions'
import { activeOptions, cardBrandsOptions, } from '../../../utils/constants'
import { createPartnerAcquirerThunk } from '../../../redux/actions/partnerAcquirersActions'


import styles from './PartnerAcquierersAddition.module.scss'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import { useAlert } from '../../../hooks/useAlert'

const PartnerAcquierersAddition = ({
    className, acquirers, getAcquirersThunk, createPartnerAcquirerThunk,

    ...props}) => {

    const { partnerId } = useParams()
    const history = useHistory()

    const { successAlertVisible, setSuccessAlertVisible, successMessage,
        failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()
    

    const {values, handleChange, errors, isValid, setValues } = useFormAndValidation()

    const [bankOptions, setBankOptions] = useState([{name: 'Загружаются данные...', avtive: true}])

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
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (acquirers) {
            setBankOptions(acquirers)
        }
    }, [acquirers])

    // useEffect(() => {
    //     setIsValid(false)
    //     // eslint-disable-next-line
    // }, [])

    const cls = [
        styles.PartnerAcquierersAddition,
        className
    ]
    
    const onSubmit = (evt) => {
        evt.preventDefault()
        const partnerBankData = {
            ...values,
            partner_uuid: partnerId
        }
        if (partnerBankData.priority) {
            partnerBankData.priority = Number(partnerBankData.priority)
        }
        console.log(partnerBankData);

        createPartnerAcquirerThunk(partnerBankData)
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
          .then(() => console.log('createPartnerAcquirerThunk'))
          .catch((err) => console.log(err))

    }

    return (
        <div className={cls.join(' ')}>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/partners' exact>Список мерчантов</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/partners/${partnerId}`} exact>Детали мерчанта</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/partners-acquirers/${partnerId}`} exact>Список банков мерчанта</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Детали банка</BreadcrumbItem>
        </Breadcrumb>
             <center><h1>Добавление банка мерчанта</h1></center>
            <MyTableForm
                onSubmit={onSubmit}
                isValid={isValid}
            >
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
                    />
                    <TableMultiselect
                        label='Карточные бренды'
                        options={cardBrandsOptions}
                        displayValue="name"
                        onSelect={onMultiSelect}
                        onRemove={onRemove}
                        placeholder='Выберите'
                    />
                    <TableInput
                        type='number'
                        name='priority'
                        label='Приоритет'
                        onChange={handleChange}
                        value={values.priority || 10}
                        errorText={errors.priority}
                        min={1}
                        max={100}
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
     getAcquirersThunk, createPartnerAcquirerThunk, 
    })(PartnerAcquierersAddition)