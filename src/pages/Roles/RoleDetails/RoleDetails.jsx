import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import FlexBlock from '../../../components/Blocks/FlexBlock/FlexBlock'
import FailureAlert from '../../../components/MyAlert/FailureAlert/FailureAlert'
import SuccessAlert from '../../../components/MyAlert/SuccessAlert/SuccessAlert'
import Spinner from '../../../components/Spinner/Spinner'
import MyButton from '../../../components/UI/MyButton/MyButton'
import DetailsTableRow from '../../../components/UI/MyTable/DetailsTableRow/DetailsTableRow'
import MyTable from '../../../components/UI/MyTable/MyTable'
import { useAlert } from '../../../hooks/useAlert'
import { getRoleDetailsThunk } from '../../../redux/actions/roleActions'

import styles from './RoleDetails.module.scss'

const RoleDetails = ({className, details, getRoleDetailsThunk, ...props}) => {

  
  const { id } = useParams()
  const history = useHistory()

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()

    useEffect(() => {
      getRoleDetailsThunk([+id])
      .then(checkRes(false))
      .then(() => console.log('getRoleDetailsThunk'))
      // eslint-disable-next-line
    }, [])

    
  const onDelete = () => {
    const confirmed = window.confirm("Вы точно хотите удалить?");
    if (confirmed) {
      // deleteTerminalsThunk([id])
      // .then((res) => {
      //   checkRes()(res)
      //   return res
      // })
      // .then(res => {
      //     if (res.ok) {
      //         setTimeout(() => {
      //           history.goBack()
      //         }, 1000)
      //     }
      // })
      // .then(() => console.log('deleteTerminalsThunk'))
      // .catch((err) => console.log(err))
    }
  }
    
    const cls = [
        styles.RoleDetails,
        className
    ]

    if (!details) {
      return (
        <h1>Нет такой роли</h1>
      )
    }
  
    if (!details.id) {
        return <Spinner/>
    }

    return (
        <div className={cls.join(' ')}>
             <Breadcrumb tag="nav" listTag="div">
              <BreadcrumbItem tag={NavLink} to='/roles' exact>Роли</BreadcrumbItem>
              <BreadcrumbItem active tag="span">Роль &nbsp; <strong>{details?.name}</strong></BreadcrumbItem>
            </Breadcrumb>

            <center><h1>Детали роли <strong>{details?.name}</strong></h1></center>

            <MyTable>
                <DetailsTableRow
                    label='id'
                    data={details.id}
                />

                <DetailsTableRow
                    label='Наименование'
                    data={details.name}
                />
            </MyTable>

            <FlexBlock>
              <MyButton
                    color={'secondary'}
                    onClick={() => history.push(`/roles/${id}/update`)}
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
      details: state.roles.details,
  }
}



export default connect(mapStateToProps, { getRoleDetailsThunk })(RoleDetails)