import React, { useState } from "react";

const Dashboard = ({ dataParentToChild }) => {



    return (
        <div className="current-page">
            <div className="user">
                <div className="user__body">
                    <table id="table1">
                        <thead>
                            <tr>
                                        <th> Id </th>
                                        <th> Title </th>
                                        <th> Amount </th>
                                        <th> Created </th>
                            </tr>
                        </thead>
                        {/* {dataParentToChild.map((item, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.carTitle}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.created}</td>
                                    </tr>
                                </tbody>
                            )
                        })} */}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard