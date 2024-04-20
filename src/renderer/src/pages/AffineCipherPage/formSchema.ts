import * as yup from "yup";
import { dictionary } from "../../dictionary/dictionary";

export const schema = yup
  .object({
    alphabetType: yup
      .string()
      .required(dictionary.affineCipher.form.alphabetTypeError),
    affineFirstKey: yup
      .number()
      .typeError(dictionary.affineCipher.form.affineKeyErrorNumber)
      .positive(dictionary.affineCipher.form.affineKeyErrorNumberPositive)
      .integer()
      .required(dictionary.affineCipher.form.affineKeyError),
    affineSecondKey: yup
      .number()
      .typeError(dictionary.affineCipher.form.affineKeyErrorNumber)
      .positive(dictionary.affineCipher.form.affineKeyErrorNumberPositive)
      .integer()
      .required(dictionary.affineCipher.form.affineKeyError)
      .when("alphabetType", {
        is: (val: string) => val === "alpha-eng",
        then: () =>
          yup
            .number()
            .typeError(
              (props) =>
                !props.value && dictionary.affineCipher.form.alphabetTypeError
            )
            .min(1, dictionary.affineCipher.form.affineErrorMinLengthEng)
            .max(26, dictionary.affineCipher.form.affineErrorMaxLengthEng),
        otherwise: () =>
          yup
            .number()
            .min(1, dictionary.affineCipher.form.affineErrorMinLengthPol)
            .max(35, dictionary.affineCipher.form.affineErrorMaxLengthPol),
      }),
    affineValue: yup
      .string()
      .required(dictionary.affineCipher.form.affineTransmitionError)
      .when("alphabetType", {
        is: (val: string) => val === "alpha-eng",
        then: () =>
          yup
            .string()
            .required(dictionary.affineCipher.form.affineTransmitionError)
            .matches(
              /^[a-zA-Z\s]*$/,
              dictionary.affineCipher.form.affineTransmitionErrorWrong
            ),
        otherwise: () =>
          yup
            .string()
            .required(dictionary.affineCipher.form.affineTransmitionErrorType)
            .matches(
              /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/,
              dictionary.affineCipher.form.affineTransmitionErrorWrong
            )

            .nullable(),
      }),
  })
  .required();
