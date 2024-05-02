import { Grid, Box, Container, Typography, Fade, Alert, Snackbar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomMaskText from "../../components/common/CustomMaskText";
import { useState } from "react";
import styled from "@emotion/styled";
import { FormValues } from "../../types/creditCard";
import { formatName, makeFormText } from "../../utils/format";
import sendCardInfo from "../../services/api";
import { creditCardSchema } from "../../utils/validators/creditCardSchema";
import { DEFAULT_CARD_DATA } from "../../constants/constants";

const CardContainer = styled(Container)(({ theme }) => ({
  "& .mainTitle": {
    padding: "50px 0",
  },
  // Card Image part style
  "& .cardView": {
    position: "relative",
    marginLeft: "100px",
    color: "#ffffff",
    // Card front image part style
    "& .cardFrontView": {
      background: "url('/assets/images/credit-card-front.jpg')",
      position: "absolute",
      top: "12px",
      width: "686px",
      height: "388px",
      borderRadius: "15px",
      display: "flex",
      // The text style in front card image
      "& .cardFrontContent": {
        maxHeight: "100%",
        flexGrow: 1,
        padding: "30px 30px 30px 50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      },
      "& .infoText": {
        display: "flex",
        "& .name": {
          flexGrow: 1,
          display: "flex",
          flexDirection: "column-reverse"
        },
        "& .expeiry": {
          flexBasis: 0,
          textAlign: "center"
        },
      },
    },
    // The text style in behind card image
    "& .cardBackView": {
      background: "url('/assets/images/credit-card-back.png')",
      position: "absolute",
      left: "114px",
      width: "686px",
      height: "388px",
      borderRadius: "15px",
      display: "flex",
      "& .MuiGrid-root": {
        flexGrow: 1,
        padding: "39px 32px",
      },
    },
    "&:hover":{
      scale:1.1
    }
  },
  // From part style
  "& form": {
    marginTop: "540px",
    position: "relative",
    // Loading button style
    "& .loadingBtn": { 
      mt: 6, 
      padding: "7px 24px",
      fontSize: "24px", 
      position:"absolute", 
      top: "210px"
    }
  },
}));

export default function CreditCard() {
  // To open submit button
  const [open, setOpen] = useState(false);
  // The submiting state
  const [isSubmitting, setSubmitting] = useState(false);
  // Submiting result 
  const [isError, setError] = useState(false);

  const methods = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(creditCardSchema),
    defaultValues: {
      cardNum: "",
      expiration: "",
      cvv: "",
      firstName: "",
      lastName: "",
      zipCode: "",
    },
  });

  const {
    handleSubmit,
    watch,
    formState
  } = methods;

  // The function to submit
  const onSubmit: SubmitHandler<FormValues> = async data => {
    setOpen(false);
    setSubmitting(true)
    try {
      const response = await sendCardInfo(data);
      setError(!Boolean(response));
    }catch (error) {
        setError(true);
    }finally {
      setOpen(true)
      setSubmitting(false)
    }
  };

  // The function to handle alrert 
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <CardContainer>
      <Typography className="mainTitle" variant="h3">Pay with credit card</Typography>
      <Fade in={true} style={{ transitionDuration: "800ms"}}>
        <Box className="cardView" >
          <Box className="cardBackView">
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Typography variant="h5">CVV</Typography>
              <Typography variant="h5">
                {makeFormText(watch("cvv"), "XXX")}
              </Typography>
            </Grid>
          </Box>
          <Box className="cardFrontView">
            <Box className="cardFrontContent">
              <Box>
                <img src="/assets/images/credit-card-logo.png" alt="logo" />
              </Box>
              <Box>
                <Typography variant="h4">
                  {!Boolean(formState.errors["cardNum"]) && watch("cardNum")? watch("cardNum") :
                  makeFormText(watch("cardNum"), "XXXX XXXX XXXX XXXX") }
                </Typography>
              </Box>
              <Box className="infoText">
                <Box  className={"name"}>
                <Typography variant="h5">
                  {formatName(watch("firstName"), watch("lastName"))}
                </Typography>
                </Box>
                <Box className="expeiry">
                  <Typography variant="h5">EXPEIRY</Typography>
                  <Typography variant="h5">
                    {makeFormText(watch("expiration"), "XX/XX")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
      
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {DEFAULT_CARD_DATA.map((data, index) => (
              <Grid item xs={data.size} key={index}>
                <CustomMaskText
                  label={data.label}
                  mask={data.mask as any}
                  placeholder={data.placeholder}
                  name={data.name}
                />
              </Grid>
            ))}
          </Grid>
          <LoadingButton
            className={"loadingBtn"}
            color="warning"
            variant="contained"
            type="submit"
            loading={isSubmitting}
            disabled={!formState.isValid}
          >
            <span>Submit</span>
          </LoadingButton>
        </form>
      </FormProvider>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {isError ? (<Alert onClose={handleClose} elevation={6} variant="filled" severity="error">Submit failed. Please try again later.</Alert>): 
                  (<Alert onClose={handleClose} elevation={6} variant="filled" color="info" severity="success">Submit successed!</Alert>)}
      </Snackbar>
    </CardContainer>
  );
}
