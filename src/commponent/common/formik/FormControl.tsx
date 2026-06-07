import React from "react";
import "./formControl.scss";
import type { InputFieldProps } from "./inputField/InputField";
import InputField from "./inputField/InputField";
import type { SelectFieldProps } from "./selectField/selectField";
import SelectField from "./selectField/selectField";
import CheckboxField from "./checkboxField/checkboxField";

export type BaseControlProps = {
  name: string;
  label?: React.ReactNode;
  error?: any;
};

type PhoneProps = BaseControlProps & { control: "phone";[key: string]: any };
type TextareaProps = BaseControlProps & {
  control: "textarea";
  [key: string]: any;
};
type CheckboxProps = BaseControlProps & {
  control: "checkbox";
  [key: string]: any;
};
type RadioProps = BaseControlProps & { control: "radio";[key: string]: any };
type FileProps = BaseControlProps & { control: "file";[key: string]: any };
type DateProps = BaseControlProps & { control: "date";[key: string]: any };
type MonthProps = BaseControlProps & {
  control: "yearmonth";
  [key: string]: any;
};

type InputControlProps = InputFieldProps & { control?: "input" };

type SelectControlProps = SelectFieldProps & { control: "select"; isMulti?: boolean };

export type FormControlProps =
  | PhoneProps
  | TextareaProps
  | CheckboxProps
  | RadioProps
  | SelectControlProps
  | FileProps
  | DateProps
  | MonthProps
  | InputControlProps;

const FormControl: React.FC<FormControlProps> = (props) => {
  const { control, error, ...rest } = props as any;
  switch (control) {
    case "checkbox":
      return <CheckboxField {...rest} error={error} />;
    case "select":
      return <SelectField {...rest} error={error} />;
    default:
      return <InputField {...rest} error={error} />;
  }
};

export default FormControl;
