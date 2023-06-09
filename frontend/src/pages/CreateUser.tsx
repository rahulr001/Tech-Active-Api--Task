import React from "react";
import { Button, Paper, Typography } from "@mui/material";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Grid } from "@mui/material";

import { FormInputs, TextValidatorStyle, TypographyStyles } from "../constants";
import { CreateUserLogics } from "../utils/CreateUserLogics";

type Props = {};

const CreateUser = (props: Props) => {
  const { handleChange, values, handleSubmit } = CreateUserLogics();
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "95vh",
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
          margin: "2rem",
        }}
      >
        Create User
      </Typography>
      <Paper
        // elevation={3}
        style={{
          position: "relative",
          width: "40rem",
          borderRadius: "12px",
          //   margin: "4rem",
          padding: "1rem 0rem 1rem 1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={(errors: any) => console.log(errors)}
        >
          <Grid
            container
            spacing={2}
            xs={20}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
              "& .MuiTextValidator-root": {},
              padding: "2.5rem 0rem 2rem 4rem",
            }}
          >
            {FormInputs.map((inputs) => (
              <Grid item xs={5}>
                <Typography style={TypographyStyles}>{inputs.label}</Typography>
                <TextValidator
                  id="outlined-basic"
                  variant="outlined"
                  value={values[inputs.name]}
                  onChange={handleChange}
                  name={inputs.name}
                  required={true}
                  style={{
                    width: "225px",
                    // marginTop: "0.5rem",
                  }}
                  sx={TextValidatorStyle}
                />
              </Grid>
            ))}

            <Grid item xs={3}>
              <Button
                variant="contained"
                type="submit"
                style={{
                  fontFamily: "Poppins",
                  padding: ".5rem 3rem",
                  margin: "2rem 0rem 0rem 2rem",
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

export default CreateUser;
