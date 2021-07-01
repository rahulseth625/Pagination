import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Css/Customer.css';

const Customers = () => {

    const [currentPage, setCurrentPage] = useState(1);

    let noOfRecord = '';

    const [customerList, setCustomerList] = useState({
        data: [],
    })

    const customerLists = () => {
        axios.get('https://intense-tor-76305.herokuapp.com/merchants')
            .then((response) => {
                if (response.statusText === 'OK') {
                    setCustomerList(response);
                } else {
                    return alert('something went wrong');
                }
            })
    }

    useEffect(() => {
        customerLists()
    }, [customerLists]
    )

    // const amountList = customerList.data.map((item, index) => {
    //          {item.bids.map(x => x.amount)}
    // })

    // const getMaxAmount = Math.max(amountList);



    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Customer Name
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Phone
                        </th>
                        <th>
                            Premium
                        </th>
                        <th>
                            Max / Min Bid
                        </th>
                    </tr>
                </thead>
                {customerList.data.map((item, index) => {
                    return (
                        <tbody key= {index}>
                            <tr>
                                <td className="withprewrap">{item.firstname} {item.lastname}
                                        {'\n'}
                                         avatar : {item.avatarUrl}
                                </td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.hasPremium.toString() }</td>
                                <td>{Math.max.apply(null, item.bids.map(x => x.amount))}</td>

                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}

export default Customers;
