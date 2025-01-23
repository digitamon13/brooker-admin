import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteDeposit, fetchDeposits } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";

export const AdminDepositsComponent = ({ status }) => {

    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [depositList, setDepositList] = useState([])
    let [filteredDeposits, setfilteredDeposits] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color, user } = useSelector(state => state.userAuth)

    let interval




    useEffect(() => {
        fetchAllDeposits()
    }, [])




    let fetchAllDeposits = async () => {
        setIsError(false)
        let res = await dispatch(fetchDeposits())



        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setDepositList(res.message)
        setfilteredDeposits(res.message)
        setIsLoading(false)
    }



    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/deposits/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deleteDeposit(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list

        let filteredArray = depositList.filter(data => data._id !== id)

        setDepositList(filteredArray)
        setfilteredDeposits(filteredArray)
        setIsLoading(false)

    }





    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredDeposits.filter((item) => {
                const itemData = item.user.email ? item.user.email : '';
                const textData = e.target.value.toLowerCase();

                console.log(itemData)
                console.log(textData)
                return itemData.indexOf(textData) > -1;
            })

            setDepositList(newData)
            setIsLoading(false)
        } else {
            setDepositList(filteredDeposits)
            setIsLoading(false)

        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div
        className={styles.homeScreen}
        style={{
          backgroundColor: color.background,
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          className={styles.timeline}
          style={{
            backgroundColor: color.background,
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className={styles.filter}>
            <div
              className={styles.searchContainer}
              style={{ marginBottom: "20px" }}
            >
              <div
                className={styles.searchBar}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                <input
                  className={styles.input}
                  placeholder="Search by email"
                  onChange={searchHandler}
                  style={{
                    flex: 1,
                    padding: "8px",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    outline: "none",
                  }}
                />
                <span
                  className="material-icons"
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    color: "#382b7d",
                  }}
                >
                  search
                </span>
              </div>
            </div>
          </div>
      
          <div className={styles.tableContainer} style={{ overflowX: "auto" }}>
            {depositList.length === 0 && (
              <div
                className={styles.emptyContainer}
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#888",
                }}
              >
                <p>No Deposits found</p>
              </div>
            )}
      
            {depositList.length !== 0 && (
              <table
                style={{
                  borderCollapse: "collapse",
                  marginTop: "20px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <thead>
                  <tr
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#333",
                      backgroundColor: "transparent",
                    }}
                  >
                    <th style={{ padding: "12px 15px" }}>Depositor Name</th>
                    <th style={{ padding: "12px 15px" }}>Deposit ID</th>
                    <th style={{ padding: "12px 15px" }}>Amount</th>
                    <th style={{ padding: "12px 15px" }}>Type</th>
                    <th style={{ padding: "12px 15px" }}>Date</th>
                    <th style={{ padding: "12px 15px" }}>Status</th>
                    <th style={{ padding: "12px 15px", textAlign: "center" }}>
                      Delete
                    </th>
                    <th style={{ padding: "12px 15px", textAlign: "center" }}>
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {depositList.map((data) => (
                    <tr
                      key={data.__id}
                      style={{
                        borderBottom: "1px solid #ddd",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      <td style={{ padding: "12px 15px" }}>{data.user.email}</td>
                      <td style={{ padding: "12px 15px" }}>{data.depositId}</td>
                      <td style={{ padding: "12px 15px" }}>{data.amount}</td>
                      <td style={{ padding: "12px 15px" }}>{data.type}</td>
                      <td style={{ padding: "12px 15px" }}>{data.date}</td>
                      <td style={{ padding: "12px 15px" }}>{data.status}</td>
                      <td
                        onClick={() => deleteHandler(data._id)}
                        style={{
                          cursor: "pointer",
                          color: "red",
                          textAlign: "center",
                          padding: "12px 15px",
                        }}
                      >
                        <span className="material-icons">delete</span>
                      </td>
                      <td
                        onClick={() => editHandler(data._id)}
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          textAlign: "center",
                          padding: "12px 15px",
                        }}
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
