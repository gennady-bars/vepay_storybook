import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { getNewsThunk } from '../../redux/actions/blogActions'

import styles from './News.module.scss'

const News = ({news, getNewsThunk, history}) => {

  useEffect(() => {
    getNewsThunk()
    // eslint-disable-next-line
  }, [])

    return (
        <div className={styles.News}>
        
            <h1>Новости</h1>
            <ListGroup tag='ol'>
              {
                news.map((item) => {
                  return (
                    <ListGroupItem 
                    className={styles.listItem}
                      key={item.id}
                      onClick={() => history.push(`/news/${item.id}`)}
                    >
                      {item.short}
                    </ListGroupItem>
                  )
                })
              }
            </ListGroup>
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
      news: state.blog.news
  }
}


export default connect(mapStateToProps, {getNewsThunk}) (News)