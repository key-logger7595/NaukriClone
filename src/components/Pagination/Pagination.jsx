import React from 'react';
import classes from './Pagination.module.css';
import {Link} from 'react-router-dom';


const Pagination = (props) => {
    return (
        <div className={classes.container}>
              
            <div className={classes.pagination}>
                {
                    props.pageNumberArr.map((pageNumber) => {
                        let additional = pageNumber === props.currentPage ? `${classes.active}` : '';
                        let additional1 = `square`;
                        return (
                            <li  className={[additional,additional1].join(' ')}
                                 key={pageNumber}
                                  onClick={() => { props.changeCurrentPage(pageNumber) }}>
                                {pageNumber}
                            </li>

                      
                        )
                    })
                }
               
            </div>
      
        </div>
    )
}

export default Pagination;
