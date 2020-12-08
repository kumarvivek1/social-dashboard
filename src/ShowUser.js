import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

const ShowUser = (props) => {
    const { handleLogin, status } = props
    const [data, setData] = useState([])
    const [post, setPost] = useState([])

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('login'))
        const url = `https://jsonplaceholder.typicode.com/users/${login.id}`
        axios.get(url)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                alert(err.message)
            })
        const urlpost = `https://jsonplaceholder.typicode.com/posts?userId=${login.id}`
        axios.get(urlpost)
            .then((res) => {
                setPost(res.data)
            })
            .catch((err) => {
                alert(err.message)
            })
    }, [])

    const handleLog = () => {
        localStorage.clear()
        localStorage.setItem('login', JSON.stringify({ status: false, id: null }))
        handleLogin(false)
    }

    return (
        <div className='userinfo'>
            <div className='row'><Button onClick={handleLog}>Logout</Button></div>

            <div className='row mt-5'>
                <div id='left' className='col md-6'>
                    <h3>{data.name}</h3>
                    <p>{data.email}</p>
                    <p>{data.phone}</p>
                </div>
                {data.company !== undefined && (
                    < div id='right' className='col md-6' >
                        <h3>{data.username}</h3>
                        <p>{data.company.name}</p>
                        <p>{data.company.catchPhrase}</p>
                    </div>
                )
                }
            </div>

            <div className='row'>

                {
                    post.map(p => {
                        return <p>{p.title}</p>
                    })
                }
            </div>
            {!status && <Redirect to='/' />}
        </div>
    )
}
export default ShowUser