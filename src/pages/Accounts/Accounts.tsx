// @ts-nocheck
import React, { useState, SyntheticEvent } from 'react'
import { useEffect } from 'react'
import { connect, ConnectedProps  } from 'react-redux'
// @ts-ignore
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { getAccountsThunk } from '../../redux/actions/accountActions'

import styles from './Accounts.module.scss'
import MyTableForm from '../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../components/UI/MyTable/TableInput/TableInput'
import { useFormAndValidation } from '../../hooks/useFormValiation'
import { getTrimmedValues } from '../../utils/utils'
import { useAlert } from '../../hooks/useAlert'
import SuccessAlert from '../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../components/MyAlert/FailureAlert/FailureAlert'
import TableNotFound from '../../components/UI/MyTable/TableNotFound/TableNotFound'
import ClickableTH from '../../components/UI/MyTable/ClickableTH/ClickableTH'
import MyButton from '../../components/UI/MyButton/MyButton'
import HoverTable from '../../components/UI/MyTable/HoverTable/HoverTable'
import StatusTD from '../../components/UI/MyTable/StatusTD/StatusTD'
import MyCollapse from '../../components/UI/MyCollapse/MyCollapse'
import { RootState } from '../../redux/store'


type Props = {
    history : any
} & PropsFromRedux

const Accounts = ({accounts, getAccountsThunk, history}: Props) => {

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()

  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()

  const [order, setOrder] = useState(true)
  const [offset, setOffset] = useState(0)
  const [sortField, setSortField] = useState('')

  const changeOrder = (field: string) => {
    setOrder(!order)
    setSortField(field)
    setValues({
        ...values,
        sort_by:  [
            {
              field,
              order: order? 'asc' : 'desc'
            }
        ]
    })

    const filterData: any = getTrimmedValues(values)

    filterData.sort_by = [
        {
          field,
          order: order? 'asc' : 'desc'
        }
    ]
    const sortedData = {
        ...filterData,
    }
    
    getAccountsThunk(sortedData)
    .then(checkRes(false))
    .catch((err) => console.log(err))

}


    useEffect(() => {
        getAccountsThunk()
        .then(checkRes(false))
        .catch((err) => console.log(err))
        // eslint-disable-next-line
    }, []) 

    const onSubmit = (evt: SyntheticEvent) => {
        evt.preventDefault()
    
        const filterData = getTrimmedValues(values)
    
        getAccountsThunk(filterData)
        .then(checkRes(false))
        .catch((err) => console.log(err))
    
        console.log(filterData);
      }

      
    const onReset = () => {
      resetForm({}, {}, true)
    }

      const onNextClick = (evt: SyntheticEvent) => {
        evt.preventDefault()
        const filterData = getTrimmedValues(values)
        setOffset(offset + 1)
  
        getAccountsThunk({
            ...filterData,
            offset: (offset + 1) * (filterData.limit || 20 )
        })
        .then(checkRes(false))
        .then(() => console.log('onNextClick getPartnersThunk'))
        console.log(filterData);

    }
    const onPreviousClick = (evt: SyntheticEvent) => {
        evt.preventDefault()
        if (offset <= 0) return
        const filterData = getTrimmedValues(values)

        setOffset(offset - 1)
        getAccountsThunk({
            ...filterData,
            offset: (offset - 1) * (filterData.limit || 20 )
        })
        .then(checkRes(false))
        .then(() => console.log('onPreviousClick getPartnersThunk'))
        console.log(filterData);
    }


    return (
        <div className={styles.Accounts}>
            <h1 className={styles.center}>Список аккаунтов</h1>
            <MyCollapse>
                <MyTableForm
                    onSubmit={onSubmit}
                    isValid={isValid}
                    buttonText='Найти'
                    resetForm={onReset}
                >
                
                    <TableInput
                        name='login'
                        label='Логин'
                        onChange={handleChange}
                        value={values.login}
                        errorText={errors.login}
                        minLength={1}
                        maxLength={199}
                    />
                    <TableInput
                        name='email'
                        label='email'
                        onChange={handleChange}
                        value={values.email}
                        errorText={errors.email}
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
            

            <HoverTable>
                <thead>
                    <tr>
                        <th>id</th>
                        <ClickableTH
                            onClick={() => changeOrder('login')}
                            label='Логин'
                            thisField='login'
                            sortField={sortField}
                            order={order}
                        />
                        <ClickableTH
                            onClick={() => changeOrder('email')}
                            label='Email'
                            thisField='email'
                            sortField={sortField}
                            order={order}
                        />
                        <ClickableTH
                            onClick={() => changeOrder('phone_number')}
                            label='Телефон'
                            thisField='phone_number'
                            sortField={sortField}
                            order={order}
                        />
                        <ClickableTH
                            onClick={() => changeOrder('created')}
                            label='Создан'
                            thisField='created'
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
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts?.length?  accounts.map((account) => {
                            return (
                                <tr 
                                    key={account.id}
                                    className={styles.tr} 
                                    onClick={() => history.push(`/accounts/${account.id}`)}
                                >
                                    <th scope="row">{account.id}</th>
                                    <td>{account.login}</td>
                                    <td>{account.email}</td>
                                    <td>{account.phone_number}</td>
                                    <td>{(new Date(account.created).toLocaleDateString())}</td>
                                    <StatusTD
                                        active={!account.blocked}
                                    />
                                </tr>
                            )
                        }):
                            (
                                <TableNotFound/>
                            )
                    }
                    
                    
                </tbody>
            </HoverTable>

            <div className={styles.tableBotton} >

            <MyButton
                color={'primary'}
                onClick={() => history.push(`/create-account`)}
                buttonText='добавить аккаунт'
            />

            <Pagination className={styles.Pagination} aria-label="Page navigation">
             
                <PaginationItem>
                    <PaginationLink 
                        onClick={onPreviousClick}
                        previous href="#" />
                </PaginationItem>
             
                <PaginationItem>
                    <PaginationLink 
                        onClick={onNextClick}
                        next href="#" />
                </PaginationItem>
              
            </Pagination>

            {/* <ReactPaginate
                previousLabel={'назад'}
                nextLabel={'вперед'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={15/limit}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={styles.active}
                pageClassName={styles.pageClass}
                /> */}

            </div>


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

const mapStateToProps = (state: RootState) => {
    return {
        accounts: state.accounts.accounts
    }
  }

  const connector = connect(mapStateToProps, {getAccountsThunk})

  type PropsFromRedux  = ConnectedProps<typeof connector>

export default connector(Accounts)