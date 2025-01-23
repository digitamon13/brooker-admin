import React, { useState } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminTradeCreateComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState({
        email: '',
        date: '',
        pair: '',
        profit: '',
        loss: ''
    })
    let { color, usersList } = useSelector(state => state.userAuth)

    let { id } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value
        console.log(val)
        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }



    let submitHandler = (e) => {
        e.preventDefault()
        //patch case on 
        if(!isData.email){
            return
        }
        updateHandler(isData)

    }


    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background, padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <div className={styles.timeline} style={{ backgroundColor: color.background, maxWidth: '900px', margin: '0 auto', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', padding: '40px' }}>
        <form className={styles.editForm} onSubmit={submitHandler}>

            <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
                    Choose who to trade for
                </label>
                <select
                    onChange={(e) => handleChangeHandler(e, 'email')}
                    onSelect={(e) => handleChangeHandler(e, 'email')}
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        width: '100%',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                    }}
                >
                    <option></option>
                    {usersList.map((data) => (
                        <option key={data.email}>{data.email}</option>
                    ))}
                </select>
            </div>

            <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
                    Date
                </label>
                <input
                    value={isData ? isData.date : ''}
                    onChange={(e) => handleChangeHandler(e, 'date')}
                    type="date"
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        width: '100%',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                    }}
                />
            </div>

            <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
                    Pair
                </label>
                <input
                    value={isData ? isData.pair : ''}
                    onChange={(e) => handleChangeHandler(e, 'pair')}
                    type="text"
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        width: '100%',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                    }}
                />
            </div>

            <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
                    Profit
                </label>
                <input
                    value={isData ? isData.profit : ''}
                    onChange={(e) => handleChangeHandler(e, 'profit')}
                    type="text"
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        width: '100%',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                    }}
                />
            </div>

            <div className={styles.inputCards} style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>
                    Loss
                </label>
                <input
                    value={isData ? isData.loss : ''}
                    onChange={(e) => handleChangeHandler(e, 'loss')}
                    type="text"
                    style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        width: '100%',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                    }}
                />
            </div>

            <div className={styles.buttonContainer} style={{ textAlign: 'right' }}>
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#382b7d',
                        color: '#fff',
                        padding: '12px 30px',
                        borderRadius: '5px',
                        border: 'none',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    Save
                </button>
            </div>
        </form>
    </div>
</div>

        
        
        </>)




}