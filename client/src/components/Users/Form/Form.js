import React, { useState, useRef } from 'react';
import regex from '../../../feature/validator';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/actions/UserAction';
import api from '../api';

const url = "https://api.cloudinary.com/v1_1/dkksm7fzn/image/upload";

const Form = (props) => {
    const [form, setForm] = useState({});
    const [isSubmit, set_isSubmit] = useState(false);
    const dispatch = useDispatch();
    const formElem = useRef()

    const handleForm = (e, reg = null) => {
        let name = e.target.name;
        let value = e.target.value;
        let loc_form = { ...form }
        if (name !== "file") {
            loc_form[name] = {
                value: value,
                error: (() => {
                    if (reg === null) {
                        return value && value !== '' ? false : true
                    } else {
                        return value && value !== '' && reg.test(value) ? false : true
                    }
                })()
            }
        }

        setForm(loc_form)
    }

    const fileUpload = (e) => {
        const fileData = new FormData();
        fileData.append('file', e.target.files[0]);
        fileData.append("upload_preset", "voruywvc");
        api.imageUpload(fileData).then(res => {
            if (res.status === 200) {
                setForm({ ...form, image: { value: res.data.secure_url, error: false } });
                e.target.value = "";
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorCount = 0;
        const formData = {};
        for (const key in form) {
            formData[key] = form[key].value;
            if (form[key].error) {
                ++errorCount;
            }

        }
        set_isSubmit(true);
        if (errorCount > 0) {
            return;
        }
        try {
            formData.image = formData.image ?? "";
            const res = await api.addUser(formData);
            if (res.data.resCode === 200) {
                dispatch(addUser(res.data.user));
                formElem.current.reset();
                set_isSubmit(false);
                setForm({});
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <form onSubmit={handleSubmit} ref={formElem}>
            <div className="row ">
                <div className="col-md-3">
                    <div className="mb-3">
                        <label htmlFor="nameFor" className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control ${form?.name?.error && isSubmit ? 'border-danger' : ''}`}
                            id="nameFor"
                            name="name"
                            defaultValue=""
                            placeholder="Enter your Name"
                            onChange={(event) => handleForm(event)}
                        />
                        {(form?.name?.error && isSubmit) && <small className="text-danger">Please enter name</small>}
                        {(!form.name && isSubmit) && <small className="text-danger">Name is required</small>}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label htmlFor="emailFor" className="form-label">Email ID</label>
                        <input
                            type="text"
                            className={`form-control ${form?.email?.error && isSubmit ? 'border-danger' : ''}`}
                            id="emailFor"
                            name="email"
                            defaultValue=""
                            placeholder="someone@abc.com"
                            onChange={(event) => handleForm(event, regex.value.email)}
                        />
                        {(form?.email?.error && isSubmit) && <small className="text-danger">Please enter correct Email ID</small>}
                        {(!form.email && isSubmit) && <small className="text-danger">Email ID is required</small>}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label htmlFor="phoneFor" className="form-label">Phone</label>
                        <input
                            type="text"
                            className={`form-control ${form?.phone?.error && isSubmit ? 'border-danger' : ''}`}
                            id="phoneFor"
                            name="phone"
                            defaultValue=""
                            placeholder="Enter your Name"
                            onChange={(event) => handleForm(event, regex.value.phone)}
                        />
                        {(form?.phone?.error && isSubmit) && <small className="text-danger">Please enter correct Phone Number</small>}
                        {(!form.phone && isSubmit) && <small className="text-danger">Phone Number is required</small>}
                    </div>

                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label htmlFor="filefor" className="form-label">Image</label>

                        {form?.image?.value ? (
                            <div style={{position:'relative'}}>
                                <img src={form?.image?.value} style={{width:"100%", height:"auto"}}/>
                                <button type="button" style={{position:'absolute', top:0, right:0, left:"auto"}} className="btn btn-dark" onClick={() => setForm({ ...form, image: { ...form.image, value: "" } })}>X</button>
                            </div>
                        ) : (
                            <input
                                type="file"
                                className={`form-control ${form?.phone?.error && isSubmit ? 'border-danger' : ''}`}
                                id="filefor"
                                name="file"
                                accept="image/*"
                                onChange={(event) => fileUpload(event)}
                            />
                        )}

                    </div>

                </div>
                {/* <div className="mb-3">
                    <label htmlFor="nameFor" className="form-label">Name</label>
                    <input
                        type="nameFor"
                        className="form-control"
                        id="nameFor"
                        placeholder="Enter your Name"
                        onChange={(event) => handleForm(event)}
                    />
                </div> */}

            </div>
            <div className="row mb-5">
                <div className="col-md-12">
                    <button type="submit" className=" float-end btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    )
}
export default Form;