import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { connect } from 'react-redux'
import { deletePartnerAcquirersThunk, getPartnerAcquirerDetailsThunk, setPartnerAcquirerDetails } from '../../../redux/actions/partnerAcquirersActions'


import styles from './PartnerAcquierersDetails.module.scss'
import Spinner from '../../../components/Spinner/Spinner'
import MyTable from '../../../components/UI/MyTable/MyTable'
import DetailsTableRow from '../../../components/UI/MyTable/DetailsTableRow/DetailsTableRow'
import MyButton from '../../../components/UI/MyButton/MyButton'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import FlexBlock from '../../../components/Blocks/FlexBlock/FlexBlock'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import { useAlert } from '../../../hooks/useAlert'

const PartnerAcquierersDetails = ({
  className, details, getPartnerAcquirerDetailsThunk, deletePartnerAcquirersThunk,
  setPartnerAcquirerDetails, 
  ...props}) => {

  const {partnerId, id} = useParams()
  const history = useHistory()

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()


  useEffect(() => {

    getPartnerAcquirerDetailsThunk([id])
    .then(checkRes(false))

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

  const onDelete = () => {
    const confirmed = window.confirm("Вы точно хотите удалить?");
    if (confirmed) {
      deletePartnerAcquirersThunk([id])
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
      .then(() => {
        console.log('deletePartnerAcquirersThunk');
      })
      .catch((err) => console.log(err))
    }
  }

    const cls = [
        styles.PartnerAcquierersDetails,
        className
    ]
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
          <BreadcrumbItem active tag="span">Детали банка</BreadcrumbItem>
        </Breadcrumb>
             <center><h1>Информация о банке мерчанта</h1></center>
            <MyTable>
              <DetailsTableRow
                  label='uuid'
                  data={details.uuid}
              />
              <DetailsTableRow
                  label='Банк'
                  data={details.acquirer_uuid}
              />
              <DetailsTableRow
                  label='Статус'
                  data={(details.active && 'активен') || 'неактивен'}
              />
              <DetailsTableRow
                  label='Приоритет'
                  data={details.priority}
              />
              <DetailsTableRow
                  label='Бренды карт'
                  data={details.card_brands.join(' ').toUpperCase()}
              />

        </MyTable>

        <FlexBlock>
              <MyButton
                    color={'secondary'}
                    onClick={() => history.push(`/partners-acquirers/${partnerId}/${id}/update`)}
                    buttonText='редактировать'
                />
                <MyButton
                    color={'danger'}
                    onClick={onDelete}
                    buttonText='удалить'
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
    details: state.partnerAcquirers.details,
  }
  }
  

export default connect(mapStateToProps, {
  getPartnerAcquirerDetailsThunk, deletePartnerAcquirersThunk, setPartnerAcquirerDetails
})(PartnerAcquierersDetails)