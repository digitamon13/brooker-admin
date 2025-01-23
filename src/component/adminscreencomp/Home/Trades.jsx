import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteTrade, fetchTrades } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";



export const AdminTradesComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [tradeList, setTradeList] = useState([])
    let [filteredTrades, setfilteredTrades] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)



    useEffect(() => {
        fetchAllTrades()
    }, [])

    let fetchAllTrades = async () => {
        setIsError(false)
        let res = await dispatch(fetchTrades())

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setTradeList(res.message)
        setfilteredTrades(res.message)
        setIsLoading(false)
    }

    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/traders/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deleteTrade(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list

        let filteredArray = tradeList.filter(data => data._id !== id)

        setTradeList(filteredArray)
        setfilteredTrades(filteredArray)
        setIsLoading(false)

    }

    let navigateHandler = ()=>{
        navigate('/admindashboard/trade')


    }



    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredTrades.filter((item) => {
                const itemData = item.user.email ? item.user.email : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })
            setTradeList(newData)
            setIsLoading(false)
        } else {
            setTradeList(filteredTrades)
            setIsLoading(false)

        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
        <div className={styles.timeline} style={{ backgroundColor: color.background }}>
    
            {tradeList.length !== 0 && (
                <div className={styles.filter}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchBar}>
                            <input
                                className={styles.input}
                                placeholder="Search by email"
                                onChange={searchHandler}
                            />
                            <span className="material-icons">search</span>
                        </div>
                    </div>
                    <div className={styles.dateFilter}></div>
                </div>
            )}
    
            <div className={styles.tableContainer}>
                {tradeList.length === 0 && (
                    <div className={styles.emptyContainer}>
                        <p>Zero trades have been made</p>
                        <button
                            style={{
                                color: 'blue',
                                padding: '10px 15px',
                                border: '1px solid blue',
                                borderRadius: '5px',
                                background: 'transparent',
                                cursor: 'pointer',
                            }}
                            onClick={navigateHandler}
                        >
                            Trade for a client
                        </button>
                    </div>
                )}
    
                {tradeList.length !== 0 && (
                    <table
                        style={{
                            borderCollapse: 'collapse',
                            margin: '20px 0',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '10px',
                            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: '#444',
                                    backgroundColor: '#fafafa',
                                    borderRadius: '10px 10px 0 0',
                                }}
                            >
                                {['Email Of Trader', 'TradeID', 'Date', 'Pair', 'Profit', 'Loss', 'Delete', 'Edit'].map(
                                    (header, idx) => (
                                        <th
                                            key={idx}
                                            style={{
                                                padding: '16px 20px',
                                                textAlign: 'left',
                                                backgroundColor: '#f9f9f9',
                                                width: '14.5%', // Evenly distribute columns
                                                whiteSpace: 'nowrap',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {header}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {tradeList.map((data) => (
                                <tr
                                    key={data.__id}
                                    style={{
                                        borderBottom: '1px solid #ddd',
                                        fontSize: '14px',
                                        color: '#555',
                                        backgroundColor: 'transparent',
                                        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f9f9f9';
                                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <td
                                        style={{
                                            padding: '16px 20px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {data.user.email}
                                    </td>
                                    <td
                                        style={{
                                            padding: '16px 20px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {data.tradeId}
                                    </td>
                                    <td
                                        style={{
                                            padding: '16px 20px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {data.date}
                                    </td>
                                    <td
                                        style={{
                                            padding: '16px 20px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {data.pair}
                                    </td>
                                    <td
                                        style={{
                                            padding: '16px 20px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {data.profit}
                                    </td>
                                    <td
                                        style={{
                                            padding: '16px 20px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {data.loss}
                                    </td>
                                    <td
                                        style={{
                                            textAlign: 'center',
                                            padding: '16px 20px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => deleteHandler(data._id)}
                                    >
                                        <span className="material-icons">delete</span>
                                    </td>
                                    <td
                                        style={{
                                            textAlign: 'center',
                                            padding: '16px 20px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => editHandler(data._id)}
                                    >
                                        <span className="material-icons">edit</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    </div>
    )




}
