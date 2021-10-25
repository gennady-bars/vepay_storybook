import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import MyTable from '../../../components/UI/MyTable/MyTable'
import MyButton from '../../../components/UI/MyButton/MyButton'
import Spinner from '../../../components/Spinner/Spinner'

import styles from './AcquirersDetails.module.scss'
import { deleteAcquirersThunk, getAcquirerDetailsThunk, setAcquirerDetails, updateAcquirerThunk } from '../../../redux/actions/acquirerActions'
import DetailsTableRow from '../../../components/UI/MyTable/DetailsTableRow/DetailsTableRow'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import FlexBlock from '../../../components/Blocks/FlexBlock/FlexBlock'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import { useAlert } from '../../../hooks/useAlert'
import BlockingButton from '../../../components/UI/MyButton/BlockingButton/BlockingButton'

const AcquirersDetails = ({
  className, details, getAcquirerDetailsThunk, setAcquirerDetails, 
  deleteAcquirersThunk, updateAcquirerThunk,
   ...props}) => {

  const {id} = useParams()
  const history = useHistory()

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()


  const onBlock = () => {
    const confirmed = window.confirm("Вы точно хотите заблокировать?");
    if (!confirmed) return;
    updateAcquirerThunk({uuid: id, blocked: true})
    .then(checkRes(false))
    .then(({data}) => setAcquirerDetails(data))
    .catch((err) => console.log(err))
  }

  const onActivate = () => {
    const confirmed = window.confirm("Вы точно хотите активировать?");
    if (!confirmed) return;
    updateAcquirerThunk({uuid: id, blocked: false})
    .then(checkRes(false))
    .then(({data}) => setAcquirerDetails(data))
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getAcquirerDetailsThunk([id])
    return () => {
      setAcquirerDetails({
          uuid: '',
          active: true,
          alias: '',
          name: '',
        })
    }
    // eslint-disable-next-line 
  }, [])

    const cls = [
        styles.AcquirersDetails,
        className
    ]
    if (!details) {
      return <h1>нет такого эквайера</h1>
  }

  if (!details.uuid) {
      return <Spinner/>
  }

  return (
    <div className={cls.join(' ')}>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag={NavLink} to='/acquirers' exact>Список банков</BreadcrumbItem>
          <BreadcrumbItem active tag="span">Детали банка {details.name}</BreadcrumbItem>
        </Breadcrumb>

        <center><h1>Информация об эквайере</h1></center>
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
                label='Статус'
                data={!details.blocked? 'активен' : 'неактивен'}
            />
             <DetailsTableRow
                label='alias'
                data={details.alias}
            />

        </MyTable>

        <FlexBlock>
            <MyButton
                onClick={() => history.push(`/acquirers/update/${id}`)}
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
  details: state.acquirers.details,
}
}



export default connect(mapStateToProps, { 
  getAcquirerDetailsThunk, setAcquirerDetails, deleteAcquirersThunk,
  updateAcquirerThunk,
})(AcquirersDetails)