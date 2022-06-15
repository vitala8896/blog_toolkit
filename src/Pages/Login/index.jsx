import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import { login, register } from '../../store/authSlice'
import { StyleAuth, AuthForm, AuthWidth, GoTo, H1, Btn } from './styles'

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
}
export const LoginPage = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const { isAuthenticated } = useSelector((state) => {
		return {
			isAuthenticated: state.auth.isAuthenticated,
		}
	})
	useEffect(() => {
		if (isAuthenticated) {
			history.replace('/')
		}
	}, [isAuthenticated])
	const [state, setState] = useState({
		login: true,
		isFormValid: false,
		formControls: {
			firstname: {
				value: '',
				type: 'firstname',
				label: 'Name',
				errorMessage: 'Please enter a valid name',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 2,
				},
			},
			lastname: {
				value: '',
				type: 'lastname',
				label: 'Surname',
				errorMessage: 'Please enter a valid last name',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 2,
				},
			},
			age: {
				value: '',
				type: 'age',
				label: 'Age',
				errorMessage: 'Enter the correct age',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 2,
				},
			},
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Enter the correct email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true,
				},
			},
			password: {
				value: '',
				type: 'password',
				label: 'Password',
				errorMessage: 'Enter the correct password',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6,
				},
			},
			avatar: {
				value:
					'https://s0.tchkcdn.com/i/1/1/80937_1802c6cf_1260804286_avatar_1940.jpg',
				type: 'text',
				label: 'Photo',
				errorMessage: 'Requires a correct photo',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6,
				},
			},
		},
	})
	const loginHandler = () => {
		console.log('loginHandler => ')
		dispatch(
			login({
				email: state.formControls.email.value,
				password: state.formControls.password.value,
			})
		)
	}
	const registerHandler = () => {
		console.log('registerHandler => ')
			dispatch(
				register({
				email: state.formControls.email.value,
				password: state.formControls.password.value,
				firstname: state.formControls.firstname.value,
				lastname: state.formControls.lastname.value,
				age: state.formControls.age.value,
				avatar: state.formControls.avatar.value
				})
			)
	}			
	
	const submitHandler = (e) => {
		e.preventDefault()
	}
	const validateControl = (value, validation) => {
		if (!validation) {
			return true
		}
		let isValid = true
		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}
		if (validation.email) {
			isValid = validateEmail(value) && isValid
		}
		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}
		return isValid
	}
	const onChangeHandler = (event, controlName) => {
		const formControls = { ...state.formControls }
		const control = { ...formControls[controlName] }
		control.value = event.target.value
		control.touched = true
		control.valid = validateControl(control.value, control.validation)
		formControls[controlName] = control
		let isFormValid = true
		Object.keys(formControls).forEach((name) => {
			isFormValid = formControls[name].valid && isFormValid
		})
		setState((prevState) => {
			return { ...prevState, formControls, isFormValid }
		})
	}
	const renderInputs = () => {
		return Object.keys(state.formControls).map((controlName, index) => {
			if (state.login) {
				if (
					controlName === 'firstname' ||
					controlName === 'lastname' ||
					controlName === 'age' ||
					controlName === 'avatar'
				)
					return
			}
			const control = state.formControls[controlName]
			return (
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					onChange={(event) => onChangeHandler(event, controlName)}
				/>
			)
		})
	}
	const changeLogin = () => {
		setState((prevState) => {
			return { ...prevState, login: !state.login }
		})
	}
	return (
		<StyleAuth>
			<AuthWidth>
				<H1>Authorization</H1>
				<AuthForm onSubmit={submitHandler}>
					{renderInputs()}
					<Btn>
						{state.login ? (
							<Button
								type='success'
								onClick={loginHandler}
								disabled={state.isFormValid}
							>
								Log in
							</Button>
						) : (
							<Button
								type='primary'
								onClick={registerHandler}
								disabled={state.isFormValid}
							>
								Register
							</Button>
						)}
						{state.login ? (
							<GoTo onClick={changeLogin}>go to register</GoTo>
						) : (
							<GoTo onClick={changeLogin}>go to login</GoTo>
						)}
					</Btn>
				</AuthForm>
			</AuthWidth>
		</StyleAuth>
	)
}
