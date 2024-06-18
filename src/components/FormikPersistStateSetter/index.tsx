import { useEffect, useLayoutEffect, useRef } from "react";
import isDeepEqual from "react-fast-compare";
import { FormikProps } from "formik";

interface FormikPersistStateSetterProps<T> extends FormikProps<T> {
  searchFormParams: T;
}

const FormikPersistStateSetter = <T,>(
  props: FormikPersistStateSetterProps<T>
): null => {
  const { searchFormParams, setValues, values } = props;
  const valuesRef = useRef(values);
  useLayoutEffect(() => {
    valuesRef.current = values;
  });
  useEffect(() => {
    // Only set the search form values if the search form params is different.
    // Avoid unnecessary trigger of the effect by using Ref for values.
    if (!isDeepEqual(searchFormParams, valuesRef.current)) {
      setValues(searchFormParams);
    }
  }, [searchFormParams, setValues]);

  return null;
};

export default FormikPersistStateSetter;
