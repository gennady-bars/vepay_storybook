import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import MyTable from '../../../components/UI/MyTable/MyTable'
import Spinner from '../../../components/Spinner/Spinner'
import { deletePartnersThunk, getPartnerDetailsThunk, setPartnerDetails, updatePartnerThunk } from '../../../redux/actions/partnerActions'

import styles from './PartnerDetails.module.scss'
import { getShopsThunk } from '../../../redux/actions/shopActions'
import DetailsTableRow from '../../../components/UI/MyTable/DetailsTableRow/DetailsTableRow'
import MyButton from '../../../components/UI/MyButton/MyButton'
import { NavLink } from 'react-router-dom'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import { useAlert } from '../../../hooks/useAlert'
import FlexBlock from '../../../components/Blocks/FlexBlock/FlexBlock'
import { getTrimmedValues } from '../../../utils/utils'
import { useFormAndValidation } from '../../../hooks/useFormValiation'
import MyTableForm from '../../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../../components/UI/MyTable/TableInput/TableInput'
import ClickableTH from '../../../components/UI/MyTable/ClickableTH/ClickableTH'
import TableNotFound from '../../../components/UI/MyTable/TableNotFound/TableNotFound'
import HoverTable from '../../../components/UI/MyTable/HoverTable/HoverTable'
import StatusTD from '../../../components/UI/MyTable/StatusTD/StatusTD'
import MyCollapse from '../../../components/UI/MyCollapse/MyCollapse'



const PartnerDetails = ({
    className, details, getPartnerDetailsThunk, setPartnerDetails, deletePartnersThunk,
    getShopsThunk, shops, updatePartnerThunk,
     ...props}) => {

  const {id} = useParams()
  const history = useHistory()

  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()


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
    
    getShopsThunk({
        ...sortedData,
        partner_uuid: id
    })
    .then(checkRes(false))
    .catch((err) => console.log(err))
}

const getDetails = () => {
    getPartnerDetailsThunk([id])
    .then(checkRes(false))
    .catch((err) => console.log(err))
}

  const blockPartner = () => {
    const confirmed = window.confirm("Вы точно хотите заблокировать?");
    if (!confirmed) return;
    updatePartnerThunk({uuid: id, blocked: true})
    .then(checkRes(false))
    .then(({data}) => setPartnerDetails(data))
    .catch((err) => console.log(err))
  }

  const activatePartner = () => {
    const confirmed = window.confirm("Вы точно хотите активировать?");
    if (!confirmed) return;
    updatePartnerThunk({uuid: id, blocked: false})
    .then(checkRes(false))
    .then(({data}) => setPartnerDetails(data))
    .catch((err) => console.log(err))
  }

  const onSubmit = (evt) => {
    evt.preventDefault()

    const filterData = getTrimmedValues(values)

    getShopsThunk({
        ...filterData,
        partner_uuid: id
    })
    .then(checkRes(false))
    .catch((err) => console.log(err))

    console.log(filterData);
  }

  const onReset = () => {
    resetForm({}, {}, true)
}

  useEffect(() => {
    getDetails()
    
    return () => {
        setPartnerDetails({
            uuid: '',
            inn: '',
            name: '',
        })
    }
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    getShopsThunk({
        partner_uuid: id
    })
    .then(checkRes(false))
    .catch((err) => console.log(err))
    
    return () => {
      
    }
    // eslint-disable-next-line 
  }, [])

    const cls = [
        styles.PartnerDetails,
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
          <BreadcrumbItem active tag="span">Детали мерчанта &nbsp; <strong>{details.name}</strong></BreadcrumbItem>
        </Breadcrumb>
            <center><h1>Информация о мерчанте</h1></center>
            <MyTable>
                <DetailsTableRow
                    label='uuid'
                    data={details.uuid}
                />
                <DetailsTableRow
                    label='ИНН'
                    data={details.inn}
                />
                <DetailsTableRow
                    label='Наименование'
                    data={details.name}
                />
                <DetailsTableRow
                    label='Email'
                    data={details.email}
                />
                <DetailsTableRow
                    label='ФИО контактного лица'
                    data={details.contacts?.contact_name}
                />
                <DetailsTableRow
                    label='Должность контактного лица'
                    data={details.contacts?.contact_person_position}
                />
                <DetailsTableRow
                    label='E-mail контактного лица'
                    data={details.contacts?.contact_email}
                />
                <DetailsTableRow
                    label='Телефон контактного лица'
                    data={details.contacts?.contact_phone}
                />
                <DetailsTableRow
                    label='Дополнительные данные'
                    data={details.contacts?.other_contact_info}
                />
                <DetailsTableRow
                    label='Статус'
                    data={details.blocked? 'Заблокирован' : 'Активен'}
                />
             
            </MyTable>

            <FlexBlock>
                <MyButton
                    color={'secondary'}
                    onClick={() => history.push(`/partners/update/${id}`)}
                    buttonText='редактировать'
                />
                <MyButton
                    color={details.blocked? 'success' : 'danger'}
                    onClick={details.blocked? activatePartner : blockPartner }
                    buttonText={details.blocked? 'активировать' : 'заблокировать мерчанта'}
                />
            </FlexBlock>

            
            {/* <MyButton
                color={'success'}
                onClick={() => history.push(`/partners-acquirers/${id}`)}
                buttonText='банки мерчанта'
            /> */}
         

            <center><h2>Список магазинов</h2></center>
            <MyCollapse>
                <MyTableForm
                    onSubmit={onSubmit}
                    isValid={isValid}
                    buttonText='Найти'
                    resetForm={onReset}
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
                    <TableInput
                        name='site'
                        label='Сайт'
                        onChange={handleChange}
                        value={values.site}
                        errorText={errors.site}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                        name='uuid'
                        label='uuid'
                        onChange={handleChange}
                        value={values.uuid}
                        errorText={errors.uuid}
                        minLength={1}
                        maxLength={199}
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
                    />
                </MyTableForm>
            </MyCollapse>
            {
                shops && (

                    <HoverTable>

                        <thead>
                            <tr>
                                <th>№</th>
                                <ClickableTH
                                    onClick={() => changeOrder('site')}
                                    label='Сайт'
                                    thisField='site'
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
                                <ClickableTH
                                    onClick={() => changeOrder('blocked')}
                                    label='Cтатус'
                                    thisField='blocked'
                                    sortField={sortField}
                                    order={order}
                                />
                                <th>uuid</th>
                            </tr>
                        </thead>
                        <tbody>
                            { shops.length?
                                shops.map((shop, i) => {
                                    return (
                                        <tr 
                                            key={shop.uuid} 
                                            onClick={() => history.push(`/shops/${shop.uuid}`)}
                                        >
                                            <td>{i+1}</td>
                                            <td>{shop.site}</td>
                                            <td>{shop.name}</td>
                                            <StatusTD
                                                active={!shop.blocked}
                                            />
                                            <td>{shop.uuid}</td>
                                        </tr>
                                    )
                                }) :
                                (
                                    <TableNotFound/>
                                )
                            }

                        </tbody>

                    </HoverTable>

                )
            }

           
            <MyButton
                color={'primary'}
                onClick={() => history.push(`/add-shop/${id}`)}
                buttonText='добавить магазин'
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
        details: state.partners.details,
        shops: state.shops.shops,
    }
}



export default connect(
    mapStateToProps, {
        getPartnerDetailsThunk, setPartnerDetails, deletePartnersThunk,
        getShopsThunk, updatePartnerThunk,
    }
    )(PartnerDetails)