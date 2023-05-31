import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("FirstName is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string().required().min(6, "Password musthave at least 6 characters"),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null], "Password and Confirm Password does not match"
    )
})