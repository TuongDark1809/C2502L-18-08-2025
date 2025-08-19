import '@fontsource/roboto/400.css';
import { TextField } from '@mui/material';

function SearchBar(p) {
    return (
        <TextField
            noValidate
            autoComplete="off"
            variant="outlined"
            label="Products"
            value={p.value}
            onChange={p.onChange}
            sx={{
                height: "60px",
                maxHeight: "60px",
                width: "400px",
                maxWidth: "400px",
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "gray", // màu viền bình thường
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "rgb(37, 83, 150)", // màu viền khi focus
                    },
                },
                // đổi màu label
                "& .MuiInputLabel-root": {
                    color: "gray", // màu label bình thường
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "rgb(37, 83, 150)", // màu label khi focus
                }
            }}
        />
    )
}

export default SearchBar