import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, deleteUser } from '../../../redux/actions/UserAction';
import api from '../api';


const UserList = (props) => {
    let [userId, setUserId] = useState("");
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await api.getUsers({ limit: 10, skip: 0 });
                if (res.data.resCode === 200) {
                    dispatch(getUsers(res.data.resData.users));
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, []);

    const editUser = async (user) => {
        const reqObj = {
            arguments: {
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            id: user._id
        }
        try {
            const res = await api.updateUser(reqObj);
            if (res.data.resCode === 200) {
                setUserId("")
            }

        } catch (err) {
            console.log(err)
        }
    }

    const removeUser = async (user) => {
        try {
            const res = await api.deleteUser(user._id);
            if (res.data.resCode === 200) {
                dispatch(deleteUser(user))
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fileUpload = async (e, user) => {
        const fileData = new FormData();
        fileData.append('file', e.target.files[0]);
        fileData.append("upload_preset", "voruywvc");
        try {
            const imgres = await api.imageUpload(fileData);
            const reqObj = {
                arguments: {
                    image: imgres.data?.secure_url
                },
                id: user._id
            }
            state.users[state.users.findIndex((elem)=> elem._id === user._id)].image = imgres.data?.secure_url;
            const res = await api.updateUser(reqObj);

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="row">
            <div className="col-md-12">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Namne</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.users.map((user, index) => {
                            return <tr key={user._id} id={user._id}>
                                <td>
                                    <input type="text" defaultValue={user?.name} disabled={userId !== user._id} onChange={(e) => user.name = e.target.value} />
                                </td>
                                <td>
                                    <input type="text" defaultValue={user?.email} disabled={userId !== user._id} onChange={(e) => user.email = e.target.value} />
                                </td>
                                <td>
                                    <input type="text" defaultValue={user?.phone} disabled={userId !== user._id} onChange={(e) => user.phone = e.target.value} />
                                </td>
                                <td>
                                    {user?.image && userId !== user._id &&
                                        <img src={user?.image} style={{ width: "100px", height: "auto" }} alt="profile image" />
                                    }
                                    {userId === user._id &&
                                        <input
                                            type="file"
                                            className={`form-control`}
                                            accept="image/*"
                                            onChange={(event) => fileUpload(event, user)}
                                        />
                                    }
                                </td>
                                <td>

                                    {userId !== user._id && userId !== " " ?
                                        <button type="button" className="btn btn-info me-2" onClick={() => setUserId(user._id)}>Edit</button> :
                                        <button type="button" className="btn btn-info me-2" onClick={() => editUser(user)}>Update</button>
                                    }
                                    <button type="button" className="btn btn-danger" onClick={() => removeUser(user)}>Delete</button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList;