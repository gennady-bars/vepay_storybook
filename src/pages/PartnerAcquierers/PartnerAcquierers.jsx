import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import MyTableForm from '../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../components/UI/MyTable/TableInput/TableInput'
import { useFormAndValidation } from '../../hooks/useFormValiation'

import styles from './PartnerAcquierers.module.scss'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import TableMultiselect from '../../components/UI/MyTable/TableMultiselect/TableMultiselect'
import { connect } from 'react-redux'
import { getPartnerAcquirersThunk } from '../../redux/actions/partnerAcquirersActions'
import MyButton from '../../components/UI/MyButton/MyButton'
import StatusTD from '../../components/UI/MyTable/StatusTD/StatusTD'
import { getTrimmedValues } from '../../utils/utils'
import { activeOptions, cardBrandsOptions } from '../../utils/constants'
import { getAcquirersThunk } from '../../redux/actions/acquirerActions'
import SuccessAlert from '../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../components/MyAlert/FailureAlert/FailureAlert'
import { useAlert } from '../../hooks/useAlert'
import ClickableTH from '../../components/UI/MyTable/ClickableTH/ClickableTH'
import HoverTable from '../../components/UI/MyTable/HoverTable/HoverTable'

const PartnerAcquierers = ({
    className, getPartnerAcquirersThunk, partnerAcquirers=[],
    acquirers, getAcquirersThunk,
    ...props}) => {

    const {partnerId} = useParams()
    const history = useHistory()

    const activeRef = useRef()

    const { successAlertVisible, setSuccessAlertVisible, successMessage,
        failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()
    

    const {values, handleChange, errors, setValues, isValid } = useFormAndValidation()
   
    const onSingleSelect = (selectedList, {jsonKey, value}) => {
        console.log(selectedList);
        setValues({
            ...values,
            [jsonKey]: value
        })
    }
    // const onBankSelect = (selectedList, selectedItem) => {
    //     console.log(selectedList);
    //     setValues({
    //         ...values,
    //         acquirer_uuid: selectedItem.uuid
    //     })
    // }
    const onMultiSelect = (selectedList, selectedItem) => {
        console.log(selectedList);
        setValues({
            ...values,
            [selectedItem.jsonKey]: selectedList.map(i => i.value)
        })
    }

    const [order, setOrder] = useState(true)

    const changeOrder = (field) => {
      setOrder(!order)
      let filterData = getTrimmedValues(values)

      if (filterData.priority_to) {
          filterData.priority_to = Number(filterData.priority_to)
      }
      if (filterData.priority_from) {
          filterData.priority_from = Number(filterData.priority_from)
      }

      if (filterData.card_brands) {
          if (filterData.card_brands.length === 0) {
              const {card_brands, ...rest} = filterData
              filterData = rest
          }
      }
  
      const sortedData = {
          ...filterData,
          "sort_by": [
              {
                field,
                order: order? 'asc' : 'desc'
              }
          ]
      }
      
      getPartnerAcquirersThunk({
        ...sortedData,
        partner_uuid: partnerId
     })
     .then(checkRes(false))
  
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

        if (filterData.priority_to) {
            filterData.priority_to = Number(filterData.priority_to)
        }
        if (filterData.priority_from) {
            filterData.priority_from = Number(filterData.priority_from)
        }

        if (filterData.card_brands) {
            if (filterData.card_brands.length === 0) {
                const {card_brands, ...rest} = filterData
                filterData = rest
            }
        }

        getPartnerAcquirersThunk({
            ...filterData,
            partner_uuid: partnerId
        })
        .then(checkRes(false))

        console.log(filterData);
      }
    const cls = [
        styles.PartnerAcquierers,
        className
    ]


    useEffect(() => {
        getAcquirersThunk()
        .then(checkRes(false))
        .catch((err) => console.log(err))
    // eslint-disable-next-line
      }, [])

    useEffect(() => {
        getPartnerAcquirersThunk({
            partner_uuid: partnerId
        })
        .then(checkRes(false))
        .catch((err) => console.log(err))
        // eslint-disable-next-line 
      }, [])

    return (
        <div className={cls.join(' ')}>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/partners' exact>???????????? ??????????????????</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} to={`/partners/${partnerId}`} exact>???????????? ????????????????</BreadcrumbItem>
          <BreadcrumbItem active tag="span">???????????? ???????????? ????????????????</BreadcrumbItem>
        </Breadcrumb>
            <center><h1>???????????? ???????????? ????????????????</h1></center>

            <MyTableForm
                 onSubmit={onSubmit}
                isValid={isValid}
                buttonText='??????????'
            >

                <TableMultiselect
                    label='A????????????'
                    options={activeOptions}
                    displayValue="name"
                    onSelect={onSingleSelect}
                    onRemove={onRemove}
                    placeholder='????????????????'
                    singleSelect
                    multiRef={activeRef}
                />
                <TableMultiselect
                    label='???????????? ????????'
                    options={cardBrandsOptions}
                    displayValue="name"
                    onSelect={onMultiSelect}
                    onRemove={onRemove}
                    placeholder='????????????????'
                />
                 <TableInput
                        type='number'
                        name='priority_from'
                        label='?????????????????? ????'
                        onChange={handleChange}
                        value={values.priority_from}
                        errorText={errors.priority_from}
                        style={{
                            width: `140px`
                        }}
                        min={1}
                        max={100}
                    />
                 <TableInput
                        type='number'
                        name='priority_to'
                        label='?????????????????? ????'
                        onChange={handleChange}
                        value={values.priority_to}
                        errorText={errors.priority_to}
                        style={{
                            width: `140px`
                        }}
                        min={1}
                        max={100}
                    />

            </MyTableForm>

            <HoverTable>
                <thead>
                    <tr>
                        <th>????????</th>
                        <ClickableTH
                            onClick={() => changeOrder('active')}
                            label='C??????????'
                        />
                        <ClickableTH
                            onClick={() => changeOrder('priority')}
                            label='??????????????????'
                        />
                        {/* <th>??????????????????</th> */}
                        <th>??????????</th>
                    </tr>
                </thead>
                <tbody>
                   
                    {
                        partnerAcquirers && partnerAcquirers.map((item) => {
                            const bank = acquirers?.find((bank) => {
                                    return bank.uuid === item.acquirer_uuid
                                })

                            return (
                                <tr 
                                    key={item.uuid} 
                                    onClick={() => history.push(`/partners-acquirers/${partnerId}/${item.uuid}`)}
                                >
                                    <td>{bank?.name}</td>
                                    <StatusTD
                                        active={item.active}
                                    />
                                    <td>{item.priority}</td>
                                    <td>{item.card_brands.join(' ').toUpperCase()}</td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </HoverTable>
            {/* <Link to={`/add-partner-acquirer/${partnerId}`} >???????????????? ????????</Link> */}

            <MyButton
                color={'primary'}
                onClick={() => history.push(`/add-partner-acquirer/${partnerId}`)}
                buttonText='???????????????? ????????'
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
        partnerAcquirers: state.partnerAcquirers.partnerAcquirers,
        acquirers: state.acquirers.acquirers,

    }
}



export default connect(mapStateToProps, {
    getPartnerAcquirersThunk, getAcquirersThunk,
})(PartnerAcquierers)