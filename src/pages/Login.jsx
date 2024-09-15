import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useDispatch } from "react-redux"
import { saveUser } from "../app/reducer/auth"
import { Navigate, useNavigate } from "react-router-dom"

function Login() {
  if (localStorage.getItem("ig-user")) return <Navigate to={"/"} />

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(false)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleAuth = async (formData) => {
    const { name, email, password } = formData

    try {
      let response
      if (isLogin) {
        response = await axios.post(
          `${import.meta.env.VITE_SERVER}/api/auth/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )

        console.log("Login successful:", response.data)
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_SERVER}/auth/register`,
          {
            name,
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        console.log("Register successful:", response.data)
      }
      localStorage.setItem("ig-user", JSON.stringify(response.data.user))

      dispatch(saveUser(response.data.user))
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="w-[22rem] bg-zinc-900 mx-auto mt-[50vh] -translate-y-[50%] rounded-xl px-6 py-8">
      <h1 className="text-2xl font-semibold text-center mb-5">
        {isLogin ? "Login" : "Register"}
      </h1>
      <form onSubmit={handleSubmit(handleAuth)} className="flex flex-col gap-4">
        {!isLogin && (
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name must be at most 50 characters",
                },
              })}
              className="w-full px-3 py-2 rounded-md bg-zinc-800 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 mt-2">{errors.name.message}</p>
            )}
          </div>
        )}
        <div className="email-input">
          <input
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 rounded-md bg-zinc-800 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
                message:
                  "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
              },
            })}
            className="w-full px-3 py-2 rounded-md bg-zinc-800 outline-none"
          />
          {errors.password && (
            <p className="text-red-500 mt-2">{errors.password.message}</p>
          )}
        </div>
        <input
          type="submit"
          value={isLogin ? "Login" : "Register"}
          className="w-full bg-blue-600 px-3 py-2 rounded-md"
        />
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 underline w-fit"
        >
          {isLogin ? "Create an account" : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login
