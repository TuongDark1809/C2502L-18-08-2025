import * as React from 'react';
import "../style/Login.css"
import "../style/General.css"
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { 
    Button, 
    InputAdornment,
    FormControl, 
    InputLabel, 
    OutlinedInput,
    IconButton, 
    Alert 
} from '@mui/material';

function Login() {
    const truePassword = "password123"
    const trueEmail = "user@gmail.com"
    const [password, setPassword] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [error, setError] = React.useState("")
    const nav = useNavigate()

    //Phần hiển thị password khi ấn nút 
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div className="login">
                <div className="login__form -flexColumn">
                    <p className="login__form-label">LOGIN</p>
                    <FormControl
                        variant='outlined'
                        sx={{
                            color: "white",          // màu chữ nhập
                            "& input": {
                                color: "white",        // chữ gõ vào
                                caretColor: "white",   // màu caret
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "gray", // màu viền bình thường
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "white", // màu viền khi focus
                                },
                            },
                            // đổi màu label
                            "& .MuiInputLabel-root": {
                                color: "gray", // màu label bình thường
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "white", // màu label khi focus
                            },
                            paddingBottom: "37.5px"
                        }}>
                        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                        <OutlinedInput
                            id='login__form-email'
                            label="Email"
                            autoComplete="email"
                            endAdornment={<InputAdornment position='end'><EmailIcon color='white' /></InputAdornment>}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>


                    <FormControl
                        variant="outlined"
                        sx={{
                            color: "white",          // màu chữ nhập
                            "& input": {
                                color: "white",        // chữ gõ vào
                                caretColor: "white",   // màu caret
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "gray", // màu viền bình thường
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "white", // màu viền khi focus
                                },
                            },
                            // đổi màu label
                            "& .MuiInputLabel-root": {
                                color: "gray", // màu label bình thường
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "white", // màu label khi focus
                            },
                            paddingBottom: "37.5px"
                        }}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="login__form-password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                    <Button
                        variant='contained'
                        sx={{
                            marginLeft: "150px",
                            borderRadius: "20px",
                            backgroundColor: "black",
                            padding: "10px",
                            fontFamily: "roboto",
                            fontSize: "1.125rem",
                            fontWeight: "bold",
                            maxWidth: "200px",
                        }}
                        onClick={() => {
                            if (String(password) === String(truePassword) && String(email) === String(trueEmail)) {
                                const account = { password, email }
                                localStorage.setItem("Account", JSON.stringify(account)) //Lưu mật khẩu vào local storage
                                setError("")
                                nav("/home") 
                            } else {
                                setError("Please type in the right email or password!") 
                            }
                        }}
                    >
                        Login</Button>

                    {error && (
                        <Alert
                            variant="filled"
                            severity="error"
                            sx={{ position: "absolute" }}
                        >
                            {error}</Alert>
                    )}
                </div>
            </div>
        </>
    )
}

export default Login