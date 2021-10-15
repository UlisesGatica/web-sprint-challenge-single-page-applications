import * as yup from 'yup'


const Schema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .required('Name must be filled out!')
    .min(2, 'name must be at least 2 characters'),
    size: yup
    .string()
    .required('You must choose a size!')
    .min(1),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    bacon: yup.boolean(),
    greenPepper: yup.boolean(),
    grilledChicken: yup.boolean(),
    special: yup
    .string()
    .trim()
})

export default Schema