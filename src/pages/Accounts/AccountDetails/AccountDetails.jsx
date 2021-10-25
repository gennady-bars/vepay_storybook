import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem} from 'reactstrap'
import FlexBlock from '../../../components/Blocks/FlexBlock/FlexBlock'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import Spinner from '../../../components/Spinner/Spinner'
import BlockingButton from '../../../components/UI/MyButton/BlockingButton/BlockingButton'
import MyButton from '../../../components/UI/MyButton/MyButton'
import DetailsTableRow from '../../../components/UI/MyTable/DetailsTableRow/DetailsTableRow'
import MyTable from '../../../components/UI/MyTable/MyTable'
import { useAlert } from '../../../hooks/useAlert'
import { getAccountDetailsThunk, updateAccountThunk, setAccountDetails } from '../../../redux/actions/accountActions'

import styles from './AccountDetails.module.scss'



const AccountDetails = ({
  details, getAccountDetailsThunk, updateAccountThunk, setAccountDetails,
}) => {

  const { id } = useParams()
  const history = useHistory()

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()


  useEffect(() => {
    getAccountDetailsThunk([+id])
    .then(checkRes(false))
    .then(() => console.log('getAccountDetailsThunk'))
    .catch((err) => console.log(err))
    // eslint-disable-next-line
  }, [])

  const onBlock = () => {
    const confirmed = window.confirm("Вы точно хотите заблокировать?");
    if (!confirmed) return;
    updateAccountThunk({id: +id, blocked: true})
    .then(checkRes(false))
    .then(({data}) => setAccountDetails(data))
    .catch((err) => console.log(err))
  }

  const onActivate = () => {
    const confirmed = window.confirm("Вы точно хотите активировать?");
    if (!confirmed) return;
    updateAccountThunk({id: +id, blocked: false})
    .then(checkRes(false))
    .then(({data}) => setAccountDetails(data))
    .catch((err) => console.log(err))
  }

  if (!details) {
    return (
      <h1>Нет такого аккаунта</h1>
    )
  }

  if (!details.uuid) {
      return <Spinner/>
  }

    return (
        <div className={styles.AccountDetails}>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/accounts' exact>Аккаунты</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Детали аккаунта &nbsp; <strong>{details && details.login}</strong></BreadcrumbItem>
        </Breadcrumb>
            <center><h1>Детали аккаунта   <strong>{details && details.login}</strong></h1></center>
            <MyTable>
                <DetailsTableRow
                    label='uuid'
                    data={details.uuid}
                />
                <DetailsTableRow
                    label='Статус'
                    data={(details.blocked && 'заблокирован') || 'активен'}
                />
                {details.deleted &&  (
                    <DetailsTableRow
                      label='Удален'
                      data={details.deleted && 'удален'}
                    />
                )}
                <DetailsTableRow
                    label='E-mail'
                    data={details.email}
                />
                <DetailsTableRow
                    label='Логин'
                    data={details.login}
                />
                <DetailsTableRow
                    label='Создан'
                    data={(new Date(details.created).toLocaleDateString())}
                />
                <DetailsTableRow
                    label='Телефон'
                    data={details.phone_number}
                />
                <DetailsTableRow
                    label='Верификация'
                    data={(details.verification_required && 'требуется') || 'не требуется'}
                />
                {details.suspended_until && (
                  <DetailsTableRow
                    label='Приостановлен до'
                    data={(new Date(details.suspended_until).toLocaleDateString())}
                  />
                )}
                
        </MyTable>

        <FlexBlock>
          <MyButton
                color={'secondary'}
                onClick={() => history.push(`/accounts/${id}/update`)}
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
      details: state.accounts.details,
  }
}



export default connect(mapStateToProps, {
  getAccountDetailsThunk, updateAccountThunk, setAccountDetails
})(AccountDetails)