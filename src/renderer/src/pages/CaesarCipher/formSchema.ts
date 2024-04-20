import * as yup from "yup";
import { dictionary } from "../../dictionary/dictionary";

export const schema = yup
  .object({
    alphabetType: yup
      .string()
      .required(dictionary.caesarCipher.form.alphabetTypeError),
    caesarKey: yup
      .number()
      .integer()
      .required(dictionary.caesarCipher.form.caesarKeyError)
      .typeError(
        (props) => !props.value && dictionary.caesarCipher.form.caesarKeyError
      )
      .positive(dictionary.caesarCipher.form.caesarKeyErrorNumberPositive),
    caesarTransmition: yup
      .string()
      .required(dictionary.caesarCipher.form.caesarTransmitionError)
      .when("alphabetType", {
        is: (val: string) => val === "alpha-eng",
        then: () =>
          yup
            .string()
            .required(dictionary.caesarCipher.form.caesarTransmitionError)
            .matches(
              /^[a-zA-Z\s]*$/,
              dictionary.caesarCipher.form.caesarTransmitionErrorWrong
            ),
        otherwise: () =>
          yup
            .string()
            .matches(
              /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/,
              dictionary.caesarCipher.form.caesarTransmitionErrorWrong
            )
            .required(dictionary.caesarCipher.form.caesarTransmitionErrorType)
            .nullable(),
      }),
  })
  .required();
