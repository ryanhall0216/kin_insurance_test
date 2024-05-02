import * as React from "react";
import { HelpOutlineOutlined } from "@mui/icons-material";

export const IconLabel = (label: string, isShow?:Boolean) => {
    return (
        <React.Fragment>
          {label}
          {isShow?<HelpOutlineOutlined />:<></>}
        </React.Fragment>
    )
}