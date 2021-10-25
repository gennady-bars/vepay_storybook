import React, { useState, useEffect } from 'react'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import TableMultiselect from '../../../components/UI/MyTable/TableMultiselect/TableMultiselect'

import { useHistory, useParams } from 'react-router'
import { connect } from 'react-redux'
import { getAcquirersThunk } from '../../../redux/actions/acquirerActions'
import { activeOptions, cardBrandsOptions, } from '../../../utils/constants'
import { getPartnerAcquirerDetailsThunk, setPartnerAcquirerDetails, updatePartnerAcquirerThunk } from '../../../redux/actions/partnerAcquirersActions'


import styles from './PartnerAcquierersUpdate.module.scss'
import Spinner from '../../../components/Spinner/Spinner'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { useAlert } from '../../../hooks/useAlert'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'

const PartnerAcquierersUpdate = ({
  className, acquirers, getAcquirersThunk, getPartnerAcquirerDetailsThunk,
  details, updatePartnerAcquirerThunk, setPartnerAcquirerDetails, 
  ...props}) => {

  const { partnerId, id } = useParams()
  const history = useHistory()

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()


  const {values, handleChange, errors, isValid, setValues } = useFormAndValidation()
  const [bankOptions, setBankOptions] = useState([{name: 'Загружаются данные...', avtive: true}])
  const [bankPreselect, setBankPreselect] = useState([{name: 'загружается...'}])
  const [activePreselect, setActivePreselect] = useState([{name: 'загружается...'}])
  const [cardBrandsPreselect, setCardBrandsPreselect] = useState([{name: 'загружается...'}])
 
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

      getPartnerAcquirerDetailsThunk([id])
  
      return () => {
        setPartnerAcquirerDetails({
          uuid: '',
          acquirer_uuid: '',
          active: '',
          card_brands: [],
          partner_uuid: '',
          priority: '',
          })
      }
      // eslint-disable-next-line 
    }, [])
    useEffect(() => {
      getAcquirersThunk()
      // eslint-disable-next-line
  }, [])
  useEffect(() => {
      if (acquirers) {
          setBankOptions(acquirers)
      }
  }, [acquirers])

  useEffect(() => {
    setValues(details)
    // eslint-disable-next-line
  }, [details])

  useEffect(() => {
    if (details && acquirers) {
  
      const preselectedBank = [...acquirers].find(i => i.uuid === details.acquirer_uuid)
      if (preselectedBank?.name) {
        setBankPreselect([preselectedBank])
      }
  
      const isActive = activeOptions.find(i => i.value === details.active)
  
      if (isActive) {
        setActivePreselect([isActive])
      }

      const preselectedCardBrands = cardBrandsOptions.filter(i => {
        return details.card_brands.includes(i.value)
      })

      if (preselectedCardBrands.length) {
        setCardBrandsPreselect(preselectedCardBrands)
      }
    }
    // eslint-disable-next-line
  }, [details, acquirers])

    const cls = [
        styles.PartnerAcquierersUpdate,
        className
    ]

    const onSubmit = (evt) => {
      evt.preventDefault()
      const partnerBankData = {
          ...values,
          // partner_uuid: partnerId
      }
      if (partnerBankData.priority) {
          partnerBankData.priority = Number(partnerBankData.priority)
      }
      console.log(partnerBankData);

      updatePartnerAcquirerThunk(partnerBankData)
      .then(checkRes())
      .then(res => {
        if (res.ok) {
            setTimeout(() => {
              history.goBack()
            }, 1000)
        }
    })
      .then(() => console.log('updatePartnerAcquirerThunk'))

  }

  if (!details) {
    return <h1>нет такого банка мерчанта</h1>
  }

  if (!details.uuid) {
      return <Spinner/>
  }

    return (
        <div className={cls.join(' ')}>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/partners' exact>Список мерчантов</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/partners/${partnerId}`} exact>Детали мерчанта</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/partners-acquirers/${partnerId}`} exact>Список банков мерчанта</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/partners-acquirers/${partnerId}/${id}`} exact>Детали банка</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Редактирование банка</BreadcrumbItem>
        </Breadcrumb>
              <center><h1>Редактирование банка мерчанта</h1></center>
            <MyTableForm
                onSubmit={onSubmit}
                isValid={isValid}
                buttonText='Обновить'
            >
                    <TableMultiselect
                        label='Банк'
                        options={bankOptions}
                        displayValue="name"
                        onSelect={onBankSelect}
                        onRemove={onRemove}
                        placeholder='Выберите'
                        singleSelect
                        selectedValues={bankPreselect}
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
                        label='Карточные бренды'
                        options={cardBrandsOptions}
                        displayValue="name"
                        onSelect={onMultiSelect}
                        onRemove={onRemove}
                        placeholder='Выберите'
                        selectedValues={cardBrandsPreselect}
                        
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
      details: state.partnerAcquirers.details,
  }
}



export default connect(mapStateToProps, {
  getAcquirersThunk, getPartnerAcquirerDetailsThunk, updatePartnerAcquirerThunk,
  setPartnerAcquirerDetails,
})(PartnerAcquierersUpdate)