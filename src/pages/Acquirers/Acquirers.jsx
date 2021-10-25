import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import MyTableForm from '../../components/UI/MyTable/MyTableForm/MyTableForm'
import TableInput from '../../components/UI/MyTable/TableInput/TableInput'
import { useFormAndValidation } from '../../hooks/useFormValiation'
import { getAcquirersThunk } from '../../redux/actions/acquirerActions'

import styles from './Acquirers.module.scss'
import TableMultiselect from '../../components/UI/MyTable/TableMultiselect/TableMultiselect';
import { activeOptions } from '../../utils/constants';
import { getTrimmedValues } from '../../utils/utils';
import MyButton from '../../components/UI/MyButton/MyButton';
import StatusTD from '../../components/UI/MyTable/StatusTD/StatusTD';
import ClickableTH from '../../components/UI/MyTable/ClickableTH/ClickableTH';
import SuccessAlert from '../../components/MyAlert/SuccessAlert/SuccessAlert'
import FailureAlert from '../../components/MyAlert/FailureAlert/FailureAlert'
import { useAlert } from '../../hooks/useAlert'
import TableNotFound from '../../components/UI/MyTable/TableNotFound/TableNotFound'
import HoverTable from '../../components/UI/MyTable/HoverTable/HoverTable'
import MyCollapse from '../../components/UI/MyCollapse/MyCollapse'

const Acquirers = ({className, getAcquirersThunk, acquirers=[], ...props}) => {
    
    const history = useHistory()

    const { successAlertVisible, setSuccessAlertVisible, successMessage,
        failureAlertVisible, setFailureAlertVisible, failureMessage, checkRes} = useAlert()
    
    const {values, handleChange, errors, setValues, isValid, resetForm} = useFormAndValidation()
    const [order, setOrder] = useState(true)
  const [sortField, setSortField] = useState('')

  const multiRef = useRef()


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
      
      getAcquirersThunk(sortedData)
      .then(checkRes(false))
  
  }

    const onRemove = (selectedList, removedItem) => {
        console.log(selectedList);
    }


      const onSubmit = (evt) => {
        evt.preventDefault()
        
        const filterData = getTrimmedValues(values)

        getAcquirersThunk(filterData)
        .then(checkRes(false))
     
        console.log(filterData);
      }

      const onReset = () => {
          const {name, blocked, active, ...restValues} = values
        resetForm(restValues, {}, true)
        multiRef.current.resetSelectedValues();
      }


    const onSingleSelect = (selectedList, {jsonKey, value}) => {
        console.log(selectedList);
        setValues({
            ...values,
            [jsonKey]: value
        })
    }

    const cls = [
        styles.Acquirers,
        className
    ]
    

    useEffect(() => {
        getAcquirersThunk()
        .then(checkRes(false))
        // eslint-disable-next-line
    }, [])

    return (
        <div className={cls.join(' ')}>
            <center><h1>Список банков</h1></center>
            
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
                    
                    <TableMultiselect
                            label='Aктивен'
                            options={activeOptions}
                            displayValue="name"
                            onSelect={onSingleSelect}
                            onRemove={onRemove}
                            placeholder='Выберите'
                            singleSelect
                            multiRef={multiRef}
                        />
                    
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
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        acquirers?.length?
                          acquirers.map((item, i) => {
                            return (
                                <tr 
                                    key={item.uuid}
                                    onClick={() => history.push(`/acquirers/${item.uuid}`)}
                                >
                                    <td>{i+1}</td>
                                    <td>{item.name}</td>
                                    <StatusTD
                                        active={!item.blocked}
                                    />
                                </tr>
                            )
                        }) :
                        (
                            <TableNotFound/>
                        )
                    }
                    
                    
                </tbody>
            </HoverTable>


            <MyButton
                color={'primary'}
                onClick={() => history.push('/add-acquirer')}
                buttonText='добавить банк'
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
        acquirers: state.acquirers.acquirers
    }
}




export default  connect(mapStateToProps, { getAcquirersThunk })(Acquirers)