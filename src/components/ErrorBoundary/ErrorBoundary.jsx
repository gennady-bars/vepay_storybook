import React from 'react'

import styles from './ErrorBoundary.module.scss'

class ErrorBoundary extends React.Component {

    state = { hasError: false };
  
    static getDerivedStateFromError(error) {
      // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
      console.log(error, errorInfo)
    }
  
    render() {
      if (this.state.hasError) {
        // Можно отрендерить запасной UI произвольного вида
        return <h1 className={styles.ErrorBoundary}>Что-то пошло не так.</h1>;
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary