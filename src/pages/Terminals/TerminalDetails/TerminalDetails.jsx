import React, { useEffect, useState } from 'react'
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
import DetailsTableRow from '../../../components/UI/MyTable/DetailsTableRow/DetailsTableRow'
import MyTable from '../../../components/UI/MyTable/MyTable'
import { useAlert } from '../../../hooks/useAlert'
import { getAcquirersThunk } from '../../../redux/actions/acquirerActions'
import { deleteTerminalsThunk, getTerminalDetailsThunk, setTerminalDetails, updateTerminalThunk } from '../../../redux/actions/terminalActions'

import styles from './TerminalDetails.module.scss'

const TerminalDetails = ({
  className, details, getTerminalDetailsThunk, deleteTerminalsThunk,
  setTerminalDetails, acquirers, shops, getAcquirersThunk, updateTerminalThunk,
  ...props}) => {

  const { id } = useParams()
  const history = useHistory()

  const [partnerUUID, setPartnerUUID] = useState('')
  const [shopName, setShopName] = useState('')

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()

  const [bank, setBank] = useState('')

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

  useEffect(() => {
    getAcquirersThunk()
    .then(checkRes(false))
    // eslint-disable-next-line
}, [])

  useEffect(() => {
    if (acquirers?.length && details) {
      const currentBank = acquirers?.find(i => i.uuid === details.acquirer_uuid)
      setBank(currentBank?.name)
    }
  }, [acquirers, details])

  useEffect(() => {
    if (!shops && !details) return;
    const currentShop = shops?.find(i => i.uuid === details.store_uuid)
    setPartnerUUID(currentShop?.partner_uuid || '')
    setShopName(currentShop?.name || '')
  }, [shops, details])

  const onBlock = () => {
    const confirmed = window.confirm("Вы точно хотите заблокировать?");
    if (!confirmed) return;
    updateTerminalThunk({uuid: id, blocked: true})
    .then(checkRes(false))
    .then(({data}) => setTerminalDetails(data))
    .catch((err) => console.log(err))
  }

  const onActivate = () => {
    const confirmed = window.confirm("Вы точно хотите активировать?");
    if (!confirmed) return;
    updateTerminalThunk({uuid: id, blocked: false})
    .then(checkRes(false))
    .then(({data}) => setTerminalDetails(data))
    .catch((err) => console.log(err))
  }

    const cls = [
        styles.TerminalDetails,
        className
    ]

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
          {partnerUUID && <BreadcrumbItem tag={NavLink} to={`/partners/${partnerUUID}`} exact>Детали мерчанта</BreadcrumbItem>}
          <BreadcrumbItem tag={NavLink} to={`/shops/${details.store_uuid}`} exact>Детали магазина &nbsp; <strong>{shopName}</strong></BreadcrumbItem>
          <BreadcrumbItem active tag="span">Детали услуги &nbsp; <strong>{details.name}</strong></BreadcrumbItem>
        </Breadcrumb>
             <center><h1>Информация об услуге</h1></center>
            <MyTable>
                <DetailsTableRow
                    label='uuid'
                    data={details.uuid}
                />
                <DetailsTableRow
                    label='Банк'
                    data={ bank || details.acquirer_uuid}
                />
                 <DetailsTableRow
                    label='Статус'
                    data={details.blocked? 'Заблокирован' : 'Активен'}
                />
                <DetailsTableRow
                    label='Код валюты'
                    data={details.currency_num}
                />
                <DetailsTableRow
                    label='Наименование'
                    data={details.name}
                />
                <DetailsTableRow
                    label='id конфигурации'
                    data={details.config_id}
                />
                 <DetailsTableRow
                    label='Операции'
                    data={details.operations.join(' ').toUpperCase()}
                />
        </MyTable>


       <FlexBlock>
          <MyButton
                color={'secondary'}
                onClick={() => history.push(`/terminals/update/${id}`)}
                buttonText='редактировать'
            />
            <BlockingButton
              blocked={details.blocked}
              onActivate={onActivate}
              onBlock={onBlock}
            />
       </FlexBlock>
       
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
    acquirers: state.acquirers.acquirers, 
    shops: state.shops.shops,
  }
  }

  

export default connect(mapStateToProps, {
  getTerminalDetailsThunk, deleteTerminalsThunk, setTerminalDetails, 
  getAcquirersThunk, updateTerminalThunk,
 })(TerminalDetails)