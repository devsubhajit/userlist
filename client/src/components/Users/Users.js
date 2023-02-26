import React, { useEffect, useMemo, useState } from 'react';
import Form from './Form/Form';
import UserList from './UserList/UserList';

const Users = (props) => {

    return (
        <div className="container">
            <Form />
            <UserList />
        </div>
    )
}

export default Users;