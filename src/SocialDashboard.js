import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import validator from 'validator'
import './style.css'

const SocialDashboard = (props) => {
    const { status, handleLogin } = props
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')


    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const validateEmail = () => {
        if (email.length === 0) {
            setError('please enter your email')
        }
        else if (!validator.isEmail(email)) {
            setError('enter valid email')
        } else {
            setError('')
        }
    }

    const handleSubmit = (e) => {
        validateEmail()
        e.preventDefault()

        const url = 'https://jsonplaceholder.typicode.com/users'
        axios.get(url)
            .then((res) => {
                const result = res.data.filter(user => {
                    return user.email === email
                })
                if (result.length === 1) {
                    setError('')
                    handleLogin(true)
                    localStorage.setItem('login', JSON.stringify({ status: true, id: result[0].id }))
                } else if (error.length === 0) {
                    setError('User not found')
                }

            })
            .catch((err) => {

            })

    }

    return (

        <div className='dashboard'>
            <div>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2} >
                        Email
                            </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" value={email} onChange={handleEmail} placeholder='example@gmail.com' required />
                    </Col>
                    {error.length > 0 && <span id='span'>{error}</span>}
                </Form.Group>
                <Button type='submit' as="input" value='Login' id='button' onClick={handleSubmit} />
            </div>
            {
                status && <Redirect to='/show' />
            }
        </div>
    )
}
export default SocialDashboard