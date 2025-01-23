import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminUserEditComponent = ({ updateHandler, }) => {
  let [isData, setIsData] = useState(null)
  let { color, usersList } = useSelector(state => state.userAuth)

  let { id } = useParams()


  let handleChangeHandler = (e, nameField) => {
    let val = e.target.value
    setIsData(prev => {
      prev[`${nameField}`] = val
      let newData = { ...prev }
      return newData
    })

  }



  let submitHandler = (e) => {
    e.preventDefault()
    //patch case on 
    console.log(isData)
    updateHandler(isData)

  }

  useEffect(() => {
    let dataObj = usersList.find(data => data._id.toString() === id.toString())

    setIsData(dataObj)

  }, [id])







  return (<>
    <div
      className={styles.homeScreen}
      style={{ backgroundColor: color.background, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      <div
        className={styles.timeline}
        style={{
          backgroundColor: color.background,
          width: '100%',
          maxWidth: '600px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px'
        }}>

        {usersList && isData && (
          <form
            className={styles.editForm}
            onSubmit={submitHandler}
            style={{ display: 'grid', gap: '15px' }}>

            {['email', 'fullName', 'phoneNumber', 'gender', 'country', 'currency', 'password', 'currentPlan', 'availableBalance', 'deposited'].map((field) => (
              <div className={styles.inputCards} key={field} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                  {field.split(/(?=[A-Z])/).join(' ')}
                </label>
                <input
                  onChange={(e) => handleChangeHandler(e, field)}
                  value={isData[field]}
                  type={field === 'availableBalance' || field === 'deposited' ? 'number' : 'text'}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    outline: 'none',
                    transition: 'box-shadow 0.3s',
                    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = '0 0 5px rgba(56, 43, 125, 0.5)')}
                  onBlur={(e) => (e.target.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)')} />
              </div>
            ))}

            <div className={styles.inputCards} style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>
                Status
              </label>
              <select
                onChange={(e) => handleChangeHandler(e, 'accountStatus')}
                defaultValue={isData.accountStatus || 'active'}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  outline: 'none',
                  backgroundColor: '#fff',
                  color: '#555'
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

            </div>

            <div className={styles.buttonContainer} style={{ textAlign: 'center' }}>
              <button
                style={{
                  backgroundColor: '#382b7d',
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#4c3b9a')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#382b7d')}>
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>


  </>)




}