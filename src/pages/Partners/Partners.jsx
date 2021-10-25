import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { getPartnersThunk } from '../../redux/actions/partnerActions'
import MyTableForm from '../../components/UI/MyTable/MyTableForm/MyTableForm'

import styles from './Partners.module.scss'
import TableInput from '../../components/UI/MyTable/TableInput/TableInput'
import { useFormAndValidation } from '../../hooks/useFormValiation'
import { getTrimmedValues } from '../../utils/utils'
import MyButton from '../../components/UI/MyButton/MyButton'
import ClickableTH from '../../components/UI/MyTable/ClickableTH/ClickableTH'
// import ReactPaginate from 'react-paginate'
import SuccessAlert from '../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../components/MyAlert/FailureAlert/FailureAlert'
import { useAlert } from '../../hooks/useAlert'
import HoverTable from '../../components/UI/MyTable/HoverTable/HoverTable'
import TableNotFound from '../../components/UI/MyTable/TableNotFound/TableNotFound'
import StatusTD from '../../components/UI/MyTable/StatusTD/StatusTD'
import MyCollapse from '../../components/UI/MyCollapse/MyCollapse'


const Partners = ({className, getPartnersThunk, partners=[], ...props}) => {

  const {values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation()
  const { successAlertVisible, setSuccessAlertVisible, successMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()

  const [order, setOrder] = useState(true)
//   const [limit, setLimit] = useState(3)
  const [offset, setOffset] = useState(0)
  const [sortField, setSortField] = useState('')

  const changeOrder = (field) => {
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

    const filterData = getTrimmedValues(values)

    filterData.sort_by = [
        {
          field,
          order: order? 'asc' : 'desc'
        }
    ]
    const sortedData = {
        ...filterData,
    }
    
    getPartnersThunk(sortedData)
    .then(checkRes(false))
    .catch((err) => console.log(err))

}

    const onNextClick = (evt) => {
        evt.preventDefault()
        const filterData = getTrimmedValues(values)
        setOffset(offset + 1)
  
        getPartnersThunk({
            ...filterData,
            offset: (offset + 1) * (filterData.limit || 20 )
        })
        .then(checkRes(false))
        .then(() => console.log('onNextClick getPartnersThunk'))
        console.log(filterData);

    }
    const onPreviousClick = (evt) => {
        evt.preventDefault()
        if (offset <= 0) return;
        const filterData = getTrimmedValues(values)

        setOffset(offset - 1)
        getPartnersThunk({
            ...filterData,
            offset: (offset - 1) * (filterData.limit || 20 )
        })
        .then(checkRes(false))
        .then(() => console.log('onNextClick getPartnersThunk'))
        console.log(filterData);
    }

    // const handlePageClick = (data) => {

    //     console.log(data);

    //     const filterData = getTrimmedValues(values)

    //     setOffset(data.selected * (filterData.limit || 3))

    //     getPartnersThunk({
    //         limit: filterData.limit || 3,
    //         ...filterData,
    //         offset
    //     })
    // }


  const onSubmit = (evt) => {
    evt.preventDefault()

    const filterData = getTrimmedValues(values)

    getPartnersThunk(filterData)
    .then(checkRes(false))
    .then(() => console.log('filter getPartnersThunk'))
    console.log(filterData);
  }

  const onReset = () => {
    resetForm({}, {}, true)
}


    const history = useHistory()

    const cls = [
        styles.Partners,
        className
    ]

    useEffect(() => {
        getPartnersThunk()
        .then(checkRes(false))
        // eslint-disable-next-line
    }, [])

    return (
        <div className={cls.join(' ')}>
            <center><h1>Список мерчантов</h1></center>
            
            <MyCollapse>
                <MyTableForm
                    onSubmit={onSubmit}
                    isValid={isValid}
                    buttonText='Найти'
                    resetForm={onReset}
                >
                    <div className={styles.flexInputs}>
                        <TableInput
                            name='inn'
                            label='ИНН'
                            onChange={handleChange}
                            value={values.inn}
                            errorText={errors.inn}
                            minLength={1}
                            maxLength={12}
                            DivTableTHcls={styles.DivTableTHcls}
                            className={styles.TableInput}
                            
                        />
                        <TableInput
                            name='email'
                            label='Email'
                            onChange={handleChange}
                            value={values.email}
                            errorText={errors.email}
                            minLength={1}
                            maxLength={199}
                            DivTableTHcls={styles.DivTableTHcls}
                            className={styles.TableInput}
                        />
                        <TableInput
                            name='name'
                            label='Наименование'
                            onChange={handleChange}
                            value={values.name}
                            errorText={errors.name}
                            minLength={1}
                            maxLength={199}
                            DivTableTHcls={styles.DivTableTHcls}
                            className={styles.TableInput}
                        />
                        <TableInput
                            name='uuid'
                            label='uuid'
                            onChange={handleChange}
                            value={values.uuid}
                            errorText={errors.uuid}
                            minLength={1}
                            maxLength={199}
                            DivTableTHcls={styles.DivTableTHcls}
                            className={styles.TableInput}
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
                            DivTableTHcls={styles.DivTableTHcls}
                            className={styles.TableInput}
                        />
                    </div>
                </MyTableForm>
            </MyCollapse>

            <HoverTable>
                <thead>
                    <tr>
                        <th>№</th>
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
                        <ClickableTH
                            onClick={() => changeOrder('email')}
                            label='email'
                            thisField='email'
                            sortField={sortField}
                            order={order}
                        />
                        <ClickableTH
                            onClick={() => changeOrder('inn')}
                            label='ИНН'
                            thisField='inn'
                            sortField={sortField}
                            order={order}
                        />
                         <th>uuid</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        partners?.length?
                         partners.map((item, i) => {
                            return (
                                <tr 
                                    key={item.uuid}
                                    onClick={() => history.push(`/partners/${item.uuid}`)}
                                >
                                    <td>{i+1}</td>
                                    <td>{item.name}</td>
                                    <StatusTD
                                        active={!item.blocked}
                                    />
                                    <td>{item.email}</td>
                                    <td>{item.inn}</td>
                                    <td>{item.uuid}</td>
                                </tr>
                            )
                        }) : (
                            <TableNotFound/>
                        )
                    }
                    
                    
                </tbody>
            </HoverTable>

            <div className={styles.tableBotton} >

            <MyButton
                color={'primary'}
                onClick={() => history.push(`/add-partner`)}
                buttonText='добавить мерчанта'
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

const mapStateToProps = (state) => {
    return {
        partners: state.partners.partners
    }
}



export default connect(mapStateToProps, {
     getPartnersThunk 
})(Partners)