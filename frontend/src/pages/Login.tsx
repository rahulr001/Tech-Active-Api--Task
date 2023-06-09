import { Button, Paper, Typography } from "@mui/material";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Grid } from "@mui/material";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthLogics } from "../utils/AuthLogics";
import { TextValidatorStyle, TypographyStyles } from "../constants";

type Props = {};

const Login = (props: Props) => {
  const loginError = useSelector((state: any) => state.Slice.error);
   
  const { handleSubmit, handleChange, values } = AuthLogics();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        // borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        style={{
          fontFamily: "Poppins",
          fontWeight: "500",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Sign in
      </Typography>
      <Paper
        elevation={3}
        style={{
          position: "relative",
          width: "25rem",
          borderRadius: "12px",
          margin: "4rem",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: loginError ? "2px solid red" : "",
        }}
      >
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={(errors: any) => console.log(errors)}
        >
          <Grid
            container
            spacing={2}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
              "& .MuiTextValidator-root": {},
              padding: "2.5rem 2rem 2rem 4rem",
            }}
          >
            <Grid item xs={12}>
              <Typography style={TypographyStyles}>User Name</Typography>
              <TextValidator
                id="outlined-basic"
                variant="outlined"
                value={values.username}
                onChange={handleChange}
                name="username"
                required={true}
                style={{
                  width: "250px",
                  marginTop: "0.5rem",
                }}
                sx={TextValidatorStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography style={TypographyStyles}>Password</Typography>
              <TextValidator
                placeholder="**********"
                id="outlined-basic"
                variant="outlined"
                type="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                required={true}
                style={{
                  width: "250px",
                  marginTop: "0.5rem",
                }}
                sx={TextValidatorStyle}
              />
            </Grid>
            <Grid item xs={3} sx={{ display: "flex" }}>
              <Button
                variant="contained"
                type="submit"
                style={{
                  fontFamily: "Poppins",
                  padding: ".5rem 3rem",
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Paper>
    </div>
  );
};

export default Login;
