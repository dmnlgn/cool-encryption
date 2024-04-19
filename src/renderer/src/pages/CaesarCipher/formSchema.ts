import * as yup from "yup";
import { dictionary } from "../../dictionary/dictionary";

export const schema = yup
  .object({
    alphabetType: yup
      .string()
      .required(dictionary.caesarCipher.form.alphabetTypeError),
    caesarKey: yup
      .number()
      .typeError(dictionary.caesarCipher.form.caesarKeyErrorNumber)
      .positive(dictionary.caesarCipher.form.caesarKeyErrorNumberPositive)
      .integer()
      .required(dictionary.caesarCipher.form.caesarKeyError),
    caesarTransmition: yup
      .string()
      .required(dictionary.caesarCipher.form.caesarTransmitionError)
      .when("alphabetType", {
        is: (val: string) => val === "alpha-eng",
        then: () =>
          yup
            .string()
            .matches(
              /^[a-zA-Z\s]*$/,
              dictionary.caesarCipher.form.caesarTransmitionErrorWrong
            )
            .required(dictionary.caesarCipher.form.caesarTransmitionError),
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

// alphabetType: string;
// caesarKey: string;
// caesarTransmition: string;
