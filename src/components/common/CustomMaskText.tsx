import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { Props } from "../../types/creditCard";

// The Material Mask Text Field

const MaskText = styled(Box)(({ theme }) => ({
  "& svg":{
    fontSize: "1.2rem",
    marginLeft: "5px"
  },
  "& .css-1u77e5t-MuiFormLabel-root-MuiInputLabel-root": {
    fontSize: "22px",
    color:  theme.palette.primary.main
  },
  "& .label+.css-1dkfj2w-MuiInputBase-root-MuiInput-root":{
    marginTop: "21px"
  },
  "& .css-1x51dt5-MuiInputBase-input-MuiInput-input":{
    fontSize: "26px"
  },
  "& .css-1d1r5q-MuiFormHelperText-root":{
    fontSize: "14px"
  }
}));

export default function CustomMaskText(props: Props) {

  const {label, mask, placeholder, name} = props;
  const {control,formState: { errors }} = useFormContext()
  const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/yy')

  return (
    <Controller
      name={name}
      control={control}
      render={({field: { ref, ...inputProps }}) => (
        <MaskText>
          <div className="field">
            <MaskedInput
              {...inputProps}
              id={name}
              className="input"
              mask={mask}
              guide={false}
              showMask
              pipe={name === 'expiration' ? autoCorrectedDatePipe : null}
              render={(ref, props) => (
                <TextField 
                  fullWidth
                  focused
                  label={label}
                  placeholder={placeholder}
                  helperText={errors[name]?.message as string}
                  variant="standard"
                  color="primary"
                  inputRef={ref}
                  error={Boolean(errors[name])} 
                  {...props}   
                />
              )}
            />
          </div>
        </MaskText>
      )}
    />
  );
}
