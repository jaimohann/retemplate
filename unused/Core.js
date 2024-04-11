import React, { useEffect } from "react";
import { useForm } from "../src/Pages/Components/Forms/Elements/Form/Context";
import format from "../src/Pages/Register/Format";

const Core = ({}) => {
  const { renderControls,setForm, formData } = useForm();

  useEffect(() => {
    setForm(format);
  }, [formData]);

  return <>{renderControls()}</>;
};

export default Core;
