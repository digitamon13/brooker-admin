import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';
import { useSelector } from "react-redux";


const Sidebar = ({ status }) => {
    let navigate = useNavigate()
    let { color } = useSelector(state => state.userAuth)


    let menuBackgroundColor = color.fadeColor ? 'rgba(0,0,255,0.2)' : ' #382b7d';

    let menutextColor = color.fadeColor ? 'blue' : '#fff';


    let navigateHandler = (data) => {
        if(data.title == 'bank'){
            window.location.href = "https://bank-admin-8ahj.onrender.com";  // 
            return 
        }
        navigate(data.link)
        
    }


    const linkData = [
        {
            icon: 'list',
            title: 'users',
            link: '/admindashboard/users'
        },

        {
            icon: 'settings',
            title: 'setting',
            link: '/admindashboard/admin'
        },
        {
            icon: 'money',
            title: 'deposits',
            link: '/admindashboard/deposits'
          },

         
          {
            icon: 'explore',
            title: 'trades',
            link: '/admindashboard/trades'
          },
          {
            icon: 'wallet',
            title: 'bank',
          }

    ]

    /*

    */





    return (<div className={styles.sidebar} style={{ backgroundColor: color.background }}>
        <div className={styles.topSection} style={{ backgroundColor: color.background }}>
            <h1>Admin</h1>
            <div className={styles.logoContainer}>

            </div>
        </div>

        <div className={styles.middleSection}>
            <ul>
                {linkData.map(data => <li onClick={() => navigateHandler(data)}
                    key={data.title} style={{ backgroundColor: status === `${data.title}` ? menuBackgroundColor : '' }}><span className='material-icons' style={{ color: status === `${data.title}` ? menutextColor : '' }}>{data.icon}</span>

                    <p style={{ color: status === `${data.title}` ? menutextColor : color.normalText }} className={styles.listText}>{data.title}</p>
                    <div >
                        {data.title}
                    </div>

                </li>)}


            </ul>
        </div>



        <div className={styles.endSection}>
            <div onClick={() => navigate('/adminlogin')}>
                <span className='material-icons'>
                    logout
                </span>
                Logout
            </div>

        </div>




    </div>


    )
}



export default Sidebar