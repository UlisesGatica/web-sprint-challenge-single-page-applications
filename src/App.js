import {Link, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import * as yup from 'yup';
import Schema from './Schema';
import axios from 'axios';

const defaultForm ={
  name: '',
  size: '',
  pepperoni: false,
  sausage: false,
  bacon:false,
  greenPepper:false,
  grilledChicken:false,
  special: '',
}

const initailFormError = {
  name:'',
}
const initialValues = []
const initialDisabled = true

const App = () => {

  const [values, setValues] = useState(initialValues)
  const [choice, setChoice] = useState(defaultForm)
  const [formErrors, setFormErrors] = useState(initailFormError)
  const [disabled, setDisabled] = useState(initialDisabled)

  const postNewValues = newValues => {
    axios.post('https://reqres.in/api/orders', newValues)
    .then(res => {
      setValues([res.data, ...values]);
      console.log(setValues)
    }).catch(err => {
      console.error(err)
    }).finally(() =>{
      setChoice(defaultForm)
    })
  }

  const validate = (name,value) => {
    yup.reach(Schema, name)
    .validate(value)
    .then(() => setFormErrors({...formErrors, [name]: ''}))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }


  const inputChange = (name,value) => {
    validate(name,value);
    setChoice({...choice,[name]: value})
  }

  const onChange=(evt)=>{
    const {name, value, checked, type} = evt.target
    const valueIs = type === 'checkbox'? checked : value
        inputChange(name,valueIs)
  }


  const formSubmit = () => {
    const newValues = {
      name: choice.name.trim(),
      size: choice.size,
      pepperoni: choice.pepperoni,
      sausage: choice.sausage,
      bacon: choice.bacon,
      greenPepper: choice.greenPepper,
      grilledChicken: choice.grilledChicken,
      special: choice.special.trim()
    }
    console.log(newValues);
    postNewValues(newValues)
  }

  const onSubmit = (event => {
    event.preventDefault();
    formSubmit();
  })

  useEffect(() => {
    Schema.isValid(choice).then(valid => setDisabled(!valid))
  },[choice])
  
  return (
    <>
      <h1>Lambda Eats</h1>
      <Link to = '/pizza' id = 'order-pizza'>Make a Pizza</Link>
       <Link to = '/' id = 'order-pizza'>Home</Link>
       <Link to = '/help'>Help</Link>
      <Route path = '/pizza'>
        <form id = 'pizza-form' onSubmit={onSubmit}>
        <h2>Make your own Pizza</h2>
        <img src = 'https://cdn.pixabay.com/photo/2021/07/19/16/05/pizza-6478481__340.jpg' alt='pizza in the oven'></img>
        
        <label>
          <div>{formErrors.name}</div>
              Name on order
              <input
              id='name-input'
              onChange={onChange}
              value={choice.name}
              name='name'
              type='text'/>
            </label>
        <label>
              Choose your Size
              <div>{formErrors.size}</div>
              <select 
              id='size-dropdown'
              onChange={onChange}
              name='size'>
                 <option value="">-- Select a size here --</option>
                 <option value='10inch' >10inch</option>
                 <option value='12inch' >12inch</option>
                 <option value='14inch' >14inch</option>
                 <option value='16inch' >16inch</option>
              </select>
          </label>
              <p>Choice of Topping</p>
          <label>Pepperoni
            <input
                type="Checkbox"
                name="pepperoni"
                onChange={onChange}
                  />
          </label>
          <label>Sausage
            <input
                type="Checkbox"
                name="sausage"
                onChange={onChange}
            />
          </label>
          <label>Bacon
            <input
            type="Checkbox"
            name="bacon"
            onChange={onChange}
            checked={values.bacon}
            />
          </label>
          <label>Green Pepper
            <input
              type="Checkbox"
              name="greenPepper"
              onChange={onChange}
            />
          </label>
          <label>Grilled Chicken
            <input
            type="Checkbox"
            name="grilledChicken"
            onChange={onChange}
            />
          </label>
          <label>Special Instructions
              <input
              id ='special-text'
              onChange={onChange}
              name='special'
              type='text'
              ></input>
          </label>
          <label>
          <button disabled={disabled} id = 'order-button'>submit</button>
          </label>
        </form>
      </Route>

      <Route exact path = '/' >
       <div>
         <img src='https://cdn.pixabay.com/photo/2018/04/11/03/13/food-3309418__480.jpg' alt='pizza'></img>
       </div>

      </Route>
    </>
  );
};
export default App;
