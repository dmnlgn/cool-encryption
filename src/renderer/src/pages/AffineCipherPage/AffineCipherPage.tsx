import React, { useState, type ChangeEvent } from "react";

import classNames from "classnames";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/pages/AffineCipherPage/formSchema";

import { dictionary } from "@/dictionary/dictionary";
import { englishAlphabet, polishAlphabet } from "@/dictionary/alphabet";

type TAlphabetType = "alpha-pol" | "alpha-eng";

type TAffineMode = "encrypt" | "decrypt";

interface IAffineFormState {
  alphabetType: string;
  affineFirstKey: number;
  affineSecondKey: number;
  affineValue: string;
}

const calculateGreatestCommonDivisor = (alphabet: TAlphabetType) => {
  let maxCount = 0;

  if (alphabet === "alpha-eng") {
    maxCount = englishAlphabet.length;
  } else {
    maxCount = polishAlphabet.length;
  }
  const relativelyPrimeNumbers = [];
  let index = 1;

  const isPrime = (a: number, b: number): number => {
    if (!b) {
      return a;
    }

    return isPrime(b, a % b);
  };

  while (index !== maxCount) {
    if (isPrime(index, maxCount) === 1) {
      relativelyPrimeNumbers.push(index);
    }
    index++;
  }
  return relativelyPrimeNumbers;
};

const AffineCipherPage = () => {
  const [alphabet, setAlphabet] = useState<TAlphabetType>("alpha-eng");
  const [affineMode, setAffineMode] = useState<TAffineMode>("encrypt");
  const [affineResult, setAffineResult] = useState<string[] | []>([]);
  const [cryptoAlphabet, setCryptoAlphabet] = useState<string[] | []>([]);

  const affineCipherFirstKeyOptions = calculateGreatestCommonDivisor(alphabet);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<IAffineFormState>({
    resolver: yupResolver<IAffineFormState>(schema),
    defaultValues: {
      affineFirstKey: calculateGreatestCommonDivisor(alphabet)[0],
    },
  });

  const onSubmit: SubmitHandler<IAffineFormState> = (data, event) => {
    event?.preventDefault();
    calculateAffineCipher(data);
  };

  const calculateAffineCipher = (data: IAffineFormState) => {
    let currentAlphabet = englishAlphabet;
    if (alphabet === "alpha-pol") {
      currentAlphabet = polishAlphabet;
    }

    const cryptoAlphabetArray = [];
    const affineTransmitionValue = data.affineValue;
    const firstKey = data.affineFirstKey;
    const secondKey = data.affineSecondKey;
    const alphabetLength = currentAlphabet.length;
    const encodedValue = [];
    switch (affineMode) {
      case "encrypt": {
        for (let i = 0; i < affineTransmitionValue.length; i++) {
          const alphabetLetter = affineTransmitionValue[i].toLowerCase();
          const indexOfAffineTransmitionValue =
            currentAlphabet.indexOf(alphabetLetter);

          if (!affineTransmitionValue[i].trim()) {
            encodedValue.push(" ");
            continue;
          }

          const currentLetter =
            (indexOfAffineTransmitionValue * firstKey +
              (secondKey % alphabetLength)) %
            alphabetLength;

          const encodedLetter = currentAlphabet[currentLetter];

          let parseCurrentLetter = encodedLetter;
          if (
            affineTransmitionValue[i] ===
            affineTransmitionValue[i].toUpperCase()
          ) {
            parseCurrentLetter = parseCurrentLetter.toUpperCase();
          } else {
            parseCurrentLetter = parseCurrentLetter.toLowerCase();
          }

          encodedValue.push(parseCurrentLetter);
        }
        setAffineResult(encodedValue);

        for (let i = 0; i < currentAlphabet.length; i++) {
          const indexOfAffineTransmitionValue = currentAlphabet.indexOf(
            currentAlphabet[i]
          );

          let currentLetterAlpha =
            (indexOfAffineTransmitionValue * firstKey +
              (secondKey % alphabetLength)) %
            alphabetLength;

          if (currentLetterAlpha < 0) {
            currentLetterAlpha = alphabetLength + currentLetterAlpha;
          }

          if (currentLetterAlpha < 0) {
            currentLetterAlpha = currentAlphabet.length + currentLetterAlpha;
          }

          const currentLetter = currentAlphabet[currentLetterAlpha];

          cryptoAlphabetArray.push(currentLetter);
        }
        break;
      }
      case "decrypt": {
        let inverseFirstKey = 0;

        for (let i = 0; i < alphabetLength; i++) {
          const flag = (firstKey * i) % alphabetLength;
          if (flag === 1) {
            inverseFirstKey = i;
            break;
          }
        }

        for (let i = 0; i < affineTransmitionValue.length; i++) {
          const alphabetLetter = affineTransmitionValue[i].toLowerCase();
          const indexOfAffineTransmitionValue =
            currentAlphabet.indexOf(alphabetLetter);

          if (!affineTransmitionValue[i].trim()) {
            encodedValue.push(" ");
            continue;
          }

          let currentLetter =
            (inverseFirstKey * (indexOfAffineTransmitionValue - secondKey)) %
            alphabetLength;

          if (currentLetter < 0) {
            currentLetter = alphabetLength + currentLetter;
          }

          const encodedLetter = currentAlphabet[currentLetter];

          let parseCurrentLetter = encodedLetter;
          if (
            affineTransmitionValue[i] ===
            affineTransmitionValue[i].toUpperCase()
          ) {
            parseCurrentLetter = parseCurrentLetter?.toUpperCase();
          } else {
            parseCurrentLetter = parseCurrentLetter?.toLowerCase();
          }

          encodedValue.push(parseCurrentLetter);
        }

        for (let i = 0; i < currentAlphabet.length; i++) {
          const indexOfAffineTransmitionValue = currentAlphabet.indexOf(
            currentAlphabet[i]
          );

          let currentLetterAlpha =
            (indexOfAffineTransmitionValue * firstKey +
              (secondKey % alphabetLength)) %
            alphabetLength;

          if (currentLetterAlpha < 0) {
            currentLetterAlpha = alphabetLength + currentLetterAlpha;
          }

          const currentLetter = currentAlphabet[currentLetterAlpha];

          cryptoAlphabetArray.push(currentLetter);
        }

        setAffineResult(encodedValue);
        break;
      }
    }
    setCryptoAlphabet(cryptoAlphabetArray);
  };

  const handleChangeAlphabet = (event: ChangeEvent<HTMLSelectElement>) => {
    const targetElement = (event.target as HTMLSelectElement)
      ?.value as TAlphabetType;
    setAlphabet(targetElement);
    resetForm();
  };

  const handleChangeAffineMode = (type: TAffineMode) => {
    switch (type) {
      case "encrypt": {
        setAffineMode("encrypt");
        break;
      }
      case "decrypt": {
        setAffineMode("decrypt");
        break;
      }
    }
    setCryptoAlphabet([]);
    setAffineResult([]);
  };

  const resetForm = () => {
    setCryptoAlphabet([]);
    setAffineResult([]);
    resetField("affineFirstKey");
    resetField("affineSecondKey");
    resetField("affineValue");
  };

  const renderResult = () => {
    if (affineResult.length) {
      const affineEncodeValue = affineResult.join("") ?? "";
      return (
        <div className="cool-cipher-affine-form cool-form cool-cipher-affine-result">
          <div className="cool-form-group">
            <label className="cool-form-label">
              {dictionary.affineCipher.alphabetAfterDecode}
            </label>
            <input type="text" readOnly={true} value={affineEncodeValue} />
          </div>
        </div>
      );
    }
  };

  const renderResultAlphabet = () => {
    let currentAlphabet = englishAlphabet;
    if (alphabet === "alpha-pol") {
      currentAlphabet = polishAlphabet;
    }
    if (!!affineResult.length && !!cryptoAlphabet.length) {
      if (affineMode === "decrypt") {
        return (
          <div className="cool-cipher-affine-form cool-form cool-cipher-affine-result">
            <div className="cool-form-group">
              <label className="cool-form-label">
                {dictionary.caesarCipher.alphabetBeforeDecode}
              </label>
              <div className="cool-cipher-affine-alphabet">
                {cryptoAlphabet.map((el, index) => {
                  return (
                    <div
                      className="cool-cipher-affine-alphabet-element"
                      key={index}
                    >
                      <div>{el}</div>
                      <div className="cool-cipher-affine-alphabet-element-index">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cool-form-group">
              <label className="cool-form-label">
                {dictionary.caesarCipher.alphabetAfterDecode}
              </label>
              <div className="cool-cipher-affine-alphabet">
                {currentAlphabet.map((el, index) => {
                  return (
                    <div
                      className="cool-cipher-affine-alphabet-element"
                      key={index}
                    >
                      <div>{el}</div>
                      <div className="cool-cipher-affine-alphabet-element-index">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="cool-cipher-affine-form cool-form cool-cipher-affine-result">
          <div className="cool-form-group">
            <label className="cool-form-label">
              {dictionary.caesarCipher.alphabetBeforeEncode}
            </label>
            <div className="cool-cipher-affine-alphabet">
              {currentAlphabet.map((el, index) => {
                return (
                  <div
                    className="cool-cipher-affine-alphabet-element"
                    key={index}
                  >
                    <div>{el}</div>
                    <div className="cool-cipher-affine-alphabet-element-index">
                      {index + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {!!cryptoAlphabet.length && (
            <div className="cool-form-group">
              <label className="cool-form-label">
                {dictionary.caesarCipher.alphabetAfterEncode}
              </label>
              <div className="cool-cipher-affine-alphabet">
                {cryptoAlphabet.map((el, index) => {
                  return (
                    <div
                      className="cool-cipher-affine-alphabet-element"
                      key={index}
                    >
                      <div>{el}</div>
                      <div className="cool-cipher-affine-alphabet-element-index">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  const affineButtonSubmitText =
    affineMode === "encrypt"
      ? dictionary.affineCipher.encodeMessage
      : dictionary.affineCipher.decodeMessage;

  return (
    <div className="cool-cipher-affine">
      <div className="content-wrapper">
        <div className="cool-cipher-affine-container">
          <div className="cool-cipher-affine-content">
            <div className="cool-cipher-affine-type-crypt">
              <button
                className={classNames("cool-btn left", {
                  active: affineMode === "encrypt",
                })}
                onClick={() => handleChangeAffineMode("encrypt")}
              >
                {dictionary.affineCipher.modeEncode}
              </button>
              <button
                className={classNames("cool-btn right", {
                  active: affineMode === "decrypt",
                })}
                onClick={() => handleChangeAffineMode("decrypt")}
              >
                {dictionary.affineCipher.modeDecode}
              </button>
            </div>
            <h3 className="cool-cipher-affine-form-title">
              {dictionary.affineCipher.formTitle}
            </h3>
            <form
              className="cool-cipher-affine-form cool-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="cool-form-group">
                <label className="cool-form-label">
                  {dictionary.affineCipher.form.alphabetTypeLabel}
                </label>
                <select
                  {...register("alphabetType")}
                  onChange={handleChangeAlphabet}
                  value={alphabet}
                >
                  <option value="alpha-pol">Alfabet polski (35 znaków)</option>
                  <option value="alpha-eng">
                    Alfabet angielski (26 znaków)
                  </option>
                </select>
              </div>
              <div className="cool-form-group">
                <label className="cool-form-label">
                  {dictionary.affineCipher.form.affineFirstKeyLabel}
                </label>
                <select {...register("affineFirstKey")}>
                  {affineCipherFirstKeyOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="cool-form-group">
                <label className="cool-form-label">
                  {dictionary.affineCipher.form.affineSecondKeyLabel}
                </label>
                <input
                  type="number"
                  {...register("affineSecondKey")}
                  className={classNames({
                    "is-invalid": errors.affineSecondKey,
                  })}
                />
                {errors.affineSecondKey && (
                  <p className="input-error-no-margin">
                    {errors.affineSecondKey.message}
                  </p>
                )}
              </div>
              <div className="cool-form-group">
                <label className="cool-form-label">
                  {dictionary.affineCipher.form.affineValueLabel}
                </label>
                <input
                  type="text"
                  {...register("affineValue")}
                  className={classNames({
                    "is-invalid": errors.affineValue,
                  })}
                />
                {errors.affineValue && (
                  <p className="input-error-no-margin">
                    {errors.affineValue.message}
                  </p>
                )}
              </div>
              <button type="submit" className="cool-btn">
                {affineButtonSubmitText}
              </button>
            </form>
            {renderResult()}
            {renderResultAlphabet()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffineCipherPage;
