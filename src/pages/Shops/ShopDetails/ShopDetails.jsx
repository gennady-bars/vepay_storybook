import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import FlexBlock from '../../../components/Blocks/FlexBlock/FlexBlock'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import Spinner from '../../../components/Spinner/Spinner'
import BlockingButton from '../../../components/UI/MyButton/BlockingButton/BlockingButton'
import MyButton from '../../../components/UI/MyButton/MyButton'
import MyCollapse from '../../../components/UI/MyCollapse/MyCollapse'
import ClickableTH from '../../../components/UI/MyTable/ClickableTH/ClickableTH'
import DetailsTableRow from '../../../components/UI/MyTable/DetailsTableRow/DetailsTableRow'
import HoverTable from '../../../components/UI/MyTable/HoverTable/HoverTable'
import MyTable from '../../../components/UI/MyTable/MyTable'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'
import StatusTD from '../../../components/UI/MyTable/StatusTD/StatusTD'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import TableMultiselect from '../../../components/UI/MyTable/TableMultiselect/TableMultiselect'
import TableNotFound from '../../../components/UI/MyTable/TableNotFound/TableNotFound'
import { useAlert } from '../../../hooks/useAlert'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import { getAcquirersThunk } from '../../../redux/actions/acquirerActions'
import { deleteShopsThunk, getShopDetailsThunk, setShopDetails, updateShopThunk } from '../../../redux/actions/shopActions'
import { getTerminalsThunk } from '../../../redux/actions/terminalActions'
import { activeOptions, currencyOptions, operationsOptions } from '../../../utils/constants'
import { getTrimmedValues } from '../../../utils/utils'

import styles from './ShopDetails.module.scss'

const ShopDetails = ({
  className, details,  getShopDetailsThunk, setShopDetails, getTerminalsThunk,
  deleteShopsThunk, terminals, acquirers, partners, getAcquirersThunk, updateShopThunk,
   ...props}) => {

  const {id} = useParams()
  const history = useHistory()

  const bankRef = useRef()
  const blockedRef = useRef()
  const operationsdRef = useRef()
  const currencyRef = useRef()

  const [partner, setPartner] = useState('')

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()

  const [bankOptions, setBankOptions] = useState([{name: 'Загружаются данные...', avtive: true}])

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()

    const [order, setOrder] = useState(true)
    const [sortField, setSortField] = useState('')

    const changeOrder = (field) => {
      setOrder(!order)
      setSortField(field)
  
      const filterData = getTrimmedValues(values)

      const sortedData = {
          ...filterData,
          "sort_by": [
              {
                field,
                order: order? 'asc' : 'desc'
              }
          ]
      }
      
      getTerminalsThunk({
          ...sortedData,
          store_uuid: id
        })
      .then(checkRes(false))
      .catch((err) => console.log(err))
  
  }

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

  const onSubmit = (evt) => {
    evt.preventDefault()

    let filterData = getTrimmedValues(values)

    if (filterData.operations) {
        if (filterData.operations.length === 0) {
            const {operations, ...rest} = filterData
            filterData = rest
        }
    }
    getTerminalsThunk({
        ...filterData,
        store_uuid: id
    })
    .then(checkRes(false))
    .catch((err) => console.log(err))

    console.log(filterData);
  }

  const onReset = () => {
    resetForm({}, {}, true)
   const refList = [bankRef, blockedRef, operationsdRef, currencyRef]
   refList.forEach((i) => i.current.resetSelectedValues())
}

  const onBlock = () => {
    const confirmed = window.confirm("Вы точно хотите заблокировать?");
    if (!confirmed) return;
    updateShopThunk({uuid: id, blocked: true})
    .then(checkRes(false))
    .then(({data}) => setShopDetails(data))
    .catch((err) => console.log(err))
  }

  const onActivate = () => {
    const confirmed = window.confirm("Вы точно хотите активировать?");
    if (!confirmed) return;
    updateShopThunk({uuid: id, blocked: false})
    .then(checkRes(false))
    .then(({data}) => setShopDetails(data))
    .catch((err) => console.log(err))
  }

  useEffect(() => {
      if (!partners && !details)  return;
        const currentPartner = partners?.find((i) => i.uuid === details?.partner_uuid)
        setPartner(currentPartner?.name || '')

  }, [partners, details])

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

    getShopDetailsThunk([id])
    .then(checkRes(false))
    .catch((err) => console.log(err))

    getTerminalsThunk({store_uuid: id})
    .then(checkRes(false))
    .catch((err) => console.log(err))

    return () => {
      setShopDetails({
          uuid: '',
          partner_uuid: '',
          name: '',
        })
    }
    // eslint-disable-next-line 
  }, [])

    const cls = [
        styles.ShopDetails,
        className
    ]
    if (!details) {
        return <h1>нет такого магазина</h1>
    }

    if (!details.uuid) {
        return <Spinner/>
    }

    return (
        <div className={cls.join(' ')}>
         <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/partners' exact>Список мерчантов</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/partners/${details.partner_uuid}`} exact>Детали мерчанта  &nbsp; <strong>{partner}</strong></BreadcrumbItem>
          <BreadcrumbItem active tag="span">Детали магазина &nbsp; <strong>{details.name}</strong></BreadcrumbItem>
        </Breadcrumb>
            <center><h1>Информация о магазине</h1></center>
            <MyTable>
                 <DetailsTableRow
                    label='uuid'
                    data={details.uuid}
                />
                 <DetailsTableRow
                    label='Наименование'
                    data={details.name}
                />
                 <DetailsTableRow
                    label='Сайт'
                    data={details.site}
                />
                <DetailsTableRow
                    label='Статус'
                    data={details.blocked? 'Заблокирован' : 'Активен'}
                />
                
            </MyTable>
               
            <br />
            <hr />
            <center><h2>Реквизиты</h2></center>

            <MyTable>
                <DetailsTableRow
                        // column
                        label='Юридическое лицо'
                        data={details.bank_details?.legal_entity}
                    />
                    <DetailsTableRow
                        // column
                        label='ИНН'
                        data={details.bank_details?.inn}
                    />
                    <DetailsTableRow
                        // column
                        label='КПП'
                        data={details.bank_details?.kpp}
                    />
                    <DetailsTableRow
                        // column
                        label='ОГРН'
                        data={details.bank_details?.ogrn}
                    />
                    <DetailsTableRow
                        // column
                        label='Юридический адрес'
                        data={details.bank_details?.legal_address}
                    />
                    <DetailsTableRow
                        // column
                        label='Номер договора'
                        data={details.bank_details?.contract_number}
                    />
            </MyTable>

            <br />
            <hr />
            <center><h2>Дополнительные настройки</h2></center>

            <MyTable>
                    <DetailsTableRow
                        label='Callback url'
                        data={details.settings?.callback_url}
                    />
                    <DetailsTableRow
                        label='Callback key'
                        data={details.settings?.callback_key}
                    />
                    <DetailsTableRow
                        label='Адрес редиректа при успешной оплате'
                        data={details.settings?.successful_payment_redirect_url}
                    />
                    <DetailsTableRow
                        label='Адрес редиректа при неуспешной оплате'
                        data={details.settings?.failure_payment_redirect_url}
                    />
                    <DetailsTableRow
                        label='Email для отправки реестра'
                        data={details.settings?.email_for_reports}
                    />
            </MyTable>

            <FlexBlock>
                    <MyButton
                        color={'secondary'}
                        onClick={() => history.push(`/shops/update/${id}`)}
                        buttonText='редактировать'
                    />
                    <BlockingButton
                        blocked={details.blocked}
                        onActivate={onActivate}
                        onBlock={onBlock}
                    />
            </FlexBlock>


            <center><h2>Список услуг</h2></center>
            <MyCollapse>
                <MyTableForm
                    onSubmit={onSubmit}
                    isValid={isValid}
                    buttonText='Найти'
                    resetForm={onReset}
                >
                
                <div className={styles.flexInputsWrap}>
                        <div className={styles.flexInputs}>
                            <TableInput
                                name='name'
                                label='Наименование'
                                onChange={handleChange}
                                value={values.name}
                                errorText={errors.name}
                                minLength={1}
                                maxLength={199}
                                DivTableTDcls={styles.DivTableTDcls}
                            />
                            <TableInput
                                name='uuid'
                                label='uuid'
                                onChange={handleChange}
                                value={values.uuid}
                                errorText={errors.uuid}
                                minLength={1}
                                maxLength={199}
                                DivTableTDcls={styles.DivTableTDcls}
                            />
                            <TableInput
                                type='number'
                                name='limit'
                                label='Кол-во записей'
                                onChange={handleChange}
                                value={values.limit}
                                errorText={errors.limit}
                                style={{
                                    width: `140px`
                                }}
                                min={1}
                                max={100}
                                DivTableTDcls={styles.DivTableTDcls}
                            />
                        </div>
                    <div className={styles.flexMultiInputs} >
                            <TableMultiselect
                                label='Банк'
                                options={bankOptions}
                                displayValue="name"
                                onSelect={onBankSelect}
                                onRemove={onRemove}
                                placeholder='Выберите'
                                singleSelect
                                DivTableTHcls={styles.DivTableTHcls}
                                multiRef={bankRef}
                            />
                            <TableMultiselect
                                label='Aктивен'
                                options={activeOptions}
                                displayValue="name"
                                onSelect={onSingleSelect}
                                onRemove={onRemove}
                                placeholder='Выберите'
                                singleSelect
                                DivTableTHcls={styles.DivTableTHcls}
                                multiRef={blockedRef}
                            />
                            <TableMultiselect
                                label='Операции'
                                options={operationsOptions}
                                displayValue="name"
                                onSelect={onMultiSelect}
                                onRemove={onRemove}
                                placeholder='Выберите'
                                DivTableTHcls={styles.DivTableTHcls}
                                multiRef={operationsdRef}
                            />
                            <TableMultiselect
                                label='Код валюты'
                                options={currencyOptions}
                                displayValue="name"
                                onSelect={onSingleSelect}
                                onRemove={onRemove}
                                placeholder='Выберите'
                                singleSelect
                                DivTableTHcls={styles.DivTableTHcls}
                                multiRef={currencyRef}
                            />
                    </div>
                </div>
                </MyTableForm>
            </MyCollapse>


                    <HoverTable>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Банк</th>
                                <ClickableTH
                                    onClick={() => changeOrder('blocked')}
                                    label='Cтатус'
                                    thisField='blocked'
                                    sortField={sortField}
                                    order={order}
                                />
                                <ClickableTH
                                    onClick={() => changeOrder('currency_num')}
                                    label='Валюта'
                                    thisField='currency_num'
                                    sortField={sortField}
                                    order={order}
                                />
                                <ClickableTH
                                    onClick={() => changeOrder('name')}
                                    label='Наименование'
                                    thisField='name'
                                    sortField={sortField}
                                    order={order}
                                />
                                <th>Операции</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            terminals?.length ? terminals.map((item, i) => {
                                const currency =  currencyOptions.find(i => {
                                                    return i.value === item.currency_num
                                                })
                                const currentBank = acquirers?.find((bank) => {
                                    return bank.uuid === item.acquirer_uuid
                                })
                                return (
                                        <tr 
                                            key={item.uuid} 
                                            onClick={() => history.push(`/terminals/${item.uuid}`)}
                                        >
                                            <td>{i+1}</td>
                                            <td>{currentBank?.name}</td>
                                            <StatusTD
                                                 active={!item.blocked}
                                            />
                                            <td> 
                                                {`${item.currency_num} / ${currency?.code} / ${currency?.name}`}
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.operations.join(' ').toUpperCase()}</td>
                                        </tr>
                                    )
                            }) : (
                                <TableNotFound/>
                            )
                           }
                        </tbody>
                    </HoverTable>
                    
                    <MyButton
                        color={'primary'}
                        onClick={() => history.push(`/add-terminal/${id}`)}
                        buttonText='добавить услугу'
                    />

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
    details: state.shops.details,
    terminals: state.terminals.terminals,
    acquirers: state.acquirers.acquirers,
    partners: state.partners.partners
  }
  }



export default connect(mapStateToProps, {
  getShopDetailsThunk, setShopDetails, deleteShopsThunk, getTerminalsThunk,
  getAcquirersThunk, updateShopThunk,
})(ShopDetails)