import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import AddButtonAndPagination from '../../components/Blocks/AddButtonAndPagination/AddButtonAndPagination'
import FailureAlert from '../../components/MyAlert/FailureAlert/FailureAlert'
import SuccessAlert from '../../components/MyAlert/SuccessAlert/SuccessAlert'
import MyCollapse from '../../components/UI/MyCollapse/MyCollapse'
import ClickableTH from '../../components/UI/MyTable/ClickableTH/ClickableTH'
import HoverTable from '../../components/UI/MyTable/HoverTable/HoverTable'
import MyTableForm from '../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../components/UI/MyTable/TableInput/TableInput'
import TableNotFound from '../../components/UI/MyTable/TableNotFound/TableNotFound'
import { useAlert } from '../../hooks/useAlert'
import { useFormAndValidation } from '../../hooks/useFormValiation'
import { getRolesThunk } from '../../redux/actions/roleActions'
import { getTrimmedValues } from '../../utils/utils'

import styles from './Roles.module.scss'

const Roles = ({className, getRolesThunk, roles, ...props}) => {

    const history = useHistory()

    const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()

    const { successAlertVisible, setSuccessAlertVisible, successMessage,
      failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()
  
    const [order, setOrder] = useState(true)
    const [offset, setOffset] = useState(0)
    const [sortField, setSortField] = useState('')

    const cls = [
        styles.Roles,
        className
    ]

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
        
        getRolesThunk(sortedData)
        .then(checkRes(false))
        .catch((err) => console.log(err))
    
    }
    

    useEffect(() => {
        getRolesThunk()
        .then(checkRes(false))
        .catch((err) => console.log(err))
        // eslint-disable-next-line
    }, []) 

    const onNextClick = (evt) => {
        evt.preventDefault()
        const filterData = getTrimmedValues(values)
        setOffset(offset + 1)
  
        getRolesThunk({
            ...filterData,
            offset: (offset + 1) * (filterData.limit || 20 )
        })
        .then(checkRes(false))
        .then(() => console.log('onNextClick getPartnersThunk'))
        console.log(filterData);

    }
    const onPreviousClick = (evt) => {
        evt.preventDefault()
        if (offset <= 0) return
        const filterData = getTrimmedValues(values)

        setOffset(offset - 1)
        getRolesThunk({
            ...filterData,
            offset: (offset - 1) * (filterData.limit || 20 )
        })
        .then(checkRes(false))
        .then(() => console.log('onNextClick getPartnersThunk'))
        console.log(filterData);
    }

    const onSubmit = (evt) => {
        evt.preventDefault()
    
        const filterData = getTrimmedValues(values)
    
        getRolesThunk(filterData)
        .then(checkRes(false))
        .catch((err) => console.log(err))
    
        console.log(filterData);
      }

      const onReset = () => {
        resetForm({}, {}, true)
      }

    return (
        <div className={cls.join(' ')}>
            <center><h1>Список ролей</h1></center>

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
                        title='максимум 199 символов'
                    />

                </MyTableForm>
            </MyCollapse>

            <HoverTable>
                <thead>
                    <tr>
                        <th>id</th>
                        <ClickableTH
                            onClick={() => changeOrder('name')}
                            label='Наименование'
                            thisField='name'
                            sortField={sortField}
                            order={order}
                        />
                    </tr>
                </thead>
                <tbody>
                    {
                        roles?.length? roles.map((item) => {
                            return (
                                <tr 
                                    key={item.id}
                                    className={styles.tr} 
                                    onClick={() => history.push(`/roles/${item.id}`)}
                                >
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                </tr>
                            )
                        }): (
                                <TableNotFound/>
                            )
                    }
                </tbody>
            </HoverTable>

            <AddButtonAndPagination
                onPreviousClick={onPreviousClick}
                onNextClick={onNextClick}
                buttonText='Добавить роль'
                onClick={() => history.push(`/add-role`)}
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
        roles: state.roles.roles
    }
  }

  

export default connect(mapStateToProps, { getRolesThunk })(Roles)