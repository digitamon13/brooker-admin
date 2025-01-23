import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";

export const AdminUsersComponent = ({ status }) => {

    let [isLoading, setIsLoading] = useState(true);
    let [isError, setIsError] = useState(false);
    let [userList, setUserList] = useState([]);
    let [filteredUsers, setFilteredUsers] = useState([]);

    //initialising redux
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let { color, user } = useSelector(state => state.userAuth);

    let interval;

    useEffect(() => {
        fetchAllUsers();
    }, []);

    let fetchAllUsers = async () => {
        setIsError(false);
        let res = await dispatch(fetchUsers());

        if (!res.bool) {
            setIsError(true);
            setIsLoading(false);
            return;
        }

        setUserList(res.message);
        setFilteredUsers(res.message);
        setIsLoading(false);
    };

    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/admindashboard/users/${id}`);
    };

    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false);
        let res = await dispatch(deleteUser(id));
        if (!res.bool) {
            setIsError(true);
            setIsLoading(false);
            return;
        }

        let filteredArray = userList.filter(data => data._id !== id);
        setUserList(filteredArray);
        setFilteredUsers(filteredArray);
        setIsLoading(false);
    };

    let searchHandler = (e) => {
        setIsLoading(true);
        if (e) {
            const newData = filteredUsers.filter((item) => {
                const itemData = item.email ? item.email : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setUserList(newData);
            setIsLoading(false);
        } else {
            setUserList(filteredUsers);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Error />;
    }

    return (
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
            <div className={styles.timeline} style={{ backgroundColor: color.background }}>

                <div className={styles.filter}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchBar}>
                            <input
                                className={styles.input}
                                placeholder='Search by email'
                                onChange={searchHandler}
                            />
                            <span className='material-icons'>
                                search
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    {userList.length === 0 && (
                        <div className={styles.emptyContainer}>
                            <p>No registered users</p>
                        </div>
                    )}

                    {userList.length !== 0 && (
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
                                {['Email', 'Full Name', 'Phone Number', 'Gender', 'Country', 'Currency', 'Delete', 'Edit'].map((header, idx) => (
                                    <th
                                    key={idx}
                                    style={{
                                        padding: '16px 20px',
                                        textAlign: 'left',
                                        backgroundColor: '#f9f9f9',
                                        width: '13.7%', // Evenly distribute across all columns
                                        whiteSpace: 'nowrap', // Prevent text from wrapping
                                        wordBreak: 'break-word', // Allow text to break within cells
                                    }}
                                >
                                    {header}
                                </th>
                                
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((data) => (
                                <tr
                                    key={data.__id}
                                    onClick={() => editHandler(data._id)}
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
                                    {['email', 'fullName', 'phoneNumber', 'gender', 'country', 'currency'].map((field, idx) => (
                                        <td
                                            key={idx}
                                            style={{
                                                padding: '16px 20px',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                wordBreak: 'break-word', // Ensure content breaks within the cell
                                            }}
                                        >
                                            {data[field]}
                                        </td>
                                    ))}
                                    <td
                                        style={{
                                            textAlign: 'center',
                                            padding: '16px 20px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => deleteHandler(data._id)}
                                    >
                                        <span className='material-icons'>delete</span>
                                    </td>
                                    <td
                                        style={{
                                            textAlign: 'center',
                                            padding: '16px 20px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => editHandler(data._id)}
                                    >
                                        <span className='material-icons'>edit</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    )}
                </div>
            </div>
        </div>
    );
};
