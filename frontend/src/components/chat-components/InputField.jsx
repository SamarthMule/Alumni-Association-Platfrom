import {

  IconButton,
  Input
} from "@chakra-ui/react";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { InputGroup } from '../ui/input-group';
import { Field } from "../ui/field";
import PropTypes from "prop-types";

const InputField = ({
  type = "text",
  placeholder = "",
  label = "",
  value = "",
  onChange = () => { },
  isRequired = true,
  isInvalid = false,
  errorText = "",
}) => {
  const [show, setShow] = useState(false);

  return (
    <Field label={label} required={isRequired} errorText={errorText} invalid={isInvalid}>
      <InputGroup w="100%" endElement={
        type === "password" && (
          <IconButton
            onClick={() => setShow(!show)}
            colorPalette="pink"
            variant="ghost"
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </IconButton>

        )
        
      }>
        <Input
          w="100%"
          type={type === "password" ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          borderColor="pink.500"
        />

      </InputGroup>
      
    </Field>
  );
};

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  isInvalid: PropTypes.bool,
  errorText: PropTypes.string,
};

export default InputField;
