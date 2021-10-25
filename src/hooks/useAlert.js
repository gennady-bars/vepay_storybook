import { useState } from "react";



export const useAlert = () => {

  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Успешно');
  const [failureAlertVisible, setFailureAlertVisible] = useState(false);
  const [failureMessage, setFailureMessage] = useState('Ошибка');

  const checkRes = (withSuccessAlert=true) => {
    return (res) => {
      if (res.ok) {
        if (withSuccessAlert) {
          setSuccessAlertVisible(true)
          setSuccessMessage(`${res.message}`)
        }
      } else {
          setFailureAlertVisible(true)
          setFailureMessage(`${res.message.join(' \n ')}`)
      }

      return res
  }
  }

  return {
    successAlertVisible, setSuccessAlertVisible, successMessage, setSuccessMessage,
    failureAlertVisible, setFailureAlertVisible, failureMessage, setFailureMessage,
    checkRes
  }
  
}

